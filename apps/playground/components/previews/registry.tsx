'use client';

import { useEffect, useState } from 'react';
import {
  AchievementBadgeGrid,
  AnimatedNumber,
  Avatar,
  AvatarStack,
  BackToTop,
  BirthdayCountdown,
  Button,
  CelebrationOverlay,
  CommandPalette,
  type CommandItem,
  Confetti,
  type ConfettiIntensity,
  EmojiPicker,
  FloatingCoins,
  type FloatingCoinsVariant,
  FlyingMascot,
  GlassCard,
  GradientText,
  Keyboard,
  Marquee,
  Modal,
  Pill,
  ProgressBar,
  Sheet,
  Skeleton,
  Slider,
  Spotlight,
  ThemeSelector,
  Tooltip,
  defaultBadges,
  useToast,
} from '@kidcash/ui';

const currency = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function dayOffset(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(12, 0, 0, 0);
  return d;
}

// ---------------------------------------------------------------------------
// Foundations
// ---------------------------------------------------------------------------

function GlassCardPreview() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <GlassCard variant="default">
        <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--theme-text-primary)' }}>
          Default
        </h3>
        <p style={{ color: 'var(--theme-text-secondary)' }} className="text-sm">
          Subtle glass with the active theme&rsquo;s ambient sheen.
        </p>
      </GlassCard>
      <GlassCard variant="strong" glow="primary">
        <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--theme-text-primary)' }}>
          Strong + glow
        </h3>
        <p style={{ color: 'var(--theme-text-secondary)' }} className="text-sm">
          Heavier blur, primary glow ring.
        </p>
      </GlassCard>
    </div>
  );
}

function ButtonPreview() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button
        variant="primary"
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1400);
        }}
      >
        {loading ? 'Saving…' : 'Try loading'}
      </Button>
    </div>
  );
}

function PillPreview() {
  const [tags, setTags] = useState(['allowance', 'savings', 'chores']);
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Pill variant="default">default</Pill>
        <Pill variant="primary">primary</Pill>
        <Pill variant="success" iconLeft="✓">verified</Pill>
        <Pill variant="warning">warning</Pill>
        <Pill variant="danger">danger</Pill>
        <Pill variant="gradient" size="lg">premium</Pill>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {tags.map((t) => (
          <Pill key={t} variant="primary" onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
            {t}
          </Pill>
        ))}
        {tags.length === 0 && (
          <button
            className="text-xs underline-offset-2 hover:underline"
            style={{ color: 'var(--theme-accent-primary)' }}
            onClick={() => setTags(['allowance', 'savings', 'chores'])}
          >
            reset
          </button>
        )}
      </div>
    </div>
  );
}

function AvatarPreview() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex items-center gap-3">
        <Avatar emoji="🦄" name="Rafi" />
        <Avatar emoji="🐼" name="Kai" />
        <Avatar emoji="🦊" name="Sam" />
      </div>
      <AvatarStack
        avatars={[
          { emoji: '🦄', name: 'Rafi' },
          { emoji: '🐼', name: 'Kai' },
          { emoji: '🦊', name: 'Sam' },
          { emoji: '🐝', name: 'Lia' },
          { emoji: '🐙', name: 'Dax' },
        ]}
        max={4}
      />
    </div>
  );
}

