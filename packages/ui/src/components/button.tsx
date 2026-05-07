'use client';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

const sizeMap: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

const variantMap: Record<Variant, string> = {
  primary: 'text-white',
  secondary: 'glass hover:glass-strong',
  ghost: '',
  destructive: 'text-white',
};

// Primary + destructive surfaces are theme-aware: each theme owns its own
// gradient + glow shadow so warm themes don't render the aurora purple
// gradient by default. Falls back to the iconic aurora palette + danger
// gradient when no provider is mounted.
const AURORA_FALLBACK =
  'linear-gradient(135deg, #7c3aed 0%, #a855f7 20%, #c026d3 40%, #ec4899 55%, #8b5cf6 75%, #06b6d4 100%)';
const AURORA_SHADOW_FALLBACK =
  '0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)';
const FLAME_FALLBACK =
  'linear-gradient(135deg, #ef4444 0%, #f59e0b 50%, #ec4899 100%)';

const variantStyle: Record<Variant, React.CSSProperties> = {
  primary: {
    backgroundImage: `var(--theme-primary-gradient, ${AURORA_FALLBACK})`,
    boxShadow: `var(--theme-primary-shadow, ${AURORA_SHADOW_FALLBACK})`,
  },
  secondary: {
    backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
    borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
    color: 'var(--theme-text-primary, #fafafa)',
  },
  ghost: {
    color: 'var(--theme-text-primary, #fafafa)',
  },
  destructive: {
    backgroundImage: `var(--theme-danger-bg, ${FLAME_FALLBACK})`,
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      iconLeft,
      iconRight,
      className = '',
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        className={`button-trace relative inline-flex items-center justify-center gap-2 rounded-button font-medium ${sizeMap[size]} ${variantMap[variant]} ${variant === 'ghost' ? 'hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))]' : ''} ${className} disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
        style={{ ...variantStyle[variant], ...style }}
        disabled={loading || rest.disabled}
        {...rest}
      >
        {loading && (
          <span
            aria-hidden
            className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          />
        )}
        {!loading && iconLeft}
        {children}
        {!loading && iconRight}
      </motion.button>
    );
  },
);
Button.displayName = 'Button';
