import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar, AvatarStack } from './avatar';

describe('<Avatar>', () => {
  it('renders an <img> when src is provided', () => {
    render(<Avatar src="/x.png" alt="Eli" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/x.png');
    expect(img).toHaveAttribute('alt', 'Eli');
  });

  it('renders fallback initials when no src', () => {
    render(<Avatar fallback="EZ" />);
    expect(screen.getByText('EZ')).toBeInTheDocument();
  });

  it('renders a status dot when status is set', () => {
    render(<Avatar fallback="EZ" status="online" />);
    expect(screen.getByTestId('avatar-status')).toHaveAttribute('data-status', 'online');
  });

  it('applies a size-specific style for the lg size', () => {
    const { container } = render(<Avatar fallback="EZ" size="lg" />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.width).toBe('56px');
    expect(root.style.height).toBe('56px');
  });
});

describe('<AvatarStack>', () => {
  it('renders all avatars when count is below max', () => {
    render(
      <AvatarStack
        max={4}
        avatars={[{ fallback: 'A' }, { fallback: 'B' }, { fallback: 'C' }]}
      />,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('shows a +N pill when avatars exceed max', () => {
    render(
      <AvatarStack
        max={2}
        avatars={[{ fallback: 'A' }, { fallback: 'B' }, { fallback: 'C' }, { fallback: 'D' }]}
      />,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.queryByText('C')).toBeNull();
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('forwards size to all rendered avatars', () => {
    const { container } = render(
      <AvatarStack
        size="lg"
        max={3}
        avatars={[{ fallback: 'A' }, { fallback: 'B' }]}
      />,
    );
    const avatars = container.querySelectorAll('[data-testid="avatar-root"]');
    expect(avatars.length).toBe(2);
    avatars.forEach((el) => {
      expect((el as HTMLElement).style.width).toBe('56px');
    });
  });
});
