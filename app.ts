import express from 'express';
import fs from 'fs';
import path from 'path';
import compression from 'compression';
import morgan from 'morgan';
import { GoogleGenAI } from '@google/genai';
import logger from './logger.ts';
import { createInMemoryRateLimit } from './backend/rateLimit.ts';
import { setupBackendRoutes } from './backend/server.ts';

let sentryInitialized = false;

function collectDistFiles(rootDir: string, currentDir = ''): string[] {
  const absoluteDir = path.join(rootDir, currentDir);
  const entries = fs.readdirSync(absoluteDir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryRelativePath = path.posix.join(currentDir.replace(/\\/g, '/'), entry.name);
    if (entry.isDirectory()) {
      files.push(...collectDistFiles(rootDir, entryRelativePath));
    } else if (entry.isFile()) {
      files.push(`/${entryRelativePath}`);
    }
  }

  return files;
}

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
  const staticAssetLimiter = createInMemoryRateLimit({
    windowMs: 60_000,
    maxRequests: 1200,
    message: 'Too many static asset requests. Please slow down and try again shortly.',
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
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader(
      'Content-Security-Policy-Report-Only',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; frame-ancestors 'self';"
    );
    next();
  });

  // Scoped CORS for API routes (TKT-051)
  const allowedOrigins = [
    'https://www.kkm-intl.org',
    'https://kkm-intl.org',
    'https://www.kkm-intl.com',
    'https://kkm-intl.com',
  ];

  app.use('/api', (req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin.endsWith('.run.app');

      if (isAllowed) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      }
    }

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // Single 308 apex -> www permanent redirect (TKT-004)
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
      return res.redirect(308, targetUrl);
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

  // Unhandled API routes return structured JSON 404 (TKT-003, TKT-010)
  app.use('/api', (_req, res) => {
    res.status(404).json({
      ok: false,
      error: 'API endpoint not found',
      documentation: '/api/docs/openapi.json',
      timestamp: new Date().toISOString(),
    });
  });

  if (includeFrontend) {
    // Prevent missing script/asset requests from returning HTML index fallback (which causes MIME type errors)
    app.use((req, res, next) => {
      const ext = path.extname(req.path).toLowerCase();
      if (['.js', '.mjs', '.ts', '.tsx', '.css', '.map', '.json', '.wasm'].includes(ext)) {
        res.setHeader('X-Content-Type-Options', 'nosniff');
      }
      next();
    });

    if (process.env.NODE_ENV !== 'production') {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true, hmr: false },
        appType: 'custom',
      });

      app.use(vite.middlewares);

      // In development mode, intercept missing asset/module requests before HTML index fallback
      app.use((req, res, next) => {
        const ext = path.extname(req.path).toLowerCase();
        const isAsset =
          ['.js', '.mjs', '.ts', '.tsx', '.jsx', '.css', '.map', '.json', '.wasm', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.woff', '.woff2'].includes(ext) ||
          req.path.startsWith('/assets/') ||
          req.path.startsWith('/node_modules/') ||
          req.path.startsWith('/@');

        if (isAsset) {
          return res.status(404).type('text/plain').send('Asset not found');
        }
        next();
      });

      // Serve index.html with Vite transformation for all client-side page navigation routes
      app.get('*all', pageRequestLimiter, async (req, res, next) => {
        try {
          const url = req.originalUrl || req.url;
          const template = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf-8');
          const html = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      const compressibleAssetRegex = /\.(?:css|js|mjs|json|svg|xml|txt|html)$/i;
      const distFiles = new Set(collectDistFiles(distPath));

      app.use(staticAssetLimiter, (req, res, next) => {
        if (!['GET', 'HEAD'].includes(req.method)) return next();
        if (!compressibleAssetRegex.test(req.path)) return next();

        let decodedPath: string;
        try {
          decodedPath = decodeURIComponent(req.path);
        } catch {
          return res.sendStatus(400);
        }
        const normalizedPath = path.posix.normalize(decodedPath);
        if (normalizedPath.includes('\0') || normalizedPath.startsWith('..')) return next();

        const brotliPath = `${normalizedPath}.br`;
        const gzipPath = `${normalizedPath}.gz`;
        const availableEncodings = [
          ...(distFiles.has(brotliPath) ? ['br'] : []),
          ...(distFiles.has(gzipPath) ? ['gzip'] : []),
        ];
        const acceptedEncoding = availableEncodings.length
          ? req.acceptsEncodings(...availableEncodings)
          : false;
        const selectedEncoding = Array.isArray(acceptedEncoding) ? acceptedEncoding[0] : acceptedEncoding;
        const shouldUseBrotli = selectedEncoding === 'br';
        const shouldUseGzip = selectedEncoding === 'gzip';

        if (!shouldUseBrotli && !shouldUseGzip) return next();

        const [pathname, query = ''] = req.url.split('?');
        req.url = shouldUseBrotli
          ? `${brotliPath}${query ? `?${query}` : ''}`
          : `${gzipPath}${query ? `?${query}` : ''}`;

        res.setHeader('Vary', 'Accept-Encoding');
        res.setHeader('Content-Encoding', shouldUseBrotli ? 'br' : 'gzip');
        res.type(path.extname(normalizedPath));
        next();
      });

      app.use(
        express.static(distPath, {
          setHeaders: (res, filePath) => {
            const normalizedFilePath = filePath.replace(/\.(br|gz)$/i, '');

            if (normalizedFilePath.endsWith('.html')) {
              res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
            } else if (normalizedFilePath.match(/\.(js|mjs|css|webp|avif|png|jpg|svg|woff2)$/)) {
              res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            }
          },
        })
      );

      // In production mode, intercept missing asset/module requests before HTML index fallback
      app.use((req, res, next) => {
        const ext = path.extname(req.path).toLowerCase();
        const isAsset =
          ['.js', '.mjs', '.ts', '.tsx', '.jsx', '.css', '.map', '.json', '.wasm', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.woff', '.woff2'].includes(ext) ||
          req.path.startsWith('/assets/') ||
          req.path.startsWith('/node_modules/') ||
          req.path.startsWith('/@');

        if (isAsset) {
          return res.status(404).type('text/plain').send('Asset not found');
        }
        next();
      });

      app.get('*all', pageRequestLimiter, (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  // Global Structured Error Handler (TKT-012)
  app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error('Unhandled Server Error: ' + String(err?.message || err), { stack: err?.stack });
    if (req.path.startsWith('/api/')) {
      return res.status(500).json({
        ok: false,
        error: 'Internal Server Error',
        message:
          process.env.NODE_ENV === 'production'
            ? 'An unexpected system error occurred.'
            : String(err?.message || err),
        timestamp: new Date().toISOString(),
      });
    }

    const ext = path.extname(req.path).toLowerCase();
    const isAsset =
      ['.js', '.mjs', '.ts', '.tsx', '.jsx', '.css', '.map', '.json', '.wasm', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.avif', '.woff', '.woff2'].includes(ext) ||
      req.path.startsWith('/assets/') ||
      req.path.startsWith('/node_modules/') ||
      req.path.startsWith('/@');

    if (isAsset) {
      return res.status(500).type('text/plain').send(`Error loading asset: ${err?.message || 'Server Error'}`);
    }

    return res
      .status(500)
      .send(
        '<!DOCTYPE html><html><head><title>500 Internal Error</title></head><body style="font-family:sans-serif;padding:40px;text-align:center;"><h1>500 — System Error</h1><p>Our engineering team has been alerted.</p><a href="/">Return to Homepage</a></body></html>'
      );
  });

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
