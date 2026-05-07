import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';

describe('<Button>', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Tap</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled and shows a spinner when loading', () => {
    render(<Button loading>Saving</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    // Spinner is the first child element on a loading button
    expect(btn.querySelector('.animate-spin')).not.toBeNull();
  });

  it('hides the spinner when not loading', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button').querySelector('.animate-spin')).toBeNull();
  });

  it('applies size + variant classes', () => {
    render(
      <Button size="lg" variant="destructive">
        Delete
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('h-12');
    // Destructive surface comes from the theme `dangerBg` var (with a flame
    // gradient fallback when no provider is mounted), applied via inline
    // backgroundImage rather than a Tailwind utility class.
    expect(btn.className).toContain('text-white');
    expect(btn.style.backgroundImage).toContain('--theme-danger-bg');
  });

  it('renders iconLeft when not loading', () => {
    render(
      <Button iconLeft={<span data-testid="left-icon">L</span>}>Go</Button>,
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });
});
