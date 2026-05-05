'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export interface FloatingCoinsProps {
  count?: number;
  emoji?: string;
  duration?: [number, number];
  className?: string;
}

export function FloatingCoins({
  count = 8,
  emoji = '🪙',
  duration = [10, 20],
  className,
}: FloatingCoinsProps) {
  const cappedCount = Math.min(Math.max(0, count), 50);
  const [minDur, maxDur] = duration;

  const coins = useMemo(
    () =>
      Array.from({ length: cappedCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        dur: minDur + Math.random() * (maxDur - minDur),
      })),
    [cappedCount, minDur, maxDur],
  );

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden ${className ?? ''}`}>
      {coins.map((c) => (
        <motion.span
          key={c.id}
          className="absolute text-2xl"
          style={{ left: `${c.left}%`, top: '-10%' }}
          animate={{ y: ['0%', '110vh'], rotate: [0, 360] }}
          transition={{
            duration: c.dur,
            delay: c.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          aria-hidden
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}
