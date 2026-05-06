'use client';
import { forwardRef } from 'react';

export interface KeyboardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

const sizeClass: Record<NonNullable<KeyboardProps['size']>, string> = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2 py-1 text-xs',
};

/**
 * `Keyboard` — small keyboard-key chip. Use for inline shortcut hints like
 * `<Keyboard>⌘</Keyboard> <Keyboard>K</Keyboard>`. Glass background, mono
 * font, subtle inset shadow so it reads like a physical key.
 */
export const Keyboard = forwardRef<HTMLElement, KeyboardProps>(
  ({ children, size = 'md', className = '', style, ...rest }, ref) => {
    return (
      <kbd
        ref={ref}
        className={`glass inline-flex items-center justify-center rounded border border-white/15 font-mono leading-none text-text-light ${sizeClass[size]} ${className}`}
        style={{
          boxShadow:
            'inset 0 -1px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          ...style,
        }}
        {...rest}
      >
        {children}
      </kbd>
    );
  },
);
Keyboard.displayName = 'Keyboard';
