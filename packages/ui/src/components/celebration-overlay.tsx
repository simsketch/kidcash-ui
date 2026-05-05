'use client';
import { useEffect, useRef } from 'react';
import { Confetti } from './confetti';
import { FloatingCoins } from './floating-coins';

export interface CelebrationOverlayProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  emoji?: string;
  duration?: number;
  playSound?: () => void;
  className?: string;
}

export function CelebrationOverlay({
  open,
  onClose,
  title,
  subtitle,
  emoji = '🎉',
  duration = 3000,
  playSound,
  className,
}: CelebrationOverlayProps) {
  const prevOpen = useRef(false);

  useEffect(() => {
    if (open && !prevOpen.current) {
      playSound?.();
      const t = setTimeout(() => onClose(), duration);
      prevOpen.current = true;
      return () => {
        clearTimeout(t);
      };
    }
    if (!open) {
      prevOpen.current = false;
    }
  }, [open, duration, onClose, playSound]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur ${className ?? ''}`}
      role="alertdialog"
      aria-modal="true"
    >
      <Confetti trigger={open} />
      <FloatingCoins count={12} />
      <div className="relative text-center max-w-md p-8">
        <div className="text-7xl mb-4" aria-hidden>
          {emoji}
        </div>
        {title && <h2 className="text-3xl font-bold bg-gradient-aurora bg-clip-text text-transparent">{title}</h2>}
        {subtitle && <p className="text-text-muted mt-2">{subtitle}</p>}
      </div>
    </div>
  );
}
