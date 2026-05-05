/**
 * Lightweight framer-motion stub for unit tests.
 * - `motion.*` renders the underlying HTML element with no animation.
 * - `AnimatePresence` renders children directly (no exit-animation hold).
 * This lets tests assert that elements are removed from the DOM as soon as
 * the React state that drives them changes, without needing fake-timer gymnastics.
 */
import React from 'react';

type AnyProps = Record<string, unknown>;

// Strip framer-motion-specific props before forwarding to the DOM element
const FRAMER_PROPS = new Set([
  'initial', 'animate', 'exit', 'transition', 'variants',
  'whileHover', 'whileTap', 'whileFocus', 'whileDrag', 'whileInView',
  'layout', 'layoutId', 'drag', 'dragConstraints', 'onAnimationComplete',
  'onLayoutAnimationComplete', 'onUpdate', 'transformTemplate',
]);

function stripFramerProps(props: AnyProps): AnyProps {
  const out: AnyProps = {};
  for (const [k, v] of Object.entries(props)) {
    if (!FRAMER_PROPS.has(k)) out[k] = v;
  }
  return out;
}

function makeMotion(tag: string) {
  const Component = React.forwardRef<HTMLElement, AnyProps>((props, ref) => {
    const clean = stripFramerProps(props);
    return React.createElement(tag, { ...clean, ref });
  });
  Component.displayName = `motion.${tag}`;
  return Component;
}

const tags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'ul', 'li', 'button', 'section', 'article', 'header', 'footer', 'main', 'nav', 'aside', 'img', 'a', 'input', 'form', 'label', 'svg', 'path'];

export const motion = Object.fromEntries(tags.map((t) => [t, makeMotion(t)])) as Record<string, ReturnType<typeof makeMotion>>;

export function AnimatePresence({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function useAnimation() {
  return { start: () => Promise.resolve(), stop: () => {}, set: () => {} };
}

export function useMotionValue(initial: number) {
  return { get: () => initial, set: () => {}, onChange: () => () => {} };
}

export function useTransform(..._args: unknown[]) {
  return { get: () => 0, set: () => {}, onChange: () => () => {} };
}

export function useSpring(value: number) {
  return useMotionValue(value);
}

export const MotionConfig = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

export default { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, useSpring, MotionConfig };
