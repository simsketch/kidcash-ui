'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../tokens/motion';

/**
 * 96 default emojis grouped into 6 rough categories. The order matches the
 * `EMOJI_NAMES` map below (used for search filtering).
 */
export const defaultEmojis: string[] = [
  // Faces (16)
  '😀', '😎', '🥳', '🤩', '😇', '🤖', '🤠', '🤓',
  '😺', '🥰', '😍', '🤗', '🤔', '😴', '🙄', '😏',
  // Animals (16)
  '🦄', '🐱', '🐶', '🐼', '🦊', '🐸', '🐯', '🦁',
  '🐵', '🐧', '🐢', '🦋', '🐝', '🐞', '🦖', '🐬',
  // Sky & weather (16)
  '🌟', '⭐', '✨', '💫', '🌈', '🌞', '🌙', '☁️',
  '⚡', '🔥', '🌊', '❄️', '☀️', '🌸', '🌺', '🌻',
  // Food (16)
  '🍕', '🍔', '🍦', '🍩', '🍪', '🍰', '🍎', '🍌',
  '🍇', '🍓', '🥝', '🥕', '🌮', '🍿', '🥨', '🍫',
  // Activities (16)
  '⚽', '🏀', '🎾', '🎮', '🎨', '🎵', '🎯', '🎲',
  '🎬', '🎸', '🥁', '🎤', '🎼', '🏆', '🥇', '🚀',
  // Money & objects (16)
  '🪙', '💰', '💵', '💎', '👑', '🎁', '🎉', '🎈',
  '🚗', '🛸', '🛍️', '🏠', '📚', '✏️', '🔑', '🧸',
];

/**
 * Lookup table of (emoji → keyword string) used by the search filter.
 * Each value is a space-separated list of names / synonyms that the search
 * input matches against (case-insensitive `includes`).
 */
const EMOJI_NAMES: Record<string, string> = {
  '😀': 'happy smile face grin',
  '😎': 'cool sunglasses',
  '🥳': 'party celebration',
  '🤩': 'star eyes wow',
  '😇': 'angel innocent',
  '🤖': 'robot bot',
  '🤠': 'cowboy',
  '🤓': 'nerd geek',
  '😺': 'cat smile',
  '🥰': 'love hearts',
  '😍': 'heart eyes love',
  '🤗': 'hug',
  '🤔': 'thinking',
  '😴': 'sleep tired',
  '🙄': 'eye roll',
  '😏': 'smirk',
  '🦄': 'unicorn',
  '🐱': 'cat kitten',
  '🐶': 'dog puppy',
  '🐼': 'panda bear',
  '🦊': 'fox',
  '🐸': 'frog',
  '🐯': 'tiger',
  '🦁': 'lion',
  '🐵': 'monkey',
  '🐧': 'penguin',
  '🐢': 'turtle',
  '🦋': 'butterfly',
  '🐝': 'bee',
  '🐞': 'ladybug',
  '🦖': 'dinosaur trex',
  '🐬': 'dolphin',
  '🌟': 'star',
  '⭐': 'star',
  '✨': 'sparkles magic',
  '💫': 'dizzy spark',
  '🌈': 'rainbow pride',
  '🌞': 'sun',
  '🌙': 'moon',
  '☁️': 'cloud',
  '⚡': 'lightning bolt',
  '🔥': 'fire flame hot',
  '🌊': 'wave water',
  '❄️': 'snow cold',
  '☀️': 'sun',
  '🌸': 'flower cherry blossom',
  '🌺': 'flower hibiscus',
  '🌻': 'sunflower',
  '🍕': 'pizza',
  '🍔': 'burger',
  '🍦': 'ice cream',
  '🍩': 'donut',
  '🍪': 'cookie',
  '🍰': 'cake',
  '🍎': 'apple fruit',
  '🍌': 'banana',
  '🍇': 'grapes',
  '🍓': 'strawberry',
  '🥝': 'kiwi',
  '🥕': 'carrot',
  '🌮': 'taco',
  '🍿': 'popcorn',
  '🥨': 'pretzel',
  '🍫': 'chocolate',
  '⚽': 'soccer football',
  '🏀': 'basketball',
  '🎾': 'tennis',
  '🎮': 'video game controller',
  '🎨': 'art paint',
  '🎵': 'music note',
  '🎯': 'target dart',
  '🎲': 'dice',
  '🎬': 'movie clapper film',
  '🎸': 'guitar music',
  '🥁': 'drum',
  '🎤': 'microphone sing',
  '🎼': 'music score',
  '🏆': 'trophy winner',
  '🥇': 'gold medal first',
  '🚀': 'rocket space',
  '🪙': 'coin money',
  '💰': 'money bag dollar',
  '💵': 'cash dollar money',
  '💎': 'diamond gem',
  '👑': 'crown king queen',
  '🎁': 'gift present',
  '🎉': 'party celebration',
  '🎈': 'balloon party',
  '🚗': 'car',
  '🛸': 'ufo alien',
  '🛍️': 'shopping bag',
  '🏠': 'house home',
  '📚': 'books',
  '✏️': 'pencil write',
  '🔑': 'key',
  '🧸': 'teddy bear toy',
};

