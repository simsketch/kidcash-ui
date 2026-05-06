'use client';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { spring } from '../tokens/motion';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Initials (or any short text) shown when there's no `src`. */
  fallback?: string;
  /** Single emoji glyph rendered in place of an image / initials. */
  emoji?: string;
  /** Optional name caption rendered below the avatar. */
  name?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** Subtle vertical bob (respects prefers-reduced-motion). Defaults to false. */
  bobbing?: boolean;
  /** Current ring fill. Pair with `ringMax` to render a progress ring. */
  ring?: number;
  /** Ring scale. Pair with `ring`. */
  ringMax?: number;
  /** Vibrant aurora-gradient surface (works with emoji avatars). */
  vibrant?: boolean;
  className?: string;
}

export interface AvatarStackProps {
  avatars: AvatarProps[];
  /** Maximum visible before the `+N` overflow pill. Defaults to 4. */
  max?: number;
  size?: AvatarSize;
  className?: string;
}

const SIZE_PX: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const FONT_PCT = 0.4; // 40% of avatar size feels right for initials
// Emoji renders larger than initials — use a higher percentage for visual balance.
const EMOJI_FONT_PCT = 0.55;

const STATUS_COLOR: Record<NonNullable<AvatarProps['status']>, string> = {
  online: 'bg-success',
  offline: 'bg-text-muted',
  busy: 'bg-danger',
  away: 'bg-warning',
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * `Avatar` — generic avatar primitive. Renders one of three modes:
 *
 *  - `src` → image (object-cover circle)
 *  - `emoji` → single emoji glyph on a glass or `vibrant` aurora surface
 *  - `fallback` → initials on an aurora gradient
 *
 * Optional extras:
 *  - `status` → bottom-right colored dot
 *  - `name` → caption below the circle
 *  - `bobbing` → 4px vertical bob (skipped under prefers-reduced-motion)
 *  - `ring` + `ringMax` → SVG progress ring around the avatar
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt = '',
      fallback = '',
      emoji,
      name,
      size = 'md',
      status,
      bobbing = false,
      ring,
      ringMax,
      vibrant = false,
      className = '',
    },
    ref,
  ) => {
    const px = SIZE_PX[size];
    const dotPx = Math.max(8, Math.round(px * 0.25));
    const fontSize = Math.round(px * (emoji ? EMOJI_FONT_PCT : FONT_PCT));

    const showRing = ring !== undefined && ringMax !== undefined && ringMax > 0;
    const pct = showRing
      ? Math.max(0, Math.min(1, (ring as number) / (ringMax as number)))
      : 0;

    // Ring geometry
    const stroke = Math.max(2, Math.round(px * 0.05));
    const radius = px / 2 - stroke;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - pct);
    const gradientId = `avatar-ring-${size}-${vibrant ? 'vibrant' : 'glass'}`;

    const reduced = prefersReducedMotion();
    const surfaceClass = vibrant ? 'bg-gradient-aurora' : 'glass';
    const haloGradient = vibrant
      ? 'linear-gradient(135deg, #a78bfa, #e879f9, #22d3ee)'
      : 'linear-gradient(135deg, #a78bfa, #e879f9)';

    const showHalo = Boolean(emoji);

    const inner = (
      <div
        ref={ref}
        data-testid="avatar-root"
        className={`relative inline-block ${className}`}
        style={{ width: px, height: px }}
      >
        {/* Vibrancy halo (emoji avatars only) */}
        {showHalo && (
          <div
            data-testid="avatar-halo"
            aria-hidden
            className="absolute inset-0 rounded-pill blur-xl opacity-30 pointer-events-none"
            style={{
              background: haloGradient,
              transform: 'scale(1.2)',
            }}
          />
        )}

        {/* Progress ring (works with all avatar types) */}
        {showRing && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={px}
            height={px}
            data-testid="avatar-ring"
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
            </defs>
            <circle
              cx={px / 2}
              cy={px / 2}
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={stroke}
              fill="none"
            />
            <circle
              cx={px / 2}
              cy={px / 2}
              r={radius}
              stroke={`url(#${gradientId})`}
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${px / 2} ${px / 2})`}
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.32, 0.72, 0, 1)' }}
            />
          </svg>
        )}

        {/* The avatar surface itself */}
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full rounded-full object-cover border border-white/15"
          />
        ) : emoji ? (
          <motion.span
            className={`absolute inset-0 flex items-center justify-center rounded-pill border border-white/15 select-none ${surfaceClass}`}
            style={{ fontSize }}
            initial={{ scale: 0 }}
            animate={
              bobbing && !reduced
                ? { scale: 1, y: [0, -4, 0] }
                : { scale: 1, y: 0 }
            }
            transition={
              bobbing && !reduced
                ? {
                    scale: spring.bounce,
                    y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  }
                : spring.bounce
            }
            aria-label={alt || name}
          >
            {emoji}
          </motion.span>
        ) : (
          <span
            className="w-full h-full rounded-full bg-gradient-aurora text-white font-semibold flex items-center justify-center border border-white/15 select-none"
            style={{ fontSize }}
            aria-label={alt || fallback}
          >
            {fallback}
          </span>
        )}

        {status && (
          <span
            data-testid="avatar-status"
            data-status={status}
            aria-label={status}
            className={`absolute bottom-0 right-0 rounded-full ring-2 ring-bg-dark ${STATUS_COLOR[status]}`}
            style={{ width: dotPx, height: dotPx }}
          />
        )}
      </div>
    );

    if (!name) return inner;

    return (
      <div className="flex flex-col items-center">
        {inner}
        <span
          className="text-sm mt-3 font-medium"
          style={{ color: 'var(--theme-text-primary, #fafafa)' }}
        >
          {name}
        </span>
      </div>
    );
  },
);
Avatar.displayName = 'Avatar';

/**
 * `AvatarStack` — overlapping row of avatars. Shows up to `max` visible;
 * the rest collapse into a `+N` pill on the trailing edge. Z-index counts
 * down left-to-right so the leftmost avatar paints on top.
 */
export function AvatarStack({
  avatars,
  max = 4,
  size = 'md',
  className = '',
}: AvatarStackProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;
  const px = SIZE_PX[size];
  const fontSize = Math.round(px * FONT_PCT * 0.85);

  return (
    <div className={`inline-flex items-center ${className}`}>
      {visible.map((a, i) => (
        <div
          key={i}
          className={i === 0 ? '' : '-ml-3'}
          style={{ zIndex: visible.length - i }}
        >
          <Avatar {...a} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div className="-ml-3" style={{ zIndex: 0 }}>
          <span
            className="rounded-full font-semibold flex items-center justify-center select-none"
            style={{
              width: px,
              height: px,
              fontSize,
              backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.1))',
              borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.15))',
              borderWidth: 1,
              borderStyle: 'solid',
              color: 'var(--theme-text-primary, #fafafa)',
            }}
            aria-label={`+${overflow} more`}
          >
            +{overflow}
          </span>
        </div>
      )}
    </div>
  );
}
