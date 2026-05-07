'use client';

import Link from 'next/link';
import { ThemeProvider, ThemeSelector, GradientText } from '@kidcash/ui';
import '@kidcash/ui/preset.css';
import { Sidebar } from './Sidebar';

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="aurora">
      <div className="min-h-screen flex flex-col">
        <header
          className="sticky top-0 z-30 backdrop-blur-md"
          style={{
            borderBottom: '1px solid var(--theme-card-border, rgba(255,255,255,0.08))',
            backgroundColor: 'color-mix(in srgb, var(--theme-card-bg, rgba(255,255,255,0.05)) 80%, transparent)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <GradientText as="span" variant="aurora" className="text-xl font-bold tracking-tight">
                @kidcash/ui
              </GradientText>
              <span
                className="text-xs font-mono"
                style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
              >
                v0.1.x
              </span>
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <a
                href="https://www.npmjs.com/package/@kidcash/ui"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-button transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))]"
                style={{ color: 'var(--theme-text-secondary, #cbd5e1)' }}
              >
                npm
              </a>
              <a
                href="https://github.com/simsketch/kidcash-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-button transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))]"
                style={{ color: 'var(--theme-text-secondary, #cbd5e1)' }}
              >
                GitHub
              </a>
              <a
                href="https://www.kidcashapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-button transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))]"
                style={{ color: 'var(--theme-text-secondary, #cbd5e1)' }}
              >
                KidCash app →
              </a>
            </nav>
          </div>
        </header>

        <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 grid grid-cols-12 gap-10">
          <aside className="hidden lg:block col-span-3">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 space-y-6">
              <Sidebar />
              <div className="pt-4 space-y-3">
                <ThemeSelector
                  title="Theme"
                  description="Click any tile — your choice persists."
                />
              </div>
            </div>
          </aside>
          <main className="col-span-12 lg:col-span-9 min-w-0">{children}</main>
        </div>

        <footer
          className="mt-16 px-6 py-12 text-sm"
          style={{
            borderTop: '1px solid var(--theme-card-border, rgba(255,255,255,0.08))',
            color: 'var(--theme-text-muted, #94a3b8)',
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p>
              Made with 💜 by the team at{' '}
              <a
                href="https://www.kidcashapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
                style={{ color: 'var(--theme-text-secondary, #cbd5e1)' }}
              >
                KidCash
              </a>{' '}
              — the family allowance app.
            </p>
            <p>MIT licensed (code) · Mascot © KidCash</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
