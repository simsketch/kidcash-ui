'use client';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export type ConfettiIntensity = 'subtle' | 'normal' | 'wild';

export interface ConfettiProps {
  /**
   * Set to `true` to fire a burst. The component fires every time `trigger`
   * transitions from falsy → truthy, AND every time `intensity` (or any other
   * config prop) changes while `trigger` stays truthy. To re-fire the same
   * config repeatedly, toggle `trigger` off → on, or remount with a new `key`.
   */
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
  '#ef4444', // red
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
 * `Confetti` — fires a canvas-confetti burst whenever `trigger` is truthy and
 * the effect inputs change. Renders no DOM. Respects prefers-reduced-motion.
 */
export function Confetti({
  trigger,
  colors = DEFAULT_COLORS,
  duration = 3000,
  intensity = 'normal',
  onComplete,
}: ConfettiProps) {
  // Stable refs for callbacks and palette so re-renders don't accidentally
  // re-fire a burst when only the parent re-rendered with a fresh array.
  const onCompleteRef = useRef(onComplete);
  const colorsRef = useRef(colors);
  const durationRef = useRef(duration);

  useEffect(() => {
    onCompleteRef.current = onComplete;
    colorsRef.current = colors;
    durationRef.current = duration;
  }, [onComplete, colors, duration]);

  useEffect(() => {
    if (!trigger) return undefined;

    if (!prefersReducedMotion()) {
      const { particleCount, spread } = INTENSITY_MAP[intensity];
      confetti({
        particleCount,
        spread,
        origin: { y: 0.6 },
        colors: colorsRef.current,
        ticks: 200,
        startVelocity: intensity === 'wild' ? 55 : 45,
        scalar: intensity === 'wild' ? 1.2 : 1,
      });
    }

    const t = setTimeout(() => onCompleteRef.current?.(), durationRef.current);
    return () => clearTimeout(t);
  }, [trigger, intensity]);

  return null;
}
