/**
 * Motion design tokens — spring presets and easing curves modeled on
 * Apple's UIKit / SwiftUI defaults. Tuned to feel native on macOS / iOS.
 */
export const spring = {
  /** Playful, slightly overshoots — for taps, badges, popovers. */
  bounce: { type: 'spring', stiffness: 400, damping: 17 },
  /** Smooth, no overshoot — for layout shifts, sheets. */
  gentle: { type: 'spring', stiffness: 200, damping: 25 },
  /** Snappy, no overshoot — for buttons, switches. */
  stiff: { type: 'spring', stiffness: 500, damping: 30 },
  /** Floaty, drifts in — for hero elements, large cards. */
  loose: { type: 'spring', stiffness: 100, damping: 15 },
  /** Critically damped — for precision UI moves (modals, drawers). */
  critical: { type: 'spring', stiffness: 300, damping: 30, mass: 1 },
} as const;

export const ease = {
  /** iOS default — fast start, gentle settle. */
  smooth: [0.32, 0.72, 0, 1] as const,
  /** Material 3 emphasized — confident deceleration. */
  emphasized: [0.2, 0, 0, 1] as const,
  /** Pure deceleration — ideal for entrance. */
  decel: [0, 0, 0, 1] as const,
  /** Pure acceleration — ideal for exit. */
  accel: [0.42, 0, 1, 1] as const,
} as const;

export const duration = {
  instant: 100,
  fast: 200,
  base: 300,
  slow: 500,
  glacial: 800,
} as const;

export type SpringToken = keyof typeof spring;
export type EaseToken = keyof typeof ease;
export type DurationToken = keyof typeof duration;
