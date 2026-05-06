'use client';
import { motion } from 'framer-motion';

export interface FlyingMascotProps {
  /** Image URL — required since the kit doesn't ship a default mascot. */
  src: string;
  /**
   * Alt text. Default empty string (decorative); when empty, `aria-hidden`
   * is also set so screen readers skip the element.
   */
  alt?: string;
  /** Hide on small screens. Default true. */
  hideOnMobile?: boolean;
  /** Total animation duration in seconds. Default 10. */
  duration?: number;
  /** Pixel-or-CSS offset from the top of the parent. Default '15%'. */
  top?: string;
  /** Pixel size for both width and height. Default 96. */
  size?: number;
  className?: string;
}

/**
 * `FlyingMascot` — absolutely-positioned image that sweeps across the
 * viewport horizontally, with a subtle vertical bob and rotation. Designed
 * to drop into a hero section. Hidden on small screens by default.
 *
 * The parent must be `position: relative` (or another positioning context)
 * for the mascot to anchor correctly.
 */
export function FlyingMascot({
  src,
  alt = '',
  hideOnMobile = true,
  duration = 10,
  top = '15%',
  size = 96,
  className,
}: FlyingMascotProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      aria-hidden={alt === '' ? true : undefined}
      className={`absolute z-20 object-contain pointer-events-none ${
        hideOnMobile ? 'hidden sm:block' : ''
      } ${className ?? ''}`}
      style={{ top, width: size, height: size }}
      animate={{
        x: ['5vw', '70vw', '5vw'],
        y: [0, -30, 10, -20, 0],
        rotate: [0, 10, -5, 8, 0],
      }}
      transition={{ repeat: Infinity, duration, ease: 'easeInOut' }}
    />
  );
}
