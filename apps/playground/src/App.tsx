'use client';
import { useEffect, useState } from 'react';
import {
  GlassCard,
  Button,
  GradientText,
  AnimatedNumber,
  Confetti,
  type ConfettiIntensity,
  FloatingCoins,
  type FloatingCoinsVariant,
  ProgressBar,
  ToastProvider,
  useToast,
  EmojiPicker,
  BackToTop,
  ThemeProvider,
  ThemeSelector,
  AchievementBadgeGrid,
  defaultBadges,
  BirthdayCountdown,
  CelebrationOverlay,
  Pill,
  Tooltip,
  Skeleton,
  Sheet,
  Slider,
  Avatar,
  AvatarStack,
  CommandPalette,
  type CommandItem,
  Modal,
  Keyboard,
  Marquee,
  Spotlight,
  FlyingMascot,
} from '@kidcash/ui';

const variants = ['primary', 'secondary', 'ghost', 'destructive'] as const;
const sizes = ['sm', 'md', 'lg'] as const;
const gradientVariants = ['aurora', 'sunset', 'forest', 'flame', 'animated'] as const;

const currency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function dayOffset(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(12, 0, 0, 0);
  return d;
}

// ----- Inner section wrappers -----
function SectionHeader({
  title,
  subtitle,
  variant = 'aurora',
}: {
  title: string;
  subtitle: string;
  variant?: 'aurora' | 'sunset' | 'forest' | 'flame' | 'animated';
}) {
  return (
    <div className="space-y-1">
      <GradientText as="h2" variant={variant} className="text-3xl font-semibold tracking-tight">
        {title}
      </GradientText>
      <p style={{ color: 'var(--theme-text-muted)' }}>{subtitle}</p>
    </div>
  );
}

// ----- Toast section (needs hook) -----
function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" onClick={() => toast('A new tip just landed.', { variant: 'info' })}>
        Info
      </Button>
      <Button variant="primary" onClick={() => toast('Saved successfully.', { variant: 'success' })}>
        Success
      </Button>
      <Button variant="primary" onClick={() => toast('Heads up — review needed.', { variant: 'warning' })}>
        Warning
      </Button>
      <Button variant="destructive" onClick={() => toast('Something went wrong.', { variant: 'danger' })}>
        Danger
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast('Great work today.', {
            variant: 'success',
            title: 'Goal reached!',
            description: 'Your weekly savings goal is complete.',
            icon: '🏆',
          })
        }
      >
        With title + description
      </Button>
    </div>
  );
}

