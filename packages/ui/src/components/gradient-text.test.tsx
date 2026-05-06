import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GradientText } from './gradient-text';

describe('<GradientText>', () => {
  it('renders children', () => {
    render(<GradientText>Hello</GradientText>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies the aurora utility by default', () => {
    const { container } = render(<GradientText>Hi</GradientText>);
    expect(container.firstChild).toHaveClass('text-gradient-aurora');
  });

  it.each(['sunset', 'forest', 'flame'] as const)(
    'applies the %s utility class',
    (variant) => {
      const { container } = render(<GradientText variant={variant}>x</GradientText>);
      expect(container.firstChild).toHaveClass(`text-gradient-${variant}`);
    },
  );

  it('applies the animated utility when variant="animated"', () => {
    const { container } = render(<GradientText variant="animated">x</GradientText>);
    expect(container.firstChild).toHaveClass('text-gradient-animated');
  });

  it('renders the requested element via `as`', () => {
    const { container } = render(
      <GradientText as="h1">Title</GradientText>,
    );
    expect(container.firstChild?.nodeName).toBe('H1');
  });

  it('forwards extra className', () => {
    const { container } = render(
      <GradientText className="text-7xl">Big</GradientText>,
    );
    expect(container.firstChild).toHaveClass('text-7xl');
  });
});
