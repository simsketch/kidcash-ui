import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://kit.kidcashapp.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'KidCash UI — Liquid glass React component library',
    template: '%s · @kidcash/ui',
  },
  description:
    'Playful React component library extracted from KidCash, the family allowance app — liquid glass, spring physics, and 9 themes for finance, family, and kid-focused interfaces.',
  applicationName: '@kidcash/ui',
  authors: [{ name: 'KidCash', url: 'https://www.kidcashapp.com' }],
  creator: 'KidCash',
  keywords: [
    'react',
    'ui',
    'component library',
    'tailwind',
    'framer-motion',
    'liquid glass',
    'kids',
    'family',
    'finance',
    'allowance',
    'design system',
  ],
  openGraph: {
    title: 'KidCash UI — Liquid glass React component library',
    description:
      'Playful React components for family-finance and kid-focused apps. Free + open source. Battle-tested in production at kidcashapp.com.',
    url: SITE_URL,
    siteName: '@kidcash/ui',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KidCash UI — Liquid glass React component library',
    description:
      'Playful React components for family-finance and kid-focused apps. Free + open source.',
  },
  alternates: { canonical: '/' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