// ----- Phenomenal section driver (needs toast hook for command palette feedback) -----
function PhenomenalSections() {
  const { toast } = useToast();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Global Cmd+K / Ctrl+K toggle.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const fire = (label: string) =>
    toast(`Triggered: ${label}`, { variant: 'success', icon: '⚡' });

  const commands: CommandItem[] = [
    {
      id: 'new-goal',
      label: 'New Goal',
      description: 'Start a new savings goal',
      icon: <span>🎯</span>,
      shortcut: ['G'],
      group: 'Actions',
      onSelect: () => fire('New Goal'),
    },
    {
      id: 'add-kid',
      label: 'Add Kid',
      description: 'Add a kid to your family account',
      icon: <span>👶</span>,
      shortcut: ['K'],
      group: 'Actions',
      onSelect: () => fire('Add Kid'),
    },
    {
      id: 'log-allowance',
      label: 'Log Allowance',
      description: 'Record an allowance payment',
      icon: <span>💵</span>,
      shortcut: ['A'],
      group: 'Actions',
      onSelect: () => fire('Log Allowance'),
    },
    {
      id: 'export',
      label: 'Export Data',
      description: 'Download a JSON snapshot',
      icon: <span>📦</span>,
      shortcut: ['⌘', 'E'],
      group: 'Actions',
      onSelect: () => fire('Export Data'),
    },
    {
      id: 'dashboard',
      label: 'Go to Dashboard',
      description: 'Jump to the main view',
      icon: <span>🏠</span>,
      shortcut: ['G', 'D'],
      group: 'Navigation',
      onSelect: () => fire('Dashboard'),
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Open settings page',
      icon: <span>⚙️</span>,
      shortcut: ['⌘', ','],
      group: 'Navigation',
      onSelect: () => fire('Settings'),
    },
    {
      id: 'kids',
      label: 'Kids',
      description: 'See your kids',
      icon: <span>🧒</span>,
      group: 'Navigation',
      onSelect: () => fire('Kids'),
    },
    {
      id: 'sign-out',
      label: 'Sign Out',
      description: 'Log out of your account',
      icon: <span>🚪</span>,
      shortcut: ['⌘', '⇧', 'Q'],
      group: 'Account',
      onSelect: () => fire('Sign Out'),
    },
  ];

  return (
    <>
      {/* ----- Command Palette ----- */}
      <GlassCard variant="strong" className="!p-10 space-y-6 mb-12">
        <SectionHeader
          title="Command palette"
          variant="aurora"
          subtitle="The signature feature. Cmd+K (or Ctrl+K) anywhere to open. Arrow keys, Enter to select, Esc to close."
        />
        <div className="flex flex-wrap gap-3 items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setPaletteOpen(true)}
            iconLeft={<span>⌘</span>}
          >
            Open Command Palette
          </Button>
          <span className="text-sm text-[var(--theme-text-muted)] flex items-center gap-2">
            or press <Keyboard>⌘</Keyboard> <Keyboard>K</Keyboard>
          </span>
        </div>
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          items={commands}
        />
      </GlassCard>

      {/* ----- Modal ----- */}
      <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
        <SectionHeader
          title="Modal"
          variant="sunset"
          subtitle="Generic centered modal. Glass-strong panel, spring entrance, optional title + description + close button."
        />
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
        </div>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm action"
          description="This is the generic Modal primitive — escape, click outside, or hit close to dismiss."
          size="md"
        >
          <div className="space-y-4 text-[var(--theme-text-muted)] text-sm leading-relaxed">
            <p>
              Use it for confirmation dialogs, settings panels, sign-up forms — anywhere
              you'd reach for a centered overlay. Spring physics on the entrance and a
              glass-strong backdrop keep it feeling premium.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      </GlassCard>

      {/* ----- Keyboard ----- */}
      <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
        <SectionHeader
          title="Keyboard"
          variant="forest"
          subtitle="Tiny keyboard chips for shortcut hints. Mono font, glass background, inset shadow so they read like physical keys."
        />
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[var(--theme-text-muted)]">Open command palette:</span>
            <span className="inline-flex gap-1">
              <Keyboard>⌘</Keyboard>
              <Keyboard>K</Keyboard>
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[var(--theme-text-muted)]">Quick switcher:</span>
            <span className="inline-flex gap-1">
              <Keyboard>⌘</Keyboard>
              <Keyboard>⇧</Keyboard>
              <Keyboard>P</Keyboard>
            </span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[var(--theme-text-muted)]">Cancel / dismiss:</span>
            <Keyboard>Esc</Keyboard>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[var(--theme-text-muted)]">Confirm:</span>
            <Keyboard>↩</Keyboard>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[var(--theme-text-muted)]">Sizes:</span>
            <Keyboard size="sm">sm</Keyboard>
            <Keyboard size="md">md</Keyboard>
          </div>
        </div>
      </GlassCard>

      {/* ----- Marquee ----- */}
      <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
        <SectionHeader
          title="Marquee"
          variant="flame"
          subtitle="Infinite horizontal scroll. Children duplicated for a seamless loop. Pause on hover, fade-edge mask, configurable speed."
        />
        <div className="space-y-6">
          <Marquee speed={28}>
            <Pill variant="default" iconLeft={<span>💵</span>}>
              Allowances
            </Pill>
            <Pill variant="primary" iconLeft={<span>🎯</span>}>
              Savings goals
            </Pill>
            <Pill variant="success" iconLeft={<span>✓</span>}>
              Verified
            </Pill>
            <Pill variant="warning" iconLeft={<span>🔔</span>}>
              Reminders
            </Pill>
            <Pill variant="danger" iconLeft={<span>🔥</span>}>
              Hot streak
            </Pill>
            <Pill variant="gradient" iconLeft={<span>⭐</span>}>
              Premium
            </Pill>
          </Marquee>
          <Marquee speed={36} direction="right">
            <Pill variant="gradient">Stripe-style</Pill>
            <Pill variant="default">Aceternity-style</Pill>
            <Pill variant="primary">Linear-style</Pill>
            <Pill variant="success">Vercel-style</Pill>
            <Pill variant="warning">Raycast-style</Pill>
            <Pill variant="danger">Apple-style</Pill>
          </Marquee>
        </div>
      </GlassCard>

      {/* ----- Spotlight ----- */}
      <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
        <SectionHeader
          title="Spotlight"
          variant="aurora"
          subtitle="Mouse-following radial highlight. Hover the card and a soft glow tracks the cursor — premium feel, pure CSS gradient."
        />
        <Spotlight
          color="rgba(139, 92, 246, 0.35)"
          size={520}
          className="rounded-card-lg"
        >
          <div className="glass-strong rounded-card-lg p-12 text-center space-y-3">
            <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
              Hover anywhere on this card
            </p>
            <GradientText
              variant="aurora"
              as="h3"
              className="text-4xl font-bold tracking-tight"
            >
              The cursor lights it up.
            </GradientText>
            <p className="text-[var(--theme-text-muted)] max-w-md mx-auto">
              Use Spotlight on hero sections, pricing cards, or anywhere you want
              a little extra polish. It works great over glass surfaces.
            </p>
          </div>
        </Spotlight>
      </GlassCard>
    </>
  );
}

