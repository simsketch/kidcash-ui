import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Tooltip } from './tooltip';

describe('<Tooltip>', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the child without showing the tooltip initially', () => {
    render(
      <Tooltip content="hi there">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByText('Trigger')).toBeInTheDocument();
    expect(screen.queryByText('hi there')).toBeNull();
  });

  it('shows the tooltip after the delay on hover', () => {
    render(
      <Tooltip content="hi there" delay={100}>
        <button>Trigger</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    expect(screen.queryByText('hi there')).toBeNull();
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByText('hi there')).toBeInTheDocument();
  });

  it('hides the tooltip on mouse leave', () => {
    render(
      <Tooltip content="bye" delay={50}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);
    act(() => {
      vi.advanceTimersByTime(80);
    });
    expect(screen.getByText('bye')).toBeInTheDocument();
    fireEvent.mouseLeave(trigger);
    expect(screen.queryByText('bye')).toBeNull();
  });

  it('applies a position-specific data attribute', () => {
    render(
      <Tooltip content="cool" position="bottom" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    act(() => {
      vi.advanceTimersByTime(20);
    });
    const tooltip = screen.getByTestId('tooltip-content');
    expect(tooltip).toHaveAttribute('data-position', 'bottom');
  });
});
