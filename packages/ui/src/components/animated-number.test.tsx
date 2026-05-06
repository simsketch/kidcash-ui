import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AnimatedNumber } from './animated-number';

describe('<AnimatedNumber>', () => {
  it('renders the initial value', () => {
    render(<AnimatedNumber value={42} duration={0} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('honors a custom format function', () => {
    render(
      <AnimatedNumber
        value={1234.5}
        duration={0}
        format={(n) => `$${n.toFixed(2)}`}
      />,
    );
    expect(screen.getByText('$1234.50')).toBeInTheDocument();
  });

  it('applies tabular-nums + custom className', () => {
    const { container } = render(
      <AnimatedNumber value={10} duration={0} className="text-7xl" />,
    );
    expect(container.firstChild).toHaveClass('tabular-nums');
    expect(container.firstChild).toHaveClass('text-7xl');
  });

  it('formats large numbers with locale defaults', () => {
    render(<AnimatedNumber value={9999} duration={0} />);
    // toLocaleString may produce "9,999" in en-US; assert via numeric content
    const el = screen.getByText(/9.?999/);
    expect(el).toBeInTheDocument();
  });
});
