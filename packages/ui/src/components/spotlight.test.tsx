import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spotlight } from './spotlight';

describe('<Spotlight>', () => {
  it('renders its children', () => {
    render(
      <Spotlight>
        <p>Hello inside spotlight</p>
      </Spotlight>,
    );
    expect(screen.getByText('Hello inside spotlight')).toBeInTheDocument();
  });

  it('updates its overlay style when the cursor moves', () => {
    render(
      <Spotlight>
        <p>body</p>
      </Spotlight>,
    );
    const wrapper = screen.getByTestId('spotlight');
    const overlay = screen.getByTestId('spotlight-overlay');

    // Idle — overlay should be transparent (opacity 0).
    expect(overlay.style.opacity).toBe('0');

    // Move the cursor inside; the overlay should turn on.
    fireEvent.mouseEnter(wrapper, { clientX: 50, clientY: 50 });
    fireEvent.mouseMove(wrapper, { clientX: 100, clientY: 80 });
    expect(overlay.style.opacity).toBe('1');
    expect(overlay.style.background).toMatch(/radial-gradient/);

    // Leave — overlay turns off again.
    fireEvent.mouseLeave(wrapper);
    expect(overlay.style.opacity).toBe('0');
  });
});
