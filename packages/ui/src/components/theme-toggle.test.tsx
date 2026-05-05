import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeToggle } from './theme-toggle';

describe('<ThemeToggle>', () => {
  it('renders the icon for the current theme', () => {
    const { rerender } = render(<ThemeToggle theme="light" onChange={() => {}} />);
    expect(screen.getByText('☀️')).toBeInTheDocument();
    rerender(<ThemeToggle theme="dark" onChange={() => {}} />);
    expect(screen.getByText('🌙')).toBeInTheDocument();
    rerender(<ThemeToggle theme="system" onChange={() => {}} />);
    expect(screen.getByText('🖥️')).toBeInTheDocument();
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
