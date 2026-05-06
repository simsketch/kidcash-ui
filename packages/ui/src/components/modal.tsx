'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../tokens/motion';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: ModalSize;
  showClose?: boolean;
  closeOnBackdrop?: boolean;
  children: React.ReactNode;
}

const sizeClass: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

/**
 * `Modal` — generic centered modal. Glass-strong panel, spring entrance,
 * optional title + description + close button. Closes on Escape or
 * backdrop click (toggleable). Four sizes: sm / md / lg / xl.
 */
export function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  showClose = true,
  closeOnBackdrop = true,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            if (closeOnBackdrop) onClose();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(10, 6, 18, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <motion.div
            data-testid="modal-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={spring.gentle}
            className={`glass-strong rounded-card-lg p-8 w-full ${sizeClass[size]} relative`}
          >
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                data-testid="modal-close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full inline-flex items-center justify-center text-text-muted hover:text-text-light hover:bg-white/10 transition-colors cursor-pointer"
              >
                <CloseIcon />
              </button>
            )}
            {title && (
              <h2 className="text-xl font-semibold text-text-light mb-1 pr-8">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-sm text-text-muted mb-4 pr-8">{description}</p>
            )}
            <div className={title || description ? 'mt-2' : ''}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
