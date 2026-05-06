import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Marquee } from './marquee';

describe('<Marquee>', () => {
  it('renders its children', () => {
    render(
      <Marquee>
        <span>Item A</span>
      </Marquee>,
    );
    // Renders twice (original + duplicate for seamless loop).
    expect(screen.getAllByText('Item A')).toHaveLength(2);
  });

  it('renders the duplicate set for seamless loop', () => {
    render(
      <Marquee>
        <span>L</span>
      </Marquee>,
    );
    expect(screen.getByTestId('marquee-clone')).toBeInTheDocument();
  });

  it('applies the pause-on-hover class when pauseOnHover=true', () => {
    const { rerender } = render(
      <Marquee pauseOnHover>
        <span>P</span>
      </Marquee>,
    );
    let track = screen.getByTestId('marquee-track');
    expect(track.className).toMatch(/animation-play-state:paused/);

    rerender(
      <Marquee pauseOnHover={false}>
        <span>P</span>
      </Marquee>,
    );
    track = screen.getByTestId('marquee-track');
    expect(track.className).not.toMatch(/animation-play-state:paused/);
  });
});
