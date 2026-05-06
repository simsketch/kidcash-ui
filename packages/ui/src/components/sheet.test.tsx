import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Sheet } from './sheet';

describe('<Sheet>', () => {
  it('renders nothing when open=false', () => {
    render(
      <Sheet open={false} onClose={() => {}}>
        <p>body</p>
      </Sheet>,
    );
    expect(screen.queryByTestId('sheet-backdrop')).toBeNull();
    expect(screen.queryByText('body')).toBeNull();
  });

  it('renders the title when provided', () => {
    render(
      <Sheet open={true} onClose={() => {}} title="Settings">
        <p>body</p>
      </Sheet>,
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(
      <Sheet open={true} onClose={onClose}>
        <p>body</p>
      </Sheet>,
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the backdrop is clicked', () => {
    const onClose = vi.fn();
    render(
      <Sheet open={true} onClose={onClose}>
        <p>body</p>
      </Sheet>,
    );
    fireEvent.click(screen.getByTestId('sheet-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });

  it('renders the drag handle when showHandle=true (default)', () => {
    render(
      <Sheet open={true} onClose={() => {}}>
        <p>body</p>
      </Sheet>,
    );
    expect(screen.getByTestId('sheet-handle')).toBeInTheDocument();
  });
});
