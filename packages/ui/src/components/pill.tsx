'use client';
import { forwardRef } from 'react';

export type PillVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'gradient';
export type PillSize = 'sm' | 'md' | 'lg';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: PillVariant;
  size?: PillSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Render a small × button on the right that fires `onRemove`. */
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

const variantClass: Record<PillVariant, string> = {
  default: 'glass text-text-light',
  primary: 'bg-primary/15 text-primary-light',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
  gradient: 'bg-gradient-aurora text-white',
};

const sizeClass: Record<PillSize, string> = {
  sm: 'h-6 px-2 text-xs gap-1',
  md: 'h-7 px-3 text-sm gap-1.5',
  lg: 'h-9 px-4 text-base gap-2',
};

function CloseIcon({ size }: { size: PillSize }) {
  const px = size === 'sm' ? 10 : size === 'md' ? 12 : 14;
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

/**
 * `Pill` — generic inline badge / tag / chip primitive.
 *
 * Distinct from `AchievementBadge` (which is a card). Useful for tags,
 * status indicators, counts, and filter chips. Optional leading / trailing
 * icons, optional remove button.
 */
export const Pill = forwardRef<HTMLSpanElement, PillProps>(
  (
    {
      variant = 'default',
      size = 'md',
      iconLeft,
      iconRight,
      removable = false,
      onRemove,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center justify-center rounded-pill font-medium ${sizeClass[size]} ${variantClass[variant]} ${className}`}
        {...rest}
      >
        {iconLeft && <span className="inline-flex items-center">{iconLeft}</span>}
        <span>{children}</span>
        {iconRight && <span className="inline-flex items-center">{iconRight}</span>}
        {removable && (
          <button
            type="button"
            aria-label="Remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="ml-0.5 inline-flex items-center justify-center rounded-full opacity-70 hover:opacity-100 hover:bg-white/10 cursor-pointer p-0.5"
          >
            <CloseIcon size={size} />
          </button>
        )}
      </span>
    );
  },
);
Pill.displayName = 'Pill';
