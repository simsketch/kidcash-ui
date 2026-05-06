import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider } from '../themes/provider';
import { themeNames } from '../themes/themes';
import { ThemeSelector } from './theme-selector';

function renderSelector() {
  return render(
    <ThemeProvider>
      <ThemeSelector />
    </ThemeProvider>,
  );
}

describe('<ThemeSelector>', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.removeAttribute('style');
  });

  it('renders one card per theme', () => {
    renderSelector();
    for (const name of themeNames) {
      expect(screen.getByTestId(`theme-card-${name}`)).toBeInTheDocument();
    }
  });

  it('marks the default theme as selected', () => {
    renderSelector();
    expect(screen.getByTestId('theme-card-aurora')).toHaveAttribute('data-selected', 'true');
    expect(screen.getByTestId('theme-card-mint-breeze')).toHaveAttribute(
      'data-selected',
      'false',
    );
  });

  it('switches the active theme when a card is clicked', () => {
    renderSelector();
    act(() => {
      fireEvent.click(screen.getByTestId('theme-card-mint-breeze'));
    });
    expect(screen.getByTestId('theme-card-mint-breeze')).toHaveAttribute(
      'data-selected',
      'true',
    );
    expect(screen.getByTestId('theme-card-aurora')).toHaveAttribute(
      'data-selected',
      'false',
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('mint-breeze');
  });
});
