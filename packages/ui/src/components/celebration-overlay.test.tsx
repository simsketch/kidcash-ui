import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CelebrationOverlay } from './celebration-overlay';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

describe('<CelebrationOverlay>', () => {
  it('renders nothing when open=false', () => {
    const { container } = render(
      <CelebrationOverlay open={false} onClose={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders title and subtitle when open', () => {
    render(
      <CelebrationOverlay
        open={true}
        onClose={() => {}}
        title="You did it!"
        subtitle="Goal complete"
      />,
    );
    expect(screen.getByText('You did it!')).toBeInTheDocument();
    expect(screen.getByText('Goal complete')).toBeInTheDocument();
  });

  it('renders the default emoji', () => {
    render(<CelebrationOverlay open={true} onClose={() => {}} />);
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('calls onClose after duration', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<CelebrationOverlay open={true} onClose={onClose} duration={1000} />);
    act(() => vi.advanceTimersByTime(1500));
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('calls playSound exactly once when opened', () => {
    const playSound = vi.fn();
    const { rerender } = render(
      <CelebrationOverlay open={false} onClose={() => {}} playSound={playSound} />,
    );
    rerender(<CelebrationOverlay open={true} onClose={() => {}} playSound={playSound} />);
    rerender(<CelebrationOverlay open={true} onClose={() => {}} playSound={playSound} />);
    expect(playSound).toHaveBeenCalledTimes(1);
  });
});
