import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { KidAvatar } from './kid-avatar';

describe('<KidAvatar>', () => {
  it('renders the emoji', () => {
    render(<KidAvatar emoji="🦄" />);
    expect(screen.getByText('🦄')).toBeInTheDocument();
  });

  it('renders the name caption when provided', () => {
    render(<KidAvatar emoji="🐱" name="Mimi" />);
    expect(screen.getByText('Mimi')).toBeInTheDocument();
  });

  it('omits the name caption when not provided', () => {
    render(<KidAvatar emoji="🐱" />);
    expect(screen.queryByText('Mimi')).toBeNull();
  });

  it('renders the progress ring only when ring + ringMax provided', () => {
    const { container, rerender } = render(<KidAvatar emoji="⭐" />);
    expect(container.querySelector('svg')).toBeNull();
    rerender(<KidAvatar emoji="⭐" ring={5} ringMax={10} />);
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('skips the ring when ringMax is 0', () => {
    const { container } = render(<KidAvatar emoji="⭐" ring={0} ringMax={0} />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(<KidAvatar emoji="🦄" className="custom-x" />);
    expect(container.firstChild).toHaveClass('custom-x');
  });

  it('renders a halo div', () => {
    render(<KidAvatar emoji="🦄" />);
    expect(screen.getByTestId('kid-avatar-halo')).toBeInTheDocument();
  });

  it('uses the aurora-gradient surface for the vibrant variant', () => {
    const { container } = render(<KidAvatar emoji="🦄" variant="vibrant" />);
    expect(container.querySelector('.bg-gradient-aurora')).toBeTruthy();
  });
});
