import { fileURLToPath, URL } from 'node:url';

import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';

const sourceDirectory = fileURLToPath(new URL('../src/', import.meta.url));

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
  plugins: [
    {
      name: 'transform-linked-legacy-jsx',
      enforce: 'pre',
      transform(code, id) {
        if (id.startsWith(sourceDirectory) && id.endsWith('.js')) {
          return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'transform' });
        }
      },
    },
    react({ jsxRuntime: 'classic' }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
