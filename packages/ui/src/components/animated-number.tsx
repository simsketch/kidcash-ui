'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface AnimatedNumberProps {
  value: number;
  /** Tween duration in ms. Set to 0 for an instant snap. */
  duration?: number;
  /** Custom value formatter (e.g. currency). Receives the rounded display value. */
  format?: (n: number) => string;
  className?: string;
  /** Wrap each value change in a tiny spring scale-up bump. */
  springScale?: boolean;
}

const defaultFormat = (n: number) => n.toLocaleString();

export function AnimatedNumber({
  value,
  duration = 1200,
  format = defaultFormat,
  className,
  springScale = true,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;
    if (duration === 0) {
      setDisplay(to);
      fromRef.current = to;
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo — premium-feeling deceleration curve
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(from + (to - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  // Round to 2 decimals so currency formatters get clean inputs.
  const formatted = format(Math.round(display * 100) / 100);

  return (
    <motion.span
      key={value}
      className={`tabular-nums ${className ?? ''}`}
      initial={springScale ? { scale: 0.95 } : undefined}
      animate={springScale ? { scale: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {formatted}
    </motion.span>
  );
}
