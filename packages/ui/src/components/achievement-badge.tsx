'use client';
import { motion } from 'framer-motion';

export interface BadgeDef {
  id: string;
  label: string;
  emoji: string;
  description?: string;
}

export interface AchievementBadgeProps extends BadgeDef {
  unlocked: boolean;
  className?: string;
}

export function AchievementBadge({
  id,
  label,
  emoji,
  description,
  unlocked,
  className,
}: AchievementBadgeProps) {
  return (
    <motion.div
      key={id}
      initial={false}
      animate={unlocked ? { scale: [1, 1.1, 1] } : undefined}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center text-center p-3 rounded-card bg-white/5 ${unlocked ? 'shadow-glow-primary' : 'opacity-50 grayscale'} ${className ?? ''}`}
    >
      <span className="text-3xl mb-1" aria-hidden>
        {emoji}
      </span>
      <span className="font-bold text-sm">{label}</span>
      {description && <span className="text-xs text-text-muted mt-1">{description}</span>}
    </motion.div>
  );
}

export interface AchievementBadgeGridProps {
  badges: (BadgeDef & { unlocked: boolean })[];
  className?: string;
}

export function AchievementBadgeGrid({ badges, className }: AchievementBadgeGridProps) {
  return (
    <div className={`grid grid-cols-3 sm:grid-cols-4 gap-3 ${className ?? ''}`}>
      {badges.map((b) => (
        <AchievementBadge key={b.id} {...b} />
      ))}
    </div>
  );
}

export const defaultBadges: BadgeDef[] = [
  { id: 'first-save', label: 'First Save', emoji: '💰', description: 'You added your first goal' },
  { id: 'goal-achieved', label: 'Goal Achieved', emoji: '🏆', description: 'Reached a savings goal' },
  { id: 'streak-3', label: 'On a Streak', emoji: '🔥', description: '3 deposits in a row' },
  { id: 'big-saver', label: 'Big Saver', emoji: '💎', description: 'Saved $100' },
  { id: 'consistent', label: 'Consistent', emoji: '⭐', description: 'Saved every week for a month' },
  { id: 'goal-master', label: 'Goal Master', emoji: '👑', description: 'Completed 5 goals' },
  { id: 'helper', label: 'Helper', emoji: '🤝', description: 'Completed 10 chores' },
  { id: 'overachiever', label: 'Overachiever', emoji: '🚀', description: 'Hit a goal early' },
];