function PlaygroundInner() {
  const [value, setValue] = useState(1234.56);
  const [plainValue, setPlainValue] = useState(42);
  const [loading, setLoading] = useState(false);

  const [confettiIntensity, setConfettiIntensity] = useState<ConfettiIntensity>('normal');
  const [confettiKey, setConfettiKey] = useState(0);
  const fireConfetti = (level: ConfettiIntensity) => {
    setConfettiIntensity(level);
    setConfettiKey((k) => k + 1);
  };

  const [coinsVariant, setCoinsVariant] = useState<FloatingCoinsVariant | null>(null);

  const [progressValue, setProgressValue] = useState(60);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState('🦄');

  const [unlockedCount, setUnlockedCount] = useState(4);

  const [celebrationOpen, setCelebrationOpen] = useState(false);

  const [pillTags, setPillTags] = useState<string[]>(['allowance', 'savings', 'chores']);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [slider1, setSlider1] = useState(50);
  const [slider2, setSlider2] = useState(75);
  const [slider3, setSlider3] = useState(25);

  const badges = defaultBadges.map((b, i) => ({ ...b, unlocked: i < unlockedCount }));

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'var(--theme-background)',
        color: 'var(--theme-text-primary)',
      }}
    >
      {/* Flying mascot — sweeps across the hero */}
      <FlyingMascot src="/mascot.png" alt="" top="6rem" size={80} duration={12} />

      {/* Theme-driven ambient orbs */}
      <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-[15%] left-1/4 w-[28rem] h-[28rem] rounded-full blur-[120px]"
          style={{ background: 'var(--theme-orb1)' }}
        />
        <div
          className="absolute bottom-[10%] right-1/4 w-[28rem] h-[28rem] rounded-full blur-[120px]"
          style={{ background: 'var(--theme-orb2)' }}
        />
        <div
          className="absolute top-[55%] left-[55%] w-[28rem] h-[28rem] rounded-full blur-[120px]"
          style={{ background: 'var(--theme-orb3)' }}
        />
      </div>

      {/* Floating coins (rendered conditionally so they don't always cover) */}
      {coinsVariant && (
        <FloatingCoins
          key={coinsVariant}
          variant={coinsVariant}
          count={20}
          duration={[8, 18]}
          className="z-0"
        />
      )}

      {/* Confetti driver — `key` forces remount per click so each press fires reliably */}
      {confettiKey > 0 && (
        <Confetti
          key={confettiKey}
          trigger
          intensity={confettiIntensity}
          duration={1200}
        />
      )}

      <div className="max-w-5xl mx-auto px-6 py-24 space-y-12">
        {/* ----- Hero (wrapped in Spotlight) ----- */}
        <Spotlight color="rgba(139, 92, 246, 0.3)" size={800} className="mb-12">
          <header className="text-center space-y-6 py-16">
            <GradientText
              variant="animated"
              as="h1"
              className="text-7xl md:text-8xl font-bold tracking-tight leading-none"
            >
              KidCash UI
            </GradientText>
            <p className="text-xl md:text-2xl text-[var(--theme-text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Liquid glass. Spring physics. Apple-grade craft. Free and open source.
            </p>
            <div className="flex justify-center">
              <a
                href="https://www.kidcashapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-strong inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-transform hover:scale-[1.03] hover:bg-[var(--theme-card-bg)]"
                style={{ color: 'var(--theme-text-primary)' }}
              >
                <span aria-hidden>✨</span>
                <span>
                  Built for{' '}
                  <GradientText variant="aurora" as="span" className="font-semibold">
                    KidCash
                  </GradientText>{' '}
                  — a family allowance app
                </span>
                <span aria-hidden>→</span>
              </a>
            </div>
            <p className="text-sm text-[var(--theme-text-muted)] flex items-center justify-center gap-2">
              Press <Keyboard>⌘</Keyboard> <Keyboard>K</Keyboard> to open the command palette
            </p>
            <div className="flex items-center justify-center gap-3 pt-4">
              <Button size="lg" iconLeft={<span>✨</span>}>
                Get started
              </Button>
              <Button size="lg" variant="secondary">
                Read the docs
              </Button>
            </div>
          </header>
        </Spotlight>

        {/* ----- Theme ----- */}
        <GlassCard variant="strong" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Theme"
            variant="animated"
            subtitle="Nine themes — six dark, three light. Click any card to apply it; the choice persists in localStorage."
          />
          <ThemeSelector />
        </GlassCard>

        {/* ----- Buttons ----- */}
        <GlassCard variant="default" className="!p-10 space-y-8 mb-12">
          <SectionHeader
            title="Buttons"
            variant="aurora"
            subtitle="Spring-tap physics. Four variants, three sizes. Works with icons and async states."
          />

          <div className="space-y-6">
            {variants.map((variant) => (
              <div key={variant} className="space-y-3">
                <p className="text-sm uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                  {variant}
                </p>
                <div className="flex flex-wrap items-end gap-3">
                  {sizes.map((size) => (
                    <Button key={size} variant={variant} size={size}>
                      {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
                    </Button>
                  ))}
                  <Button variant={variant} iconLeft={<span>⚡</span>}>
                    With icon
                  </Button>
                  <Button variant={variant} iconRight={<span>🚀</span>}>
                    Trailing
                  </Button>
                </div>
              </div>
            ))}

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1500);
                }}
                loading={loading}
              >
                {loading ? 'Saving…' : 'Save changes'}
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </GlassCard>

        {/* ----- Glass cards ----- */}
        <section className="space-y-4 mb-12">
          <div className="px-2">
            <SectionHeader
              title="Glass cards"
              variant="sunset"
              subtitle="Multi-layer translucency with backdrop saturation. Hover to feel the spring."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard variant="default">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono mb-3">
                default
              </p>
              <h3 className="text-xl font-semibold mb-2">Subtle surface</h3>
              <p className="text-[var(--theme-text-muted)] text-sm leading-relaxed">
                40px blur, 5% white tint, inset highlight. Sits quietly on top of the aurora.
              </p>
            </GlassCard>

            <GlassCard variant="strong" hover>
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono mb-3">
                strong + hover
              </p>
              <h3 className="text-xl font-semibold mb-2">Lift on hover</h3>
              <p className="text-[var(--theme-text-muted)] text-sm leading-relaxed">
                60px blur and a 200% saturation boost. Springs up 4px when the cursor lands.
              </p>
            </GlassCard>

            <GlassCard variant="strong" hover glow="primary">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono mb-3">
                glow primary
              </p>
              <h3 className="text-xl font-semibold mb-2">Halo of light</h3>
              <p className="text-[var(--theme-text-muted)] text-sm leading-relaxed">
                Two-layer glow ring (40px + 80px). Use sparingly — it draws the eye.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* ----- Gradient text ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Gradient text"
            variant="forest"
            subtitle="Five preset palettes, including an animated drift. Background-clipped, transparent fill."
          />

          <div className="space-y-3">
            {gradientVariants.map((variant) => (
              <div key={variant} className="flex items-baseline gap-6 flex-wrap">
                <span className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono w-24">
                  {variant}
                </span>
                <GradientText
                  variant={variant}
                  as="h3"
                  className="text-4xl font-bold tracking-tight"
                >
                  The quick brown fox
                </GradientText>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* ----- Animated number ----- */}
        <GlassCard variant="strong" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Animated number"
            variant="aurora"
            subtitle="easeOutExpo tween via rAF. Tabular numerals, format-agnostic — drives currency and plain numbers alike."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
            <div className="text-center space-y-3">
              <p className="text-sm uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                Currency
              </p>
              <GradientText
                variant="animated"
                as="span"
                className="text-6xl md:text-7xl font-bold tracking-tight tabular-nums block"
              >
                <AnimatedNumber value={value} format={currency} />
              </GradientText>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Button onClick={() => setValue(Math.random() * 9999)} iconLeft={<span>🎲</span>}>
                  Randomize
                </Button>
                <Button variant="secondary" onClick={() => setValue((v) => v + 100)}>
                  +$100
                </Button>
                <Button variant="ghost" onClick={() => setValue(0)}>
                  Reset
                </Button>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                Plain number
              </p>
              <GradientText
                variant="forest"
                as="span"
                className="text-6xl md:text-7xl font-bold tracking-tight tabular-nums block"
              >
                <AnimatedNumber value={plainValue} />
              </GradientText>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Button onClick={() => setPlainValue(Math.floor(Math.random() * 99999))} iconLeft={<span>🎲</span>}>
                  Randomize
                </Button>
                <Button variant="secondary" onClick={() => setPlainValue((v) => v + 1000)}>
                  +1,000
                </Button>
                <Button variant="ghost" onClick={() => setPlainValue(0)}>
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* ----- Confetti ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Confetti"
            variant="flame"
            subtitle="One-shot canvas burst. Pick an intensity to fire it."
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => fireConfetti('subtle')}>
              🎉 Subtle
            </Button>
            <Button variant="primary" onClick={() => fireConfetti('normal')}>
              🎊 Normal
            </Button>
            <Button variant="destructive" onClick={() => fireConfetti('wild')}>
              🌟 Wild
            </Button>
          </div>
        </GlassCard>

        {/* ----- Floating coins ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Floating coins"
            variant="sunset"
            subtitle="Full-viewport overlay. 3D-ish flip, sway, and depth-driven shadow per coin."
          />
          <div className="flex flex-wrap gap-3 items-center">
            <Button
              variant={coinsVariant === 'rain' ? 'primary' : 'secondary'}
              onClick={() => setCoinsVariant(coinsVariant === 'rain' ? null : 'rain')}
            >
              ☔ Rain
            </Button>
            <Button
              variant={coinsVariant === 'float' ? 'primary' : 'secondary'}
              onClick={() => setCoinsVariant(coinsVariant === 'float' ? null : 'float')}
            >
              🪶 Float
            </Button>
            <Button
              variant={coinsVariant === 'rise' ? 'primary' : 'secondary'}
              onClick={() => setCoinsVariant(coinsVariant === 'rise' ? null : 'rise')}
            >
              🚀 Rise
            </Button>
            <span className="text-sm text-[var(--theme-text-muted)] ml-2">
              {coinsVariant ? `Showing ${coinsVariant}` : 'Click to toggle'}
            </span>
          </div>
        </GlassCard>

        {/* ----- Progress bar ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Progress bar"
            variant="aurora"
            subtitle="Apple-style fill on a glass track. Spring-tweened. Primary variant gets a flowing aurora gradient when animate=true."
          />
          <div className="space-y-6 max-w-xl">
            <ProgressBar value={60} variant="primary" label="Primary · 60% (animated flow)" showValue />
            <ProgressBar value={100} variant="success" label="Success · 100%" showValue />
            <ProgressBar value={35} variant="danger" label="Danger · 35%" showValue size="lg" />
            <div className="space-y-3 pt-2">
              <ProgressBar
                value={progressValue}
                variant="primary"
                label="Live slider"
                showValue
              />
              <input
                type="range"
                min={0}
                max={100}
                value={progressValue}
                onChange={(e) => setProgressValue(Number(e.target.value))}
                className="w-full accent-primary"
                aria-label="Drive progress"
              />
            </div>
          </div>
        </GlassCard>

        {/* ----- Toast ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Toast"
            variant="forest"
            subtitle="Glass-strong cards with a 4px gradient accent rail. Optional title + description."
          />
          <ToastDemo />
        </GlassCard>

        {/* ----- Emoji picker ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Emoji picker"
            variant="sunset"
            subtitle="Bottom-sheet selector with keyword search and 96 default emojis."
          />
          <div className="flex items-center gap-4 flex-wrap">
            <Button variant="secondary" onClick={() => setPickerOpen(true)}>
              <span className="text-2xl mr-1">{pickedEmoji}</span> Click to change
            </Button>
            <span className="text-sm text-[var(--theme-text-muted)]">Selected: {pickedEmoji}</span>
          </div>
          <EmojiPicker
            open={pickerOpen}
            onClose={() => setPickerOpen(false)}
            onSelect={(e) => {
              setPickedEmoji(e);
              setPickerOpen(false);
            }}
            recents={['🦄', '🚀', '🎉']}
          />
        </GlassCard>

        {/* ----- Back to top ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Back to top"
            variant="flame"
            subtitle="Scroll up after a long page — appears in the bottom-right corner."
          />
          <p className="text-[var(--theme-text-muted)]">
            Scroll the page; once you cross 400px the up-arrow button springs in.
          </p>
          <BackToTop showAfter={400} />
        </GlassCard>

        {/* ----- Achievement badges ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Achievement badges"
            variant="forest"
            subtitle="Glass-card grid with locked/unlocked states, glow, and tier dots."
          />
          <AchievementBadgeGrid badges={badges} />
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setUnlockedCount((c) => Math.max(0, c - 1))}
            >
              Lock one
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setUnlockedCount((c) => Math.min(8, c + 1))}
            >
              Unlock one
            </Button>
            <span className="text-sm text-[var(--theme-text-muted)]">{unlockedCount} / 8 unlocked</span>
          </div>
        </GlassCard>

        {/* ----- Birthday countdown ----- */}
        <section className="space-y-4 mb-12">
          <div className="px-2">
            <SectionHeader
              title="Birthday countdown"
              variant="aurora"
              subtitle="Three states: future, today, past. Animated gradient on the live count."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BirthdayCountdown
              date={dayOffset(42)}
              label="Birthday"
              decorationEmoji="🎂"
            />
            <BirthdayCountdown date={dayOffset(0)} label="Birthday" />
            <BirthdayCountdown
              date={dayOffset(-12)}
              label="Birthday"
              decorationEmoji="🎂"
            />
          </div>
        </section>

        {/* ----- Celebration overlay ----- */}
        <GlassCard variant="strong" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Celebration overlay"
            variant="flame"
            subtitle="Heavy glass-strong backdrop, big bouncy emoji, animated-gradient title, confetti burst."
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={() => setCelebrationOpen(true)}>
              🎉 Open Celebration
            </Button>
          </div>
          <CelebrationOverlay
            open={celebrationOpen}
            onClose={() => setCelebrationOpen(false)}
            title="Goal Reached!"
            subtitle="You hit your savings target. Treat yourself."
            emoji="🏆"
            duration={4000}
          />
        </GlassCard>

        {/* ----- Pill ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Pill"
            variant="aurora"
            subtitle="Tags / chips / status pills. Six variants × three sizes. Optional icons + remove button."
          />
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                Variants × sizes
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(['default', 'primary', 'success', 'warning', 'danger', 'gradient'] as const).map(
                  (v) => (
                    <div key={v} className="flex flex-wrap items-center gap-2">
                      <Pill variant={v} size="sm">
                        {v}
                      </Pill>
                      <Pill variant={v} size="md">
                        {v}
                      </Pill>
                      <Pill variant={v} size="lg">
                        {v}
                      </Pill>
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                With leading icon
              </p>
              <div className="flex flex-wrap gap-2">
                <Pill variant="danger" iconLeft={<span>🔥</span>}>
                  Hot streak
                </Pill>
                <Pill variant="success" iconLeft={<span>✓</span>}>
                  Verified
                </Pill>
                <Pill variant="gradient" iconLeft={<span>⚡</span>} size="lg">
                  Premium
                </Pill>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                Removable
              </p>
              <div className="flex flex-wrap gap-2">
                {pillTags.map((t) => (
                  <Pill
                    key={t}
                    variant="primary"
                    removable
                    onRemove={() => setPillTags((tags) => tags.filter((x) => x !== t))}
                  >
                    {t}
                  </Pill>
                ))}
                {pillTags.length === 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setPillTags(['allowance', 'savings', 'chores'])}
                  >
                    Reset tags
                  </Button>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* ----- Tooltip ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Tooltip"
            variant="forest"
            subtitle="Hover or focus to reveal. Spring entrance, glass-strong surface, 300ms default delay."
          />
          <div className="flex flex-wrap gap-6 py-6">
            <Tooltip content="Anchored to the top edge" position="top">
              <Button variant="secondary">Top</Button>
            </Tooltip>
            <Tooltip content="Drops below the trigger" position="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip content="Floats out to the right" position="right">
              <Button variant="secondary">Right</Button>
            </Tooltip>
            <Tooltip content="No delay — instant" position="top" delay={0}>
              <Button variant="primary">Instant</Button>
            </Tooltip>
          </div>
        </GlassCard>

        {/* ----- Skeleton ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Skeleton"
            variant="sunset"
            subtitle="Loading placeholders. Subtle glass background plus a moving shimmer overlay."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                rect
              </p>
              <Skeleton width="100%" height={120} />
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                circle
              </p>
              <Skeleton shape="circle" width={80} height={80} />
            </div>
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                text · 3 lines
              </p>
              <Skeleton shape="text" count={3} />
            </div>
          </div>
        </GlassCard>

        {/* ----- Sheet ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Sheet"
            variant="flame"
            subtitle="Generic iOS-style overlay. Docks against any edge with a spring slide-in."
          />
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => setSheetOpen(true)}>
              Open sheet
            </Button>
          </div>
          <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="About this sheet">
            <div className="space-y-4 text-[var(--theme-text-muted)] text-sm leading-relaxed">
              <p>
                This is the generic <code className="text-[var(--theme-text-primary)] font-mono">Sheet</code>{' '}
                primitive — the same pattern the EmojiPicker uses internally, exposed for any
                modal/drawer use case.
              </p>
              <p>
                It takes a <code className="text-[var(--theme-text-primary)] font-mono">position</code> (top /
                bottom / left / right), an optional title, an optional drag handle, and standard
                open / onClose props. Click outside or press Escape to dismiss.
              </p>
              <p>
                Spring physics on the slide-in, glass-strong backdrop with backdrop-blur, and a
                rounded-card-lg corner on whichever edge is exposed.
              </p>
              <div className="pt-2">
                <Button variant="primary" onClick={() => setSheetOpen(false)}>
                  Got it
                </Button>
              </div>
            </div>
          </Sheet>
        </GlassCard>

        {/* ----- Slider ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Slider"
            variant="aurora"
            subtitle="Apple-style range. Glass track, gradient fill, glowing thumb. Three variants."
          />
          <div className="space-y-6 max-w-xl">
            <Slider
              value={slider1}
              onChange={setSlider1}
              label="Primary · allowance"
              showValue
              variant="primary"
            />
            <Slider
              value={slider2}
              onChange={setSlider2}
              label="Success · savings goal"
              showValue
              variant="success"
            />
            <Slider
              value={slider3}
              onChange={setSlider3}
              label="Flame · spending"
              showValue
              variant="flame"
            />
          </div>
        </GlassCard>

        {/* ----- Avatar ----- */}
        <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
          <SectionHeader
            title="Avatar"
            variant="forest"
            subtitle="One avatar primitive — image, initials, or emoji. Optional progress ring, status dot, vibrant aurora surface, and overlapping AvatarStack."
          />
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                Sizes & statuses (initials)
              </p>
              <div className="flex flex-wrap gap-6 items-end">
                <Avatar fallback="EZ" size="xs" status="online" />
                <Avatar fallback="LM" size="sm" status="busy" />
                <Avatar fallback="JK" size="md" status="away" />
                <Avatar fallback="MR" size="lg" status="offline" />
                <Avatar fallback="OS" size="xl" status="online" />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                Emoji avatars · ring · vibrant
              </p>
              <div className="flex flex-wrap gap-10 items-end">
                <Avatar emoji="🦄" name="Small" size="sm" />
                <Avatar emoji="🐱" name="Medium" size="md" />
                <Avatar emoji="🦊" name="Large" size="lg" />
                <Avatar emoji="⭐" name="Ring 70%" size="lg" ring={7} ringMax={10} />
                <Avatar emoji="🚀" name="Vibrant" size="lg" vibrant bobbing />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-[var(--theme-text-muted)] font-mono">
                Stack of 6 (max=4)
              </p>
              <AvatarStack
                size="md"
                max={4}
                avatars={[
                  { fallback: 'A' },
                  { fallback: 'B' },
                  { fallback: 'C' },
                  { fallback: 'D' },
                  { fallback: 'E' },
                  { fallback: 'F' },
                ]}
              />
            </div>
          </div>
        </GlassCard>

        <PhenomenalSections />

        {/* ----- Footer ----- */}
        <footer className="pt-12 pb-8 text-center space-y-5">
          <p className="text-sm text-[var(--theme-text-muted)]">
            Built by <span className="font-mono">@kidcash/ui</span> · MIT licensed
          </p>
          <div className="flex justify-center">
            <a
              href="https://www.kidcashapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="primary" size="lg" iconRight={<span>→</span>}>
                Visit kidcashapp.com
              </Button>
            </a>
          </div>
          <p className="text-xs text-[var(--theme-text-muted)]">
            The family allowance app that funded this kit.
          </p>
        </footer>
      </div>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider defaultTheme="aurora">
      <ToastProvider>
        <PlaygroundInner />
      </ToastProvider>
    </ThemeProvider>
  );
}
