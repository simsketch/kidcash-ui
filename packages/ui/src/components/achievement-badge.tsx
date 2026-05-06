'use client';
import { motion } from 'framer-motion';
import { spring } from '../tokens/motion';
import { GlassCard } from './glass-card';

export type BadgeTier = 'bronze' | 'silver' | 'gold';

export interface BadgeDef {
  id: string;
  label: string;
  emoji: string;
  description?: string;
  tier?: BadgeTier;
}

export interface AchievementBadgeProps extends BadgeDef {
  unlocked: boolean;
  className?: string;
}

const TIER_DOTS: Record<BadgeTier, number> = { bronze: 1, silver: 2, gold: 3 };
const TIER_COLOR: Record<BadgeTier, string> = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffd700',
};

function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function TierDots({ tier }: { tier: BadgeTier }) {
  const count = TIER_DOTS[tier];
  return (
    <div
      data-testid={`tier-dots-${tier}`}
      className="flex items-center justify-center gap-1 mt-2"
      aria-label={`${tier} tier`}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <span
          key={i}
          className="block h-1.5 w-1.5 rounded-pill"
          style={{
            background: i < count ? TIER_COLOR[tier] : 'rgba(255,255,255,0.15)',
            boxShadow: i < count ? `0 0 6px ${TIER_COLOR[tier]}` : undefined,
          }}
        />
      ))}
    </div>
  );
}

/**
 * `AchievementBadge` — a small `<GlassCard>` with the badge emoji, label and
 * optional tier dots. Locked badges are dimmed + grayscale with a small lock
 * icon top-right; unlocked badges glow and bob.
 */
export function AchievementBadge({
  label,
  emoji,
  description,
  tier,
  unlocked,
  className,
}: AchievementBadgeProps) {
  return (
    <motion.div
      initial={false}
      animate={unlocked ? { scale: [0.95, 1.05, 1] } : { scale: 1 }}
      transition={spring.bounce}
      className={`relative ${unlocked ? '' : 'opacity-30 grayscale'} ${className ?? ''}`}
    >
      <GlassCard
        variant="default"
        className={`flex flex-col items-center text-center !p-4 ${
          unlocked ? 'shadow-glow-primary' : ''
        }`}
      >
        {!unlocked && (
          <span
            data-testid="badge-lock"
            aria-hidden
            className="absolute top-2 right-2 text-text-muted"
          >
            <LockIcon />
          </span>
        )}
        <motion.span
          className="text-3xl mb-2 block"
          animate={unlocked ? { y: [0, -3, 0] } : undefined}
          transition={
            unlocked ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' } : undefined
          }
          aria-hidden
        >
          {emoji}
        </motion.span>
        <span className="font-bold text-sm text-text-light leading-tight">{label}</span>
        {description && (
          <span className="text-xs text-text-muted mt-1 leading-snug">{description}</span>
        )}
        {tier && <TierDots tier={tier} />}
      </GlassCard>
    </motion.div>
  );
}

export interface AchievementBadgeGridProps {
  badges: (BadgeDef & { unlocked: boolean })[];
  className?: string;
}

export function AchievementBadgeGrid({ badges, className }: AchievementBadgeGridProps) {
  return (
    <div className={`grid grid-cols-3 sm:grid-cols-4 gap-4 ${className ?? ''}`}>
      {badges.map((b) => (
        <AchievementBadge key={b.id} {...b} />
      ))}
    </div>
  );
}

export const defaultBadges: BadgeDef[] = [
  { id: 'first-save', label: 'First Save', emoji: '💰', description: 'You added your first goal', tier: 'bronze' },
  { id: 'goal-achieved', label: 'Goal Achieved', emoji: '🏆', description: 'Reached a savings goal', tier: 'silver' },
  { id: 'streak-3', label: 'On a Streak', emoji: '🔥', description: '3 deposits in a row', tier: 'bronze' },
  { id: 'big-saver', label: 'Big Saver', emoji: '💎', description: 'Saved $100', tier: 'silver' },
  { id: 'consistent', label: 'Consistent', emoji: '⭐', description: 'Saved every week for a month', tier: 'silver' },
  { id: 'goal-master', label: 'Goal Master', emoji: '👑', description: 'Completed 5 goals', tier: 'gold' },
  { id: 'helper', label: 'Helper', emoji: '🤝', description: 'Completed 10 chores', tier: 'bronze' },
  { id: 'overachiever', label: 'Overachiever', emoji: '🚀', description: 'Hit a goal early', tier: 'gold' },
];
