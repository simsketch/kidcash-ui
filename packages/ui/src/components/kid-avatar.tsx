'use client';
import { motion } from 'framer-motion';

export interface KidAvatarProps {
  emoji: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  bobbing?: boolean;
  ring?: number;
  ringMax?: number;
  className?: string;
}

const SIZE_PX = { sm: 48, md: 64, lg: 96 } as const;
const FONT_SIZE = { sm: '1.5rem', md: '2rem', lg: '3rem' } as const;

export function KidAvatar({
  emoji,
  name,
  size = 'md',
  bobbing = true,
  ring,
  ringMax,
  className,
}: KidAvatarProps) {
  const px = SIZE_PX[size];
  const showRing = ring !== undefined && ringMax !== undefined && ringMax > 0;
  const pct = showRing ? Math.max(0, Math.min(1, (ring as number) / (ringMax as number))) : 0;

  // Ring geometry
  const radius = px / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);

  return (
    <div className={`flex flex-col items-center ${className ?? ''}`}>
      <div className="relative" style={{ width: px, height: px }}>
        {showRing && (
          <svg className="absolute inset-0" width={px} height={px}>
            <circle
              cx={px / 2}
              cy={px / 2}
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={3}
              fill="none"
            />
            <circle
              cx={px / 2}
              cy={px / 2}
              r={radius}
              stroke="var(--color-success)"
              strokeWidth={3}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${px / 2} ${px / 2})`}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
        )}
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-pill bg-white/5"
          style={{ fontSize: FONT_SIZE[size] }}
          animate={bobbing ? { y: [0, -4, 0] } : undefined}
          transition={bobbing ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
          aria-hidden
        >
          {emoji}
        </motion.div>
      </div>
      {name && <span className="text-sm mt-2">{name}</span>}
    </div>
  );
}
