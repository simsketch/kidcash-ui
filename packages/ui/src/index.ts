// ============================================================================
// @kidcash/ui — public API
// Foundation primitives first; everything else alphabetical.
// ============================================================================

// ---- Foundation primitives (Pass 1) ----
export { GlassCard } from './components/glass-card';
export type { GlassCardProps } from './components/glass-card';
export { Button } from './components/button';
export type { ButtonProps } from './components/button';
export { GradientText } from './components/gradient-text';
export type { GradientTextProps } from './components/gradient-text';
export { AnimatedNumber } from './components/animated-number';
export type { AnimatedNumberProps } from './components/animated-number';

// ---- Components (Pass 2A — rebuilt on liquid-glass foundation) ----
export {
  AchievementBadge,
  AchievementBadgeGrid,
  defaultBadges,
} from './components/achievement-badge';
export type {
  BadgeDef,
  BadgeTier,
  AchievementBadgeProps,
  AchievementBadgeGridProps,
} from './components/achievement-badge';

export { AnimatedBalance } from './components/animated-balance';
export type { AnimatedBalanceProps } from './components/animated-balance';

export { BackToTop } from './components/back-to-top';
export type { BackToTopProps } from './components/back-to-top';

export { BirthdayCountdown } from './components/birthday-countdown';
export type { BirthdayCountdownProps } from './components/birthday-countdown';

export { CelebrationOverlay } from './components/celebration-overlay';
export type { CelebrationOverlayProps } from './components/celebration-overlay';

export { Confetti } from './components/confetti';
export type { ConfettiProps, ConfettiIntensity } from './components/confetti';

export { EmojiPicker, defaultEmojis } from './components/emoji-picker';
export type { EmojiPickerProps } from './components/emoji-picker';

export { FloatingCoins } from './components/floating-coins';
export type { FloatingCoinsProps, FloatingCoinsVariant } from './components/floating-coins';

export { KidAvatar } from './components/kid-avatar';
export type { KidAvatarProps, KidAvatarSize, KidAvatarVariant } from './components/kid-avatar';

export { ProgressBar } from './components/progress-bar';
export type {
  ProgressBarProps,
  ProgressBarVariant,
  ProgressBarSize,
} from './components/progress-bar';

export { ThemeToggle } from './components/theme-toggle';
export type { Theme, ThemeToggleProps } from './components/theme-toggle';

export { ToastProvider, useToast } from './components/toast';
export type {
  ToastVariant,
  ToastOptions,
  ToastContextValue,
  ToastItem,
} from './components/toast';

// ---- Components (Pass 2B — generic primitives) ----
export { Pill } from './components/pill';
export type { PillProps, PillVariant, PillSize } from './components/pill';

export { Tooltip } from './components/tooltip';
export type { TooltipProps, TooltipPosition } from './components/tooltip';

export { Skeleton } from './components/skeleton';
export type { SkeletonProps, SkeletonShape } from './components/skeleton';

export { Sheet } from './components/sheet';
export type { SheetProps } from './components/sheet';

export { Slider } from './components/slider';
export type { SliderProps } from './components/slider';

export { Avatar, AvatarStack } from './components/avatar';
export type { AvatarProps, AvatarStackProps, AvatarSize } from './components/avatar';

// ---- Tokens ----
export * from './tokens';
