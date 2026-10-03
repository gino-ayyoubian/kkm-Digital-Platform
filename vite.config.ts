import path from 'path';
import { brotliCompressSync, constants as zlibConstants, gzipSync } from 'node:zlib';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const createCompressedAssetsPlugin = (): Plugin => ({
  name: 'generate-compressed-assets',
  apply: 'build',
  enforce: 'post',
  generateBundle(_, bundle) {
    const compressibleAssetRegex = /\.(?:css|js|mjs|json|svg|xml|txt|html)$/i;
    for (const [fileName, output] of Object.entries(bundle as Record<string, any>)) {
      if (fileName.endsWith('.br') || fileName.endsWith('.gz') || !compressibleAssetRegex.test(fileName)) {
        continue;
      }

      const sourceBuffer =
        output.type === 'asset'
          ? Buffer.from(typeof output.source === 'string' ? output.source : output.source ?? '')
          : Buffer.from(output.code ?? '');

      if (sourceBuffer.length < 256) {
        continue;
      }

      this.emitFile({
        type: 'asset',
        fileName: `${fileName}.gz`,
        source: gzipSync(sourceBuffer, { level: 9 }),
      });

      this.emitFile({
        type: 'asset',
        fileName: `${fileName}.br`,
        source: brotliCompressSync(sourceBuffer, {
          params: {
            [zlibConstants.BROTLI_PARAM_QUALITY]: 11,
          },
        }),
      });
    }
  }
});

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
        createCompressedAssetsPlugin(),
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
