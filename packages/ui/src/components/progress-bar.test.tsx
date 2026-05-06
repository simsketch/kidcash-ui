import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from './progress-bar';

describe('<ProgressBar>', () => {
  it('clamps value to [0, max]', () => {
    render(<ProgressBar value={150} max={100} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('100');
  });

  it('clamps negative value to 0', () => {
    render(<ProgressBar value={-10} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('0');
  });

  it('renders the label when provided', () => {
    render(<ProgressBar value={50} label="Halfway" />);
    expect(screen.getByText('Halfway')).toBeInTheDocument();
  });

  it('applies the variant class', () => {
    render(<ProgressBar value={30} variant="success" />);
    const bar = screen.getByRole('progressbar');
    expect(bar.querySelector('.bg-gradient-success')).toBeTruthy();
  });

  it('exposes correct ARIA attributes', () => {
    render(<ProgressBar value={42} max={100} />);
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('42');
    expect(bar.getAttribute('aria-valuemin')).toBe('0');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
  });

  it('shows the percentage when showValue is set', () => {
    render(<ProgressBar value={42} showValue label="Progress" />);
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('applies the chosen size class', () => {
    const { container } = render(<ProgressBar value={50} size="lg" />);
    expect(container.querySelector('.h-3')).toBeTruthy();
  });
});
