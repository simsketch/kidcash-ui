import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COMPONENTS, getComponent } from '@/lib/components-meta';
import { DocsShell } from '@/components/docs/DocsShell';
import { CodeBlock } from '@/components/docs/CodeBlock';

const SITE_URL = 'https://kit.kidcashapp.com';

export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComponent(slug);
  if (!comp) return { title: 'Component not found' };
  const url = `${SITE_URL}/components/${comp.slug}`;
  return {
    title: comp.title,
    description: comp.description,
    alternates: { canonical: url },
    openGraph: {
      title: comp.title,
      description: comp.description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: comp.title,
      description: comp.description,
    },
  };
}

function MarkdownIntro({ md }: { md: string }) {
  // Tiny inline markdown rendering — bold + paragraph splits. Keeping it
  // dependency-free; if the kit's docs ever need lists/code-spans we'll bring
  // in a real renderer.
  const paragraphs = md.split(/\n\n+/);
  return (
    <div className="space-y-4 text-base leading-relaxed">
      {paragraphs.map((p, i) => {
        const html = p
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded text-sm font-mono" style="background-color:var(--theme-card-bg,rgba(255,255,255,0.07));color:var(--theme-text-primary)">$1</code>');
        return (
          <p
            key={i}
            style={{ color: 'var(--theme-text-secondary, #cbd5e1)' }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </div>
  );
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comp = getComponent(slug);
  if (!comp) notFound();

  const idx = COMPONENTS.findIndex((c) => c.slug === comp.slug);
  const prev = idx > 0 ? COMPONENTS[idx - 1] : null;
  const next = idx < COMPONENTS.length - 1 ? COMPONENTS[idx + 1] : null;

  return (
    <DocsShell>
      <article className="max-w-3xl">
        <p
          className="text-xs uppercase tracking-widest font-mono mb-3"
          style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
        >
          {comp.category}
        </p>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
          style={{ color: 'var(--theme-text-primary, #fafafa)' }}
        >
          {comp.name}
        </h1>
        <p
          className="text-lg mb-8"
          style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
        >
          {comp.description}
        </p>

        <MarkdownIntro md={comp.intro} />

        <div className="mt-10">
          <h2
            className="text-sm uppercase tracking-widest font-mono mb-3"
            style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
          >
            Example
          </h2>
          <CodeBlock code={comp.example} />
        </div>

        <div className="mt-10 flex flex-col gap-3 text-sm">
          <div
            className="rounded-card p-4 glass space-y-2"
            style={{
              backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
              borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
            }}
          >
            <p
              className="text-xs uppercase tracking-widest font-mono"
              style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
            >
              Try it live
            </p>
            <p style={{ color: 'var(--theme-text-secondary, #cbd5e1)' }}>
              <Link href="/" className="underline-offset-2 hover:underline" style={{ color: 'var(--theme-accent-primary)' }}>
                ← Back to the playground
              </Link>{' '}
              to see <strong>{comp.name}</strong> rendered with every variant. Or{' '}
              <a
                href="https://www.npmjs.com/package/@kidcash/ui"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
                style={{ color: 'var(--theme-accent-primary)' }}
              >
                install <code className="font-mono">@kidcash/ui</code>
              </a>{' '}
              and copy the example above into your own app.
            </p>
          </div>
        </div>

        <div
          className="mt-12 pt-6 grid grid-cols-2 gap-4 text-sm"
          style={{
            borderTop: '1px solid var(--theme-card-border, rgba(255,255,255,0.08))',
          }}
        >
          {prev ? (
            <Link
              href={`/components/${prev.slug}`}
              className="block rounded-card p-4 glass transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))]"
              style={{
                backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
                borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
              }}
            >
              <p
                className="text-[10px] uppercase tracking-widest font-mono mb-1"
                style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
              >
                ← Previous
              </p>
              <p style={{ color: 'var(--theme-text-primary)' }}>{prev.name}</p>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/components/${next.slug}`}
              className="block rounded-card p-4 glass text-right transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))]"
              style={{
                backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
                borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
              }}
            >
              <p
                className="text-[10px] uppercase tracking-widest font-mono mb-1"
                style={{ color: 'var(--theme-text-muted, #94a3b8)' }}
              >
                Next →
              </p>
              <p style={{ color: 'var(--theme-text-primary)' }}>{next.name}</p>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </article>
    </DocsShell>
  );
}
