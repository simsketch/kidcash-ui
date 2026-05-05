'use client';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export interface ConfettiProps {
  trigger: boolean;
  colors?: string[];
  duration?: number;
  onComplete?: () => void;
}

const DEFAULT_COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Confetti({ trigger, colors = DEFAULT_COLORS, duration = 3000, onComplete }: ConfettiProps) {
  const prevTrigger = useRef(false);

  useEffect(() => {
    if (trigger && !prevTrigger.current) {
      if (!prefersReducedMotion()) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors,
        });
      }
      const t = setTimeout(() => onComplete?.(), duration);
      return () => clearTimeout(t);
    }
    prevTrigger.current = trigger;
  }, [trigger, colors, duration, onComplete]);

  return null;
}