export interface EmojiPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (emoji: string) => void;
  /** Override the full list. Defaults to `defaultEmojis`. */
  emojis?: string[];
  title?: string;
  /** Show the keyword search field. Defaults to true. */
  showSearch?: boolean;
  /** Optional row of recent picks above the main grid. */
  recents?: string[];
}

function matchesQuery(emoji: string, q: string): boolean {
  if (!q) return true;
  const names = EMOJI_NAMES[emoji] ?? '';
  return names.toLowerCase().includes(q.toLowerCase());
}

/**
 * `EmojiPicker` — bottom-sheet emoji selector. `glass-strong` backdrop blur
 * (the kit's signature look) over the page; the sheet itself springs up
 * from the bottom edge.
 */
export function EmojiPicker({
  open,
  onClose,
  onSelect,
  emojis = defaultEmojis,
  title = 'Pick an emoji',
  showSearch = true,
  recents,
}: EmojiPickerProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) return;
    setQuery('');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => emojis.filter((e) => matchesQuery(e, query)), [emojis, query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="emoji-picker-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{
            backgroundColor: 'rgba(10, 6, 18, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={spring.gentle}
            className="glass-strong rounded-t-card-lg w-full max-w-2xl p-6 max-h-[85vh] overflow-y-auto"
          >
            {/* Drag handle */}
            <div className="flex justify-center mb-4" aria-hidden>
              <div className="w-12 h-1.5 rounded-pill bg-white/20" />
            </div>

            <h2 className="text-lg font-semibold mb-4 text-text-light">{title}</h2>

            {showSearch && (
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search emojis…"
                aria-label="Search emojis"
                className="w-full mb-4 px-4 py-2 rounded-button glass text-text-light placeholder:text-text-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            )}

            {recents && recents.length > 0 && (
              <div className="mb-4">
                <div className="text-xs uppercase tracking-widest text-text-muted font-mono mb-2">
                  Recent
                </div>
                <div className="grid grid-cols-8 md:grid-cols-12 gap-1">
                  {recents.map((e, i) => (
                    <motion.button
                      key={`recent-${e}-${i}`}
                      onClick={() => onSelect(e)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={spring.bounce}
                      className="text-2xl p-2 rounded-button hover:bg-white/10"
                      aria-label={e}
                    >
                      {e}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-8 md:grid-cols-12 gap-1">
              {filtered.length === 0 ? (
                <div className="col-span-full text-center py-8 text-text-muted text-sm">
                  No emojis match {`"${query}"`}.
                </div>
              ) : (
                filtered.map((e, i) => (
                  <motion.button
                    key={`${e}-${i}`}
                    onClick={() => onSelect(e)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={spring.bounce}
                    className="text-2xl p-2 rounded-button hover:bg-white/10"
                    aria-label={e}
                  >
                    {e}
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
