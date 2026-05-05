'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface AnimatedBalanceProps {
  from: number;
  to: number;
  duration?: number;
  formatValue?: (n: number) => string;
  className?: string;
}

const defaultFormat = (n: number) => n.toLocaleString();

export function AnimatedBalance({
  from,
  to,
  duration = 1500,
  formatValue = defaultFormat,
  className,
}: AnimatedBalanceProps) {
  const [value, setValue] = useState(from);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (duration === 0) {
      setValue(to);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [from, to, duration]);

  return (
    <motion.span
      className={className}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {formatValue(Math.round(value))}
    </motion.span>
  );
}
