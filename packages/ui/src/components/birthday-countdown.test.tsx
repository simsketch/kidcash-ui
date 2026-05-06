import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BirthdayCountdown } from './birthday-countdown';

function dayOffset(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(12, 0, 0, 0);
  return d;
}

describe('<BirthdayCountdown>', () => {
  it('renders the day count and label for a future date', () => {
    render(<BirthdayCountdown date={dayOffset(7)} label="Party" />);
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('days until')).toBeInTheDocument();
    expect(screen.getByText('Party')).toBeInTheDocument();
  });

  it('renders the today state', () => {
    render(<BirthdayCountdown date={dayOffset(0)} label="Birthday" />);
    expect(screen.getByText(/Birthday today!/)).toBeInTheDocument();
  });

  it('renders the past state', () => {
    render(<BirthdayCountdown date={dayOffset(-3)} label="Party" />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText(/days since Party/)).toBeInTheDocument();
  });

  it('accepts an ISO string', () => {
    const tomorrow = dayOffset(1).toISOString();
    render(<BirthdayCountdown date={tomorrow} label="Party" />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/day until/)).toBeInTheDocument();
  });

  it('calls onReached exactly once when date is today', () => {
    const onReached = vi.fn();
    const { rerender } = render(<BirthdayCountdown date={dayOffset(0)} onReached={onReached} />);
    rerender(<BirthdayCountdown date={dayOffset(0)} onReached={onReached} />);
    expect(onReached).toHaveBeenCalledTimes(1);
  });

  it('does not call onReached when date is in the future', () => {
    const onReached = vi.fn();
    render(<BirthdayCountdown date={dayOffset(5)} onReached={onReached} />);
    expect(onReached).not.toHaveBeenCalled();
  });
});
