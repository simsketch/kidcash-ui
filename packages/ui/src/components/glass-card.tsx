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
    { variant = 'default', hover = false, glow = 'none', className = '', style, children, ...rest },
    ref,
  ) => {
    const glowClass = glow === 'none' ? '' : `shadow-glow-${glow}`;
    const variantClass = variant === 'strong' ? 'glass-strong' : 'glass';
    const blur = variant === 'strong' ? 60 : 40;
    // Theme-driven base + glass-utility texture (inset highlight, border).
    const themeStyle = {
      backgroundColor: 'var(--theme-card-bg, var(--glass-surface))',
      borderColor: 'var(--theme-card-border, var(--glass-border))',
      boxShadow:
        'var(--theme-card-shadow, inset 0 1px 0 var(--glass-highlight), 0 8px 32px rgba(0,0,0,0.4))',
      backdropFilter: `blur(${blur}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
      color: 'var(--theme-text-primary, #fafafa)',
      ...(style as object),
    } as React.CSSProperties;
    return (
      <motion.div
        ref={ref}
        className={`${variantClass} rounded-card p-6 ${glowClass} ${className}`}
        style={themeStyle}
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
