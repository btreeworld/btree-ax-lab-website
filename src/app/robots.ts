import type { MetadataRoute } from 'next';

import { site } from '@/content/site';

/** 스테이징에서는 SITE_NOINDEX=true 로 전체 색인을 차단한다 (마스터 문서 18.5). */
export default function robots(): MetadataRoute.Robots {
  const noIndex = process.env.SITE_NOINDEX === 'true';

  return {
    rules: noIndex
      ? [{ userAgent: '*', disallow: '/' }]
      : [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: new URL('/sitemap.xml', site.url).toString(),
    host: site.url,
  };
}