function SkeletonPreview() {
  return (
    <div className="space-y-3 max-w-md">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-3 items-center">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Typography & motion
// ---------------------------------------------------------------------------

function KeyCombo({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      {keys.map((k, i) => (
        <Keyboard key={i}>{k}</Keyboard>
      ))}
    </span>
  );
}

function KeyboardPreview() {
  return (
    <div className="flex flex-wrap gap-3 items-center text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
      <span>Open command palette:</span>
      <KeyCombo keys={['⌘', 'K']} />
      <span className="ml-4">Save:</span>
      <KeyCombo keys={['⌘', 'S']} />
      <span className="ml-4">Quick add:</span>
      <KeyCombo keys={['⇧', 'A']} />
    </div>
  );
}

function GradientTextPreview() {
  return (
    <div className="space-y-2">
      <GradientText as="p" variant="aurora" className="text-3xl font-bold">aurora</GradientText>
      <GradientText as="p" variant="sunset" className="text-3xl font-bold">sunset</GradientText>
      <GradientText as="p" variant="forest" className="text-3xl font-bold">forest</GradientText>
      <GradientText as="p" variant="flame" className="text-3xl font-bold">flame</GradientText>
      <GradientText as="p" variant="animated" className="text-3xl font-bold">animated</GradientText>
    </div>
  );
}

function AnimatedNumberPreview() {
  const [value, setValue] = useState(1234.56);
  return (
    <div className="flex flex-col gap-4 items-start">
      <AnimatedNumber
        value={value}
        format={currency}
        className="text-5xl font-bold tabular-nums text-[var(--theme-text-primary)]"
      />
      <div className="flex gap-2 flex-wrap">
        <Button variant="secondary" size="sm" onClick={() => setValue(Math.random() * 9000 + 100)}>
          Randomize
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setValue(0)}>Reset</Button>
        <Button variant="ghost" size="sm" onClick={() => setValue((v) => v + 250)}>+ $250</Button>
      </div>
    </div>
  );
}

function MarqueePreview() {
  const items = ['allowance', 'savings goal', 'chores', 'birthday', 'streak', 'rewards', 'family pulse'];
  return (
    <Marquee speed={40} pauseOnHover>
      <div className="flex gap-3 px-2">
        {items.map((it) => (
          <Pill key={it} variant="primary">{it}</Pill>
        ))}
      </div>
    </Marquee>
  );
}

function SpotlightPreview() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Spotlight>
        <GlassCard>
          <p className="text-xs uppercase tracking-widest font-mono mb-2" style={{ color: 'var(--theme-text-muted)' }}>
            Hover me
          </p>
          <p style={{ color: 'var(--theme-text-secondary)' }}>The light follows your cursor.</p>
        </GlassCard>
      </Spotlight>
      <Spotlight>
        <GlassCard>
          <p className="text-xs uppercase tracking-widest font-mono mb-2" style={{ color: 'var(--theme-text-muted)' }}>
            And here too
          </p>
          <p style={{ color: 'var(--theme-text-secondary)' }}>Independent spotlights per card.</p>
        </GlassCard>
      </Spotlight>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inputs & feedback
// ---------------------------------------------------------------------------

function ConfettiPreview() {
  const [intensity, setIntensity] = useState<ConfettiIntensity>('normal');
  const [key, setKey] = useState(0);
  const fire = (level: ConfettiIntensity) => {
    setIntensity(level);
    setKey((k) => k + 1);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {key > 0 && <Confetti key={key} trigger intensity={intensity} duration={1200} />}
      <Button variant="secondary" size="sm" onClick={() => fire('subtle')}>Subtle</Button>
      <Button variant="primary" size="sm" onClick={() => fire('normal')}>Normal</Button>
      <Button variant="primary" size="sm" onClick={() => fire('wild')}>Wild</Button>
    </div>
  );
}

function FloatingCoinsPreview() {
  const [variant, setVariant] = useState<FloatingCoinsVariant | null>(null);
  const variants: FloatingCoinsVariant[] = ['rise', 'rain', 'float'];
  return (
    <div className="relative h-48">
      {variant && <FloatingCoins key={variant} variant={variant} count={14} duration={[6, 12]} className="z-0" />}
      <div className="relative z-10 flex flex-wrap gap-2">
        {variants.map((v) => (
          <Button key={v} size="sm" variant={variant === v ? 'primary' : 'secondary'} onClick={() => setVariant(v)}>
            {v}
          </Button>
        ))}
        {variant && (
          <Button size="sm" variant="ghost" onClick={() => setVariant(null)}>
            stop
          </Button>
        )}
      </div>
    </div>
  );
}

function FlyingMascotPreview() {
  return (
    <div className="relative h-32 overflow-hidden rounded-card" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
      <FlyingMascot src="/mascot.png" alt="" top="2rem" size={64} duration={10} />
      <p className="absolute bottom-3 left-4 text-xs font-mono" style={{ color: 'var(--theme-text-muted)' }}>
        loops every 10s
      </p>
    </div>
  );
}

function SliderPreview() {
  const [allowance, setAllowance] = useState(15);
  return (
    <div className="space-y-3 max-w-md">
      <div className="flex justify-between text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
        <span>Weekly allowance</span>
        <span className="font-mono tabular-nums" style={{ color: 'var(--theme-text-primary)' }}>
          ${allowance}
        </span>
      </div>
      <Slider min={0} max={50} step={1} value={allowance} onChange={setAllowance} />
    </div>
  );
}

function ProgressBarPreview() {
  const [value, setValue] = useState(60);
  return (
    <div className="space-y-3 max-w-md">
      <ProgressBar value={value} max={100} />
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant="ghost" onClick={() => setValue(0)}>0%</Button>
        <Button size="sm" variant="ghost" onClick={() => setValue(35)}>35%</Button>
        <Button size="sm" variant="ghost" onClick={() => setValue(60)}>60%</Button>
        <Button size="sm" variant="ghost" onClick={() => setValue(100)}>100%</Button>
      </div>
    </div>
  );
}

function EmojiPickerPreview() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState('🦄');
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="secondary" onClick={() => setOpen(true)}>Pick an avatar emoji</Button>
      <div className="text-3xl" aria-label="picked emoji">{picked}</div>
      <EmojiPicker open={open} onClose={() => setOpen(false)} onSelect={(e) => setPicked(e)} />
    </div>
  );
}

