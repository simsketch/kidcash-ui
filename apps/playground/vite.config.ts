import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uiRoot = path.resolve(__dirname, '../../packages/ui');

// Alias @kidcash/ui to its TypeScript source in dev so HMR picks up edits
// to packages/ui/src/** without needing a tsup rebuild between every change.
// Subpath imports (preset.css, mascot.png) keep their published mappings.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: /^@kidcash\/ui\/preset\.css$/, replacement: path.join(uiRoot, 'src/styles/preset.css') },
      { find: /^@kidcash\/ui\/mascot\.png$/, replacement: path.join(uiRoot, 'public/mascot-astronaut.png') },
      { find: /^@kidcash\/ui$/, replacement: path.join(uiRoot, 'src/index.ts') },
    ],
  },
  server: { port: 5173, open: true },
});
