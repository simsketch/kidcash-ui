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
        className={`glass inline-flex items-center justify-center rounded font-mono leading-none ${sizeClass[size]} ${className}`}
        style={{
          backgroundColor: 'var(--theme-card-bg, rgba(255, 255, 255, 0.05))',
          borderColor: 'var(--theme-card-border, rgba(255, 255, 255, 0.15))',
          borderWidth: 1,
          borderStyle: 'solid',
          color: 'var(--theme-text-primary, #fafafa)',
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
