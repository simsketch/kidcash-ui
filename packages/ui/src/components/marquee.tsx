'use client';
import { forwardRef } from 'react';

export interface MarqueeProps {
  children: React.ReactNode;
  /** Direction of scroll. Default `left`. */
  direction?: 'left' | 'right';
  /** Seconds for one full loop. Lower = faster. Default 30. */
  speed?: number;
  /** Pause on hover. Default `true`. */
  pauseOnHover?: boolean;
  /** Apply a CSS mask gradient to fade the left and right edges. Default `true`. */
  fade?: boolean;
  className?: string;
}

/**
 * `Marquee` — infinite horizontal scroll. Children are duplicated so the
 * loop is seamless. Uses CSS `@keyframes marquee-left|right` from
 * `preset.css`. Smoother than framer-motion for continuous loops.
 */
export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      children,
      direction = 'left',
      speed = 30,
      pauseOnHover = true,
      fade = true,
      className = '',
    },
    ref,
  ) => {
    const fadeMask = fade
      ? '[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'
      : '';

    const pause = pauseOnHover
      ? 'hover:[animation-play-state:paused]'
      : '';

    return (
      <div
        ref={ref}
        data-testid="marquee"
        className={`relative overflow-hidden ${fadeMask} ${className}`}
      >
        <div
          data-testid="marquee-track"
          className={`flex w-max ${pause}`}
          style={{
            animation: `marquee-${direction} ${speed}s linear infinite`,
          }}
        >
          <div className="flex shrink-0 items-center gap-6 pr-6">{children}</div>
          <div
            data-testid="marquee-clone"
            className="flex shrink-0 items-center gap-6 pr-6"
            aria-hidden
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Marquee.displayName = 'Marquee';
