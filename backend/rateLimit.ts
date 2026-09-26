import type { Request, Response, NextFunction } from 'express';

type RateLimitOptions = {
  windowMs: number;
  maxRequests: number;
  message?: string;
};

type Bucket = {
  count: number;
  resetAt: number;
};

export function createInMemoryRateLimit(options: RateLimitOptions) {
  const buckets = new Map<string, Bucket>();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = `${req.ip || 'unknown'}:${req.path}`;
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      buckets.set(key, {
        count: 1,
        resetAt: now + options.windowMs,
      });
      return next();
    }

    if (existing.count >= options.maxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
      res.setHeader('Retry-After', retryAfterSeconds.toString());
      return res.status(429).json({
        success: false,
        message: options.message || 'Too many requests. Please try again later.',
      });
    }

    existing.count += 1;
    buckets.set(key, existing);
    return next();
  };
}
