export const colors = {
  // Brand
  primary: '#8b5cf6',
  primaryLight: '#a78bfa',
  primaryDark: '#7c3aed',
  secondary: '#ec4899',
  accent: '#06b6d4',

  // Semantic
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',

  // Surface
  bgDark: '#0a0612',
  textLight: '#fafafa',
  textMuted: '#a1a1aa',

  // Vibrancy / liquid-glass tier
  glass: {
    surface: 'rgba(255, 255, 255, 0.05)',
    surfaceHover: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.1)',
    borderStrong: 'rgba(255, 255, 255, 0.15)',
    highlight: 'rgba(255, 255, 255, 0.06)',
  },

  // Aurora gradient stops
  gradientStops: {
    aurora: ['#8b5cf6', '#ec4899', '#06b6d4'],
    sunset: ['#f59e0b', '#ec4899', '#8b5cf6'],
    forest: ['#10b981', '#06b6d4', '#8b5cf6'],
    flame: ['#ef4444', '#f59e0b', '#ec4899'],
  },
} as const;

export type ColorToken = keyof typeof colors;