function TooltipPreview() {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Tooltip content="Saves to the kid's checking balance">
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
      <Tooltip content="Removes the chore (won't auto-cancel pending approvals)">
        <Button variant="destructive">Delete chore</Button>
      </Tooltip>
    </div>
  );
}

function ToastPreview() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="primary" onClick={() => toast('+$5 to Rafi', { title: 'Allowance sent', variant: 'success' })}>
        Success
      </Button>
      <Button size="sm" variant="secondary" onClick={() => toast('Two chores still pending', { title: 'Heads up', variant: 'warning' })}>
        Warning
      </Button>
      <Button size="sm" variant="destructive" onClick={() => toast('Network error — try again', { title: 'Couldn’t save', variant: 'danger' })}>
        Danger
      </Button>
      <Button size="sm" variant="ghost" onClick={() => toast('Default toast', { title: 'Note', variant: 'info' })}>
        Info
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Overlays
// ---------------------------------------------------------------------------

function ModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Confirm $5 to Rafi">
        <div className="space-y-3 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
          <p>This adds $5 to Rafi&rsquo;s checking balance and shows up in his transaction history.</p>
          <div className="flex gap-2 justify-end pt-3">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function SheetPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" onClick={() => setOpen(true)}>Open sheet</Button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Quick actions">
        <div className="space-y-2">
          {['+$1', '+$5', '+$10', 'Custom amount', 'Pay a bill', 'Mark a chore done'].map((label) => (
            <button
              key={label}
              className="block w-full text-left px-3 py-2 rounded-button text-sm transition-colors hover:bg-[var(--theme-card-hover-bg,rgba(255,255,255,0.05))]"
              style={{ color: 'var(--theme-text-secondary)' }}
              onClick={() => setOpen(false)}
            >
              {label}
            </button>
          ))}
        </div>
      </Sheet>
    </div>
  );
}

function CommandPalettePreview() {
  const [open, setOpen] = useState(false);
  const items: CommandItem[] = [
    { id: 'add-allowance', label: 'Add weekly allowance', shortcut: ['⌘', 'A'], onSelect: () => setOpen(false) },
    { id: 'pay-chore', label: 'Mark chore complete', shortcut: ['⌘', 'C'], onSelect: () => setOpen(false) },
    { id: 'open-bills', label: 'Open Bills', shortcut: ['⌘', 'B'], onSelect: () => setOpen(false) },
    { id: 'switch-theme', label: 'Switch theme', shortcut: ['⌘', 'T'], onSelect: () => setOpen(false) },
    { id: 'go-dashboard', label: 'Go to dashboard', shortcut: ['⌘', 'D'], onSelect: () => setOpen(false) },
  ];
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <span className="text-xs font-mono" style={{ color: 'var(--theme-text-muted)' }}>or press</span>
      <KeyCombo keys={['⌘', 'K']} />
      <CommandPalette open={open} onClose={() => setOpen(false)} items={items} placeholder="Type to filter…" />
    </div>
  );
}

