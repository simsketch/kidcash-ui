'use client';
import { useEffect, useState } from 'react';

export interface BackToTopProps {
  showAfter?: number;
  className?: string;
  label?: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function BackToTop({ showAfter = 400, className, label = 'Back to top' }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  if (!visible) return null;

  return (
    <button
      aria-label={label}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      }
      className={`fixed bottom-6 right-6 z-40 rounded-pill p-3 bg-primary text-white shadow-glow-primary ${className ?? ''}`}
    >
      ↑
    </button>
  );
}
