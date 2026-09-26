import type { IncomingMessage, ServerResponse } from 'http';
import { createApp } from '../app.ts';

let appPromise: ReturnType<typeof createApp> | null = null;

async function getApp() {
  if (!appPromise) {
    appPromise = createApp({ includeFrontend: false });
  }

  return appPromise;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const app = await getApp();
  return app(req as any, res as any);
}
