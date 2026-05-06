import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Confetti } from './confetti';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('<Confetti>', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fires confetti when trigger flips to true', async () => {
    const confetti = (await import('canvas-confetti')).default as unknown as ReturnType<typeof vi.fn>;
    const { rerender } = render(<Confetti trigger={false} />);
    expect(confetti).not.toHaveBeenCalled();
    rerender(<Confetti trigger={true} />);
    expect(confetti).toHaveBeenCalled();
  });

  it('calls onComplete after duration', async () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<Confetti trigger={true} duration={100} onComplete={onComplete} />);
    vi.advanceTimersByTime(150);
    expect(onComplete).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('renders no visible DOM', () => {
    const { container } = render(<Confetti trigger={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('passes the chosen intensity to canvas-confetti', async () => {
    const confetti = (await import('canvas-confetti')).default as unknown as ReturnType<typeof vi.fn>;
    render(<Confetti trigger={true} intensity="wild" />);
    expect(confetti).toHaveBeenCalledWith(
      expect.objectContaining({ particleCount: 200, spread: 100 }),
    );
  });

  it('re-fires when intensity changes while trigger stays true', async () => {
    const confetti = (await import('canvas-confetti')).default as unknown as ReturnType<typeof vi.fn>;
    const { rerender } = render(<Confetti trigger={true} intensity="subtle" />);
    expect(confetti).toHaveBeenCalledTimes(1);
    expect(confetti).toHaveBeenLastCalledWith(
      expect.objectContaining({ particleCount: 40, spread: 50 }),
    );
    rerender(<Confetti trigger={true} intensity="normal" />);
    expect(confetti).toHaveBeenCalledTimes(2);
    expect(confetti).toHaveBeenLastCalledWith(
      expect.objectContaining({ particleCount: 100, spread: 70 }),
    );
    rerender(<Confetti trigger={true} intensity="wild" />);
    expect(confetti).toHaveBeenCalledTimes(3);
    expect(confetti).toHaveBeenLastCalledWith(
      expect.objectContaining({ particleCount: 200, spread: 100 }),
    );
  });

  it('fires on each remount with a fresh key (counter pattern)', async () => {
    const confetti = (await import('canvas-confetti')).default as unknown as ReturnType<typeof vi.fn>;
    const { rerender } = render(<Confetti key={1} trigger intensity="normal" />);
    expect(confetti).toHaveBeenCalledTimes(1);
    rerender(<Confetti key={2} trigger intensity="wild" />);
    expect(confetti).toHaveBeenCalledTimes(2);
  });
});
