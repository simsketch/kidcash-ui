import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './skeleton';

describe('<Skeleton>', () => {
  it('renders with the default rect shape', () => {
    const { container } = render(<Skeleton data-testid="sk" />);
    expect(container.firstChild).toHaveClass('rounded-card');
  });

  it('applies a circle class when shape="circle"', () => {
    const { container } = render(<Skeleton shape="circle" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });

  it('renders multiple bars when count > 1 for text shape', () => {
    const { container } = render(<Skeleton shape="text" count={3} />);
    const bars = container.querySelectorAll('[data-testid="skeleton-bar"]');
    expect(bars).toHaveLength(3);
  });

  it('applies a custom width via inline style', () => {
    const { container } = render(<Skeleton width={120} height={40} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe('120px');
    expect(el.style.height).toBe('40px');
  });
});
