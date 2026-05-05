import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

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
      // so AnimatePresence doesn't hold exited elements in the DOM.
      'framer-motion': '/Users/simsketch/repos/kidcash-ui/packages/ui/src/test/framer-motion-mock.tsx',
    },
  },
});
