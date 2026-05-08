import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// Mock matchMedia for components that read prefers-reduced-motion
// addListener/removeListener are the deprecated but still-called framer-motion API
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});

// Mock requestAnimationFrame for animation tests. The current TS lib
// types match these signatures so no @ts-expect-error is needed.
global.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(cb, 0) as unknown as number;
global.cancelAnimationFrame = (id: number) => clearTimeout(id as unknown as NodeJS.Timeout);
