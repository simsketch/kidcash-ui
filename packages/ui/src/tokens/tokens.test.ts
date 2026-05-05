import { describe, it, expect } from 'vitest';
import { colors, animations, shadows } from './index';

describe('design tokens', () => {
  it('exports the brand color palette', () => {
    expect(colors.primary).toBe('#8b5cf6');
    expect(colors.secondary).toBe('#ec4899');
    expect(colors.accent).toBe('#06b6d4');
    expect(colors.success).toBe('#10b981');
  });

  it('exports animation curves', () => {
    expect(animations.bounceIn).toBeTruthy();
    expect(animations.mascotBob).toBeTruthy();
  });

  it('exports shadow presets', () => {
    expect(shadows.card).toContain('rgba');
  });
});
