'use client';
import { useEffect, useRef, useState } from 'react';

export interface AnimatedNumberProps {
  value: number;
  /** Tween duration in ms. Set to 0 for an instant snap. */
  duration?: number;
  /** Custom value formatter (e.g. currency). Receives the rounded display value. */
  format?: (n: number) => string;
  className?: string;
}

const defaultFormat = (n: number) => n.toLocaleString();

/**
 * `AnimatedNumber` — tweens between numeric values on an easeOutExpo curve
 * driven by `requestAnimationFrame`. The visible animation comes entirely
 * from the running display value; we deliberately render a plain `<span>`
 * (no `motion.span`, no `key={value}`) to avoid remounting / scale-pulses
 * that flashed on every change.
 */
export function AnimatedNumber({
  value,
  duration = 1200,
  format = defaultFormat,
  className,
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

  return <span className={`tabular-nums ${className ?? ''}`}>{formatted}</span>;
}
