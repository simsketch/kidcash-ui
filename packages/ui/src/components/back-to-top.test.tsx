import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BackToTop } from './back-to-top';

function setScroll(y: number) {
  Object.defineProperty(window, 'scrollY', { value: y, writable: true });
  window.dispatchEvent(new Event('scroll'));
}

describe('<BackToTop>', () => {
  it('hides initially when scroll is below threshold', () => {
    setScroll(0);
    render(<BackToTop showAfter={400} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('shows after scrolling past threshold', () => {
    setScroll(0);
    render(<BackToTop showAfter={400} />);
    act(() => setScroll(500));
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('scrolls to top when clicked', () => {
    const scrollTo = vi.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollTo, writable: true });
    setScroll(500);
    render(<BackToTop showAfter={100} />);
    fireEvent.click(screen.getByRole('button'));
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });

  it('uses the provided aria-label', () => {
    setScroll(500);
    render(<BackToTop showAfter={100} label="Top of page" />);
    expect(screen.getByLabelText('Top of page')).toBeInTheDocument();
  });
});
