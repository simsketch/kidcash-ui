import { render, screen } from '@testing-library/react';
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

  it('applies a glow utility when glow is set', () => {
    const { container } = render(<GlassCard glow="primary">x</GlassCard>);
    expect(container.firstChild).toHaveClass('shadow-glow-primary');
  });

  it('does not apply a glow class when glow="none"', () => {
    const { container } = render(<GlassCard glow="none">x</GlassCard>);
    expect(container.firstChild).not.toHaveClass('shadow-glow-primary');
    expect(container.firstChild).not.toHaveClass('shadow-glow-accent');
    expect(container.firstChild).not.toHaveClass('shadow-glow-success');
  });

  it('forwards extra className', () => {
    const { container } = render(<GlassCard className="custom-foo">x</GlassCard>);
    expect(container.firstChild).toHaveClass('custom-foo');
  });
});
