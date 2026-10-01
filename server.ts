import { createApp } from './app.ts';
import logger from './logger.ts';

async function startServer() {
  const app = await createApp({ includeFrontend: true });
  const port = Number(process.env.PORT || 3000);

  app.listen(port, '0.0.0.0', () => {
    logger.info(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((error) => {
  console.error('FATAL: Error starting server:', error);
  process.exit(1);
});
