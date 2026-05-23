import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

const isCF = process.env.CLOUDFLARE === 'true';
const config = defineConfig({
  plugins: [
    ...(isCF ? [cloudflare({ viteEnvironment: { name: 'ssr' } })] : []),
    devtools(),
    nitro({
      preset: 'bun',
      routeRules: {
        '/assets/**': {
          headers: {
            'cache-control': 'public, max-age=31536000, immutable',
          },
        },
        '/**/*.webp': {
          headers: {
            'cache-control': 'public, max-age=604800',
          },
        },
        '/**/*.svg': {
          headers: {
            'cache-control': 'public, max-age=604800',
          },
        },
      },
      rollupConfig: { external: [/^@sentry\//] },
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
});

export default config;
