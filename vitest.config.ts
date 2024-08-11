import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/vitest-setup.ts',
    coverage: {
      include: ['app'],
      exclude: ['app/entry.server.tsx', '**/index.ts', '**/main.tsx'],
      enabled: true,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app'),
    },
  },
});
