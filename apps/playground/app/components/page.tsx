import type { Metadata } from 'next';
import Link from 'next/link';
import {
  COMPONENT_CATEGORIES,
  componentsByCategory,
} from '@/lib/components-meta';
import { DocsShell } from '@/components/docs/DocsShell';

export const metadata: Metadata = {
  title: 'Components — every primitive in @kidcash/ui',
  description:
    '27 React components grouped by category — Foundations, Motion, Inputs & feedback, Overlays, Family-finance specials, and Theming.',
  alternates: { canonical: 'https://kit.kidcashapp.com/components' },
};

export default function ComponentsIndex() {
  const grouped = componentsByCategory();
  return (
    <DocsShell>
      <article className="max-w-4xl">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
          style={{ color: 'var(--theme-text-primary, #fafafa)' }}
        >
          Components
        </h1>
        <p
          className="text-lg mb-12"
          style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
        >
          Every primitive in <code className="font-mono">@kidcash/ui</code> grouped by category. Click any
          to see its API, an example, and where it sits in the kit's design language.
        </p>

        <div className="space-y-12">
          {COMPONENT_CATEGORIES.map((category) => (
            <section key={category}>
              <h2
                className="text-sm uppercase tracking-widest font-mono mb-4"
                style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
              >
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grouped[category].map((comp) => (
                  <Link
                    key={comp.slug}
                    href={`/components/${comp.slug}`}
                    className="block rounded-card p-5 glass transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))]"
                    style={{
                      backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
                      borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
                    }}
                  >
                    <p
                      className="text-base font-semibold mb-1"
                      style={{ color: 'var(--theme-text-primary)' }}
                    >
                      {comp.name}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--theme-text-secondary, #cbd5e1)' }}
                    >
                      {comp.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </DocsShell>
  );
}
