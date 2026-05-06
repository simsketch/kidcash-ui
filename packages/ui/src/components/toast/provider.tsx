'use client';
import { createContext, useCallback, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { spring } from '../../tokens/motion';
import type { ToastContextValue, ToastItem, ToastOptions, ToastVariant } from './types';

export const ToastContext = createContext<ToastContextValue | null>(null);

const accentClass: Record<ToastVariant, string> = {
  info: 'bg-gradient-aurora',
  success: 'bg-gradient-success',
  warning: 'bg-gradient-sunset',
  danger: 'bg-gradient-danger',
};

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

/**
 * `ToastProvider` — wrap your tree once. Components can then call
 * `useToast().toast(message, opts?)`. Toasts stack vertically, auto-dismiss
 * on a per-item duration, and animate in/out with spring physics.
 *
 * Each toast is a `glass-strong` card with a 4px gradient accent rail on the
 * left edge whose color reflects the variant.
 */
export function ToastProvider({ children, position = 'bottom' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, opts?: ToastOptions) => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = {
      id,
      message,
      variant: opts?.variant ?? 'info',
      duration: opts?.duration ?? 4000,
      title: opts?.title,
      description: opts?.description,
      icon: opts?.icon,
    };
    setToasts((prev) => [...prev, item]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => {
        setToasts((prev) => prev.filter((p) => p.id !== t.id));
      }, t.duration),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  const positionClass = position === 'top' ? 'top-6' : 'bottom-6';

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className={`fixed left-1/2 -translate-x-1/2 ${positionClass} z-50 flex flex-col gap-3 pointer-events-none w-full max-w-sm px-4`}
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: position === 'top' ? -24 : 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={spring.gentle}
              className="glass-strong rounded-card overflow-hidden pointer-events-auto relative flex"
              style={{
                backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.08))',
                borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.15))',
                color: 'var(--theme-text-primary, #fafafa)',
                boxShadow:
                  'var(--theme-card-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 16px 48px rgba(0, 0, 0, 0.5))',
              }}
            >
              {/* Accent rail (4px gradient on left) */}
              <div className={`w-1 shrink-0 ${accentClass[t.variant]}`} aria-hidden />

              <div className="flex-1 flex items-start gap-3 p-4">
                {t.icon && (
                  <span className="shrink-0 text-xl leading-none mt-0.5" aria-hidden>
                    {t.icon}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  {t.title && (
                    <div
                      className="font-semibold leading-snug"
                      style={{ color: 'var(--theme-text-primary, #fafafa)' }}
                    >
                      {t.title}
                    </div>
                  )}
                  <div
                    className="text-sm leading-snug"
                    style={{
                      color: t.title
                        ? 'var(--theme-text-muted, #a1a1aa)'
                        : 'var(--theme-text-primary, #fafafa)',
                      marginTop: t.title ? '0.125rem' : 0,
                    }}
                  >
                    {t.message}
                  </div>
                  {t.description && (
                    <div
                      className="text-sm leading-snug mt-1"
                      style={{ color: 'var(--theme-text-muted, #a1a1aa)' }}
                    >
                      {t.description}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
