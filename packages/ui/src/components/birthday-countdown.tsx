'use client';
import { useEffect, useMemo, useRef } from 'react';

export interface BirthdayCountdownProps {
  date: string | Date;
  label?: string;
  onReached?: () => void;
  className?: string;
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function daysBetween(a: Date, b: Date): number {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function BirthdayCountdown({ date, label = 'Birthday', onReached, className }: BirthdayCountdownProps) {
  const target = useMemo(() => (date instanceof Date ? date : new Date(date)), [date]);
  const now = useMemo(() => new Date(), []);
  const days = daysBetween(now, target);

  const reachedRef = useRef(false);
  useEffect(() => {
    if (days === 0 && !reachedRef.current) {
      reachedRef.current = true;
      onReached?.();
    }
  }, [days, onReached]);

  let text: string;
  if (days === 0) text = `${label} today!`;
  else if (days > 0) text = `${days} days until ${label}`;
  else text = `${label} was ${Math.abs(days)} days ago`;

  return <div className={className}>{text}</div>;
}
