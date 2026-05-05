import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnimatedBalance } from './animated-balance';

describe('<AnimatedBalance>', () => {
  it('renders the final value when duration is 0', () => {
    render(<AnimatedBalance from={0} to={100} duration={0} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('formats values via formatValue prop', () => {
    render(
      <AnimatedBalance
        from={50}
        to={50}
        duration={0}
        formatValue={(n) => `$${n.toFixed(2)}`}
      />
    );
    expect(screen.getByText('$50.00')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedBalance from={0} to={10} duration={0} className="text-3xl" />
    );
    expect(container.firstChild).toHaveClass('text-3xl');
  });
});
