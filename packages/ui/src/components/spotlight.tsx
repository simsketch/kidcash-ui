'use client';
import { forwardRef, useRef, useState } from 'react';

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Diameter of the radial highlight in px. Default 600. */
  size?: number;
  /** Center color (RGBA) of the radial gradient. Default primary at 30%. */
  color?: string;
  children: React.ReactNode;
}

/**
 * `Spotlight` — a soft radial highlight that follows the cursor inside its
 * container. Pure CSS gradient under a `pointer-events: none` overlay; the
 * effect appears only while the cursor is over the wrapping div.
 */
export const Spotlight = forwardRef<HTMLDivElement, SpotlightProps>(
  (
    {
      size = 600,
      color = 'rgba(139, 92, 246, 0.3)',
      children,
      className = '',
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      style,
      ...rest
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

    function setRef(node: HTMLDivElement | null) {
      innerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref && typeof ref === 'object') {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    }

    function handleMove(e: React.MouseEvent<HTMLDivElement>) {
      onMouseMove?.(e);
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    function handleEnter(e: React.MouseEvent<HTMLDivElement>) {
      onMouseEnter?.(e);
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    function handleLeave(e: React.MouseEvent<HTMLDivElement>) {
      onMouseLeave?.(e);
      setPos(null);
    }

    const overlayBackground = pos
      ? `radial-gradient(circle ${size / 2}px at ${pos.x}px ${pos.y}px, ${color}, transparent 70%)`
      : 'transparent';

    return (
      <div
        ref={setRef}
        data-testid="spotlight"
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className={`relative ${className}`}
        style={style}
        {...rest}
      >
        <div
          aria-hidden
          data-testid="spotlight-overlay"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: overlayBackground,
            opacity: pos ? 1 : 0,
          }}
        />
        <div className="relative">{children}</div>
      </div>
    );
  },
);
Spotlight.displayName = 'Spotlight';
