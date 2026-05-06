'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../tokens/motion';
import { Keyboard } from './keyboard';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  onSelect: () => void;
  /** Optional category. If any item has a group, headers are rendered. */
  group?: string;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
  emptyMessage?: string;
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/**
 * `CommandPalette` — Cmd+K command launcher. Centered top of screen,
 * autofocused search, arrow-key navigation, group headers, kbd-shortcut
 * hints. Toggleable via Cmd+K (or Ctrl+K) globally — consumer can also
 * drive it via `open` / `onClose`.
 */
export function CommandPalette({
  open,
  onClose,
  items,
  placeholder = 'Type a command or search...',
  emptyMessage = 'No results found',
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Filter items by query (case-insensitive substring on label/description).
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        (i.description ?? '').toLowerCase().includes(q),
    );
  }, [items, query]);

  // Group filtered items by group key (preserve insertion order).
  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of filteredItems) {
      const key = item.group ?? '__default__';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    return Array.from(map.entries());
  }, [filteredItems]);

  const showHeaders = useMemo(
    () => filteredItems.some((i) => Boolean(i.group)),
    [filteredItems],
  );

  // Reset selection / query whenever opened or query changes.
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      // Defer one frame so the input is mounted before focus.
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    return undefined;
  }, [open]);

  // Global toggle on Cmd+K / Ctrl+K.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(filteredItems.length - 1, i + 1));
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredItems[selectedIndex];
      if (target) {
        target.onSelect();
        onClose();
      }
    }
  }

  // Helper: lookup the index of an item in the flat filteredItems list so
  // we can highlight the selected one even when grouped rendering is on.
  function flatIndex(id: string) {
    return filteredItems.findIndex((i) => i.id === id);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="command-palette-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          }}
        >
          <motion.div
            data-testid="command-palette"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={spring.gentle}
            className="glass-strong rounded-card-lg w-full max-w-xl overflow-hidden shadow-glow-primary bg-bg-dark/85 border-white/15"
          >
            {/* Search row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <span className="text-text-muted">
                <SearchIcon />
              </span>
              <input
                ref={inputRef}
                data-testid="command-palette-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-none outline-none text-text-light text-lg placeholder:text-text-muted"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="hidden sm:inline-flex items-center gap-1 text-text-muted">
                <Keyboard size="sm">esc</Keyboard>
              </span>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto py-2">
              {filteredItems.length === 0 && (
                <div
                  data-testid="command-palette-empty"
                  className="px-5 py-8 text-center text-text-muted text-sm"
                >
                  {emptyMessage}
                </div>
              )}

              {grouped.map(([group, groupItems]) => (
                <div key={group} className="px-2">
                  {showHeaders && group !== '__default__' && (
                    <div className="px-3 pt-3 pb-1 text-xs uppercase tracking-widest text-text-muted font-mono">
                      {group}
                    </div>
                  )}
                  <ul role="listbox">
                    {groupItems.map((item) => {
                      const idx = flatIndex(item.id);
                      const isSelected = idx === selectedIndex;
                      return (
                        <li
                          key={item.id}
                          role="option"
                          aria-selected={isSelected}
                          data-testid={`command-item-${item.id}`}
                          data-selected={isSelected ? 'true' : 'false'}
                          onClick={() => {
                            item.onSelect();
                            onClose();
                          }}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-button cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-white/10 border-l-2 border-primary-light'
                              : 'border-l-2 border-transparent hover:bg-white/5'
                          }`}
                        >
                          {item.icon && (
                            <span className="w-5 h-5 inline-flex items-center justify-center text-text-muted shrink-0">
                              {item.icon}
                            </span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-text-light text-sm font-medium truncate">
                              {item.label}
                            </div>
                            {item.description && (
                              <div className="text-text-muted text-xs truncate">
                                {item.description}
                              </div>
                            )}
                          </div>
                          {item.shortcut && item.shortcut.length > 0 && (
                            <div className="hidden sm:flex items-center gap-1 shrink-0">
                              {item.shortcut.map((key, i) => (
                                <Keyboard key={`${item.id}-${i}`} size="sm">
                                  {key}
                                </Keyboard>
                              ))}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Footer hint row */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-white/10 text-xs text-text-muted">
              <span className="flex items-center gap-2">
                <Keyboard size="sm">↑</Keyboard>
                <Keyboard size="sm">↓</Keyboard>
                <span>navigate</span>
              </span>
              <span className="flex items-center gap-2">
                <Keyboard size="sm">↩</Keyboard>
                <span>select</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
