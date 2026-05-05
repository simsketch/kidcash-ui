import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FloatingCoins } from './floating-coins';

describe('<FloatingCoins>', () => {
  it('renders the requested count of coins', () => {
    render(<FloatingCoins count={5} />);
    const coins = screen.getAllByText('🪙');
    expect(coins).toHaveLength(5);
  });

  it('respects a custom emoji', () => {
    render(<FloatingCoins count={3} emoji="⭐" />);
    const stars = screen.getAllByText('⭐');
    expect(stars).toHaveLength(3);
  });

  it('caps count at 50', () => {
    render(<FloatingCoins count={100} />);
    const coins = screen.getAllByText('🪙');
    expect(coins).toHaveLength(50);
  });

  it('applies custom className', () => {
    const { container } = render(<FloatingCoins count={1} className="z-50" />);
    expect(container.firstChild).toHaveClass('z-50');
  });
});
