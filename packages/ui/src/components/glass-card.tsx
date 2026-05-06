'use client';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Glass intensity. `strong` doubles the blur and lifts the highlight. */
  variant?: 'default' | 'strong';
  /** Spring-lift on hover. Default true. */
  hover?: boolean;
  /** Glow color shown on hover (when hover=true). Default 'primary'. */
  hoverGlow?: 'primary' | 'accent' | 'success' | 'none';
  /** Always-on glow ring (independent of hover). Default 'none'. */
  glow?: 'primary' | 'accent' | 'success' | 'none';
  children: React.ReactNode;
}

// Halo ring shadows used when `glow` (or `hoverGlow`) is set. These are
// composed onto the theme card shadow so they can't be clobbered by the
// inline style override.
const GLOW_SHADOWS: Record<'primary' | 'accent' | 'success', string> = {
  primary: '0 0 40px rgba(139, 92, 246, 0.45), 0 0 80px rgba(139, 92, 246, 0.25)',
  accent: '0 0 40px rgba(6, 182, 212, 0.45), 0 0 80px rgba(6, 182, 212, 0.25)',
  success: '0 0 40px rgba(16, 185, 129, 0.45), 0 0 80px rgba(16, 185, 129, 0.2)',
};

const BASE_SHADOW =
  'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 20px rgba(0,0,0,0.25)';

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = 'default',
      hover = true,
      hoverGlow = 'primary',
      glow = 'none',
      className = '',
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const variantClass = variant === 'strong' ? 'glass-strong' : 'glass';
    const isStrong = variant === 'strong';
    const blur = isStrong ? 80 : 50;

    // Compose theme-driven card shadow + optional glow halo + inset darken.
    const themeCardShadow = `var(--theme-card-shadow, ${BASE_SHADOW})`;
    const persistentGlow = glow !== 'none' ? GLOW_SHADOWS[glow] : '';
    const hoverGlowShadow =
      hover && hoverGlow !== 'none' ? GLOW_SHADOWS[hoverGlow] : '';

    const insetDarken = 'inset 0 -1px 0 rgba(0,0,0,0.12)';

    const restingShadow = persistentGlow
      ? `${themeCardShadow}, ${persistentGlow}, ${insetDarken}`
      : `${themeCardShadow}, ${insetDarken}`;

    const hoverShadow = hoverGlowShadow
      ? persistentGlow
        ? `${themeCardShadow}, ${persistentGlow}, ${hoverGlowShadow}, ${insetDarken}`
        : `${themeCardShadow}, ${hoverGlowShadow}, ${insetDarken}`
      : restingShadow;

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
      // Heavier blur + saturate (no brightness lift — was washing out at 1.05).
      backdropFilter: `blur(${blur}px) saturate(180%) brightness(1.0)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(180%) brightness(1.0)`,
      boxShadow: restingShadow,
      color: 'var(--theme-text-primary, #fafafa)',
      transition: 'box-shadow 350ms ease',
      ...(style as object),
    } as React.CSSProperties;

    const enableHoverGlow = hover && hoverGlow !== 'none';

    return (
      <motion.div
        ref={ref}
        className={`${variantClass} rounded-card p-6 ${className}`}
        style={themeStyle}
        initial={{ y: 0, scale: 1 }}
        whileHover={hover ? { y: -4, scale: 1.005 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        data-glow={glow !== 'none' ? glow : undefined}
        data-hover-glow={enableHoverGlow ? hoverGlow : undefined}
        onMouseEnter={
          enableHoverGlow
            ? (e) => {
                e.currentTarget.style.boxShadow = hoverShadow;
              }
            : undefined
        }
        onMouseLeave={
          enableHoverGlow
            ? (e) => {
                e.currentTarget.style.boxShadow = restingShadow;
              }
            : undefined
        }
        {...rest}
      >
        {children}
      </motion.div>
    );
  },
);
GlassCard.displayName = 'GlassCard';
