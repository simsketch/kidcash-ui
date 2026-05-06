'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../tokens/motion';

export interface BackToTopProps {
  /** Pixels of vertical scroll before the button appears. */
  showAfter?: number;
  className?: string;
  /** Aria-label / tooltip text. */
  label?: string;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Up-arrow SVG icon — keeps stroke-width consistent across button sizes.
 */
function UpArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

/**
 * `BackToTop` — fixed-position primary button that appears once the user
 * has scrolled past `showAfter`. Uses spring entrance + smooth scroll.
 */
export function BackToTop({ showAfter = 400, className, label = 'Back to top' }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          aria-label={label}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
          }
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          transition={spring.bounce}
          className={`fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-pill h-12 w-12 bg-gradient-aurora text-white shadow-glow-primary cursor-pointer ${
            className ?? ''
          }`}
        >
          <UpArrowIcon />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
