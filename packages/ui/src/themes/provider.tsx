'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  getTheme,
  isLightTheme,
  themes,
  type Theme,
  type ThemeName,
} from './themes';

const STORAGE_KEY = 'kidcash-ui-theme';

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyThemeToDocument(name: ThemeName) {
  if (typeof document === 'undefined') return;
  const t = getTheme(name);
  const root = document.documentElement;

  root.setAttribute('data-theme', name);

  // CSS custom properties — components opt into them via `var(--theme-*)`.
  root.style.setProperty('--theme-background', t.background);
  root.style.setProperty('--theme-card-bg', t.cardBg);
  root.style.setProperty('--theme-card-border', t.cardBorder);
  root.style.setProperty('--theme-card-shadow', t.cardShadow);
  root.style.setProperty('--theme-card-hover-bg', t.cardHoverBg);
  root.style.setProperty('--theme-accent-primary', t.accentPrimary);
  root.style.setProperty('--theme-accent-secondary', t.accentSecondary);
  root.style.setProperty('--theme-accent-glow', t.accentGlow);
  root.style.setProperty('--theme-text-primary', t.textPrimary);
  root.style.setProperty('--theme-text-secondary', t.textSecondary);
  root.style.setProperty('--theme-text-muted', t.textMuted);
  root.style.setProperty('--theme-success-bg', t.successBg);
  root.style.setProperty('--theme-success-border', t.successBorder);
  root.style.setProperty('--theme-success-text', t.successText);
  root.style.setProperty('--theme-danger-bg', t.dangerBg);
  root.style.setProperty('--theme-danger-border', t.dangerBorder);
  root.style.setProperty('--theme-danger-text', t.dangerText);
  root.style.setProperty('--theme-progress-gradient', t.progressGradient);
  root.style.setProperty('--theme-orb1', t.orb1);
  root.style.setProperty('--theme-orb2', t.orb2);
  root.style.setProperty('--theme-orb3', t.orb3);

  if (isLightTheme(name)) {
    root.classList.remove('dark');
    root.classList.add('light');
  } else {
    root.classList.add('dark');
    root.classList.remove('light');
  }
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Initial theme used on first render (before localStorage is read). Defaults to `'aurora'`. */
  defaultTheme?: ThemeName;
  /** localStorage key. Defaults to `'kidcash-ui-theme'`. Override if you embed multiple kits in one page. */
  storageKey?: string;
}

/**
 * `ThemeProvider` — wraps any subtree, exposes `useTheme()`, and writes the
 * current theme as CSS custom properties on `<html>`. Library-only — no
 * server-state coupling. Persists to localStorage so refreshes are instant.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'aurora',
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [themeName, setThemeNameState] = useState<ThemeName>(defaultTheme);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = window.localStorage.getItem(storageKey) as ThemeName | null;
      if (saved && themes[saved]) {
        setThemeNameState(saved);
        return;
      }
    } catch {
      // ignore — private mode etc.
    }
    // No stored value: still apply the current state to the DOM.
    applyThemeToDocument(defaultTheme);
  }, [defaultTheme, storageKey]);

  // Write through to DOM + localStorage on every change.
  useEffect(() => {
    applyThemeToDocument(themeName);
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey, themeName);
    } catch {
      // ignore
    }
  }, [themeName, storageKey]);

  const setThemeName = (name: ThemeName) => {
    if (themes[name]) setThemeNameState(name);
  };

  const value: ThemeContextValue = {
    theme: getTheme(themeName),
    themeName,
    setThemeName,
    isDark: !isLightTheme(themeName),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * `useTheme` — read the active theme + setter. Must be called inside a
 * `<ThemeProvider>`. Components that want optional theming should use
 * `useThemeOptional` instead.
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be called inside <ThemeProvider>');
  }
  return ctx;
}

/**
 * `useThemeOptional` — same as `useTheme` but returns `null` when no
 * provider is mounted. Intended for components that want to opt into theme
 * variables when available but degrade gracefully when not.
 */
export function useThemeOptional(): ThemeContextValue | null {
  return useContext(ThemeContext) ?? null;
}
