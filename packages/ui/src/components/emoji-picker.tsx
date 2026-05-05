'use client';
import { useEffect } from 'react';

export const defaultEmojis = [
  '😀', '😎', '🥳', '🤩', '😇', '🤖', '🦄', '🐱', '🐶', '🐼',
  '🦊', '🐸', '🐯', '🦁', '🐵', '🐧', '🐢', '🦋', '🌟', '⭐',
  '✨', '💫', '🌈', '🌞', '🌙', '☁️', '🍕', '🍔', '🍦', '🍩',
  '🍪', '🍰', '🍎', '🍌', '🍇', '🍓', '🥝', '🥕', '🌮', '🍿',
  '⚽', '🏀', '🎾', '🎮', '🎨', '🎵', '🎁', '🎉', '🎈', '🚀',
  '🚗', '🛸', '🪙', '💰', '💵', '💎', '👑', '🏆', '🎯', '🦖',
];

export interface EmojiPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
  emojis?: string[];
  title?: string;
}

export function EmojiPicker({
  open,
  onClose,
  onSelect,
  emojis = defaultEmojis,
  title = 'Pick an emoji',
}: EmojiPickerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      data-testid="emoji-picker-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-dark border border-white/10 rounded-card-lg p-6 max-w-md w-full"
      >
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-6 gap-2">
          {emojis.map((e, i) => (
            <button
              key={`${e}-${i}`}
              onClick={() => onSelect(e)}
              className="text-2xl p-2 rounded hover:bg-white/10 transition"
              aria-label={e}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
