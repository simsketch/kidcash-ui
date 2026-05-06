'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

export type FloatingCoinsVariant = 'rain' | 'float' | 'rise';

export interface FloatingCoinsProps {
  /** Number of coins to render (clamped 0–50). Defaults to 12. */
  count?: number;
  /** Glyph rendered for each coin. */
  emoji?: string;
  /** Animation duration range `[min, max]` in seconds. */
  duration?: [number, number];
  /** `'rain'` falls top→bottom, `'float'` drifts gently, `'rise'` floats bottom→top. */
  variant?: FloatingCoinsVariant;
  className?: string;
}

interface CoinSpec {
  id: number;
  left: number;
  delay: number;
  dur: number;
  scale: number;
  swayAmplitude: number;
  rotateZAmount: number;
  rotateYDirection: number;
  z: number; // 0 (far) → 1 (near)
}

/**
 * `FloatingCoins` — full-viewport overlay of softly-spinning coin glyphs.
 * Each coin gets independent 3D-ish flip (rotateY), in-plane sway (rotateZ + sin)
 * and depth-driven shadow scale. Pointer-events disabled.
 *
 * Three variants:
 *  - `rain` (default-ish): falls from above the viewport
 *  - `float`: bob in place around mid-screen
 *  - `rise`: rises from below the viewport
 */
export function FloatingCoins({
  count = 12,
  emoji = '🪙',
  duration = [10, 20],
  variant = 'rain',
  className,
}: FloatingCoinsProps) {
  const cappedCount = Math.min(Math.max(0, count), 50);
  const [minDur, maxDur] = duration;

  const coins = useMemo<CoinSpec[]>(
    () =>
      Array.from({ length: cappedCount }, (_, i) => {
        const z = Math.random();
        return {
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          dur: minDur + Math.random() * (maxDur - minDur),
          scale: 0.7 + Math.random() * 0.6, // 0.7x – 1.3x
          swayAmplitude: 10 + Math.random() * 30, // px
          rotateZAmount: 6 + Math.random() * 10, // deg
          rotateYDirection: Math.random() > 0.5 ? 1 : -1,
          z,
        };
      }),
    [cappedCount, minDur, maxDur],
  );

  return (
    <div
      data-variant={variant}
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className ?? ''}`}
    >
      {coins.map((c) => {
        // Animation paths per variant
        let yPath: string[];
        let initialTop: string;
        if (variant === 'rain') {
          yPath = ['0%', '110vh'];
          initialTop = '-10%';
        } else if (variant === 'rise') {
          yPath = ['0%', '-110vh'];
          initialTop = '110%';
        } else {
          // float — drifts up + down within viewport
          yPath = ['0%', '-30%', '0%'];
          initialTop = `${20 + c.z * 60}%`;
        }

        // Depth-driven shadow: nearer coins get a larger, softer shadow
        const shadowSize = 4 + c.z * 14;
        const shadowOpacity = 0.25 + c.z * 0.35;

        return (
          <motion.span
            key={c.id}
            className="absolute"
            style={{
              left: `${c.left}%`,
              top: initialTop,
              fontSize: `${1.5 * c.scale}rem`,
              filter: `drop-shadow(0 ${shadowSize}px ${shadowSize * 1.5}px rgba(0,0,0,${shadowOpacity}))`,
            }}
            animate={{
              y: yPath,
              x: [
                `-${c.swayAmplitude}px`,
                `${c.swayAmplitude}px`,
                `-${c.swayAmplitude}px`,
              ],
              rotateY: [0, c.rotateYDirection * 360, c.rotateYDirection * 720],
              rotateZ: [
                -c.rotateZAmount,
                c.rotateZAmount,
                -c.rotateZAmount,
              ],
            }}
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
        );
      })}
    </div>
  );
}
