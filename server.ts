import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import compression from "compression";
import morgan from "morgan";
import logger from "./logger";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

if (process.env.SENTRY_DSN && process.env.SENTRY_DSN.startsWith('http')) {
  try {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [
        nodeProfilingIntegration(),
      ],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });
  } catch (e) {
    logger.warn("Failed to initialize Sentry on backend: " + String(e));
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enhance Performance and Security
  app.use(compression());
  app.use(express.json());

  // HTTP Request Logging
  app.use(morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) }
  }));

  // Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // Enterprise Observability Health Check
  app.get("/api/health", (req, res) => {
    logger.debug("Health check accessed");
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development"
    });
  });

  // API routes FIRST
  app.post("/api/analyze", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        logger.warn("API key is missing in analyze request");
        return res.status(400).json({ error: "API key is missing" });
      }

      const { prompt } = req.body;
      if (!prompt) {
        logger.warn("Prompt is missing in analyze request");
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      res.json({ text: response.text || "Analysis completed." });
    } catch (error: any) {
      if (error?.status === 429 || error?.status === 'RESOURCE_EXHAUSTED' || error?.message?.includes('429') || error?.message?.includes('quota')) {
        logger.warn("Gemini API Quota Exceeded. Triggering deterministic fallback.");
        return res.status(429).json({ error: "API Quota Exceeded" });
      }
      
      logger.error("Server API Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Set caching rules for static assets in production
    app.use(express.static(distPath, {
      maxAge: "1y",
      setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache');
        }
      }
    }));
    
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // The error handler must be before any other error middleware and after all controllers
  if (process.env.SENTRY_DSN) {
    Sentry.setupExpressErrorHandler(app);
  }

  app.listen(PORT, "0.0.0.0", () => {
    logger.info(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
