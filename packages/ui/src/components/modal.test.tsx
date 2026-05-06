import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './modal';

describe('<Modal>', () => {
  it('renders nothing when open=false', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <p>body</p>
      </Modal>,
    );
    expect(screen.queryByTestId('modal-backdrop')).toBeNull();
    expect(screen.queryByText('body')).toBeNull();
  });

  it('renders the title and description when provided', () => {
    render(
      <Modal open={true} onClose={() => {}} title="Hello" description="A subtitle">
        <p>body</p>
      </Modal>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <p>body</p>
      </Modal>,
    );
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <p>body</p>
      </Modal>,
    );
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when the backdrop is clicked (closeOnBackdrop=true)', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} closeOnBackdrop>
        <p>body</p>
      </Modal>,
    );
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });
});
