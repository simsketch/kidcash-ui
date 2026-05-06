'use client';
import {
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../tokens/motion';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: React.ReactNode;
  /** Where to anchor the tooltip relative to the child. Defaults to `top`. */
  position?: TooltipPosition;
  /** ms to wait before showing on hover/focus. Defaults to 300. */
  delay?: number;
  children: ReactElement;
}

interface Coords {
  top: number;
  left: number;
}

/**
 * `Tooltip` — wraps a single child element and shows a small glass-strong
 * tooltip on hover / focus. Positioned via the trigger's bounding rect and
 * rendered in a `document.body` portal so it escapes any backdrop-filter or
 * overflow:hidden ancestor that would otherwise clip / mis-position it.
 */
export function Tooltip({
  content,
  position = 'top',
  delay = 300,
  children,
}: TooltipProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Portal target — only available client-side.
  useEffect(() => {
    setMounted(true);
  }, []);

  function computeCoords(): Coords {
    const el = triggerRef.current;
    if (!el) return { top: 0, left: 0 };
    const r = el.getBoundingClientRect();
    const t = tooltipRef.current?.getBoundingClientRect();
    const tw = t?.width ?? 0;
    const th = t?.height ?? 0;
    const gap = 8;
    switch (position) {
      case 'bottom':
        return { top: r.bottom + gap, left: r.left + r.width / 2 - tw / 2 };
      case 'left':
        return { top: r.top + r.height / 2 - th / 2, left: r.left - tw - gap };
      case 'right':
        return { top: r.top + r.height / 2 - th / 2, left: r.right + gap };
      case 'top':
      default:
        return { top: r.top - th - gap, left: r.left + r.width / 2 - tw / 2 };
    }
  }

  function show() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCoords(computeCoords());
      setVisible(true);
    }, delay);
  }

  function hide() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }

  // Re-measure once the tooltip mounts (because we need its real width/height).
  useLayoutEffect(() => {
    if (visible) {
      // Defer one frame so the tooltip ref is populated.
      const id = requestAnimationFrame(() => setCoords(computeCoords()));
      return () => cancelAnimationFrame(id);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  if (!isValidElement(children)) return children as React.ReactNode;

  const childProps = (children.props ?? {}) as Record<string, unknown>;
  type EvtHandler<T extends React.SyntheticEvent> = ((e: T) => void) | undefined;

  // React 19: `ref` is a regular prop on the child, accessible via children.props.ref.
  const childRef = (childProps as { ref?: unknown }).ref;

  const trigger = cloneElement(children as ReactElement<Record<string, unknown>>, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      if (typeof childRef === 'function') childRef(node);
      else if (childRef && typeof childRef === 'object' && 'current' in (childRef as object)) {
        (childRef as { current: HTMLElement | null }).current = node;
      }
    },
    onMouseEnter: (e: React.MouseEvent) => {
      (childProps.onMouseEnter as EvtHandler<React.MouseEvent>)?.(e);
      show();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      (childProps.onMouseLeave as EvtHandler<React.MouseEvent>)?.(e);
      hide();
    },
    onFocus: (e: React.FocusEvent) => {
      (childProps.onFocus as EvtHandler<React.FocusEvent>)?.(e);
      show();
    },
    onBlur: (e: React.FocusEvent) => {
      (childProps.onBlur as EvtHandler<React.FocusEvent>)?.(e);
      hide();
    },
  });

  const tooltipNode = (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={tooltipRef}
          data-testid="tooltip-content"
          data-position={position}
          role="tooltip"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={spring.stiff}
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            zIndex: 9999,
            pointerEvents: 'none',
            backgroundColor: 'var(--theme-card-bg, rgba(20, 20, 30, 0.92))',
            borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.18))',
            borderWidth: 1,
            borderStyle: 'solid',
            color: 'var(--theme-text-primary, #fafafa)',
            boxShadow:
              'var(--theme-card-shadow, inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 16px 48px rgba(0, 0, 0, 0.5))',
          }}
          className="glass-strong text-xs px-2 py-1 rounded-button whitespace-nowrap"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {trigger}
      {mounted && typeof document !== 'undefined'
        ? createPortal(tooltipNode, document.body)
        : tooltipNode}
    </>
  );
}
