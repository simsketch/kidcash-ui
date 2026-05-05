import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmojiPicker, defaultEmojis } from './emoji-picker';

describe('<EmojiPicker>', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<EmojiPicker open={false} onClose={() => {}} onSelect={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders emojis when open', () => {
    render(<EmojiPicker open={true} onClose={() => {}} onSelect={() => {}} emojis={['🎉', '🎂']} />);
    expect(screen.getByText('🎉')).toBeInTheDocument();
    expect(screen.getByText('🎂')).toBeInTheDocument();
  });

  it('calls onSelect when an emoji is clicked', () => {
    const onSelect = vi.fn();
    render(<EmojiPicker open={true} onClose={() => {}} onSelect={onSelect} emojis={['⭐']} />);
    fireEvent.click(screen.getByText('⭐'));
    expect(onSelect).toHaveBeenCalledWith('⭐');
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<EmojiPicker open={true} onClose={onClose} onSelect={() => {}} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<EmojiPicker open={true} onClose={onClose} onSelect={() => {}} />);
    const backdrop = screen.getByTestId('emoji-picker-backdrop');
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it('exports defaultEmojis with at least 30 entries', () => {
    expect(defaultEmojis.length).toBeGreaterThanOrEqual(30);
  });
});
