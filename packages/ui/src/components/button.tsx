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
  primary: 'bg-gradient-aurora text-white shadow-glow-primary',
  secondary: 'glass hover:glass-strong',
  ghost: '',
  destructive: 'bg-gradient-flame text-white',
};

const variantStyle: Record<Variant, React.CSSProperties> = {
  primary: {},
  secondary: {
    backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
    borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
    color: 'var(--theme-text-primary, #fafafa)',
  },
  ghost: {
    color: 'var(--theme-text-primary, #fafafa)',
  },
  destructive: {},
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
