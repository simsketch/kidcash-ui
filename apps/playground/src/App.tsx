'use client';
import { useState } from 'react';
import {
  GlassCard,
  Button,
  GradientText,
  AnimatedNumber,
  AnimatedBalance,
  Confetti,
  type ConfettiIntensity,
  FloatingCoins,
  type FloatingCoinsVariant,
  ProgressBar,
  ToastProvider,
  useToast,
  EmojiPicker,
  BackToTop,
  ThemeToggle,
  type Theme,
  KidAvatar,
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
      <p className="text-text-muted">{subtitle}</p>
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

export function App() {
  // ---- Pass 1 state ----
  const [value, setValue] = useState(1234.56);
  const [loading, setLoading] = useState(false);

  // ---- Pass 2A state ----
  const [balance, setBalance] = useState(5432.1);

  const [confettiIntensity, setConfettiIntensity] = useState<ConfettiIntensity | null>(null);

  const [coinsVariant, setCoinsVariant] = useState<FloatingCoinsVariant | null>(null);

  const [progressValue, setProgressValue] = useState(60);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState('🦄');

  const [theme1, setTheme1] = useState<Theme>('light');
  const [theme2, setTheme2] = useState<Theme>('dark');
  const [theme3, setTheme3] = useState<Theme>('system');

  const [unlockedCount, setUnlockedCount] = useState(4);

  const [celebrationOpen, setCelebrationOpen] = useState(false);

  // ---- Pass 2B state ----
  const [pillTags, setPillTags] = useState<string[]>(['allowance', 'savings', 'chores']);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [slider1, setSlider1] = useState(50);
  const [slider2, setSlider2] = useState(75);
  const [slider3, setSlider3] = useState(25);

  const badges = defaultBadges.map((b, i) => ({ ...b, unlocked: i < unlockedCount }));

  return (
    <ToastProvider>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Aurora blob background */}
        <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[15%] left-1/4 w-[28rem] h-[28rem] bg-primary/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-1/4 w-[28rem] h-[28rem] bg-secondary/30 rounded-full blur-[120px]" />
          <div className="absolute top-[55%] left-[55%] w-[28rem] h-[28rem] bg-accent/25 rounded-full blur-[120px]" />
          <div className="absolute top-[85%] left-[10%] w-[20rem] h-[20rem] bg-success/20 rounded-full blur-[120px]" />
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

        {/* Confetti driver */}
        {confettiIntensity && (
          <Confetti
            trigger
            intensity={confettiIntensity}
            duration={1200}
            onComplete={() => setConfettiIntensity(null)}
          />
        )}

        <div className="max-w-5xl mx-auto px-6 py-24 space-y-12">
          {/* ----- Hero ----- */}
          <header className="text-center space-y-6 mb-12">
            <GradientText
              variant="animated"
              as="h1"
              className="text-7xl md:text-8xl font-bold tracking-tight leading-none"
            >
              KidCash UI
            </GradientText>
            <p className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              Liquid glass. Spring physics. Apple-grade craft. Free and open source.
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

          {/* =============================== */}
          {/* PASS 1 — FOUNDATION PRIMITIVES  */}
          {/* =============================== */}

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
                  <p className="text-sm uppercase tracking-widest text-text-muted font-mono">
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
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-3">
                  default
                </p>
                <h3 className="text-xl font-semibold mb-2">Subtle surface</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  40px blur, 5% white tint, inset highlight. Sits quietly on top of the aurora.
                </p>
              </GlassCard>

              <GlassCard variant="strong" hover>
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-3">
                  strong + hover
                </p>
                <h3 className="text-xl font-semibold mb-2">Lift on hover</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  60px blur and a 200% saturation boost. Springs up 4px when the cursor lands.
                </p>
              </GlassCard>

              <GlassCard variant="strong" hover glow="primary">
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono mb-3">
                  glow primary
                </p>
                <h3 className="text-xl font-semibold mb-2">Halo of light</h3>
                <p className="text-text-muted text-sm leading-relaxed">
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
                  <span className="text-xs uppercase tracking-widest text-text-muted font-mono w-24">
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
          <GlassCard variant="strong" glow="accent" className="!p-10 space-y-6 mb-12">
            <SectionHeader
              title="Animated number"
              variant="aurora"
              subtitle="easeOutExpo tween, spring-bumped on each value change. Tabular numerals for clean alignment."
            />

            <div className="flex flex-col items-center gap-8 py-6">
              <div className="text-center space-y-3">
                <p className="text-sm uppercase tracking-widest text-text-muted font-mono">
                  Total balance
                </p>
                <GradientText
                  variant="animated"
                  as="span"
                  className="text-7xl md:text-8xl font-bold tracking-tight tabular-nums"
                >
                  <AnimatedNumber value={value} format={currency} />
                </GradientText>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
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
          </GlassCard>

          {/* =============================== */}
          {/* PASS 2A — REBUILT COMPONENTS    */}
          {/* =============================== */}

          <div className="text-center pt-8 pb-2">
            <GradientText
              variant="flame"
              as="h2"
              className="text-5xl font-bold tracking-tight"
            >
              Pass 2A · Component kit
            </GradientText>
            <p className="text-text-muted mt-2">
              Twelve rebuilt components on the liquid-glass foundation.
            </p>
          </div>

          {/* ----- Animated balance ----- */}
          <GlassCard variant="strong" glow="success" className="!p-10 space-y-6 mb-12">
            <SectionHeader
              title="Animated balance"
              variant="forest"
              subtitle="Currency-formatted convenience wrapper around AnimatedNumber."
            />
            <div className="flex flex-col items-center gap-6 py-6">
              <GradientText
                variant="forest"
                as="span"
                className="text-7xl md:text-8xl font-bold tracking-tight tabular-nums"
              >
                <AnimatedBalance value={balance} />
              </GradientText>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  onClick={() => setBalance(Math.random() * 99999)}
                  iconLeft={<span>🎲</span>}
                >
                  Randomize
                </Button>
                <Button variant="secondary" onClick={() => setBalance((b) => b + 250)}>
                  +$250
                </Button>
                <Button variant="ghost" onClick={() => setBalance(0)}>
                  Reset
                </Button>
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
              <Button variant="secondary" onClick={() => setConfettiIntensity('subtle')}>
                🎉 Subtle
              </Button>
              <Button variant="primary" onClick={() => setConfettiIntensity('normal')}>
                🎊 Normal
              </Button>
              <Button variant="destructive" onClick={() => setConfettiIntensity('wild')}>
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
              <span className="text-sm text-text-muted ml-2">
                {coinsVariant ? `Showing ${coinsVariant}` : 'Click to toggle'}
              </span>
            </div>
          </GlassCard>

          {/* ----- Progress bar ----- */}
          <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
            <SectionHeader
              title="Progress bar"
              variant="aurora"
              subtitle="Apple-style fill on a glass track. Spring-tweened, optional shimmer overlay."
            />
            <div className="space-y-6 max-w-xl">
              <ProgressBar value={60} variant="primary" label="Primary · 60%" showValue />
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
              <span className="text-sm text-text-muted">Selected: {pickedEmoji}</span>
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
            <p className="text-text-muted">
              Scroll the page; once you cross 400px the up-arrow button springs in.
            </p>
            <BackToTop showAfter={400} />
          </GlassCard>

          {/* ----- Theme toggle ----- */}
          <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
            <SectionHeader
              title="Theme toggle"
              variant="aurora"
              subtitle="Cycles light → dark → system. Spring rotation crossfade between SVG icons."
            />
            <div className="flex gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <ThemeToggle theme={theme1} onChange={setTheme1} />
                <span className="text-xs text-text-muted font-mono">{theme1}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ThemeToggle theme={theme2} onChange={setTheme2} />
                <span className="text-xs text-text-muted font-mono">{theme2}</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ThemeToggle theme={theme3} onChange={setTheme3} />
                <span className="text-xs text-text-muted font-mono">{theme3}</span>
              </div>
            </div>
          </GlassCard>

          {/* ----- Kid avatar ----- */}
          <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
            <SectionHeader
              title="Kid avatar"
              variant="sunset"
              subtitle="Big circular emoji portrait with vibrancy halo and optional progress ring."
            />
            <div className="flex flex-wrap gap-10 items-end justify-center py-6">
              <KidAvatar emoji="🦄" name="Small" size="sm" />
              <KidAvatar emoji="🐱" name="Medium" size="md" />
              <KidAvatar emoji="🦊" name="Large" size="lg" />
              <KidAvatar emoji="⭐" name="Ring 70%" size="md" ring={7} ringMax={10} />
              <KidAvatar emoji="🚀" name="Vibrant" size="md" variant="vibrant" />
            </div>
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
              <span className="text-sm text-text-muted">{unlockedCount} / 8 unlocked</span>
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
          <GlassCard variant="strong" glow="primary" className="!p-10 space-y-6 mb-12">
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

          {/* =============================== */}
          {/* PASS 2B — GENERIC PRIMITIVES    */}
          {/* =============================== */}

          <div className="text-center pt-8 pb-2">
            <GradientText
              variant="aurora"
              as="h2"
              className="text-5xl font-bold tracking-tight"
            >
              Pass 2B · Generic primitives
            </GradientText>
            <p className="text-text-muted mt-2">
              Six small workhorse components. Tags, tooltips, loaders, sheets, sliders, avatars.
            </p>
          </div>

          {/* ----- Pill ----- */}
          <GlassCard variant="default" className="!p-10 space-y-6 mb-12">
            <SectionHeader
              title="Pill"
              variant="aurora"
              subtitle="Tags / chips / status pills. Six variants × three sizes. Optional icons + remove button."
            />
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
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
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
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
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
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
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
                  rect
                </p>
                <Skeleton width="100%" height={120} />
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
                  circle
                </p>
                <Skeleton shape="circle" width={80} height={80} />
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
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
              <div className="space-y-4 text-text-muted text-sm leading-relaxed">
                <p>
                  This is the generic <code className="text-text-light font-mono">Sheet</code>{' '}
                  primitive — the same pattern the EmojiPicker uses internally, exposed for any
                  modal/drawer use case.
                </p>
                <p>
                  It takes a <code className="text-text-light font-mono">position</code> (top /
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
              subtitle="Generic avatar (image or initials) with optional status dot. Plus an overlapping AvatarStack."
            />
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
                  Sizes & statuses
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
                <p className="text-xs uppercase tracking-widest text-text-muted font-mono">
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

          {/* ----- Footer ----- */}
          <footer className="pt-8 pb-4 text-center text-sm text-text-muted">
            Pass 2B — Generic primitives ·{' '}
            <span className="font-mono">@kidcash/ui</span>
          </footer>
        </div>
      </div>
    </ToastProvider>
  );
}
