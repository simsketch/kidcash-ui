'use client';
import { useContext } from 'react';
import { ToastContext, ToastProvider } from './provider';
import type { ToastContextValue } from './types';

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

export { ToastProvider };
export type { ToastVariant, ToastOptions, ToastContextValue, ToastItem } from './types';
