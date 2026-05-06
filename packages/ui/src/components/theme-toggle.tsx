'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../tokens/motion';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeToggleProps {
  theme: Theme;
  onChange: (next: Theme) => void;
  className?: string;
}

const NEXT: Record<Theme, Theme> = { light: 'dark', dark: 'system', system: 'light' };

function SunIcon() {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MonitorIcon() {
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
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

const ICON: Record<Theme, React.ReactNode> = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  system: <MonitorIcon />,
};

/**
 * `ThemeToggle` — single round glass button. Click cycles
 * `light → dark → system → light`. The icon swaps with a spring
 * rotation+scale crossfade.
 */
export function ThemeToggle({ theme, onChange, className }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={() => onChange(NEXT[theme])}
      aria-label={`Theme: ${theme}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={spring.stiff}
      className={`glass rounded-pill h-10 w-10 flex items-center justify-center text-text-light cursor-pointer ${
        className ?? ''
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={spring.gentle}
          className="flex items-center justify-center"
        >
          {ICON[theme]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
