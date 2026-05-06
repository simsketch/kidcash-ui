'use client';
import { motion } from 'framer-motion';
import { spring } from '../tokens/motion';
import {
  themeNames,
  themes,
  type ThemeName,
} from '../themes/themes';
import { useTheme } from '../themes/provider';

export interface ThemeSelectorProps {
  /** Optional title rendered above the grid. */
  title?: string;
  /** Optional description rendered above the grid. */
  description?: string;
  className?: string;
}

/**
 * `ThemeSelector` — a 3×3 grid of theme cards. Clicking a card calls
 * `setThemeName()` from the surrounding `<ThemeProvider>`, which writes the
 * theme's CSS custom properties to `<html>` and persists to localStorage.
 *
 * Each card shows four preview-color dots, the theme label, and a short
 * description. The active theme card has an aurora-gradient ring and glow.
 */
export function ThemeSelector({
  title,
  description,
  className = '',
}: ThemeSelectorProps) {
  const { themeName, setThemeName } = useTheme();

  return (
    <div className={className}>
      {(title || description) && (
        <div className="mb-4 space-y-1">
          {title && (
            <h3
              className="text-lg font-semibold"
              style={{ color: 'var(--theme-text-primary, #fafafa)' }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className="text-sm"
              style={{ color: 'var(--theme-text-muted, #a1a1aa)' }}
            >
              {description}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {themeNames.map((name, i) => {
          const t = themes[name];
          const selected = name === themeName;
          return (
            <ThemeCard
              key={name}
              name={name}
              label={t.label}
              description={t.description}
              previewColors={t.previewColors}
              selected={selected}
              index={i}
              onSelect={() => setThemeName(name)}
            />
          );
        })}
      </div>
    </div>
  );
}

interface ThemeCardProps {
  name: ThemeName;
  label: string;
  description: string;
  previewColors: [string, string, string, string];
  selected: boolean;
  index: number;
  onSelect: () => void;
}

function ThemeCard({
  name,
  label,
  description,
  previewColors,
  selected,
  index,
  onSelect,
}: ThemeCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      data-testid={`theme-card-${name}`}
      data-selected={selected ? 'true' : 'false'}
      aria-pressed={selected}
      aria-label={`Switch to ${label} theme`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring.gentle, delay: index * 0.04 }}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`glass rounded-card p-4 text-left cursor-pointer transition-shadow w-full ${
        selected
          ? 'shadow-glow-primary ring-2 ring-primary-light/70'
          : 'ring-1 ring-white/10 hover:ring-white/20'
      }`}
      style={{
        backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
        borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.1))',
        color: 'var(--theme-text-primary, #fafafa)',
      }}
    >
      <div className="flex items-center gap-2 mb-3" aria-hidden>
        {previewColors.map((color, i) => (
          <span
            key={i}
            className="block w-5 h-5 rounded-full border border-white/15"
            style={{ background: color }}
          />
        ))}
      </div>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <span
          className="text-sm font-semibold truncate"
          style={{ color: 'var(--theme-text-primary, #fafafa)' }}
        >
          {label}
        </span>
        {selected && (
          <span
            className="text-[10px] uppercase tracking-widest font-mono shrink-0"
            style={{ color: 'var(--theme-accent-primary, #a78bfa)' }}
          >
            Active
          </span>
        )}
      </div>
      <p
        className="text-xs leading-snug line-clamp-2"
        style={{ color: 'var(--theme-text-muted, #a1a1aa)' }}
      >
        {description}
      </p>
    </motion.button>
  );
}
