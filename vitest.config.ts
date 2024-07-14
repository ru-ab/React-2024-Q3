import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

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
});
