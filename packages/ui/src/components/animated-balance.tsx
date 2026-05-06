'use client';
import { AnimatedNumber, type AnimatedNumberProps } from './animated-number';

/**
 * `AnimatedBalance` — convenience wrapper around `<AnimatedNumber>` that
 * formats the value as a localized currency string.
 *
 * Pass any locale + ISO 4217 currency code; both default to US English / USD.
 */
export interface AnimatedBalanceProps extends Omit<AnimatedNumberProps, 'format'> {
  /** ISO 4217 currency code. Defaults to `'USD'`. */
  currency?: string;
  /** BCP 47 locale. Defaults to `'en-US'`. */
  locale?: string;
}

export function AnimatedBalance({
  currency = 'USD',
  locale = 'en-US',
  ...rest
}: AnimatedBalanceProps) {
  const fmt = new Intl.NumberFormat(locale, { style: 'currency', currency });
  return <AnimatedNumber {...rest} format={(n) => fmt.format(n)} />;
}
