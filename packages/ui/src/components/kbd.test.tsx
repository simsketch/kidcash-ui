import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Kbd } from './kbd';

describe('<Kbd>', () => {
  it('renders children', () => {
    render(<Kbd>K</Kbd>);
    expect(screen.getByText('K')).toBeInTheDocument();
  });

  it('renders as a <kbd> element', () => {
    render(<Kbd>X</Kbd>);
    const el = screen.getByText('X');
    expect(el.tagName).toBe('KBD');
  });

  it('applies size class', () => {
    const { rerender } = render(<Kbd size="sm">A</Kbd>);
    let el = screen.getByText('A');
    expect(el.className).toMatch(/text-\[10px\]/);

    rerender(<Kbd size="md">B</Kbd>);
    el = screen.getByText('B');
    expect(el.className).toMatch(/text-xs/);
  });
});