function BackToTopPreview() {
  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
        Scroll the page — a button fades in at the bottom-right when you&rsquo;re past the threshold.
      </p>
      <BackToTop showAfter={200} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Family-finance specials
// ---------------------------------------------------------------------------

function BirthdayCountdownPreview() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <BirthdayCountdown label="Rafi’s birthday" date={dayOffset(12)} />
      <BirthdayCountdown label="Kai’s birthday" date={dayOffset(45)} />
    </div>
  );
}

function AchievementBadgePreview() {
  const [unlocked, setUnlocked] = useState(4);
  const badges = defaultBadges.map((b, i) => ({ ...b, unlocked: i < unlocked }));
  return (
    <div className="space-y-4">
      <AchievementBadgeGrid badges={badges} />
      <div className="flex gap-2 items-center">
        <Button size="sm" variant="ghost" onClick={() => setUnlocked((v) => Math.max(0, v - 1))}>−</Button>
        <span className="text-sm font-mono tabular-nums" style={{ color: 'var(--theme-text-secondary)' }}>
          {unlocked} / {defaultBadges.length} unlocked
        </span>
        <Button size="sm" variant="ghost" onClick={() => setUnlocked((v) => Math.min(defaultBadges.length, v + 1))}>+</Button>
      </div>
    </div>
  );
}

function CelebrationOverlayPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" onClick={() => setOpen(true)}>Trigger celebration</Button>
      <CelebrationOverlay
        open={open}
        onClose={() => setOpen(false)}
        title="Goal reached! 🎉"
        subtitle="Rafi just hit $300 — Switch incoming."
        duration={3500}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Theming
// ---------------------------------------------------------------------------

function ThemeProviderPreview() {
  return (
    <div className="space-y-3 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
      <p>
        <strong style={{ color: 'var(--theme-text-primary)' }}>ThemeProvider</strong> is wrapping this entire docs site.
        Every visual you see — backgrounds, gradients, shadows — flows from CSS variables that the active theme
        sets. Try the theme tiles below to see this surface change in real time.
      </p>
      <ThemeSelector title="" description="" />
    </div>
  );
}

function ThemeSelectorPreview() {
  return <ThemeSelector title="Pick a theme" description="Your choice persists in localStorage." />;
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const previews: Record<string, React.ComponentType> = {
  // Foundations
  'glass-card': GlassCardPreview,
  button: ButtonPreview,
  pill: PillPreview,
  avatar: AvatarPreview,
  skeleton: SkeletonPreview,
  // Typography & motion
  keyboard: KeyboardPreview,
  'gradient-text': GradientTextPreview,
  'animated-number': AnimatedNumberPreview,
  marquee: MarqueePreview,
  spotlight: SpotlightPreview,
  // Inputs & feedback
  confetti: ConfettiPreview,
  'floating-coins': FloatingCoinsPreview,
  'flying-mascot': FlyingMascotPreview,
  slider: SliderPreview,
  'progress-bar': ProgressBarPreview,
  'emoji-picker': EmojiPickerPreview,
  tooltip: TooltipPreview,
  toast: ToastPreview,
  // Overlays
  modal: ModalPreview,
  sheet: SheetPreview,
  'command-palette': CommandPalettePreview,
  'back-to-top': BackToTopPreview,
  // Family-finance specials
  'birthday-countdown': BirthdayCountdownPreview,
  'achievement-badge': AchievementBadgePreview,
  'celebration-overlay': CelebrationOverlayPreview,
  // Theming
  'theme-provider': ThemeProviderPreview,
  'theme-selector': ThemeSelectorPreview,
};
