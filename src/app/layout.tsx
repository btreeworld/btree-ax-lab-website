import type { Metadata, Viewport } from 'next';

import '@/app/globals.css';

import { Analytics } from '@/components/layout/Analytics';
import { JsonLd } from '@/components/layout/JsonLd';
import { ScrollTracker } from '@/components/layout/ScrollTracker';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { site } from '@/content/site';
import { organizationJsonLd } from '@/lib/seo';

const title = '산업 현장 AX·디지털트윈 설계 및 PoC | BTREE AX LAB';
const description =
  '제조·산업안전·스마트팜·시설 운영 현장을 진단하고 Edge AI, 센서 데이터와 디지털트윈을 연결한 시스템 설계와 PoC 실증을 제공합니다.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: '%s | BTREE AX LAB',
  },
  description,
  applicationName: site.brand,
  keywords: [
    '산업 AX 컨설팅',
    '산업 AI 구축',
    '디지털트윈 설계',
    'Edge AI 구축',
    '산업안전 AI',
    'CCTV AI 관제',
    '스마트팜 디지털트윈',
    'AI PoC',
    '제조업 AI 도입',
    '정부과제 기술기획',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.brand,
    title,
    description,
    url: site.url,
  },
  // 스테이징에서는 SITE_NOINDEX=true 로 색인을 막는다 (마스터 문서 18.5).
  robots:
    process.env.SITE_NOINDEX === 'true'
      ? { index: false, follow: false }
      : { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#07111F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {/* Skip to content — 마스터 문서 20장 */}
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-button focus:bg-accent focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-[#062028]"
          href="#main"
        >
          본문 바로가기
        </a>

        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />

        <ScrollTracker />
        <Analytics />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
