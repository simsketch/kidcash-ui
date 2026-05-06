'use client';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export type ConfettiIntensity = 'subtle' | 'normal' | 'wild';

export interface ConfettiProps {
  /** Flips false → true to fire a single burst. */
  trigger: boolean;
  /** Particle palette. */
  colors?: string[];
  /** Auto-resolves `onComplete` after this many ms. */
  duration?: number;
  /** Particle volume + spread preset. */
  intensity?: ConfettiIntensity;
  onComplete?: () => void;
}

const DEFAULT_COLORS = [
  '#8b5cf6', // primary purple
  '#ec4899', // hot pink
  '#06b6d4', // cyan
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red (new)
];

const INTENSITY_MAP: Record<ConfettiIntensity, { particleCount: number; spread: number }> = {
  subtle: { particleCount: 40, spread: 50 },
  normal: { particleCount: 100, spread: 70 },
  wild: { particleCount: 200, spread: 100 },
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * `Confetti` — fires a single canvas-confetti burst when `trigger` flips
 * from false → true. Renders no DOM. Respects prefers-reduced-motion.
 */
export function Confetti({
  trigger,
  colors = DEFAULT_COLORS,
  duration = 3000,
  intensity = 'normal',
  onComplete,
}: ConfettiProps) {
  const prevTrigger = useRef(false);

  useEffect(() => {
    if (trigger && !prevTrigger.current) {
      if (!prefersReducedMotion()) {
        const { particleCount, spread } = INTENSITY_MAP[intensity];
        confetti({
          particleCount,
          spread,
          origin: { y: 0.6 },
          colors,
          ticks: 200,
          startVelocity: intensity === 'wild' ? 55 : 45,
          scalar: intensity === 'wild' ? 1.2 : 1,
        });
      }
      const t = setTimeout(() => onComplete?.(), duration);
      prevTrigger.current = trigger;
      return () => clearTimeout(t);
    }
    prevTrigger.current = trigger;
  }, [trigger, colors, duration, intensity, onComplete]);

  return null;
}
