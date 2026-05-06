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

// Halo ring shadows used when `glow` is set. These are composed onto the
// theme card shadow so they can't be clobbered by the inline style override.
const GLOW_SHADOWS: Record<'primary' | 'accent' | 'success', string> = {
  primary: '0 0 40px rgba(139, 92, 246, 0.45), 0 0 80px rgba(139, 92, 246, 0.25)',
  accent: '0 0 40px rgba(6, 182, 212, 0.45), 0 0 80px rgba(6, 182, 212, 0.25)',
  success: '0 0 40px rgba(16, 185, 129, 0.45), 0 0 80px rgba(16, 185, 129, 0.2)',
};

const BASE_SHADOW =
  'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)';

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    { variant = 'default', hover = false, glow = 'none', className = '', style, children, ...rest },
    ref,
  ) => {
    const variantClass = variant === 'strong' ? 'glass-strong' : 'glass';
    const isStrong = variant === 'strong';
    const blur = isStrong ? 80 : 50;

    // Compose theme-driven card shadow + optional glow halo + inset darken.
    const themeCardShadow = `var(--theme-card-shadow, ${BASE_SHADOW})`;
    const glowShadow = glow !== 'none' ? GLOW_SHADOWS[glow] : '';
    const composedShadow = glowShadow
      ? `${themeCardShadow}, ${glowShadow}`
      : themeCardShadow;
    const finalBoxShadow = `${composedShadow}, inset 0 -1px 0 rgba(0,0,0,0.2)`;

    // Multi-stop gradient overlay simulates light refraction across the surface.
    // Start opacity is bumped on the `strong` variant for more pronounced depth.
    const diagStart = isStrong ? 0.18 : 0.12;
    const diagMid = isStrong ? 0.06 : 0.04;
    const diagEnd = isStrong ? 0.09 : 0.06;
    const radialOpacity = isStrong ? 0.12 : 0.08;
    const backgroundImage = `linear-gradient(135deg, rgba(255,255,255,${diagStart}) 0%, rgba(255,255,255,${diagMid}) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,${diagEnd}) 100%), radial-gradient(circle at top right, rgba(255,255,255,${radialOpacity}), transparent 40%)`;

    const themeStyle = {
      backgroundImage,
      backgroundColor: 'var(--theme-card-bg, var(--glass-surface))',
      borderColor: 'var(--theme-card-border, var(--glass-border))',
      // Heavier blur + saturate + slight brightness lift behind the surface.
      backdropFilter: `blur(${blur}px) saturate(220%) brightness(1.05)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(220%) brightness(1.05)`,
      boxShadow: finalBoxShadow,
      color: 'var(--theme-text-primary, #fafafa)',
      ...(style as object),
    } as React.CSSProperties;

    return (
      <motion.div
        ref={ref}
        className={`${variantClass} rounded-card p-6 ${className}`}
        style={themeStyle}
        whileHover={hover ? { y: -4, scale: 1.005 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        data-glow={glow !== 'none' ? glow : undefined}
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);
GlassCard.displayName = 'GlassCard';
