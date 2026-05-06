'use client';
import { useState } from 'react';

export interface SliderProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'primary' | 'success' | 'flame';
  className?: string;
}

const fillClass: Record<NonNullable<SliderProps['variant']>, string> = {
  primary: 'bg-gradient-aurora',
  success: 'bg-gradient-success',
  flame: 'bg-gradient-flame',
};

const glowClass: Record<NonNullable<SliderProps['variant']>, string> = {
  primary: 'shadow-glow-primary',
  success: 'shadow-glow-success',
  flame: 'shadow-glow-danger',
};

/**
 * `Slider` — Apple-style range slider. A native `<input type="range">`
 * sits on top of a styled track + thumb (transparent input, full-width,
 * absolute) so we get keyboard / touch support for free while still
 * delivering the polished glass-track look.
 */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  variant = 'primary',
  className = '',
}: SliderProps) {
  const [active, setActive] = useState(false);
  const range = Math.max(1, max - min);
  const pct = ((value - min) / range) * 100;
  const clampedPct = Math.max(0, Math.min(100, pct));

  return (
    <div className={`w-full ${className}`}>
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
              {value}
            </div>
          )}
        </div>
      )}
      <div className="relative h-5 flex items-center select-none">
        {/* Track */}
        <div
          className="glass h-2 w-full rounded-pill overflow-hidden relative"
          style={{
            backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
            borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
          }}
        >
          <div
            className={`h-full rounded-pill ${fillClass[variant]}`}
            style={{ width: `${clampedPct}%` }}
          />
        </div>
        {/* Thumb */}
        <div
          aria-hidden
          className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white pointer-events-none transition-transform ${glowClass[variant]} ${
            active ? 'scale-110' : 'scale-100'
          }`}
          style={{
            left: `calc(${clampedPct}% - 10px)`,
            borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.15))',
            borderWidth: 1,
            borderStyle: 'solid',
          }}
        />
        {/* Native input — invisible overlay for interaction + a11y */}
        <input
          type="range"
          role="slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setActive(true)}
          onMouseUp={() => setActive(false)}
          onTouchStart={() => setActive(true)}
          onTouchEnd={() => setActive(false)}
          onBlur={() => setActive(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
      </div>
    </div>
  );
}
