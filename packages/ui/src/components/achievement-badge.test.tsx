import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AchievementBadge, AchievementBadgeGrid, defaultBadges } from './achievement-badge';

describe('<AchievementBadge>', () => {
  it('renders the emoji and label', () => {
    render(<AchievementBadge id="x" label="Test Badge" emoji="🎖️" unlocked={true} />);
    expect(screen.getByText('🎖️')).toBeInTheDocument();
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies locked styling when unlocked=false', () => {
    const { container } = render(
      <AchievementBadge id="x" label="Locked" emoji="🔒" unlocked={false} />,
    );
    const card = container.firstChild as HTMLElement;
    expect(card.className).toMatch(/opacity-30|grayscale/);
  });

  it('renders the description when provided', () => {
    render(
      <AchievementBadge id="x" label="Hi" emoji="🎯" unlocked={true} description="A test desc" />,
    );
    expect(screen.getByText('A test desc')).toBeInTheDocument();
  });

  it('shows the lock icon when locked', () => {
    render(<AchievementBadge id="x" label="X" emoji="🔒" unlocked={false} />);
    expect(screen.getByTestId('badge-lock')).toBeInTheDocument();
  });

  it('renders tier dots when a tier is provided', () => {
    render(<AchievementBadge id="x" label="X" emoji="🥇" unlocked={true} tier="gold" />);
    expect(screen.getByTestId('tier-dots-gold')).toBeInTheDocument();
  });
});

describe('<AchievementBadgeGrid>', () => {
  it('renders all provided badges', () => {
    render(
      <AchievementBadgeGrid
        badges={[
          { id: 'a', label: 'A', emoji: '🅰️', unlocked: true },
          { id: 'b', label: 'B', emoji: '🅱️', unlocked: false },
        ]}
      />,
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});

describe('defaultBadges', () => {
  it('exports exactly 8 badges with stable ids', () => {
    expect(defaultBadges).toHaveLength(8);
    const ids = defaultBadges.map((b) => b.id);
    expect(ids).toContain('first-save');
    expect(ids).toContain('goal-master');
  });

  it('all default badges have a tier assigned', () => {
    for (const b of defaultBadges) {
      expect(b.tier).toBeDefined();
    }
  });
});
