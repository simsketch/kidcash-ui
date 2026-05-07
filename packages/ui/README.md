# @kidcash/ui

[![npm version](https://img.shields.io/npm/v/@kidcash/ui.svg?color=8b5cf6&label=npm)](https://www.npmjs.com/package/@kidcash/ui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@kidcash/ui.svg?label=minzip)](https://bundlephobia.com/package/@kidcash/ui)
[![license: MIT](https://img.shields.io/npm/l/@kidcash/ui.svg)](https://github.com/simsketch/kidcash-ui/blob/main/LICENSE)
[![types: strict](https://img.shields.io/badge/types-strict-3178c6.svg)](https://www.typescriptlang.org/)
[![built for KidCash](https://img.shields.io/badge/built%20for-KidCash-ec4899.svg)](https://www.kidcashapp.com)

> Playful React component library extracted from [**KidCash**](https://www.kidcashapp.com), the family allowance app — liquid glass, spring physics, and 9 themes for finance, family, and kid-focused interfaces.

**[→ Live playground at kit.kidcashapp.com](https://kit.kidcashapp.com)** · click any theme tile, hover the glass cards, fire confetti.

**Battle-tested in production** at [kidcashapp.com](https://www.kidcashapp.com), where parents and kids manage [allowance](https://www.kidcashapp.com/allowance), [chores](https://www.kidcashapp.com/chores), and [savings goals](https://www.kidcashapp.com/save-for) together.

> 🚧 **v0.1.x — early access.** API may shift before 1.0. Please pin exact versions.

## Install

```bash
npm install @kidcash/ui framer-motion
# peer deps: react >=19, react-dom >=19, tailwindcss >=4
```

## Quick start

```tsx
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

Wrap your app in `ThemeProvider`, import the preset CSS, and you're set.

## What's inside

**Foundations** — `GlassCard`, `Button`, `Pill`, `Avatar`, `AvatarStack`, `Skeleton`, `Keyboard`

**Typography & motion** — `GradientText`, `AnimatedNumber`, `Marquee`, `Spotlight`, `Confetti`, `FloatingCoins`, `FlyingMascot`

**Inputs & feedback** — `Slider`, `ProgressBar`, `EmojiPicker`, `Tooltip`, `Toast` (`ToastProvider` + `useToast`)

**Overlays** — `Modal`, `Sheet`, `CommandPalette`, `BackToTop`

**Family-finance specials** — `BirthdayCountdown`, `AchievementBadge` + `AchievementBadgeGrid`, `CelebrationOverlay`

27 components total, framer-motion-animated, theme-aware, and `'use client'` boundaries marked.

## 9 themes out of the box

| Dark | Light |
|---|---|
| `aurora`, `frosted-crystal`, `candy-glow`, `ocean-depth`, `sunset-dunes`, `midnight-garden` | `cotton-cloud`, `lemon-fizz`, `mint-breeze` |

Switch live with `<ThemeSelector />` or programmatically via `useTheme()`.

## Why this kit exists

[shadcn](https://ui.shadcn.com) nailed minimal. [Mantine](https://mantine.dev) nailed comprehensive. [Aceternity](https://ui.aceternity.com) nailed flashy. None of them nailed **playful, kid-friendly, finance-native** — the aesthetic that makes a 9-year-old excited to deposit their birthday money and a parent feel safe routing family allowance through your app.

That's the gap `@kidcash/ui` fills, extracted from [KidCash](https://www.kidcashapp.com)'s production codebase.

## Used in production by KidCash

Built and maintained by the team at [**KidCash**](https://www.kidcashapp.com) — a multi-platform family allowance app on iOS, Android, web, Apple Watch, Apple TV, Vision Pro, macOS, Siri Shortcuts, and Alexa.

If this kit is useful, the easiest way to support it is to [download KidCash](https://www.kidcashapp.com) and tell another parent. Proceeds from the app fund development of this kit.

## Links

- 📖 **Repo + docs:** [github.com/simsketch/kidcash-ui](https://github.com/simsketch/kidcash-ui)
- 🌐 **The app this kit powers:** [kidcashapp.com](https://www.kidcashapp.com)
- 🐛 **Issues:** [github.com/simsketch/kidcash-ui/issues](https://github.com/simsketch/kidcash-ui/issues)
- 📰 **Family-finance writing:** [KidCash blog](https://www.kidcashapp.com/blog)

## License

MIT for the code. Mascot illustration is licensed separately — see [`LICENSE-MASCOT.md`](https://github.com/simsketch/kidcash-ui/blob/main/LICENSE-MASCOT.md). KidCash brand & logos © KidCash.

---

<sub>Made with 💜 at [KidCash](https://www.kidcashapp.com).</sub>
