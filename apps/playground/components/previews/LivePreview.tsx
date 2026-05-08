'use client';

import { ToastProvider } from '@kidcash/ui';
import { previews } from './registry';

/**
 * Live preview surface for the per-component docs pages.
 *
 * Wraps each preview in a ToastProvider (cheap; lets the toast preview
 * fire without ceremony, no-op for everything else) and a uniform
 * "preview frame" so the experience is consistent across all 27
 * components. The DocsShell already provides a ThemeProvider above us.
 */
export function LivePreview({ slug }: { slug: string }) {
  const Preview = previews[slug];
  if (!Preview) {
    return null;
  }
  return (
    <div
      className="relative rounded-card p-6 md:p-8 glass overflow-hidden"
      style={{
        backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
        borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
        minHeight: '12rem',
      }}
    >
      <ToastProvider>
        <Preview />
      </ToastProvider>
    </div>
  );
}
