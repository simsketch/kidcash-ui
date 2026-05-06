import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider, useTheme, useThemeOptional } from './provider';
import { themes } from './themes';

function Probe() {
  const { themeName, isDark, setThemeName } = useTheme();
  return (
    <div>
      <span data-testid="probe-name">{themeName}</span>
      <span data-testid="probe-dark">{isDark ? 'dark' : 'light'}</span>
      <button data-testid="probe-set-mint" onClick={() => setThemeName('mint-breeze')}>
        mint
      </button>
      <button data-testid="probe-set-aurora" onClick={() => setThemeName('aurora')}>
        aurora
      </button>
    </div>
  );
}

describe('<ThemeProvider> / useTheme', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark', 'light');
    // Wipe any inline CSS variables applied by previous tests.
    document.documentElement.removeAttribute('style');
  });

  it('defaults to aurora and writes CSS custom properties to <html>', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('probe-name')).toHaveTextContent('aurora');
    expect(document.documentElement.getAttribute('data-theme')).toBe('aurora');
    expect(document.documentElement.style.getPropertyValue('--theme-background')).toBe(
      themes.aurora.background,
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles the dark/light class when switching to a light theme', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    act(() => {
      fireEvent.click(screen.getByTestId('probe-set-mint'));
    });
    expect(screen.getByTestId('probe-name')).toHaveTextContent('mint-breeze');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByTestId('probe-dark')).toHaveTextContent('light');
  });

  it('persists the active theme to localStorage', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    act(() => {
      fireEvent.click(screen.getByTestId('probe-set-aurora'));
    });
    expect(window.localStorage.getItem('kidcash-ui-theme')).toBe('aurora');
  });
});

function OptionalProbe() {
  const ctx = useThemeOptional();
  return <div data-testid="optional-probe">{ctx ? ctx.themeName : 'no-provider'}</div>;
}

describe('useThemeOptional', () => {
  it('returns null when used outside a provider', () => {
    render(<OptionalProbe />);
    expect(screen.getByTestId('optional-probe')).toHaveTextContent('no-provider');
  });
});
