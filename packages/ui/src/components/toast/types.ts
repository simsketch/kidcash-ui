export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
  /** Bold heading rendered above the message. */
  title?: string;
  /** Long-form description (renders muted under the message). */
  description?: string;
  /** Optional leading glyph (emoji or React node). */
  icon?: React.ReactNode;
}

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface ToastContextValue {
  toast: (message: string, opts?: ToastOptions) => void;
}
