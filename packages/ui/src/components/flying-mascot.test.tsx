import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FlyingMascot } from './flying-mascot';

describe('<FlyingMascot>', () => {
  it('renders an img with the given src', () => {
    const { container } = render(<FlyingMascot src="/mascot.png" />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('/mascot.png');
  });

  it('applies the hidden-on-mobile class by default', () => {
    const { container } = render(<FlyingMascot src="/mascot.png" />);
    const img = container.querySelector('img');
    expect(img?.className).toContain('hidden');
    expect(img?.className).toContain('sm:block');
  });

  it('omits the hidden class when hideOnMobile is false', () => {
    const { container } = render(
      <FlyingMascot src="/mascot.png" hideOnMobile={false} />,
    );
    const img = container.querySelector('img');
    expect(img?.className).not.toContain('hidden');
    expect(img?.className).not.toContain('sm:block');
  });

  it('marks the image aria-hidden when alt is empty (decorative)', () => {
    const { container } = render(<FlyingMascot src="/mascot.png" />);
    const img = container.querySelector('img');
    expect(img?.getAttribute('aria-hidden')).toBe('true');
    expect(img?.getAttribute('alt')).toBe('');
  });

  it('exposes alt text and skips aria-hidden when alt is provided', () => {
    const { container } = render(
      <FlyingMascot src="/mascot.png" alt="KidCash mascot" />,
    );
    const img = container.querySelector('img');
    expect(img?.getAttribute('alt')).toBe('KidCash mascot');
    expect(img?.getAttribute('aria-hidden')).toBeNull();
  });
});
