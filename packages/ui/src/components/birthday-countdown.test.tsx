import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { BirthdayCountdown } from './birthday-countdown';

function dayOffset(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(12, 0, 0, 0);
  return d;
}

describe('<BirthdayCountdown>', () => {
  it('renders future date as "X days until {label}"', () => {
    render(<BirthdayCountdown date={dayOffset(7)} label="Party" />);
    expect(screen.getByText(/7 days until Party/)).toBeInTheDocument();
  });

  it('renders today as "{label} today!"', () => {
    render(<BirthdayCountdown date={dayOffset(0)} label="Birthday" />);
    expect(screen.getByText(/Birthday today!/)).toBeInTheDocument();
  });

  it('renders past as "{label} was X days ago"', () => {
    render(<BirthdayCountdown date={dayOffset(-3)} label="Party" />);
    expect(screen.getByText(/Party was 3 days ago/)).toBeInTheDocument();
  });

  it('accepts an ISO string', () => {
    const tomorrow = dayOffset(1).toISOString();
    render(<BirthdayCountdown date={tomorrow} label="Party" />);
    expect(screen.getByText(/1 days? until Party/)).toBeInTheDocument();
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
