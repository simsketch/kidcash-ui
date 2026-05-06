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
});
