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
    expect(el.getAttribute('data-glow')).toBe('primary');
    expect(el.style.boxShadow).toContain('rgba(139, 92, 246');
  });

  it('does not apply a persistent glow halo when glow="none"', () => {
    const { container } = render(<GlassCard glow="none">x</GlassCard>);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute('data-glow')).toBeNull();
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
    expect(el.style.boxShadow).not.toContain('rgba(6, 182, 212');
    expect(el.style.boxShadow).not.toContain('rgba(16, 185, 129');
  });

  it('default card has no hover-glow wired up', () => {
    const { container } = render(<GlassCard>x</GlassCard>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
    expect(el.getAttribute('data-hover-glow')).toBeNull();
    // Hover is a no-op when not opted in.
    fireEvent.mouseEnter(el);
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
  });

  it('fades the hover glow in on mouseEnter and out on mouseLeave when opted in', () => {
    const { container } = render(<GlassCard hoverGlow="primary">x</GlassCard>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
    fireEvent.mouseEnter(el);
    expect(el.style.boxShadow).toContain('rgba(139, 92, 246');
    fireEvent.mouseLeave(el);
    expect(el.style.boxShadow).not.toContain('rgba(139, 92, 246');
  });

  it('forwards extra className', () => {
    const { container } = render(<GlassCard className="custom-foo">x</GlassCard>);
    expect(container.firstChild).toHaveClass('custom-foo');
  });
});
