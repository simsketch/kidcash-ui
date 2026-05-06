'use client';
import { motion } from 'framer-motion';
import { spring } from '../tokens/motion';

export type KidAvatarSize = 'sm' | 'md' | 'lg';
export type KidAvatarVariant = 'default' | 'vibrant';

export interface KidAvatarProps {
  emoji: string;
  name?: string;
  size?: KidAvatarSize;
  /** Subtle vertical bob (respects prefers-reduced-motion). */
  bobbing?: boolean;
  /** Current ring fill. Pair with `ringMax`. */
  ring?: number;
  /** Ring scale. Set with `ring` to render a progress ring. */
  ringMax?: number;
  /** `'default'` glass surface or `'vibrant'` aurora-gradient surface. */
  variant?: KidAvatarVariant;
  className?: string;
}

const SIZE_PX: Record<KidAvatarSize, number> = { sm: 56, md: 80, lg: 112 };
const FONT_SIZE: Record<KidAvatarSize, string> = { sm: '1.75rem', md: '2.5rem', lg: '3.5rem' };

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * `KidAvatar` — a generously-sized circular emoji portrait with a soft
 * vibrancy halo behind it and an optional progress ring.
 *
 *  - `variant="default"` → translucent glass surface
 *  - `variant="vibrant"` → aurora gradient surface
 *  - `ring` + `ringMax` → renders a gradient progress arc
 *  - mounts with a spring scale-in
 *  - `bobbing` adds a 4px vertical bob (skipped under prefers-reduced-motion)
 */
export function KidAvatar({
  emoji,
  name,
  size = 'md',
  bobbing = true,
  ring,
  ringMax,
  variant = 'default',
  className,
}: KidAvatarProps) {
  const px = SIZE_PX[size];
  const showRing = ring !== undefined && ringMax !== undefined && ringMax > 0;
  const pct = showRing ? Math.max(0, Math.min(1, (ring as number) / (ringMax as number))) : 0;

  // Ring geometry
  const stroke = 4;
  const radius = px / 2 - stroke;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  const reduced = prefersReducedMotion();
  const surfaceClass = variant === 'vibrant' ? 'bg-gradient-aurora' : 'glass';
  const haloGradient =
    variant === 'vibrant'
      ? 'linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)'
      : 'linear-gradient(135deg, #8b5cf6, #ec4899)';
  const gradientId = `kid-avatar-ring-${variant}`;

  return (
    <div className={`flex flex-col items-center ${className ?? ''}`}>
      <div className="relative" style={{ width: px, height: px }}>
        {/* Vibrancy halo — large blurred gradient behind the avatar */}
        <div
          data-testid="kid-avatar-halo"
          aria-hidden
          className="absolute inset-0 rounded-pill blur-xl opacity-30 pointer-events-none"
          style={{
            background: haloGradient,
            transform: 'scale(1.2)',
          }}
        />

        {showRing && (
          <svg className="absolute inset-0" width={px} height={px}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
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

        <motion.div
          className={`absolute inset-0 flex items-center justify-center rounded-pill ${surfaceClass}`}
          style={{ fontSize: FONT_SIZE[size] }}
          initial={{ scale: 0 }}
          animate={
            bobbing && !reduced ? { scale: 1, y: [0, -4, 0] } : { scale: 1, y: 0 }
          }
          transition={
            bobbing && !reduced
              ? {
                  scale: spring.bounce,
                  y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                }
              : spring.bounce
          }
          aria-hidden
        >
          {emoji}
        </motion.div>
      </div>
      {name && <span className="text-sm mt-3 font-medium text-text-light">{name}</span>}
    </div>
  );
}
