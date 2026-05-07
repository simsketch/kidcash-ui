'use client';

import { useState } from 'react';

export function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="relative rounded-card overflow-hidden glass"
      style={{
        backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
        borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 text-[10px] uppercase tracking-widest font-mono"
        style={{
          color: 'var(--theme-text-muted, #94a3b8)',
          borderBottom: '1px solid var(--theme-card-border, rgba(255,255,255,0.08))',
        }}
      >
        <span>{language}</span>
        <button
          type="button"
          onClick={onCopy}
          className="px-2 py-0.5 rounded-pill transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))]"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre
        className="p-4 text-sm overflow-x-auto leading-relaxed"
        style={{
          color: 'var(--theme-text-primary, #fafafa)',
          fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
