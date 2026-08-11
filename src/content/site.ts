/**
 * 사이트 전역 정보 — 마스터 문서 2장(브랜드), 6장(내비게이션), 18장(SEO)
 * 언어별 콘텐츠는 Record<Locale, T> 로 관리한다. 새 언어를 추가하려면
 * 이 파일들의 각 record에 해당 locale 키만 추가하면 된다.
 */
import type { Locale } from '@/i18n/locales';

type FactStatus = 'verified' | 'placeholder';
type LegalField = { label: string; value: string; status: FactStatus };

export const site = {
  brand: 'BTREE AX LAB',
  legalName: { ko: '주식회사 비트리', en: 'BTREE Inc.' } satisfies Record<Locale, string>,
  legalNameEn: 'BTREE Inc.',
  byline: 'by BTREE Inc.',
  tagline: 'Industrial AI · Edge AI · Digital Twin',
  sloganKo: '현장을 이해하는 AX 설계',
  sloganEn: 'Designing Intelligence for the Field',
  brandRelation: {
    ko: 'BTREE AX LAB은 주식회사 비트리가 운영하는 산업 현장 AX·Edge AI·디지털트윈 전문 브랜드입니다.',
    en: 'BTREE AX LAB is a specialist brand for industrial AX, Edge AI, and digital twins, operated by BTREE Inc.',
  } satisfies Record<Locale, string>,
  /** 도메인 확정 전까지 env 값을 우선 사용한다. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btreeworld.net',
  locales: { ko: 'ko_KR', en: 'en_US' } satisfies Record<Locale, string>,
} as const;

/**
 * 법적 정보 — 마스터 문서 6.2 Footer.
 * 대표 전화는 의도적으로 노출하지 않는다(2026-08 대표 확인) — 필드 자체를 없애서 footer/JSON-LD
 * 등 Object.values(legal)로 순회하는 모든 곳에서 자동으로 빠지게 한다.
 */
export const legalInfo: Record<Locale, Record<'company' | 'ceo' | 'businessNumber' | 'address' | 'email', LegalField>> = {
  ko: {
    company: { label: '상호', value: '주식회사 비트리', status: 'verified' },
    ceo: { label: '대표자', value: '백성은', status: 'verified' },
    businessNumber: { label: '사업자등록번호', value: '264-88-01673', status: 'verified' },
    address: { label: '주소', value: '대전광역시 동구 옛신탄진로 10-10 102호', status: 'verified' },
    email: {
      label: '대표 이메일',
      value: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? 'back@btreeworld.net',
      status: 'verified',
    },
  },
  en: {
    company: { label: 'Company', value: 'BTREE Inc.', status: 'verified' },
    ceo: { label: 'CEO', value: 'Baek Seongeun', status: 'verified' },
    businessNumber: { label: 'Business registration no.', value: '264-88-01673', status: 'verified' },
    address: {
      label: 'Address',
      value: '#102, 10-10 Yetsintanjin-ro, Dong-gu, Daejeon, Republic of Korea',
      status: 'verified',
    },
    email: {
      label: 'Contact email',
      value: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? 'back@btreeworld.net',
      status: 'verified',
    },
  },
};

/** 전환 행동 — 마스터 문서 1.3. 모든 페이지에서 문구를 통일한다. href는 locale-agnostic(내부에서 로케일 접두사 자동 적용). */
export const cta: Record<Locale, { primary: { label: string; href: string }; secondary: { label: string; href: string }; services: { label: string; href: string } }> = {
  ko: {
    primary: { label: '유료 AX 진단 신청', href: '/contact?service=ax-diagnosis' },
    secondary: { label: '프로젝트 상담 요청', href: '/contact' },
    services: { label: '서비스 살펴보기', href: '/services' },
  },
  en: {
    primary: { label: 'Request a Paid AX Diagnosis', href: '/contact?service=ax-diagnosis' },
    secondary: { label: 'Request a Project Consultation', href: '/contact' },
    services: { label: 'Explore Services', href: '/services' },
  },
};

export const navigation: Record<Locale, Array<{ label: string; href: string }>> = {
  ko: [
    { label: '서비스', href: '/services' },
    { label: '적용 산업', href: '/industries' },
    { label: '프로젝트 사례', href: '/cases' },
    { label: '진행 절차', href: '/process' },
    { label: '회사 소개', href: '/about' },
  ],
  en: [
    { label: 'Services', href: '/services' },
    { label: 'Industries', href: '/industries' },
    { label: 'Case Work', href: '/cases' },
    { label: 'Process', href: '/process' },
    { label: 'About', href: '/about' },
  ],
};

export const mobileTrackRecordLink: Record<Locale, { label: string; href: string }> = {
  ko: { label: '대표 및 수행이력', href: '/track-record' },
  en: { label: 'Founder & Track Record', href: '/track-record' },
};

/** 브레드크럼 등에서 짧은 내비게이션 라벨이 필요할 때 사용한다. */
export function navLabel(locale: Locale, href: string): string {
  const fromMain = navigation[locale].find((item) => item.href === href)?.label;
  if (fromMain) return fromMain;
  if (href === mobileTrackRecordLink[locale].href) return mobileTrackRecordLink[locale].label;
  return href;
}

export const footerNav: Record<
  Locale,
  {
    services: { title: string; links: Array<{ label: string; href: string }> };
    company: { title: string; links: Array<{ label: string; href: string }> };
    legal: { title: string; links: Array<{ label: string; href: string }> };
  }
> = {
  ko: {
    services: {
      title: '서비스',
      links: [
        { label: '산업 현장 AX 진단', href: '/services#ax-diagnosis' },
        { label: 'AX·디지털트윈 구축 설계', href: '/services#system-design' },
        { label: 'PoC 실증', href: '/services#poc' },
        { label: '월간 기술자문', href: '/services#advisory' },
        { label: '정부과제 기술기획', href: '/services#rnd-planning' },
      ],
    },
    company: {
      title: '회사',
      links: [
        { label: '회사 소개', href: '/about' },
        { label: '대표 및 수행이력', href: '/track-record' },
        { label: '적용 산업', href: '/industries' },
        { label: '프로젝트 사례', href: '/cases' },
        { label: '진행 절차·가격', href: '/process' },
      ],
    },
    legal: {
      title: '법적 고지',
      links: [
        { label: '개인정보처리방침', href: '/privacy' },
        { label: '이용약관', href: '/terms' },
      ],
    },
  },
  en: {
    services: {
      title: 'Services',
      links: [
        { label: 'Industrial AX Diagnosis', href: '/services#ax-diagnosis' },
        { label: 'AX & Digital Twin Design', href: '/services#system-design' },
        { label: 'PoC Validation', href: '/services#poc' },
        { label: 'Monthly Advisory', href: '/services#advisory' },
        { label: 'Government R&D Planning', href: '/services#rnd-planning' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Founder & Track Record', href: '/track-record' },
        { label: 'Industries', href: '/industries' },
        { label: 'Case Work', href: '/cases' },
        { label: 'Process & Pricing', href: '/process' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  },
};
