import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToastProvider, useToast } from './index';
import type { ToastOptions } from './types';

function TriggerButton({ message, opts }: { message: string; opts?: ToastOptions }) {
  const { toast } = useToast();
  return <button onClick={() => toast(message, opts)}>Fire</button>;
}

describe('Toast', () => {
  it('useToast throws when used outside ToastProvider', () => {
    function Bad() {
      useToast();
      return null;
    }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Bad />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });

  it('renders a toast when toast() is called', () => {
    render(
      <ToastProvider>
        <TriggerButton message="Hello" />
      </ToastProvider>,
    );
    act(() => {
      screen.getByText('Fire').click();
    });
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <TriggerButton message="Bye" opts={{ duration: 1000 }} />
      </ToastProvider>,
    );
    act(() => {
      screen.getByText('Fire').click();
    });
    expect(screen.getByText('Bye')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1500);
      vi.runAllTimers();
    });
    expect(screen.queryByText('Bye')).toBeNull();
    vi.useRealTimers();
  });

  it('stacks multiple toasts', () => {
    render(
      <ToastProvider>
        <TriggerButton message="One" />
        <TriggerButton message="Two" />
      </ToastProvider>,
    );
    const buttons = screen.getAllByText('Fire');
    act(() => {
      buttons[0].click();
      buttons[1].click();
    });
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('renders title + description when provided', () => {
    render(
      <ToastProvider>
        <TriggerButton
          message="Goal complete"
          opts={{ title: 'Goal reached!', description: 'Great work today.' }}
        />
      </ToastProvider>,
    );
    act(() => {
      screen.getByText('Fire').click();
    });
    expect(screen.getByText('Goal reached!')).toBeInTheDocument();
    expect(screen.getByText('Goal complete')).toBeInTheDocument();
    expect(screen.getByText('Great work today.')).toBeInTheDocument();
  });
});
