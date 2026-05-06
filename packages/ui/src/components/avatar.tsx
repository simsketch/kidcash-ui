'use client';
import { forwardRef } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Initials (or any short text) shown when there's no `src`. */
  fallback?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'busy' | 'away';
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

const STATUS_COLOR: Record<NonNullable<AvatarProps['status']>, string> = {
  online: 'bg-success',
  offline: 'bg-text-muted',
  busy: 'bg-danger',
  away: 'bg-warning',
};

/**
 * `Avatar` — generic avatar primitive (distinct from `KidAvatar`, which is
 * the big emoji portrait). Renders an image when `src` is provided, else
 * initials on an aurora gradient. Optional status dot in the bottom-right.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { src, alt = '', fallback = '', size = 'md', status, className = '' },
    ref,
  ) => {
    const px = SIZE_PX[size];
    const dotPx = Math.max(8, Math.round(px * 0.25));
    const fontSize = Math.round(px * FONT_PCT);

    return (
      <div
        ref={ref}
        data-testid="avatar-root"
        className={`relative inline-block ${className}`}
        style={{ width: px, height: px }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full rounded-full object-cover border border-white/15"
          />
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
            className="rounded-full bg-white/10 text-text-light font-semibold flex items-center justify-center border border-white/15 select-none"
            style={{ width: px, height: px, fontSize }}
            aria-label={`+${overflow} more`}
          >
            +{overflow}
          </span>
        </div>
      )}
    </div>
  );
}
