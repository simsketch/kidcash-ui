/**
 * Component metadata for the per-component documentation pages. Each entry
 * is the source of truth for a single `/components/[slug]` route — its title,
 * SEO description, narrative intro, code example, and category placement.
 *
 * Keeping it in one TS file (rather than 27 MDX files) keeps the kit
 * portable, auto-checked by tsc, and easy to lint for completeness.
 */

export type ComponentCategory =
  | 'Foundations'
  | 'Typography & motion'
  | 'Inputs & feedback'
  | 'Overlays'
  | 'Family-finance specials'
  | 'Theming';

export interface ComponentMeta {
  /** URL slug — `kit.kidcashapp.com/components/[slug]`. */
  slug: string;
  /** PascalCase identifier as exported from `@kidcash/ui`. */
  name: string;
  category: ComponentCategory;
  /** Short SEO title (~50-60 chars). Used for `<title>` and OG. */
  title: string;
  /** Short SEO description (~150-160 chars). Used for `<meta name=description>`. */
  description: string;
  /** Narrative paragraphs (Markdown). The first paragraph leads. */
  intro: string;
  /** JSX example shown in a syntax-highlighted code block. */
  example: string;
}

const baseImport = `import { ThemeProvider } from '@kidcash/ui';`;

export const COMPONENTS: ComponentMeta[] = [
  // ----- Foundations -----
  {
    slug: 'glass-card',
    name: 'GlassCard',
    category: 'Foundations',
    title: 'GlassCard — Liquid glass card component for React',
    description:
      'Multi-layer translucent React card with backdrop saturation, theme-aware glow, and an opt-in hover bloom. Built on Tailwind v4 + framer-motion.',
    intro: `**GlassCard** is the surface primitive that ties the rest of the kit together. It composes a translucent background, an inset highlight, a multi-stop diagonal sheen, a radial top-right wash, and a theme-driven drop shadow into a single \`<div>\` you'd be comfortable showing a parent.

Two variants — \`default\` (40px blur) and \`strong\` (60px blur with a saturation bump) — and three glow colors give you a calm baseline that earns its glow on hover or pins it always-on for hero surfaces. Glow alphas are intentionally subtle: think ambient room light, not a spotlight.

Theme-aware: the card pulls \`--theme-card-bg\`, \`--theme-card-border\`, \`--theme-card-shadow\` from the active theme, so it reads correctly across all 9 themes without per-page tuning.`,
    example: `import { ThemeProvider, GlassCard } from '@kidcash/ui';

<ThemeProvider defaultTheme="aurora">
  <GlassCard variant="strong" glow="primary">
    <h3>Saving up for a Switch</h3>
    <p>$120 of $300 — keep going.</p>
  </GlassCard>
</ThemeProvider>`,
  },
  {
    slug: 'button',
    name: 'Button',
    category: 'Foundations',
    title: 'Button — Spring-tap React button with theme-aware gradient',
    description:
      'Four variants (primary, secondary, ghost, destructive) with framer-motion spring physics, a rotating conic-gradient hover trace, and per-theme primary gradients.',
    intro: `**Button** is a spring-tap interactive primitive. \`primary\` renders the active theme's signature gradient — aurora violet on dark, citrus on lemon-fizz, mint on mint-breeze — so it never clashes with the rest of the surface. \`secondary\` is a glass-on-glass card-tone option, \`ghost\` is a text-only fallback, \`destructive\` reuses the theme's danger gradient.

Every button is wrapped in framer-motion's \`whileHover\` (1.02× scale) and \`whileTap\` (0.97× scale) so taps feel like real taps. The conic-gradient \`button-trace\` outline rotates around primary buttons on hover — pure CSS via \`@property\`, no animation library required.

Async-friendly: pass \`loading\` to render an inline spinner and disable the button.`,
    example: `import { Button } from '@kidcash/ui';

<Button variant="primary" size="lg" iconLeft={<span>✨</span>}>
  Save my allowance
</Button>

<Button variant="destructive" loading>
  Deleting…
</Button>`,
  },
  {
    slug: 'pill',
    name: 'Pill',
    category: 'Foundations',
    title: 'Pill — Tag, chip, and status pill for React',
    description:
      'Six color variants (default, primary, success, warning, danger, gradient) × three sizes. Optional leading icon and removable close button.',
    intro: `**Pill** is the catch-all chip primitive. Use it for tags ("allowance", "weekly"), status (\`success\`, \`warning\`), category badges, leaderboard ranks, anywhere you need a pill-shaped affordance.

Six variants × three sizes = 18 visual presets out of the box. The optional \`onRemove\` handler renders a close button that respects the variant's color tokens, so a \`danger\` pill's X is correctly contrast-paired with the rest of the chip.`,
    example: `import { Pill } from '@kidcash/ui';

<Pill variant="success" leadingIcon="✓">Verified</Pill>
<Pill variant="gradient" size="lg">Premium</Pill>
<Pill variant="primary" onRemove={() => removeTag('chores')}>chores</Pill>`,
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Foundations',
    title: 'Avatar — One avatar primitive for image, initials, or emoji',
    description:
      'Single Avatar component handles image, initials, and emoji avatars. Optional progress ring, status dot, vibrant aurora surface, and AvatarStack for groups.',
    intro: `**Avatar** is one component for every avatar need. Pass \`src\` for an image, \`name\` to derive two-letter initials (consistent hashed background per name), or \`emoji\` for the playful kid-friendly variant the rest of KidCash uses for chore-doer faces and goal mascots.

Optional \`progress\` (0-100) wraps the avatar in an animated SVG ring — perfect for "61% to your savings goal" displays. A \`status\` dot (online / busy / away / offline) uses the theme's success/warning/danger colors so the indicator matches the rest of the surface.

Pair with \`<AvatarStack>\` to render overlapping avatar groups with a "+N more" cap.`,
    example: `import { Avatar, AvatarStack } from '@kidcash/ui';

<Avatar emoji="🦄" size="lg" status="online" progress={75} />
<Avatar name="Elon Zito" size="md" />
<AvatarStack max={4}>
  <Avatar name="A" /><Avatar name="B" /><Avatar name="C" />
  <Avatar name="D" /><Avatar name="E" /><Avatar name="F" />
</AvatarStack>`,
  },
  {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'Foundations',
    title: 'Skeleton — Loading placeholder with theme-aware shimmer',
    description:
      'Three shapes (rect, circle, text). Subtle glass background plus a moving shimmer overlay that uses the active theme\'s shimmer color so it reads in light AND dark modes.',
    intro: `**Skeleton** is the loading placeholder. Three shapes — \`rect\` (rounded-card, the default), \`circle\` (avatar swap), \`text\` (one or more bars; the last bar is shorter for a "ragged paragraph" tell).

The shimmer overlay reads from \`--theme-shimmer-color\` so it's a soft white wash on dark themes and a soft dark wash on light themes — no more invisible animation when the user lands on \`mint-breeze\` or \`cotton-cloud\`.`,
    example: `import { Skeleton } from '@kidcash/ui';

<Skeleton width={240} height={48} />
<Skeleton shape="circle" width={64} height={64} />
<Skeleton shape="text" count={3} />`,
  },
  {
    slug: 'keyboard',
    name: 'Keyboard',
    category: 'Foundations',
    title: 'Keyboard — Inline keyboard chip for shortcut hints',
    description:
      'Tiny mono-font chip styled to read like a physical key. Pair them in shortcut hints — `⌘` `K`, `Esc`, etc.',
    intro: `**Keyboard** is the small mono-font chip you stack inline to indicate a keyboard shortcut. Glass background, inset shadow, two sizes — designed to read like a physical keycap without dominating the line.`,
    example: `import { Keyboard } from '@kidcash/ui';

Press <Keyboard>⌘</Keyboard> <Keyboard>K</Keyboard> to open the command palette.`,
  },

  // ----- Typography & motion -----
  {
    slug: 'gradient-text',
    name: 'GradientText',
    category: 'Typography & motion',
    title: 'GradientText — Background-clipped gradient headlines',
    description:
      'Five preset palettes — aurora, sunset, forest, flame, animated — rendered via background-clip:text. Polymorphic via the `as` prop.',
    intro: `**GradientText** background-clips a multi-stop gradient to its glyphs. Five presets (\`aurora\`, \`sunset\`, \`forest\`, \`flame\`, \`animated\`), polymorphic via \`as\` so the same component renders an \`<h1>\` or a \`<span>\`. The \`animated\` variant slow-drifts the gradient at 10s per loop — use sparingly, it draws the eye on purpose.`,
    example: `import { GradientText } from '@kidcash/ui';

<GradientText as="h1" variant="aurora" className="text-5xl font-bold">
  Save together. Spend together.
</GradientText>`,
  },
  {
    slug: 'animated-number',
    name: 'AnimatedNumber',
    category: 'Typography & motion',
    title: 'AnimatedNumber — Tween a number with easeOutExpo',
    description:
      'Drives any displayed number with a requestAnimationFrame tween. Format-agnostic — pass `formatValue` to display currency, percentages, plain ints, anything.',
    intro: `**AnimatedNumber** is the count-up primitive. It drives the displayed value through an \`easeOutExpo\` tween via \`requestAnimationFrame\` — feels like a balance ticking up rather than a hard re-render. Tabular numerals are baked in so the layout doesn't jitter.

Format-agnostic: pass \`formatValue\` and you can render currency (\`$1,234.56\`), percentages, anything. The component itself never opinions on locale or symbols.`,
    example: `import { AnimatedNumber } from '@kidcash/ui';

const currency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

<AnimatedNumber value={1234.56} formatValue={currency} />`,
  },
  {
    slug: 'marquee',
    name: 'Marquee',
    category: 'Typography & motion',
    title: 'Marquee — Infinite horizontal scroll for React',
    description:
      'Children duplicated for a seamless loop, fade-edge mask, configurable speed, pause-on-hover. Drop-in for "as featured on" and brand strips.',
    intro: `**Marquee** runs an infinite horizontal scroll. Children are duplicated under the hood for a seamless loop, the edges fade-mask so the line doesn't pop in/out at the viewport boundary, and the whole thing pauses on hover by default.`,
    example: `import { Marquee } from '@kidcash/ui';

<Marquee speed={40} pauseOnHover>
  <span>Stripe-style</span>
  <span>Linear-style</span>
  <span>Vercel-style</span>
  <span>Apple-style</span>
</Marquee>`,
  },
  {
    slug: 'spotlight',
    name: 'Spotlight',
    category: 'Typography & motion',
    title: 'Spotlight — Mouse-following radial highlight',
    description:
      'Pure-CSS radial gradient that tracks the cursor across a card. Premium hover feel for hero sections, pricing cards, and key call-to-actions.',
    intro: `**Spotlight** wraps any card with a soft, mouse-following radial highlight. Pure CSS — no canvas, no JS animation loop — so it stays buttery on low-end devices. Use it for hero CTAs and pricing cards where a little extra "this is special" is welcome.`,
    example: `import { Spotlight, GlassCard } from '@kidcash/ui';

<Spotlight>
  <GlassCard variant="strong">
    <h3>Pro plan</h3>
    <p>Unlimited goals, unlimited kids.</p>
  </GlassCard>
</Spotlight>`,
  },
  {
    slug: 'confetti',
    name: 'Confetti',
    category: 'Typography & motion',
    title: 'Confetti — One-shot canvas confetti burst',
    description:
      'Three intensities (subtle, normal, wild). Fires once on a key change, no persistent canvas, easy retrigger via key counter.',
    intro: `**Confetti** is the celebration moment. One-shot canvas burst at three intensities — \`subtle\` for a small win, \`normal\` for a goal hit, \`wild\` for completion of a streak. The component re-fires on every \`key\` change, so the standard pattern is to bump a counter.`,
    example: `import { Confetti } from '@kidcash/ui';

const [counter, setCounter] = useState(0);

<button onClick={() => setCounter(c => c + 1)}>Hit goal</button>
<Confetti key={counter} intensity="normal" />`,
  },
  {
    slug: 'floating-coins',
    name: 'FloatingCoins',
    category: 'Typography & motion',
    title: 'FloatingCoins — Full-viewport coin overlay',
    description:
      'Three motion variants: rain, float, rise. 3D-ish flip, sway, depth-driven shadow per coin. Built on framer-motion.',
    intro: `**FloatingCoins** is the kit's signature finance flourish. Full-viewport overlay of gold-coin SVGs with a 3D-ish flip, slight sway, and depth-driven drop shadow on each coin.

Three variants — \`rain\` (top-down, fastest), \`float\` (bidirectional, slowest), \`rise\` (bottom-up, momentum-driven). Pair with the \`<Confetti>\` component for big-deposit moments.`,
    example: `import { FloatingCoins } from '@kidcash/ui';

const [variant, setVariant] = useState<'rain' | 'float' | 'rise' | null>(null);

<FloatingCoins variant={variant} onComplete={() => setVariant(null)} />`,
  },
  {
    slug: 'flying-mascot',
    name: 'FlyingMascot',
    category: 'Typography & motion',
    title: 'FlyingMascot — Looping mascot illustration over the hero',
    description:
      'Absolutely-positioned image that drifts across the viewport on a 10-second loop. Pair with KidCash mascots or your own brand character.',
    intro: `**FlyingMascot** absolutely-positions a mascot illustration that drifts horizontally across the viewport on a configurable loop, with subtle tilt and bob. Designed for hero sections where a little personality goes a long way.

The kit ships the canonical KidCash astronaut mascot at \`@kidcash/ui/mascot.png\` — drop your own \`src\` to use a custom character.`,
    example: `import { FlyingMascot } from '@kidcash/ui';
import mascotSrc from '@kidcash/ui/mascot.png';

<FlyingMascot src={mascotSrc} duration={10} top="15%" size={96} />`,
  },

  // ----- Inputs & feedback -----
  {
    slug: 'slider',
    name: 'Slider',
    category: 'Inputs & feedback',
    title: 'Slider — Apple-style range input for React',
    description:
      'Glass track, gradient fill, glowing thumb. Three variants: primary (aurora), success (green), flame (red/orange). Drop-in for `<input type=range>` controls.',
    intro: `**Slider** is the kit's range primitive. Glass track, gradient fill that follows the value, a thumb that glows in the variant's color and scales up under your cursor. Three variants — \`primary\` (theme aurora), \`success\` (allowance saved), \`flame\` (spending) — so the same control reads as the right semantics in different contexts.`,
    example: `import { Slider } from '@kidcash/ui';

<Slider variant="success" min={0} max={100} value={61} onChange={setValue} />`,
  },
  {
    slug: 'progress-bar',
    name: 'ProgressBar',
    category: 'Inputs & feedback',
    title: 'ProgressBar — Spring-tweened progress indicator',
    description:
      'Apple-style fill on a glass track. Spring physics. Primary variant gets a flowing aurora gradient when `animate=true`.',
    intro: `**ProgressBar** is the spring-tweened progress indicator. Glass track, gradient fill that springs to its target value. Pass \`animate\` to layer a flowing aurora gradient on top — perfect for "saving in progress" surfaces where standing still feels stalled.

Three variants line up with the slider's three semantics so a savings goal's slider and progress bar can share a color.`,
    example: `import { ProgressBar } from '@kidcash/ui';

<ProgressBar variant="primary" value={61} animate label="61% to goal" />`,
  },
  {
    slug: 'emoji-picker',
    name: 'EmojiPicker',
    category: 'Inputs & feedback',
    title: 'EmojiPicker — Bottom-sheet emoji selector for React',
    description:
      'Slide-up sheet with keyword search and 96 default emojis. Built on framer-motion, fully theme-aware.',
    intro: `**EmojiPicker** is a bottom-sheet emoji selector. Slide-up animation, keyword search, 96 default emojis covering money, family, achievement, and play. Pass your own \`emojis\` array to swap the dictionary entirely.

Designed for KidCash-style flows where the kid picks their own avatar, goal mascot, or chore icon — an emoji picker that doesn't feel like a Slack reaction picker.`,
    example: `import { EmojiPicker } from '@kidcash/ui';

const [open, setOpen] = useState(false);
const [picked, setPicked] = useState('🦄');

<button onClick={() => setOpen(true)}>{picked}</button>
<EmojiPicker open={open} onClose={() => setOpen(false)} onSelect={(e) => { setPicked(e); setOpen(false); }} />`,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Inputs & feedback',
    title: 'Tooltip — Spring-entrance tooltip rendered through a portal',
    description:
      'Hover or focus to reveal. Glass-strong surface, configurable delay, four positions. Renders through `createPortal(document.body)` to escape any backdrop-filter ancestor.',
    intro: `**Tooltip** is the hover/focus reveal. Spring-entrance, glass-strong surface, four positions (\`top\`, \`bottom\`, \`left\`, \`right\`), configurable delay. The component renders through \`createPortal(document.body)\` so backdrop-filter ancestors don't form a containing block that clips it — a common bug that the kit's portal pattern dodges.`,
    example: `import { Tooltip, Button } from '@kidcash/ui';

<Tooltip content="Adds $5 to this kid's allowance" placement="top">
  <Button variant="secondary">+ $5</Button>
</Tooltip>`,
  },
  {
    slug: 'toast',
    name: 'Toast',
    category: 'Inputs & feedback',
    title: 'Toast — Glass-strong toast notifications via useToast()',
    description:
      'ToastProvider + useToast hook. Glass-strong cards with a 4px gradient accent rail. Optional title, description, icon. Auto-dismiss with progress.',
    intro: `**Toast** is the kit's notification primitive — a \`<ToastProvider>\` you mount once and a \`useToast()\` hook anywhere in the tree. Glass-strong cards with a 4px gradient accent rail keyed to the toast's variant (info / success / warning / danger). Auto-dismiss with a progress indicator so users can watch their time tick down.

Each toast supports an optional \`title\`, \`description\`, and \`icon\` — for small confirmations, drop the title and pass a one-liner. For big moments ("Goal reached!"), include all three.`,
    example: `import { ToastProvider, useToast } from '@kidcash/ui';

function App() {
  return <ToastProvider>{/* your tree */}</ToastProvider>;
}

function MyButton() {
  const { toast } = useToast();
  return <button onClick={() => toast('Saved.', { variant: 'success', icon: '🏆' })}>Save</button>;
}`,
  },

  // ----- Overlays -----
  {
    slug: 'modal',
    name: 'Modal',
    category: 'Overlays',
    title: 'Modal — Glass-strong centered modal for React',
    description:
      'Centered modal with spring entrance, optional title + description + close button. Renders through a body portal to escape backdrop-filter ancestors.',
    intro: `**Modal** is the centered modal primitive. Glass-strong panel, spring entrance, optional \`title\`, \`description\`, and \`onClose\` — the close button is wired up if you provide a handler, omitted otherwise.

Like Tooltip and Sheet, the modal renders through \`createPortal(document.body)\` so the surface escapes any backdrop-filter ancestor — a containing-block trap that breaks naive overlay implementations.`,
    example: `import { Modal, Button } from '@kidcash/ui';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm withdrawal"
  description="$5 will be moved from savings to spending."
>
  <Button variant="primary">Confirm</Button>
</Modal>`,
  },
  {
    slug: 'sheet',
    name: 'Sheet',
    category: 'Overlays',
    title: 'Sheet — iOS-style edge-docked sheet for React',
    description:
      'Generic sheet that docks to any edge (top, right, bottom, left) with a spring slide-in. Drag-to-dismiss handle on bottom-docked sheets.',
    intro: `**Sheet** is the iOS-style overlay. Docks to any edge (\`top\`, \`right\`, \`bottom\`, \`left\`) with a spring slide-in. Bottom-docked sheets render a drag handle and respect a \`min-height\` so kids' fingers have a forgiving target.

Same body-portal escape as Modal and Tooltip so backdrop-filter ancestors don't trap it.`,
    example: `import { Sheet, Button } from '@kidcash/ui';

const [open, setOpen] = useState(false);
<Button onClick={() => setOpen(true)}>Open</Button>
<Sheet open={open} onClose={() => setOpen(false)} side="bottom">
  <h3>Add a chore</h3>
  {/* form */}
</Sheet>`,
  },
  {
    slug: 'command-palette',
    name: 'CommandPalette',
    category: 'Overlays',
    title: 'CommandPalette — Cmd+K command launcher for React',
    description:
      'The signature feature. Arrow-key navigation, Enter to select, Esc to close. Generic across actions, navigation, and search.',
    intro: `**CommandPalette** is the kit's signature surface. \`⌘K\` (or \`Ctrl+K\`) anywhere opens it. Arrow keys navigate the result list, Enter selects, Esc closes. Each item supports an icon, label, optional description, and optional keyboard hint.

Drives the entire keyboard-first flow inside the KidCash app — adding a chore, switching kids, opening settings — and works equally well as a documentation search or a navigation shortcut launcher in your own app.`,
    example: `import { CommandPalette, type CommandItem } from '@kidcash/ui';

const items: CommandItem[] = [
  { id: 'goal', label: 'Add savings goal', icon: '🎯', onSelect: () => navigate('/goals/new') },
  { id: 'chore', label: 'Add chore', icon: '🧹', onSelect: () => navigate('/chores/new') },
];

<CommandPalette open={open} onClose={() => setOpen(false)} items={items} />`,
  },
  {
    slug: 'back-to-top',
    name: 'BackToTop',
    category: 'Overlays',
    title: 'BackToTop — Floating scroll-to-top button',
    description:
      'Floating up-arrow button that springs into the bottom-right corner once the user has scrolled past a threshold.',
    intro: `**BackToTop** is the small quality-of-life button that appears once a user has scrolled past a configurable threshold. Glass surface, spring entrance, smooth scroll back to the top of the page on click.`,
    example: `import { BackToTop } from '@kidcash/ui';

<BackToTop threshold={400} />`,
  },

  // ----- Family-finance specials -----
  {
    slug: 'birthday-countdown',
    name: 'BirthdayCountdown',
    category: 'Family-finance specials',
    title: 'BirthdayCountdown — Spring-animated days-to countdown',
    description:
      'Three states (future, today, past) with an animated gradient on the live count and a celebratory state for "today". Built for birthdays, but works for any date.',
    intro: `**BirthdayCountdown** is the playful "days until" widget the kit was built for. Three states: \`future\` shows an animated gradient over the day count and a small floating decoration emoji; \`today\` celebrates with a special layout; \`past\` shows "X days since" in a muted tone.

Although the default styling reads as a kid's birthday widget, the component is generic — point it at any future date for "days until summer break", "days until the trip", "days until our family savings goal".`,
    example: `import { BirthdayCountdown } from '@kidcash/ui';

<BirthdayCountdown
  date={new Date('2026-08-15')}
  label="Birthday"
  decorationEmoji="🎂"
/>`,
  },
  {
    slug: 'achievement-badge',
    name: 'AchievementBadge',
    category: 'Family-finance specials',
    title: 'AchievementBadge — Locked/unlocked badge with tier glow',
    description:
      'Glass-card badge with locked/unlocked states, tier dots, and an aurora glow on unlock. AchievementBadgeGrid renders a responsive layout of many.',
    intro: `**AchievementBadge** is the kit's gamified milestone primitive. Locked badges render desaturated with a small lock icon. Unlocked badges scale-pulse on first reveal, gain a glow, and animate the emoji upward in a slow loop.

Pair with \`<AchievementBadgeGrid>\` to render a responsive grid of many — KidCash uses this on each kid's profile page to surface streaks, savings milestones, and chore-counts.`,
    example: `import { AchievementBadgeGrid, defaultBadges } from '@kidcash/ui';

<AchievementBadgeGrid
  badges={defaultBadges.map((b, i) => ({ ...b, unlocked: i < 4 }))}
/>`,
  },
  {
    slug: 'celebration-overlay',
    name: 'CelebrationOverlay',
    category: 'Family-finance specials',
    title: 'CelebrationOverlay — Full-screen celebration moment',
    description:
      'Heavy glass-strong backdrop, big bouncy emoji, animated-gradient title, confetti burst. The "you reached your savings goal" surface.',
    intro: `**CelebrationOverlay** is the all-in-one celebration moment. Heavy glass-strong backdrop, oversized bouncy emoji, animated-gradient title, confetti burst on open. Pass a custom emoji, title, subtitle, and optional CTA — the component handles the rest.`,
    example: `import { CelebrationOverlay, Button } from '@kidcash/ui';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>🎉 Celebrate</Button>
<CelebrationOverlay
  open={open}
  onClose={() => setOpen(false)}
  emoji="🏆"
  title="Goal reached!"
  subtitle="You saved $300 for your bike."
/>`,
  },

  // ----- Theming -----
  {
    slug: 'theme-provider',
    name: 'ThemeProvider',
    category: 'Theming',
    title: 'ThemeProvider — Theme context + CSS variable writer',
    description:
      'Wraps your app, exposes useTheme(), writes CSS custom properties to <html>, persists to localStorage. Required for theme-aware components.',
    intro: `**ThemeProvider** wraps your app and is the entry point for the kit's theming. It exposes \`useTheme()\` (current theme + setter), writes the active theme's CSS custom properties onto \`<html>\`, sets a \`data-theme-mode\` attribute for pure-CSS rules, and persists the user's choice to \`localStorage\`.

Every theme-aware component — GlassCard, Button, Skeleton, ProgressBar, Slider, Tooltip, Modal, Sheet — reads these CSS vars and falls back to sensible defaults if no provider is mounted.`,
    example: `${baseImport}

<ThemeProvider defaultTheme="aurora">
  <App />
</ThemeProvider>`,
  },
  {
    slug: 'theme-selector',
    name: 'ThemeSelector',
    category: 'Theming',
    title: 'ThemeSelector — 9-theme picker grid',
    description:
      'A 3×3 grid of theme cards with preview-color dots, label, description, and a light/dark mode badge per tile. Click to switch.',
    intro: `**ThemeSelector** is the 3×3 picker grid. Each tile shows four preview-color dots, the theme's label and description, and a light/dark mode badge so users can spot the surface tone at a glance. Clicking a tile fires \`setThemeName\` from the surrounding \`<ThemeProvider>\` — instant switch with persistence baked in.`,
    example: `import { ThemeProvider, ThemeSelector } from '@kidcash/ui';

<ThemeProvider defaultTheme="aurora">
  <ThemeSelector
    title="Theme"
    description="Pick a vibe — your choice persists."
  />
</ThemeProvider>`,
  },
];

export const COMPONENT_CATEGORIES: ComponentCategory[] = [
  'Foundations',
  'Typography & motion',
  'Inputs & feedback',
  'Overlays',
  'Family-finance specials',
  'Theming',
];

export function getComponent(slug: string): ComponentMeta | undefined {
  return COMPONENTS.find((c) => c.slug === slug);
}

export function componentsByCategory(): Record<ComponentCategory, ComponentMeta[]> {
  const grouped = Object.fromEntries(
    COMPONENT_CATEGORIES.map((c) => [c, [] as ComponentMeta[]]),
  ) as Record<ComponentCategory, ComponentMeta[]>;
  for (const comp of COMPONENTS) grouped[comp.category].push(comp);
  return grouped;
}
