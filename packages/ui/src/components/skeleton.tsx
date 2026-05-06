'use client';
import { forwardRef } from 'react';

export type SkeletonShape = 'rect' | 'circle' | 'text';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: SkeletonShape;
  width?: string | number;
  height?: string | number;
  /** For `text` shape: number of bars to render. Defaults to 1. */
  count?: number;
}

function toCssLength(v: string | number | undefined): string | undefined {
  if (v === undefined) return undefined;
  return typeof v === 'number' ? `${v}px` : v;
}

/**
 * `Skeleton` — loading placeholder. Subtle glass background plus a moving
 * shimmer overlay. Three shapes: `rect` (default, rounded-card), `circle`
 * (avatars), and `text` (one or more rounded bars; the last is shorter for
 * the tell-tale "ragged paragraph" look).
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { shape = 'rect', width, height, count = 1, className = '', style, ...rest },
    ref,
  ) => {
    const themedSurfaceStyle: React.CSSProperties = {
      backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
      borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
    };

    if (shape === 'text') {
      const bars = Math.max(1, count);
      return (
        <div ref={ref} className={className} style={style} {...rest}>
          {Array.from({ length: bars }).map((_, i) => {
            const isLast = i === bars - 1 && bars > 1;
            const w = isLast ? '60%' : '100%';
            return (
              <div
                key={i}
                data-testid="skeleton-bar"
                className="glass shimmer-overlay h-3 rounded-pill mb-2 last:mb-0"
                style={{ width: w, ...themedSurfaceStyle }}
              />
            );
          })}
        </div>
      );
    }

    const isCircle = shape === 'circle';
    const radiusClass = isCircle ? 'rounded-full' : 'rounded-card';
    const computedStyle: React.CSSProperties = {
      width: toCssLength(width),
      height: toCssLength(height),
      ...themedSurfaceStyle,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={`glass shimmer-overlay ${radiusClass} ${className}`}
        style={computedStyle}
        {...rest}
      />
    );
  },
);
Skeleton.displayName = 'Skeleton';
