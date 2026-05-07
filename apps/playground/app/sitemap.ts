import type { MetadataRoute } from 'next';
import { COMPONENTS } from '@/lib/components-meta';

const SITE_URL = 'https://kit.kidcashapp.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/components`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    ...COMPONENTS.map((c) => ({
      url: `${SITE_URL}/components/${c.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
