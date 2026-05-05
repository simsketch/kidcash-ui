export const shadows = {
  card: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
  glowPrimary: '0 4px 14px rgba(139, 92, 246, 0.3)',
  glowAccent: '0 4px 14px rgba(6, 182, 212, 0.3)',
  glowSuccess: '0 4px 14px rgba(16, 185, 129, 0.3)',
} as const;

export type ShadowToken = keyof typeof shadows;
