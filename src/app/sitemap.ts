import type { MetadataRoute } from 'next';

import { site } from '@/content/site';

const routes: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }> = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/industries', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/cases', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/process', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/track-record', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: new URL(route.path, site.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
