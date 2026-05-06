'use client';
import { motion } from 'framer-motion';
import { spring } from '../tokens/motion';

export type ProgressBarVariant = 'primary' | 'success' | 'danger';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  variant?: ProgressBarVariant;
  /** Apply a shimmer overlay + spring tween on the fill. */
  animate?: boolean;
  /** Render the percentage on the right side of the label row. */
  showValue?: boolean;
  size?: ProgressBarSize;
  className?: string;
}

const variantClass: Record<ProgressBarVariant, string> = {
  primary: 'bg-gradient-aurora',
  success: 'bg-gradient-success',
  danger: 'bg-gradient-flame',
};

/** When `animate=true` and the variant has an animated counterpart, use it. */
const animatedVariantClass: Partial<Record<ProgressBarVariant, string>> = {
  primary: 'bg-gradient-aurora-animated',
};

const heightClass: Record<ProgressBarSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

/**
 * `ProgressBar` — Apple-style fill on a glass track.
 *
 * Track uses the `glass` utility (translucent with backdrop blur). The fill
 * is a vibrant gradient sized to the current ratio. When `animate=true` the
 * fill grows on a spring and a shimmer overlay drifts across.
 */
export function ProgressBar({
  value,
  max = 100,
  label,
  variant = 'primary',
  animate = true,
  showValue = false,
  size = 'md',
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(max, value));
  const pct = (clamped / max) * 100;
  const fillClass =
    animate && animatedVariantClass[variant]
      ? animatedVariantClass[variant]!
      : variantClass[variant];

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      className={className}
    >
      {(label || showValue) && (
        <div className="flex items-baseline justify-between mb-2">
          {label && (
            <div
              className="text-sm font-medium"
              style={{ color: 'var(--theme-text-primary, #fafafa)' }}
            >
              {label}
            </div>
          )}
          {showValue && (
            <div
              className="text-sm tabular-nums font-mono"
              style={{ color: 'var(--theme-text-muted, #a1a1aa)' }}
            >
              {Math.round(pct)}%
            </div>
          )}
        </div>
      )}
      <div
        className={`glass ${heightClass[size]} rounded-pill overflow-hidden relative`}
        style={{
          backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
          borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
        }}
      >
        <motion.div
          className={`h-full rounded-pill ${fillClass} ${
            animate ? 'shimmer-overlay' : ''
          }`}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={animate ? spring.gentle : { duration: 0 }}
          style={{
            width: `${pct}%`,
            // Theme-aware override for the primary variant: when a theme sets
            // --theme-progress-gradient, prefer it over the static aurora gradient.
            ...(variant === 'primary'
              ? { backgroundImage: 'var(--theme-progress-gradient)' }
              : {}),
          }}
        />
      </div>
    </div>
  );
}
