import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pill } from './pill';

describe('<Pill>', () => {
  it('renders children', () => {
    render(<Pill>hello</Pill>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('applies a variant-specific class for the gradient variant', () => {
    const { container } = render(<Pill variant="gradient">x</Pill>);
    expect(container.firstChild).toHaveClass('bg-gradient-aurora');
  });

  it('applies a size-specific class for the lg size', () => {
    const { container } = render(<Pill size="lg">x</Pill>);
    expect(container.firstChild).toHaveClass('h-9');
  });

  it('renders a remove button when removable=true', () => {
    render(
      <Pill removable onRemove={() => {}}>
        tag
      </Pill>,
    );
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  it('fires onRemove when the remove button is clicked', () => {
    const onRemove = vi.fn();
    render(
      <Pill removable onRemove={onRemove}>
        tag
      </Pill>,
    );
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
