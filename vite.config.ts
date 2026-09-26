import path from 'path';
import { mkdirSync, writeFileSync } from 'fs';
import { defineConfig } from 'vite';
import { brotliCompressSync, constants, gzipSync } from 'zlib';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

function generateCompressedAssets() {
  return {
    name: 'generate-compressed-assets',
    apply: 'build' as const,
    writeBundle(options: { dir?: string }, bundle: Record<string, { type: 'asset' | 'chunk'; fileName: string; source?: string | Uint8Array; code?: string }>) {
      const outDir = options.dir;
      if (!outDir) return;

      mkdirSync(outDir, { recursive: true });

      for (const output of Object.values(bundle)) {
        const shouldCompress = /\.(css|html|js|json|svg|xml)$/i.test(output.fileName);
        if (!shouldCompress) continue;

        const raw =
          output.type === 'asset'
            ? typeof output.source === 'string'
              ? Buffer.from(output.source)
              : Buffer.from(output.source ?? '')
            : Buffer.from(output.code ?? '');

        if (raw.length === 0) continue;

        writeFileSync(path.join(outDir, `${output.fileName}.gz`), gzipSync(raw, { level: 9 }));
        writeFileSync(
          path.join(outDir, `${output.fileName}.br`),
          brotliCompressSync(raw, {
            params: {
              [constants.BROTLI_PARAM_QUALITY]: 11,
            },
          })
        );
      }
    },
  };
}

export default defineConfig(() => {
    return {
      build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
          output: {
            manualChunks(id: string) {
              if (id.includes('node_modules/recharts')) return 'recharts';
              if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/motion/') || id.includes('node_modules/framer-motion/')) return 'vendor';
            }
          }
        }
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        generateCompressedAssets(),
        VitePWA({
          registerType: 'autoUpdate',
          injectRegister: false,
          includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg'],
          manifest: {
            id: '/',
            name: 'KKM International Group',
            short_name: 'KKM Intl',
            description: 'Technology. Engineering. Infrastructure. Innovation.',
            theme_color: '#ffffff',
            background_color: '#ffffff',
            display: 'standalone',
            start_url: '/',
            scope: '/',
            icons: [
              {
                src: '/pwa-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
              },
              {
                src: '/pwa-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
              }
            ],
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          },
          devOptions: {
            enabled: false,
          },
        })
      ],
      resolve: {
        alias: {
          '@': path.resolve(import.meta.dirname, '.'),
        }
      }
    };
});
