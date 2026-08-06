/**
 * 사이트 전역 정보 — 마스터 문서 2장(브랜드), 6장(내비게이션), 18장(SEO)
 *
 * ⚠️ TODO 로 표시된 값은 마스터 문서 28장 "오픈 전 반드시 확정할 내용" 항목이다.
 *    임의의 사실을 만들어 채우지 않고 placeholder 를 유지한다.
 */

export const site = {
  brand: 'BTREE AX LAB',
  legalName: '주식회사 비트리',
  legalNameEn: 'BTREE Inc.',
  byline: 'by BTREE Inc.',
  tagline: 'Industrial AI · Edge AI · Digital Twin',
  sloganKo: '현장을 이해하는 AX 설계',
  sloganEn: 'Designing Intelligence for the Field',
  brandRelation:
    'BTREE AX LAB은 주식회사 비트리가 운영하는 산업 현장 AX·Edge AI·디지털트윈 전문 브랜드입니다.',
  /** 도메인 확정 전까지 env 값을 우선 사용한다. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btree-ax-lab.example.com',
  locale: 'ko_KR',
} as const;

/** 법적 정보 — 마스터 문서 6.2 Footer. 확인 전까지 placeholder 를 유지한다. */
export const legalInfo = {
  company: { label: '상호', value: '주식회사 비트리', status: 'verified' as const },
  ceo: { label: '대표자', value: '백성은', status: 'verified' as const },
  businessNumber: { label: '사업자등록번호', value: '[확인 후 입력]', status: 'placeholder' as const },
  address: { label: '주소', value: '[본점 이전 완료 후 입력]', status: 'placeholder' as const },
  email: {
    label: '대표 이메일',
    value: process.env.NEXT_PUBLIC_COMPANY_EMAIL ?? '[확정 필요]',
    status: 'placeholder' as const,
  },
  phone: {
    label: '대표 전화',
    value: process.env.NEXT_PUBLIC_COMPANY_PHONE ?? '[확정 필요]',
    status: 'placeholder' as const,
  },
} as const;

/** 전환 행동 — 마스터 문서 1.3. 모든 페이지에서 문구를 통일한다. */
export const cta = {
  primary: { label: '유료 AX 진단 신청', href: '/contact?service=ax-diagnosis' },
  secondary: { label: '프로젝트 상담 요청', href: '/contact' },
  services: { label: '서비스 살펴보기', href: '/services' },
} as const;

export const navigation = [
  { label: '서비스', href: '/services' },
  { label: '적용 산업', href: '/industries' },
  { label: '프로젝트 사례', href: '/cases' },
  { label: '진행 절차', href: '/process' },
  { label: '회사 소개', href: '/about' },
] as const;

export const footerNav = {
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
} as const;

/** 면책 문구 — 마스터 문서 21.2 */
export const disclaimers = [
  '기술 성능은 현장 조건과 데이터에 따라 달라질 수 있습니다.',
  '정부지원사업 선정은 보장하지 않습니다.',
  '사례 수치는 검증된 결과만 표시합니다.',
  '견적은 사전 진단과 범위 확정 후 변경될 수 있습니다.',
] as const;
