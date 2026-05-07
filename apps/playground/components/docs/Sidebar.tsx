'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPONENT_CATEGORIES, componentsByCategory } from '@/lib/components-meta';

export function Sidebar() {
  const pathname = usePathname();
  const grouped = componentsByCategory();

  return (
    <nav
      aria-label="Components"
      className="text-sm space-y-6"
      style={{ color: 'var(--theme-text-secondary, #cbd5e1)' }}
    >
      <div>
        <Link
          href="/"
          className={`block px-3 py-2 rounded-button transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))] ${
            pathname === '/' ? 'font-semibold' : ''
          }`}
          style={{ color: 'var(--theme-text-primary, #fafafa)' }}
        >
          Playground
        </Link>
        <Link
          href="/components"
          className={`block px-3 py-2 rounded-button transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))] ${
            pathname === '/components' ? 'font-semibold' : ''
          }`}
          style={{ color: 'var(--theme-text-primary, #fafafa)' }}
        >
          Component index
        </Link>
      </div>

      {COMPONENT_CATEGORIES.map((category) => (
        <div key={category}>
          <p
            className="px-3 mb-2 text-[10px] uppercase tracking-widest font-mono"
            style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
          >
            {category}
          </p>
          <ul className="space-y-0.5">
            {grouped[category].map((comp) => {
              const href = `/components/${comp.slug}`;
              const active = pathname === href;
              return (
                <li key={comp.slug}>
                  <Link
                    href={href}
                    className={`block px-3 py-1.5 rounded-button transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))] ${
                      active ? 'font-semibold' : ''
                    }`}
                    style={{
                      color: active
                        ? 'var(--theme-accent-primary, #a78bfa)'
                        : 'var(--theme-text-secondary, #cbd5e1)',
                      backgroundColor: active
                        ? 'var(--theme-card-bg, rgba(255,255,255,0.05))'
                        : 'transparent',
                    }}
                  >
                    {comp.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
