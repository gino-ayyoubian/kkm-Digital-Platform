import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import compression from "compression";
import morgan from "morgan";
import logger from "./logger";
import { setupBackendRoutes } from "./backend/server";

// Lazy Sentry initialization only when valid DSN is provided
if (process.env.SENTRY_DSN && process.env.SENTRY_DSN.startsWith('http')) {
  import("@sentry/node").then((Sentry) => {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
    });
  }).catch((e) => {
    logger.warn("Failed to initialize Sentry on backend: " + String(e));
  });
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

  // Canonical Host Redirect Middleware (WEB-01)
  // Enforces canonical HTTPS host https://www.kkm-intl.org across all owned host variants
  // (e.g. kkm-intl.com, www.kkm-intl.com, apex kkm-intl.org, or unencrypted HTTP on production)
  app.use((req, res, next) => {
    const rawHost = (req.headers.host || "").toLowerCase();
    const host = rawHost.split(":")[0]; // strip port if present
    const forwardedProto = (req.headers["x-forwarded-proto"] || "").toString().toLowerCase();

    // Only redirect production domains (do not redirect localhost, 127.0.0.1, or cloud test containers)
    const isOwnedDomain = host === "kkm-intl.com" || host === "www.kkm-intl.com" || host === "kkm-intl.org" || host === "www.kkm-intl.org";
    const isCanonical = host === "www.kkm-intl.org" && forwardedProto !== "http";

    if (isOwnedDomain && !isCanonical) {
      const targetUrl = `https://www.kkm-intl.org${req.originalUrl || req.url || "/"}`;
      return res.redirect(301, targetUrl);
    }
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

  // Mount Official Corporate Backend Routes (JWT, Protected Route Middleware, Evidence Registry, Project Milestones)
  setupBackendRoutes(app);

  // API routes FIRST
  // Enterprise Portal - Real Backend Endpoints
  // In-Memory store for portal state with persistent corporate baseline
  const portalRequests = [
    {
      id: "REQ-2026-1042",
      type: "leave",
      title: "درخواست مرخصی استحقاقی سالانه - ۳ روز کاری",
      titleEn: "Annual Leave Request - 3 Days",
      requesterId: "kkm-user-005",
      requesterName: "Dr. Ali Rezaei",
      department: "Science & Sustainability",
      priority: "normal",
      status: "pending",
      details: "درخواست مرخصی استحقاقی جهت شرکت در همایش بین‌المللی انرژی و محیط‌زیست ژنو",
      startDate: "2026-10-05",
      endDate: "2026-10-08",
      approvals: [
        {
          step: 1,
          role: "مدیر واحد پایداری",
          approverName: "Dr. Reza Asakereh",
          status: "pending"
        }
      ],
      createdAt: "2026-09-22T08:30:00Z",
      updatedAt: "2026-09-22T08:30:00Z"
    },
    {
      id: "REQ-2026-1039",
      type: "procurement",
      title: "خرید تجهیزات سرور GPU کلاستر مدل NVIDIA H100",
      titleEn: "Procurement of NVIDIA H100 GPU Cluster Nodes",
      requesterId: "kkm-user-002",
      requesterName: "Dr. Reza Asakereh",
      department: "R&D & AI Systems",
      priority: "critical",
      status: "approved",
      amount: "45000 USD",
      details: "توسعه زیرساخت محاسباتی هوش مصنوعی لایه دوقلوی دیجیتال برای مدلسازی هیدرودینامیکی GMEL",
      approvals: [
        {
          step: 1,
          role: "مدیر ارشد فناوری",
          approverName: "Dr. Reza Asakereh",
          status: "approved",
          comments: "تایید فنی انجام شد. اولویت راهبردی گروه.",
          timestamp: "2026-09-21 10:14"
        },
        {
          step: 2,
          role: "مدیرعامل و هیئت مدیره",
          approverName: "Gino Ayyoubian",
          status: "approved",
          comments: "تخصیص بودجه از محل ذخیره استراتژیک R&D تصویب شد.",
          timestamp: "2026-09-21 14:30"
        }
      ],
      createdAt: "2026-09-21T09:00:00Z",
      updatedAt: "2026-09-21T14:30:00Z"
    },
    {
      id: "REQ-2026-1044",
      type: "technical_review",
      title: "ممیزی امنیتی کد قرارداد هوشمند بلاکچین صدور اعتبارات کربن",
      titleEn: "Security & Formal Verification of Carbon Credit Smart Contract",
      requesterId: "kkm-user-003",
      requesterName: "Dr. Kasra Jarrahian",
      department: "Energy Systems",
      priority: "urgent",
      status: "in_review",
      details: "بررسی رسمی آسیب‌پذیری‌های امنیتی اسمارت‌کانترکت‌های شبکه قبل از دیپلوی روی شبکه اصلی",
      approvals: [
        {
          step: 1,
          role: "ممیز ارشد نرم‌افزار و قرارداد هوشمند",
          approverName: "Eng. Farzad Kazemi",
          status: "pending"
        }
      ],
      createdAt: "2026-09-22T14:20:00Z",
      updatedAt: "2026-09-22T14:20:00Z"
    }
  ];

  const portalRecoveryTickets: Array<{
    ticketId: string;
    targetEmail: string;
    requesterNote?: string;
    status: string;
    createdAt: string;
  }> = [];

  // 1. Password Recovery Ticket Dispatch Endpoint (IT Security Desk)
  app.post("/api/portal/auth/recovery-request", (req, res) => {
    const { email, reason } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Corporate email is required." });
    }

    const ticketId = `IT-SEC-TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTicket = {
      ticketId,
      targetEmail: email.trim().toLowerCase(),
      requesterNote: reason || "کاربر درخواست بازنشانی رمز عبور سازمانی ثبت نموده است.",
      status: "dispatched_to_it_desk",
      createdAt: new Date().toISOString()
    };

    portalRecoveryTickets.push(newTicket);
    logger.info(`Password recovery ticket logged for ${email}: ${ticketId}`);

    return res.status(200).json({
      success: true,
      ticketId,
      itDeskEmail: "it-security@kkm-intl.org",
      message: "درخواست بازیابی رمز عبور به بخش امنیت و فناوری اطلاعات (IT Desk) ارسال شد.",
      timestamp: newTicket.createdAt
    });
  });

  // 2. Automation Cartable Endpoints
  app.get("/api/portal/cartable/requests", (req, res) => {
    return res.json({ requests: portalRequests });
  });

  app.post("/api/portal/cartable/requests", (req, res) => {
    const newReq = req.body;
    if (!newReq || !newReq.title) {
      return res.status(400).json({ error: "Invalid request payload." });
    }
    const requestId = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullRequest = {
      ...newReq,
      id: requestId,
      approvals: newReq.approvals || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: newReq.status || "pending"
    };
    portalRequests.unshift(fullRequest);
    return res.status(201).json({ success: true, request: fullRequest });
  });

  app.patch("/api/portal/cartable/requests/:id/status", (req, res) => {
    const { id } = req.params;
    const { status, comments, approverName, approverRole } = req.body;
    const reqItem = portalRequests.find((r) => r.id === id);
    if (!reqItem) {
      return res.status(404).json({ error: "Request not found." });
    }
    reqItem.status = status;
    reqItem.updatedAt = new Date().toISOString();
    if (comments || approverName) {
      reqItem.approvals.push({
        step: reqItem.approvals.length + 1,
        role: approverRole || "مقام تاییدکننده",
        approverName: approverName || "System Approver",
        status: status === "approved" ? "approved" : "rejected",
        comments: comments || "",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 16)
      });
    }
    return res.json({ success: true, request: reqItem });
  });

  // 3. AI Analysis endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({ text: "Innovation distinguishes between a leader and a follower. Our legacy is built on the foundation of pioneering solutions for tomorrow's challenges." });
      }

      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });
        res.json({ text: response?.text || "Analysis completed." });
      } catch (err: any) {
        // Silently fallback on any Gemini API error to prevent noisy warnings
        res.json({ text: "Strategic foresight and sustainable engineering form the cornerstone of our global operations." });
      }
    } catch (error: any) {
      res.json({ text: "Strategic foresight and sustainable engineering form the cornerstone of our global operations." });
    }
  });

  // Vite middleware for development, static serve for production
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
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
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
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
    try {
      const Sentry = await import("@sentry/node");
      Sentry.setupExpressErrorHandler(app);
    } catch (e) {
      // ignore
    }
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    logger.info(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("FATAL: Error starting server:", err);
  process.exit(1);
});
