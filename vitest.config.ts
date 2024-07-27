import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'src/tests/vitest-setup.ts',
    coverage: {
      include: ['src'],
      exclude: ['src/tests', '**/index.ts', '**/main.tsx'],
      enabled: true,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
