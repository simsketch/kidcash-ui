export const animations = {
  bounceIn: {
    keyframes: '0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); }',
    duration: '0.5s',
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  shake: {
    keyframes: '0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); }',
    duration: '0.5s',
    easing: 'ease-in-out',
  },
  mascotBob: {
    keyframes: '0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); }',
    duration: '4.2s',
    easing: 'ease-in-out',
  },
  shimmer: {
    keyframes: '0% { background-position: -200% 0; } 100% { background-position: 200% 0; }',
    duration: '2s',
    easing: 'linear',
  },
} as const;

export type AnimationToken = keyof typeof animations;
