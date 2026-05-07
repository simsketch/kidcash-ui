/**
 * Theme catalog — 9 named visual themes ported verbatim from KidCash.
 *
 * Each theme is a flat record of CSS custom-property values (background
 * gradients, glass-card surfaces, accent colors, status colors, etc.). The
 * `<ThemeProvider>` writes these onto `<html>` so any component can consume
 * them via `var(--theme-*)`.
 *
 *  Light themes: cotton-cloud, lemon-fizz, mint-breeze
 *  Dark themes:  everything else
 */

export type ThemeName =
  | 'aurora'
  | 'frosted-crystal'
  | 'candy-glow'
  | 'ocean-depth'
  | 'sunset-dunes'
  | 'midnight-garden'
  | 'cotton-cloud'
  | 'lemon-fizz'
  | 'mint-breeze';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  name: ThemeName;
  label: string;
  description: string;
  /** Whether this theme reads as light- or dark-mode. Drives shimmer color,
   *  ThemeSelector badge, and any consumer that needs to know surface tone. */
  mode: ThemeMode;
  // Background gradient for body
  background: string;
  // Glass card styling
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  cardHoverBg: string;
  // Accent colors
  accentPrimary: string;
  accentSecondary: string;
  accentGlow: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  // Primary button surface — per-theme so warm themes don't render with the
  // aurora purple gradient by default.
  primaryGradient: string;
  /** Drop shadow on primary buttons. Should harmonise with `primaryGradient`. */
  primaryShadow: string;
  // Status colors
  successBg: string;
  successBorder: string;
  successText: string;
  dangerBg: string;
  dangerBorder: string;
  dangerText: string;
  // Progress bars
  progressGradient: string;
  // Shimmer overlay color for skeletons. White on dark themes is invisible
  // on light backgrounds — pick per mode.
  shimmerColor: string;
  // Ambient orb colors (for floating background effects)
  orb1: string;
  orb2: string;
  orb3: string;
  // Preview colors for the selector (4 swatches)
  previewColors: [string, string, string, string];
}

