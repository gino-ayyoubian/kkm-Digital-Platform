import express from 'express';
import path from 'path';
import compression from 'compression';
import morgan from 'morgan';
import { GoogleGenAI } from '@google/genai';
import logger from './logger';
import { createInMemoryRateLimit } from './backend/rateLimit';
import { setupBackendRoutes } from './backend/server';

let sentryInitialized = false;

async function ensureSentry() {
  if (sentryInitialized) return;
  const dsn = process.env.SENTRY_DSN;
  if (!dsn || !dsn.startsWith('http')) return;

  try {
    const Sentry = await import('@sentry/node');
    Sentry.init({
      dsn,
      tracesSampleRate: 1.0,
    });
    sentryInitialized = true;
  } catch (error) {
    logger.warn('Failed to initialize Sentry on backend: ' + String(error));
  }
}

export async function createApp(options?: { includeFrontend?: boolean }) {
  await ensureSentry();

  const includeFrontend = options?.includeFrontend ?? true;
  const app = express();
  const pageRequestLimiter = createInMemoryRateLimit({
    windowMs: 60_000,
    maxRequests: 240,
    message: 'Too many page requests. Please slow down and try again shortly.',
  });
  const aiRequestLimiter = createInMemoryRateLimit({
    windowMs: 60_000,
    maxRequests: 20,
    message: 'AI analysis request limit reached. Please wait a minute before retrying.',
  });

  app.use(compression());
  app.use(express.json({ limit: '32kb' }));
  app.use(express.urlencoded({ extended: true, limit: '32kb' }));

  app.use(
    morgan('combined', {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );

  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

  app.use((req, res, next) => {
    const rawHost = (req.headers.host || '').toLowerCase();
    const host = rawHost.split(':')[0];
    const forwardedProto = (req.headers['x-forwarded-proto'] || '').toString().toLowerCase();

    const isOwnedDomain =
      host === 'kkm-intl.com' ||
      host === 'www.kkm-intl.com' ||
      host === 'kkm-intl.org' ||
      host === 'www.kkm-intl.org';
    const isCanonical = host === 'www.kkm-intl.org' && forwardedProto !== 'http';

    if (isOwnedDomain && !isCanonical) {
      const redirectPath = (req.originalUrl || req.url || '/').startsWith('/')
        ? (req.originalUrl || req.url || '/')
        : '/';
      const targetUrl = `https://www.kkm-intl.org${redirectPath}`;
      return res.redirect(301, targetUrl);
    }

    next();
  });

  app.get('/api/health', (_req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  setupBackendRoutes(app);

  app.post('/api/analyze', aiRequestLimiter, async (req, res) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'AI analysis service is not configured.',
      });
    }

    const { prompt } = req.body ?? {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return res.json({ text: response?.text || 'Analysis completed.' });
    } catch (error) {
      logger.warn('Gemini analysis failed', { error: String(error) });
      return res.status(502).json({
        error: 'AI analysis request failed.',
      });
    }
  });

  if (includeFrontend) {
    if (process.env.NODE_ENV !== 'production') {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), 'dist');

      app.use(
        express.static(distPath, {
          maxAge: '1y',
          setHeaders: (res, filePath) => {
            if (filePath.endsWith('.html')) {
              res.setHeader('Cache-Control', 'no-cache');
            }
          },
        })
      );

      app.get('*all', pageRequestLimiter, (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  if (process.env.SENTRY_DSN) {
    try {
      const Sentry = await import('@sentry/node');
      Sentry.setupExpressErrorHandler(app);
    } catch {
      // ignore
    }
  }

  return app;
}
