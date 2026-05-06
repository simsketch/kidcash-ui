import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Keyboard } from './keyboard';

describe('<Keyboard>', () => {
  it('renders children', () => {
    render(<Keyboard>K</Keyboard>);
    expect(screen.getByText('K')).toBeInTheDocument();
  });

  it('renders as a <kbd> element', () => {
    render(<Keyboard>X</Keyboard>);
    const el = screen.getByText('X');
    expect(el.tagName).toBe('KBD');
  });

  it('applies size class', () => {
    const { rerender } = render(<Keyboard size="sm">A</Keyboard>);
    let el = screen.getByText('A');
    expect(el.className).toMatch(/text-\[10px\]/);

    rerender(<Keyboard size="md">B</Keyboard>);
    el = screen.getByText('B');
    expect(el.className).toMatch(/text-xs/);
  });
});