export const themes: Record<ThemeName, Theme> = {
  aurora: {
    name: 'aurora',
    label: 'Aurora',
    description: 'Deep indigo with multi-color aurora shimmer',
    mode: 'dark',
    background: 'linear-gradient(135deg, #0f0b1a 0%, #1a1040 30%, #0d1117 60%, #111827 100%)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(139, 92, 246, 0.15)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    cardHoverBg: 'rgba(255, 255, 255, 0.08)',
    accentPrimary: '#a78bfa',
    accentSecondary: '#34d399',
    accentGlow: 'rgba(167, 139, 250, 0.3)',
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    primaryGradient:
      'linear-gradient(135deg, #7c3aed 0%, #a855f7 20%, #c026d3 40%, #ec4899 55%, #8b5cf6 75%, #06b6d4 100%)',
    primaryShadow: '0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)',
    successBg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    successBorder: 'rgba(16, 185, 129, 0.3)',
    successText: '#ffffff',
    dangerBg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    dangerBorder: 'rgba(239, 68, 68, 0.3)',
    dangerText: '#ffffff',
    progressGradient: 'linear-gradient(90deg, #a78bfa 0%, #ec4899 50%, #06b6d4 100%)',
    shimmerColor: 'rgba(255, 255, 255, 0.10)',
    orb1: 'rgba(139, 92, 246, 0.15)',
    orb2: 'rgba(52, 211, 153, 0.1)',
    orb3: 'rgba(6, 182, 212, 0.1)',
    previewColors: ['#a78bfa', '#34d399', '#06b6d4', '#1a1040'],
  },
  'frosted-crystal': {
    name: 'frosted-crystal',
    label: 'Frosted Crystal',
    description: 'Minimal dark purple with crystalline glass',
    mode: 'dark',
    background: 'linear-gradient(135deg, #0c0015 0%, #1a0a2e 40%, #0f0520 70%, #0a0012 100%)',
    cardBg: 'rgba(255, 255, 255, 0.04)',
    cardBorder: 'rgba(200, 180, 255, 0.1)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
    cardHoverBg: 'rgba(255, 255, 255, 0.07)',
    accentPrimary: '#c4b5fd',
    accentSecondary: '#e9d5ff',
    accentGlow: 'rgba(196, 181, 253, 0.2)',
    textPrimary: '#ede9fe',
    textSecondary: '#c4b5fd',
    textMuted: '#a89cd1',
    primaryGradient:
      'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%)',
    primaryShadow: '0 0 40px rgba(167, 139, 250, 0.4), 0 0 80px rgba(167, 139, 250, 0.2)',
    successBg: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
    successBorder: 'rgba(167, 139, 250, 0.3)',
    successText: '#ffffff',
    dangerBg: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
    dangerBorder: 'rgba(244, 114, 182, 0.3)',
    dangerText: '#ffffff',
    progressGradient: 'linear-gradient(90deg, #c4b5fd 0%, #e9d5ff 50%, #a78bfa 100%)',
    shimmerColor: 'rgba(255, 255, 255, 0.10)',
    orb1: 'rgba(196, 181, 253, 0.08)',
    orb2: 'rgba(233, 213, 255, 0.06)',
    orb3: 'rgba(167, 139, 250, 0.08)',
    previewColors: ['#c4b5fd', '#e9d5ff', '#7c3aed', '#1a0a2e'],
  },
  'candy-glow': {
    name: 'candy-glow',
    label: 'Candy Glow',
    description: 'Vibrant neon pink, purple, and cyan',
    mode: 'dark',
    background: 'linear-gradient(135deg, #1a0025 0%, #2d0040 30%, #1a002e 60%, #0f001a 100%)',
    cardBg: 'rgba(255, 255, 255, 0.06)',
    cardBorder: 'rgba(236, 72, 153, 0.2)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
    cardHoverBg: 'rgba(255, 255, 255, 0.1)',
    accentPrimary: '#f472b6',
    accentSecondary: '#22d3ee',
    accentGlow: 'rgba(244, 114, 182, 0.3)',
    textPrimary: '#fdf2f8',
    textSecondary: '#f9a8d4',
    textMuted: '#d6a2bd',
    primaryGradient:
      'linear-gradient(135deg, #f472b6 0%, #ec4899 35%, #c026d3 65%, #22d3ee 100%)',
    primaryShadow: '0 0 40px rgba(236, 72, 153, 0.4), 0 0 80px rgba(236, 72, 153, 0.2)',
    successBg: 'linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)',
    successBorder: 'rgba(34, 211, 238, 0.3)',
    successText: '#ffffff',
    dangerBg: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
    dangerBorder: 'rgba(251, 113, 133, 0.3)',
    dangerText: '#ffffff',
    progressGradient: 'linear-gradient(90deg, #f472b6 0%, #c084fc 50%, #22d3ee 100%)',
    shimmerColor: 'rgba(255, 255, 255, 0.10)',
    orb1: 'rgba(236, 72, 153, 0.12)',
    orb2: 'rgba(192, 132, 252, 0.1)',
    orb3: 'rgba(34, 211, 238, 0.1)',
    previewColors: ['#f472b6', '#c084fc', '#22d3ee', '#2d0040'],
  },
  'ocean-depth': {
    name: 'ocean-depth',
    label: 'Ocean Depth',
    description: 'Deep navy with calm cyan and teal glass',
    mode: 'dark',
    background: 'linear-gradient(135deg, #020617 0%, #0c1e3a 30%, #071525 60%, #030712 100%)',
    cardBg: 'rgba(6, 182, 212, 0.05)',
    cardBorder: 'rgba(6, 182, 212, 0.12)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
    cardHoverBg: 'rgba(6, 182, 212, 0.08)',
    accentPrimary: '#22d3ee',
    accentSecondary: '#2dd4bf',
    accentGlow: 'rgba(34, 211, 238, 0.2)',
    textPrimary: '#e0f2fe',
    textSecondary: '#7dd3fc',
    textMuted: '#7aa6c4',
    primaryGradient:
      'linear-gradient(135deg, #22d3ee 0%, #06b6d4 50%, #3b82f6 100%)',
    primaryShadow: '0 0 40px rgba(34, 211, 238, 0.4), 0 0 80px rgba(34, 211, 238, 0.2)',
    successBg: 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)',
    successBorder: 'rgba(45, 212, 191, 0.3)',
    successText: '#ffffff',
    dangerBg: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
    dangerBorder: 'rgba(248, 113, 113, 0.3)',
    dangerText: '#ffffff',
    progressGradient: 'linear-gradient(90deg, #06b6d4 0%, #22d3ee 50%, #2dd4bf 100%)',
    shimmerColor: 'rgba(255, 255, 255, 0.10)',
    orb1: 'rgba(6, 182, 212, 0.1)',
    orb2: 'rgba(45, 212, 191, 0.08)',
    orb3: 'rgba(59, 130, 246, 0.08)',
    previewColors: ['#22d3ee', '#2dd4bf', '#3b82f6', '#0c1e3a'],
  },
  'sunset-dunes': {
    name: 'sunset-dunes',
    label: 'Sunset Dunes',
    description: 'Warm amber and golden sand tones',
    mode: 'dark',
    background: 'linear-gradient(135deg, #1a0f00 0%, #2d1a05 30%, #1f1208 60%, #0f0a04 100%)',
    cardBg: 'rgba(245, 158, 11, 0.05)',
    cardBorder: 'rgba(245, 158, 11, 0.15)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
    cardHoverBg: 'rgba(245, 158, 11, 0.08)',
    accentPrimary: '#fbbf24',
    accentSecondary: '#fb923c',
    accentGlow: 'rgba(251, 191, 36, 0.2)',
    textPrimary: '#fef3c7',
    textSecondary: '#fcd34d',
    textMuted: '#c4a673',
    primaryGradient:
      'linear-gradient(135deg, #fbbf24 0%, #fb923c 35%, #f97316 65%, #ef4444 100%)',
    primaryShadow: '0 0 40px rgba(251, 146, 60, 0.4), 0 0 80px rgba(251, 146, 60, 0.2)',
    successBg: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    successBorder: 'rgba(251, 191, 36, 0.3)',
    successText: '#1a0f00',
    dangerBg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    dangerBorder: 'rgba(239, 68, 68, 0.3)',
    dangerText: '#ffffff',
    progressGradient: 'linear-gradient(90deg, #fbbf24 0%, #fb923c 50%, #f97316 100%)',
    shimmerColor: 'rgba(255, 255, 255, 0.10)',
    orb1: 'rgba(251, 191, 36, 0.1)',
    orb2: 'rgba(251, 146, 60, 0.08)',
    orb3: 'rgba(249, 115, 22, 0.08)',
    previewColors: ['#fbbf24', '#fb923c', '#f97316', '#2d1a05'],
  },
  'midnight-garden': {
    name: 'midnight-garden',
    label: 'Midnight Garden',
    description: 'Deep forest green with emerald glass',
    mode: 'dark',
    background: 'linear-gradient(135deg, #021a0a 0%, #0a2e18 30%, #051f0e 60%, #010f06 100%)',
    cardBg: 'rgba(16, 185, 129, 0.05)',
    cardBorder: 'rgba(16, 185, 129, 0.12)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
    cardHoverBg: 'rgba(16, 185, 129, 0.08)',
    accentPrimary: '#34d399',
    accentSecondary: '#a3e635',
    accentGlow: 'rgba(52, 211, 153, 0.2)',
    textPrimary: '#ecfdf5',
    textSecondary: '#6ee7b7',
    textMuted: '#7fb59b',
    primaryGradient:
      'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
    primaryShadow: '0 0 40px rgba(52, 211, 153, 0.4), 0 0 80px rgba(52, 211, 153, 0.2)',
    successBg: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    successBorder: 'rgba(52, 211, 153, 0.3)',
    successText: '#021a0a',
    dangerBg: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
    dangerBorder: 'rgba(248, 113, 113, 0.3)',
    dangerText: '#ffffff',
    progressGradient: 'linear-gradient(90deg, #34d399 0%, #a3e635 50%, #10b981 100%)',
    shimmerColor: 'rgba(255, 255, 255, 0.10)',
    orb1: 'rgba(52, 211, 153, 0.1)',
    orb2: 'rgba(163, 230, 53, 0.08)',
    orb3: 'rgba(16, 185, 129, 0.1)',
    previewColors: ['#34d399', '#a3e635', '#10b981', '#0a2e18'],
  },
  'cotton-cloud': {
    name: 'cotton-cloud',
    label: 'Cotton Cloud',
    description: 'Light, airy lavender with soft purple accents',
    mode: 'light',
    background: 'linear-gradient(135deg, #ffffff 0%, #f3e8ff 30%, #ede9fe 60%, #f5f3ff 100%)',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    cardBorder: 'rgba(167, 139, 250, 0.25)',
    cardShadow: '0 4px 16px rgba(139, 92, 246, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
    cardHoverBg: 'rgba(255, 255, 255, 1)',
    accentPrimary: '#8b5cf6',
    accentSecondary: '#ec4899',
    accentGlow: 'rgba(139, 92, 246, 0.15)',
    textPrimary: '#1e1b4b',
    textSecondary: '#4c1d95',
    textMuted: '#6b7280',
    primaryGradient:
      'linear-gradient(135deg, #a78bfa 0%, #c084fc 35%, #ec4899 65%, #8b5cf6 100%)',
    primaryShadow: '0 4px 20px rgba(139, 92, 246, 0.25), 0 8px 32px rgba(236, 72, 153, 0.12)',
    successBg: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
    successBorder: 'rgba(139, 92, 246, 0.3)',
    successText: '#ffffff',
    dangerBg: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    dangerBorder: 'rgba(236, 72, 153, 0.3)',
    dangerText: '#ffffff',
    progressGradient: 'linear-gradient(90deg, #a78bfa 0%, #ec4899 50%, #8b5cf6 100%)',
    shimmerColor: 'rgba(0, 0, 0, 0.06)',
    orb1: 'rgba(167, 139, 250, 0.08)',
    orb2: 'rgba(236, 72, 153, 0.06)',
    orb3: 'rgba(139, 92, 246, 0.06)',
    previewColors: ['#8b5cf6', '#ec4899', '#a78bfa', '#f5f3ff'],
  },
  'lemon-fizz': {
    name: 'lemon-fizz',
    label: 'Lemon Fizz',
    description: 'Bright, playful amber and warm sunshine',
    mode: 'light',
    background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 30%, #fff7ed 60%, #fffbeb 100%)',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    cardBorder: 'rgba(245, 158, 11, 0.25)',
    cardShadow: '0 4px 16px rgba(245, 158, 11, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
    cardHoverBg: 'rgba(255, 255, 255, 1)',
    accentPrimary: '#d97706',
    accentSecondary: '#ea580c',
    accentGlow: 'rgba(217, 119, 6, 0.15)',
    textPrimary: '#451a03',
    textSecondary: '#92400e',
    textMuted: '#6b7280',
    primaryGradient:
      'linear-gradient(135deg, #d97706 0%, #ea580c 35%, #f97316 65%, #fbbf24 100%)',
    primaryShadow: '0 4px 20px rgba(217, 119, 6, 0.25), 0 8px 32px rgba(249, 115, 22, 0.12)',
    successBg: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    successBorder: 'rgba(251, 191, 36, 0.3)',
    successText: '#451a03',
    dangerBg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    dangerBorder: 'rgba(239, 68, 68, 0.3)',
    dangerText: '#ffffff',
    progressGradient: 'linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #d97706 100%)',
    shimmerColor: 'rgba(0, 0, 0, 0.06)',
    orb1: 'rgba(251, 191, 36, 0.08)',
    orb2: 'rgba(249, 115, 22, 0.06)',
    orb3: 'rgba(245, 158, 11, 0.06)',
    previewColors: ['#d97706', '#f97316', '#fbbf24', '#fffbeb'],
  },
  'mint-breeze': {
    name: 'mint-breeze',
    label: 'Mint Breeze',
    description: 'Fresh, clean emerald and calming teal',
    mode: 'light',
    background: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 30%, #f0fdfa 60%, #f0fdf4 100%)',
    cardBg: 'rgba(255, 255, 255, 0.9)',
    cardBorder: 'rgba(16, 185, 129, 0.25)',
    cardShadow: '0 4px 16px rgba(16, 185, 129, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
    cardHoverBg: 'rgba(255, 255, 255, 1)',
    accentPrimary: '#059669',
    accentSecondary: '#0d9488',
    accentGlow: 'rgba(5, 150, 105, 0.15)',
    textPrimary: '#064e3b',
    textSecondary: '#065f46',
    textMuted: '#6b7280',
    primaryGradient:
      'linear-gradient(135deg, #059669 0%, #0d9488 35%, #14b8a6 65%, #34d399 100%)',
    primaryShadow: '0 4px 20px rgba(5, 150, 105, 0.25), 0 8px 32px rgba(20, 184, 166, 0.12)',
    successBg: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)',
    successBorder: 'rgba(52, 211, 153, 0.3)',
    successText: '#ffffff',
    dangerBg: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
    dangerBorder: 'rgba(248, 113, 113, 0.3)',
    dangerText: '#ffffff',
    progressGradient: 'linear-gradient(90deg, #10b981 0%, #14b8a6 50%, #059669 100%)',
    shimmerColor: 'rgba(0, 0, 0, 0.06)',
    orb1: 'rgba(52, 211, 153, 0.08)',
    orb2: 'rgba(20, 184, 166, 0.06)',
    orb3: 'rgba(16, 185, 129, 0.06)',
    previewColors: ['#059669', '#14b8a6', '#34d399', '#f0fdf4'],
  },
};

export const themeNames = Object.keys(themes) as ThemeName[];

export const lightThemeNames: ReadonlySet<ThemeName> = new Set<ThemeName>([
  'cotton-cloud',
  'lemon-fizz',
  'mint-breeze',
]);

export function getTheme(name: ThemeName): Theme {
  return themes[name] ?? themes.aurora;
}

export function isLightTheme(name: ThemeName): boolean {
  return lightThemeNames.has(name);
}
