'use client';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Glass intensity. `strong` doubles the blur and lifts the highlight. */
  variant?: 'default' | 'strong';
  /** Lift + scale on hover (uses spring physics). */
  hover?: boolean;
  /** Multi-layer glow ring around the card. */
  glow?: 'primary' | 'accent' | 'success' | 'none';
  children: React.ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { variant = 'default', hover = false, glow = 'none', className = '', children, ...rest },
    ref,
  ) => {
    const glowClass = glow === 'none' ? '' : `shadow-glow-${glow}`;
    const variantClass = variant === 'strong' ? 'glass-strong' : 'glass';
    return (
      <motion.div
        ref={ref}
        className={`${variantClass} rounded-card p-6 ${glowClass} ${className}`}
        whileHover={hover ? { y: -4, scale: 1.005 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);
GlassCard.displayName = 'GlassCard';
