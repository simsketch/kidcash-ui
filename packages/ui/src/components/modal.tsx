'use client';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  const tree = (
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
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
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
            style={{
              backgroundColor: 'var(--theme-card-bg, rgba(15, 11, 26, 0.97))',
              borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.15))',
              borderWidth: 1,
              borderStyle: 'solid',
              color: 'var(--theme-text-primary, #fafafa)',
              boxShadow:
                'var(--theme-card-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 24px 64px rgba(0, 0, 0, 0.6))',
            }}
          >
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                data-testid="modal-close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full inline-flex items-center justify-center transition-colors cursor-pointer hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.1))]"
                style={{ color: 'var(--theme-text-muted, #a1a1aa)' }}
              >
                <CloseIcon />
              </button>
            )}
            {title && (
              <h2
                className="text-xl font-semibold mb-1 pr-8"
                style={{ color: 'var(--theme-text-primary, #fafafa)' }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className="text-sm mb-4 pr-8"
                style={{ color: 'var(--theme-text-muted, #a1a1aa)' }}
              >
                {description}
              </p>
            )}
            <div className={title || description ? 'mt-2' : ''}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Render via a portal to <body> so backdrop-filter ancestors (e.g. the
  // surrounding GlassCard) don't form a containing block that constrains the
  // fixed-positioned overlay.
  if (typeof document === 'undefined') return tree;
  return createPortal(tree, document.body);
}
