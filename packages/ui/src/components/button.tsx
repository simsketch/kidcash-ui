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
  secondary: 'glass text-text-light hover:glass-strong',
  ghost: 'text-text-light hover:bg-white/5',
  destructive: 'bg-gradient-flame text-white',
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
        className={`relative inline-flex items-center justify-center gap-2 rounded-button font-medium ${sizeMap[size]} ${variantMap[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer`}
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
