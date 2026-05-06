'use client';
import { useEffect, useMemo, useRef } from 'react';
import { GlassCard } from './glass-card';
import { GradientText } from './gradient-text';

export interface BirthdayCountdownProps {
  date: string | Date;
  label?: string;
  onReached?: () => void;
  /** Optional cake / balloon glyph that gently bobs above the count. */
  decorationEmoji?: string;
  className?: string;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysBetween(a: Date, b: Date): number {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

/**
 * `BirthdayCountdown` — large, vibrant day-counter inside a `<GlassCard>`.
 * Three states:
 *   - `future`  → "{N} days until {label}"
 *   - `today`   → "{label} today!" with animated gradient + 🎉
 *   - `past`    → muted "{label} was N days ago"
 *
 * Calls `onReached()` exactly once when `days === 0` after mount.
 */
export function BirthdayCountdown({
  date,
  label = 'Birthday',
  onReached,
  decorationEmoji,
  className,
}: BirthdayCountdownProps) {
  const target = useMemo(() => (date instanceof Date ? date : new Date(date)), [date]);
  const now = useMemo(() => new Date(), []);
  const days = daysBetween(now, target);

  const reachedRef = useRef(false);
  useEffect(() => {
    if (days === 0 && !reachedRef.current) {
      reachedRef.current = true;
      onReached?.();
    }
  }, [days, onReached]);

  // ---- "today" state ----
  if (days === 0) {
    return (
      <GlassCard variant="strong" glow="primary" className={className}>
        <div className="flex flex-col items-center text-center gap-2 py-2">
          <div
            className="text-6xl"
            style={{ animation: 'float-y 2.4s ease-in-out infinite' }}
            aria-hidden
          >
            🎉
          </div>
          <GradientText
            variant="animated"
            as="h3"
            className="text-3xl font-bold tracking-tight"
          >
            {label} today!
          </GradientText>
          <span className="text-sm text-text-muted">A very special day.</span>
        </div>
      </GlassCard>
    );
  }

  // ---- "past" state ----
  if (days < 0) {
    const ago = Math.abs(days);
    return (
      <GlassCard variant="default" className={className}>
        <div className="flex flex-col items-center text-center gap-1 py-2">
          {decorationEmoji && (
            <div className="text-4xl opacity-50 mb-1" aria-hidden>
              {decorationEmoji}
            </div>
          )}
          <span className="text-5xl font-bold text-text-muted tabular-nums">{ago}</span>
          <span className="text-sm text-text-muted">days since {label}</span>
        </div>
      </GlassCard>
    );
  }

  // ---- "future" state ----
  return (
    <GlassCard variant="default" hover className={className}>
      <div className="flex flex-col items-center text-center gap-1 py-2">
        {decorationEmoji && (
          <div
            className="text-4xl mb-1"
            style={{ animation: 'float-y 2.4s ease-in-out infinite' }}
            aria-hidden
          >
            {decorationEmoji}
          </div>
        )}
        <GradientText
          variant="aurora"
          as="span"
          className="text-6xl font-bold tabular-nums tracking-tight leading-none"
        >
          {days}
        </GradientText>
        <span className="text-sm font-medium text-text-light mt-1">
          {days === 1 ? 'day' : 'days'} until
        </span>
        <span className="text-xs uppercase tracking-widest text-text-muted font-mono">
          {label}
        </span>
      </div>
    </GlassCard>
  );
}
