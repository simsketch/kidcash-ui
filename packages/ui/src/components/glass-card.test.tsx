import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GlassCard } from './glass-card';

describe('<GlassCard>', () => {
  it('renders children', () => {
    render(<GlassCard>hello world</GlassCard>);
    expect(screen.getByText('hello world')).toBeInTheDocument();
  });

  it('applies the default glass variant class', () => {
    const { container } = render(<GlassCard>x</GlassCard>);
    expect(container.firstChild).toHaveClass('glass');
  });

  it('switches to glass-strong when variant="strong"', () => {
    const { container } = render(<GlassCard variant="strong">x</GlassCard>);
    expect(container.firstChild).toHaveClass('glass-strong');
    expect(container.firstChild).not.toHaveClass('glass-strong glass'); // not both
  });

  it('applies a glow halo via inline box-shadow when glow is set', () => {
    const { container } = render(<GlassCard glow="primary">x</GlassCard>);
    const el = container.firstChild as HTMLElement;
    // The glow rgba is composed into the inline box-shadow alongside the
    // theme card shadow so it can't be clobbered by the inline style.
    expect(el.getAttribute('data-glow')).toBe('primary');
    expect(el.style.boxShadow).toContain('rgba(139, 92, 246');
  });

  it('does not apply a persistent glow halo when glow="none"', () => {
    // hover=true is the default, but at rest (no mouseenter) the hover glow
    // should NOT be in the computed boxShadow.
    const { container } = render(<GlassCard glow="none">x</GlassCard>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('data-glow')).toBeNull();
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
    expect(el.style.boxShadow).not.toContain('rgba(6, 182, 212');
    expect(el.style.boxShadow).not.toContain('rgba(16, 185, 129');
  });

  it('hover=true (default) does not show hover glow at rest', () => {
    const { container } = render(<GlassCard>x</GlassCard>);
    const el = container.firstChild as HTMLElement;
    // At rest, no rgba glow values should appear.
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
    // But the hover glow is wired up via data attribute.
    expect(el.getAttribute('data-hover-glow')).toBe('primary');
  });

  it('applies the hover glow on mouseEnter and removes on mouseLeave', () => {
    const { container } = render(<GlassCard>x</GlassCard>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
    fireEvent.mouseEnter(el);
    expect(el.style.boxShadow).toContain('rgba(139, 92, 246');
    fireEvent.mouseLeave(el);
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
  });

  it('hover=false disables both lift and hover glow', () => {
    const { container } = render(<GlassCard hover={false}>x</GlassCard>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('data-hover-glow')).toBeNull();
    fireEvent.mouseEnter(el);
    // Without hover, mouseEnter is a no-op — boxShadow stays clean.
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
  });

  it('hoverGlow="none" disables only the hover glow but keeps the lift', () => {
    const { container } = render(<GlassCard hoverGlow="none">x</GlassCard>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('data-hover-glow')).toBeNull();
    fireEvent.mouseEnter(el);
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
  });

  it('forwards extra className', () => {
    const { container } = render(<GlassCard className="custom-foo">x</GlassCard>);
    expect(container.firstChild).toHaveClass('custom-foo');
  });
});
