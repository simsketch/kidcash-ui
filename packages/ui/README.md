# @kidcash/ui

Playful React component library extracted from [KidCash](https://www.kidcashapp.com) — liquid glass, spring physics, and 9 themes built for family-finance and kid-focused apps.

> 🚧 **v0.1.0 in development.** API may shift before 1.0. Please pin exact versions.

## Install

```bash
npm install @kidcash/ui framer-motion
# peer deps: react >=19, react-dom >=19, tailwindcss >=4
```

## Quick start

Wrap your app in `ThemeProvider` and import the preset CSS so the glass utilities and theme variables are available.

```tsx
// app entry
import '@kidcash/ui/preset.css';
import { ThemeProvider, GlassCard, Button } from '@kidcash/ui';

export default function App() {
  return (
    <ThemeProvider defaultTheme="aurora">
      <GlassCard variant="strong" glow="primary">
        <h1>Hello, glass.</h1>
        <Button variant="primary">Get started</Button>
      </GlassCard>
    </ThemeProvider>
  );
}
```

## What's in the box

**Foundations** — `GlassCard`, `Button`, `Pill`, `Avatar`, `AvatarStack`, `Skeleton`, `Keyboard`

**Typography & motion** — `GradientText`, `AnimatedNumber`, `Marquee`, `Spotlight`, `Confetti`, `FloatingCoins`, `FlyingMascot`

**Inputs & feedback** — `Slider`, `ProgressBar`, `EmojiPicker`, `Tooltip`, `Toast` (`ToastProvider` + `useToast`)

**Overlays** — `Modal`, `Sheet`, `CommandPalette`, `BackToTop`

**Family-finance specials** — `BirthdayCountdown`, `AchievementBadge` + `AchievementBadgeGrid`, `CelebrationOverlay`

**Theming** — `ThemeProvider`, `ThemeSelector`, `useTheme`. Nine themes: `aurora`, `frosted-crystal`, `candy-glow`, `ocean-depth`, `sunset-dunes`, `midnight-garden`, `cotton-cloud`, `lemon-fizz`, `mint-breeze`.

## License

MIT for the code. Mascot illustration is licensed separately — see [`LICENSE-MASCOT.md`](https://github.com/simsketch/kidcash-ui/blob/main/LICENSE-MASCOT.md).
