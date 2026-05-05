export const colors = {
  primary: '#8b5cf6',
  primaryLight: '#a78bfa',
  primaryDark: '#7c3aed',
  secondary: '#ec4899',
  accent: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  bgDark: '#0f0b1a',
  textLight: '#f1f5f9',
  textMuted: '#64748b',
} as const;

export type ColorToken = keyof typeof colors;
