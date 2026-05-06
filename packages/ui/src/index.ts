// ============================================================================
// @kidcash/ui — public API
// Foundation primitives first, then components alphabetical, then themes,
// then tokens.
// ============================================================================

// ---- Foundation primitives ----
export { GlassCard } from './components/glass-card';
export type { GlassCardProps } from './components/glass-card';
export { Button } from './components/button';
export type { ButtonProps } from './components/button';
export { GradientText } from './components/gradient-text';
export type { GradientTextProps } from './components/gradient-text';
export { AnimatedNumber } from './components/animated-number';
export type { AnimatedNumberProps } from './components/animated-number';

// ---- Components (alphabetical) ----
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

export { Avatar, AvatarStack } from './components/avatar';
export type { AvatarProps, AvatarStackProps, AvatarSize } from './components/avatar';

export { BackToTop } from './components/back-to-top';
export type { BackToTopProps } from './components/back-to-top';

export { BirthdayCountdown } from './components/birthday-countdown';
export type { BirthdayCountdownProps } from './components/birthday-countdown';

export { CelebrationOverlay } from './components/celebration-overlay';
export type { CelebrationOverlayProps } from './components/celebration-overlay';

export { CommandPalette } from './components/command-palette';
export type { CommandPaletteProps, CommandItem } from './components/command-palette';

export { Confetti } from './components/confetti';
export type { ConfettiProps, ConfettiIntensity } from './components/confetti';

export { EmojiPicker, defaultEmojis } from './components/emoji-picker';
export type { EmojiPickerProps } from './components/emoji-picker';

export { FloatingCoins } from './components/floating-coins';
export type { FloatingCoinsProps, FloatingCoinsVariant } from './components/floating-coins';

export { Keyboard } from './components/keyboard';
export type { KeyboardProps } from './components/keyboard';

export { Marquee } from './components/marquee';
export type { MarqueeProps } from './components/marquee';

export { Modal } from './components/modal';
export type { ModalProps, ModalSize } from './components/modal';

export { Pill } from './components/pill';
export type { PillProps, PillVariant, PillSize } from './components/pill';

export { ProgressBar } from './components/progress-bar';
export type {
  ProgressBarProps,
  ProgressBarVariant,
  ProgressBarSize,
} from './components/progress-bar';

export { Sheet } from './components/sheet';
export type { SheetProps } from './components/sheet';

export { Skeleton } from './components/skeleton';
export type { SkeletonProps, SkeletonShape } from './components/skeleton';

export { Slider } from './components/slider';
export type { SliderProps } from './components/slider';

export { Spotlight } from './components/spotlight';
export type { SpotlightProps } from './components/spotlight';

export { ThemeSelector } from './components/theme-selector';
export type { ThemeSelectorProps } from './components/theme-selector';

export { ToastProvider, useToast } from './components/toast';
export type {
  ToastVariant,
  ToastOptions,
  ToastContextValue,
  ToastItem,
} from './components/toast';

export { Tooltip } from './components/tooltip';
export type { TooltipProps, TooltipPosition } from './components/tooltip';

// ---- Themes ----
export {
  ThemeProvider,
  useTheme,
  useThemeOptional,
  themes,
  themeNames,
  lightThemeNames,
  getTheme,
  isLightTheme,
} from './themes';
export type { Theme, ThemeName, ThemeProviderProps } from './themes';

// ---- Tokens ----
export * from './tokens';
