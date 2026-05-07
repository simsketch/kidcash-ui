# @kidcash/ui

[![npm version](https://img.shields.io/npm/v/@kidcash/ui.svg?color=8b5cf6&label=npm)](https://www.npmjs.com/package/@kidcash/ui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@kidcash/ui.svg?label=minzip)](https://bundlephobia.com/package/@kidcash/ui)
[![license: MIT](https://img.shields.io/npm/l/@kidcash/ui.svg)](./LICENSE)
[![types: strict](https://img.shields.io/badge/types-strict-3178c6.svg)](https://www.typescriptlang.org/)
[![built for KidCash](https://img.shields.io/badge/built%20for-KidCash-ec4899.svg)](https://www.kidcashapp.com)

> Playful React component library extracted from [**KidCash**](https://www.kidcashapp.com), the family allowance app — liquid glass, spring physics, and 9 themes for finance, family, and kid-focused interfaces.

**[→ Live playground at kit.kidcashapp.com](https://kit.kidcashapp.com)** · click any theme tile, hover the glass cards, fire confetti.

**Battle-tested in production** at [kidcashapp.com](https://www.kidcashapp.com), where parents and kids manage [allowance](https://www.kidcashapp.com/allowance), [chores](https://www.kidcashapp.com/chores), and [savings goals](https://www.kidcashapp.com/save-for) together. Free, open source, MIT licensed.

```bash
npm install @kidcash/ui framer-motion
```

> 🚧 **v0.1.x — early access.** API may shift before 1.0. Please pin exact versions.

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

Wrap your app in `ThemeProvider`, import the preset CSS, and you're set. Peer deps: `react >=19`, `react-dom >=19`, `tailwindcss >=4`.

## What's inside

**Foundations** — `GlassCard`, `Button`, `Pill`, `Avatar`, `AvatarStack`, `Skeleton`, `Keyboard`

**Typography & motion** — `GradientText`, `AnimatedNumber`, `Marquee`, `Spotlight`, `Confetti`, `FloatingCoins`, `FlyingMascot`

**Inputs & feedback** — `Slider`, `ProgressBar`, `EmojiPicker`, `Tooltip`, `Toast` (`ToastProvider` + `useToast`)

**Overlays** — `Modal`, `Sheet`, `CommandPalette`, `BackToTop`

**Family-finance specials** — `BirthdayCountdown`, `AchievementBadge`, `AchievementBadgeGrid`, `CelebrationOverlay`

27 components total, all framer-motion-animated, all theme-aware, all server-component-friendly (`'use client'` boundaries marked).

## 9 themes out of the box

| Dark | Light |
|---|---|
| `aurora`, `frosted-crystal`, `candy-glow`, `ocean-depth`, `sunset-dunes`, `midnight-garden` | `cotton-cloud`, `lemon-fizz`, `mint-breeze` |

Switch live with `<ThemeSelector />` or programmatically via `useTheme()`. All theme tokens are CSS custom properties so you can extend the palette without forking.

## Why this kit exists

[shadcn](https://ui.shadcn.com) nailed minimal. [Mantine](https://mantine.dev) nailed comprehensive. [Aceternity](https://ui.aceternity.com) and [Magic UI](https://magicui.design) nailed flashy. None of them nailed **playful, kid-friendly, and finance-native** — the aesthetic that makes a 9-year-old want to deposit their birthday money and a parent feel safe routing the family's allowance through your app.

That's the gap `@kidcash/ui` fills, extracted directly from [KidCash](https://www.kidcashapp.com)'s production codebase. Every primitive earned its keep on a real surface used by real families.

## Used in production by KidCash

Built and maintained by the team at [**KidCash**](https://www.kidcashapp.com) — a multi-platform family allowance app available on iOS, Android, web, Apple Watch, Apple TV, Vision Pro, macOS, Siri Shortcuts, and Alexa.

If this kit is useful to you, the easiest way to support it is to [download the KidCash app](https://www.kidcashapp.com) and tell another parent. The proceeds from KidCash fund development of this kit.

You can read more about the family-finance philosophy behind it on the [KidCash blog](https://www.kidcashapp.com/blog).

## Documentation & demos

- 📖 **Live playground:** [kit.kidcashapp.com](https://kit.kidcashapp.com)
- 📦 **npm package:** [npmjs.com/package/@kidcash/ui](https://www.npmjs.com/package/@kidcash/ui)
- 🐛 **Issues:** [github.com/simsketch/kidcash-ui/issues](https://github.com/simsketch/kidcash-ui/issues)
- 💬 **Discussions:** [github.com/simsketch/kidcash-ui/discussions](https://github.com/simsketch/kidcash-ui/discussions)
- 🌐 **The app this kit powers:** [kidcashapp.com](https://www.kidcashapp.com)

## Versioning & API stability

> 🚧 v0.1.x is **early access**. APIs may break between minor versions before 1.0 — please pin exact versions in your `package.json`.

Once we cut 1.0 we follow semantic versioning strictly: breaking changes go through one minor of deprecation warnings before they land.

## Contributing

PRs welcome. The fastest path:

```bash
git clone https://github.com/simsketch/kidcash-ui
cd kidcash-ui && pnpm install
pnpm --filter playground dev
# edit packages/ui/src/components/<your-component>.tsx
# Vite HMR picks it up immediately via the source alias
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the longer version. Tests run with `pnpm --filter @kidcash/ui test`. CI auto-publishes on `v*` tag pushes via [npm provenance](https://docs.npmjs.com/generating-provenance-statements) (signed build attestations).

## License

- **Code:** MIT — use it however you want, commercial or personal.
- **Mascot illustration** (`@kidcash/ui/mascot.png`): see [LICENSE-MASCOT.md](./LICENSE-MASCOT.md). The KidCash mascot is **not** MIT — please don't ship it as your own brand.
- **KidCash brand, logos, copy:** © KidCash. The kit is open; the brand isn't.

---

<sub>Made with 💜 by the team at [KidCash](https://www.kidcashapp.com) — the family allowance app for parents who want to teach money instead of just track it.</sub>
