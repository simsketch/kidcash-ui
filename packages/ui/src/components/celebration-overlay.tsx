'use client';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../tokens/motion';
import { Confetti, type ConfettiIntensity } from './confetti';
import { FloatingCoins } from './floating-coins';
import { GlassCard } from './glass-card';
import { GradientText } from './gradient-text';

export interface CelebrationOverlayProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  emoji?: string;
  duration?: number;
  /** Confetti intensity. Defaults to `'wild'` for celebrations. */
  confettiIntensity?: ConfettiIntensity;
  playSound?: () => void;
  className?: string;
}

/**
 * `CelebrationOverlay` — full-viewport celebration. Heavy `glass-strong`
 * blurred backdrop, big bouncy emoji, animated-gradient title, looping coins
 * and a single confetti burst. Auto-closes after `duration`.
 */
export function CelebrationOverlay({
  open,
  onClose,
  title,
  subtitle,
  emoji = '🎉',
  duration = 3000,
  confettiIntensity = 'wild',
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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${className ?? ''}`}
          style={{
            backgroundColor: 'rgba(10, 6, 18, 0.55)',
            backdropFilter: 'blur(60px) saturate(200%)',
            WebkitBackdropFilter: 'blur(60px) saturate(200%)',
          }}
          role="alertdialog"
          aria-modal="true"
        >
          <Confetti trigger={open} intensity={confettiIntensity} />
          <FloatingCoins count={16} variant="rise" />

          <motion.div
            initial={{ scale: 0.7, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={spring.bounce}
            className="relative z-10 max-w-md w-full px-6"
          >
            <GlassCard variant="strong" glow="primary" className="!p-10 text-center">
              <motion.div
                className="text-8xl mb-6"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ ...spring.bounce, delay: 0.1 }}
                aria-hidden
              >
                {emoji}
              </motion.div>
              {title && (
                <GradientText
                  variant="animated"
                  as="h2"
                  className="text-4xl md:text-5xl font-bold tracking-tight mb-3"
                >
                  {title}
                </GradientText>
              )}
              {subtitle && (
                <p className="text-text-muted text-lg leading-relaxed">{subtitle}</p>
              )}
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
