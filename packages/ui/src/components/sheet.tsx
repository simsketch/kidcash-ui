'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../tokens/motion';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  /** Edge to dock against. Defaults to `bottom`. */
  position?: 'bottom' | 'top' | 'right' | 'left';
  /** `auto` hugs content; `half` is 50vh/vw; `full` fills. Defaults to `auto`. */
  size?: 'auto' | 'half' | 'full';
  /** Show the iOS-style drag handle. Defaults to true. */
  showHandle?: boolean;
}

interface PositionStyle {
  container: string;
  panel: string;
  initial: Record<string, string | number>;
  animate: Record<string, string | number>;
  exit: Record<string, string | number>;
  rounded: string;
}

function getStyles(
  position: NonNullable<SheetProps['position']>,
  size: NonNullable<SheetProps['size']>,
): PositionStyle {
  const isVertical = position === 'top' || position === 'bottom';
  const sizeStyle =
    size === 'full'
      ? isVertical
        ? 'h-full w-full'
        : 'w-full h-full'
      : size === 'half'
        ? isVertical
          ? 'h-[50vh] w-full'
          : 'w-[50vw] h-full'
        : isVertical
          ? 'max-h-[85vh] w-full'
          : 'max-w-[85vw] h-full';

  switch (position) {
    case 'top':
      return {
        container: 'items-start justify-center',
        panel: `${sizeStyle} max-w-2xl mx-auto`,
        initial: { y: '-100%' },
        animate: { y: 0 },
        exit: { y: '-100%' },
        rounded: 'rounded-b-card-lg',
      };
    case 'left':
      return {
        container: 'items-stretch justify-start',
        panel: sizeStyle,
        initial: { x: '-100%' },
        animate: { x: 0 },
        exit: { x: '-100%' },
        rounded: 'rounded-r-card-lg',
      };
    case 'right':
      return {
        container: 'items-stretch justify-end',
        panel: sizeStyle,
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        rounded: 'rounded-l-card-lg',
      };
    case 'bottom':
    default:
      return {
        container: 'items-end justify-center',
        panel: `${sizeStyle} max-w-2xl mx-auto`,
        initial: { y: '100%' },
        animate: { y: 0 },
        exit: { y: '100%' },
        rounded: 'rounded-t-card-lg',
      };
  }
}

/**
 * `Sheet` — generic iOS-style overlay panel. Docks against any edge,
 * springs in from that edge, and overlays a `glass-strong` blurred
 * backdrop. Closes on Escape or backdrop click.
 */
export function Sheet({
  open,
  onClose,
  title,
  children,
  position = 'bottom',
  size = 'auto',
  showHandle = true,
}: SheetProps) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const styles = getStyles(position, size);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-testid="sheet-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`fixed inset-0 z-50 flex ${styles.container}`}
          style={{
            backgroundColor: 'rgba(10, 6, 18, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={styles.initial}
            animate={styles.animate}
            exit={styles.exit}
            transition={spring.gentle}
            className={`glass-strong ${styles.rounded} p-6 ${styles.panel} overflow-y-auto`}
          >
            {showHandle && position === 'bottom' && (
              <div className="flex justify-center mb-4" aria-hidden>
                <div
                  data-testid="sheet-handle"
                  className="w-12 h-1.5 rounded-pill bg-white/30"
                />
              </div>
            )}
            {showHandle && position !== 'bottom' && (
              <div
                data-testid="sheet-handle"
                aria-hidden
                className="w-12 h-1.5 rounded-pill bg-white/30 mx-auto mb-4"
              />
            )}
            {title && (
              <h2 className="text-xl font-semibold mb-4 text-text-light">{title}</h2>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
