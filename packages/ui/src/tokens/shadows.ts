export const shadows = {
  // Layered card shadows — inset highlight + ambient drop
  card: '0 1px 0 rgba(255,255,255,0.05) inset, 0 8px 32px rgba(0, 0, 0, 0.4)',
  cardHover: '0 1px 0 rgba(255,255,255,0.08) inset, 0 16px 48px rgba(0, 0, 0, 0.5)',

  // Vibrancy glow ring (multi-layer for depth)
  glow: {
    primary: '0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)',
    accent: '0 0 40px rgba(6, 182, 212, 0.4), 0 0 80px rgba(6, 182, 212, 0.2)',
    success: '0 0 40px rgba(16, 185, 129, 0.4)',
    danger: '0 0 40px rgba(239, 68, 68, 0.4)',
  },

  // Backwards-compat aliases (legacy single-glow shadows)
  glowPrimary: '0 4px 14px rgba(139, 92, 246, 0.3)',
  glowAccent: '0 4px 14px rgba(6, 182, 212, 0.3)',
  glowSuccess: '0 4px 14px rgba(16, 185, 129, 0.3)',
} as const;

export type ShadowToken = keyof typeof shadows;
