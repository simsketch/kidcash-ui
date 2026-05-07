import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['**/*.test.tsx', '**/*.test.ts', 'dist'],
    },
  },
  resolve: {
    alias: {
      // In the test environment, replace framer-motion with a lightweight stub
      // so AnimatePresence doesn't hold exited elements in the DOM. Resolved
      // from this config's own directory so it works on any machine (Mac dev
      // and Linux CI both).
      'framer-motion': path.resolve(__dirname, 'src/test/framer-motion-mock.tsx'),
    },
  },
});
