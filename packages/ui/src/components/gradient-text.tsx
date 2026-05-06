'use client';

export interface GradientTextProps {
  children: React.ReactNode;
  /** Picks a preset gradient palette. `animated` slowly drifts hue. */
  variant?: 'aurora' | 'sunset' | 'forest' | 'flame' | 'animated';
  /** Element to render. Defaults to `span`. */
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
}

export function GradientText({
  children,
  variant = 'aurora',
  as: As = 'span',
  className = '',
}: GradientTextProps) {
  const utility = variant === 'animated' ? 'text-gradient-animated' : `text-gradient-${variant}`;
  return <As className={`${utility} ${className}`}>{children}</As>;
}
