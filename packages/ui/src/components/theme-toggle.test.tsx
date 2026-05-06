import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeToggle } from './theme-toggle';

describe('<ThemeToggle>', () => {
  it('exposes the current theme via aria-label', () => {
    const { rerender } = render(<ThemeToggle theme="light" onChange={() => {}} />);
    expect(screen.getByLabelText('Theme: light')).toBeInTheDocument();
    rerender(<ThemeToggle theme="dark" onChange={() => {}} />);
    expect(screen.getByLabelText('Theme: dark')).toBeInTheDocument();
    rerender(<ThemeToggle theme="system" onChange={() => {}} />);
    expect(screen.getByLabelText('Theme: system')).toBeInTheDocument();
  });

  it('cycles to the next theme on click', () => {
    const onChange = vi.fn();
    const { rerender } = render(<ThemeToggle theme="light" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith('dark');

    rerender(<ThemeToggle theme="dark" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith('system');

    rerender(<ThemeToggle theme="system" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onChange).toHaveBeenCalledWith('light');
  });
});
