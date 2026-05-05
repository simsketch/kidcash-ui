'use client';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeToggleProps {
  theme: Theme;
  onChange: (next: Theme) => void;
  className?: string;
}

const NEXT: Record<Theme, Theme> = { light: 'dark', dark: 'system', system: 'light' };
const ICON: Record<Theme, string> = { light: '☀️', dark: '🌙', system: '🖥️' };

export function ThemeToggle({ theme, onChange, className }: ThemeToggleProps) {
  return (
    <button
      onClick={() => onChange(NEXT[theme])}
      aria-label={`Theme: ${theme}`}
      className={className}
    >
      {ICON[theme]}
    </button>
  );
}
