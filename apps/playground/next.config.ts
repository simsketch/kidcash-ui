import type { NextConfig } from 'next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uiSrc = path.resolve(__dirname, '../../packages/ui/src/index.ts');
const uiPresetCss = path.resolve(
  __dirname,
  '../../packages/ui/src/styles/preset.css',
);
const uiMascot = path.resolve(
  __dirname,
  '../../packages/ui/public/mascot-astronaut.png',
);

const nextConfig: NextConfig = {
  // Source-aliases the workspace UI package so HMR picks up edits to
  // packages/ui/src/** without requiring a tsup rebuild between every change.
  // Subpath imports keep the published mappings.
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@kidcash/ui$': uiSrc,
      '@kidcash/ui/preset.css': uiPresetCss,
      '@kidcash/ui/mascot.png': uiMascot,
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      '@kidcash/ui': uiSrc,
      '@kidcash/ui/preset.css': uiPresetCss,
      '@kidcash/ui/mascot.png': uiMascot,
    },
  },
  // The kit pulls in framer-motion through the workspace symlink — Next can
  // skip the per-route bundle for it and tree-shake.
  transpilePackages: ['@kidcash/ui'],
  // Hosted under https://kit.kidcashapp.com.
  poweredByHeader: false,
};

export default nextConfig;
