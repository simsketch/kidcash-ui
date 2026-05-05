'use client';
import { createContext, useCallback, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ToastContextValue, ToastItem, ToastOptions } from './types';

export const ToastContext = createContext<ToastContextValue | null>(null);

const variantClass = {
  info: 'bg-blue-500/90',
  success: 'bg-emerald-500/90',
  warning: 'bg-amber-500/90',
  danger: 'bg-rose-500/90',
};

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export function ToastProvider({ children, position = 'bottom' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, opts?: ToastOptions) => {
    const id = Math.random().toString(36).slice(2);
    const item: ToastItem = {
      id,
      message,
      variant: opts?.variant ?? 'info',
      duration: opts?.duration ?? 4000,
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

  const positionClass = position === 'top' ? 'top-4' : 'bottom-4';

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className={`fixed left-1/2 -translate-x-1/2 ${positionClass} z-50 flex flex-col gap-2 pointer-events-none`}>
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: position === 'top' ? -20 : 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`px-4 py-2 rounded-card text-white shadow-lg pointer-events-auto ${variantClass[t.variant]}`}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
