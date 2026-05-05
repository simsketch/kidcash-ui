'use client';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  variant?: 'primary' | 'success' | 'danger';
  animate?: boolean;
  className?: string;
}

const variantClass = {
  primary: 'bg-gradient-aurora',
  success: 'bg-gradient-success',
  danger: 'bg-gradient-danger',
} as const;

export function ProgressBar({
  value,
  max = 100,
  label,
  variant = 'primary',
  animate = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(max, value));
  const pct = (clamped / max) * 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      className={className}
    >
      {label && <div className="text-sm mb-1">{label}</div>}
      <div className="h-2 bg-white/10 rounded-pill overflow-hidden">
        <div
          className={`h-full rounded-pill ${variantClass[variant]}`}
          style={{
            width: `${pct}%`,
            transition: animate ? 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
          }}
        />
      </div>
    </div>
  );
}
