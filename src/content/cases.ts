/**
 * 프로젝트 사례 — 마스터 문서 7.8
 *
 * ⚠️ 사례 사용 원칙
 *  - 실제 고객명과 수치를 확인하기 전에는 "프로젝트 경험 / 대표 수행 분야 / 적용 예시 / 익명 사례"로 표기한다.
 *  - "고객 성공사례" 표현은 고객 승인과 결과 데이터가 있을 때만 사용한다.
 *  - outcomes 가 검증되기 전까지 outcomeStatus 는 'pending' 을 유지하고 수치를 만들지 않는다.
 */
import type { CaseStatus, CaseStudy } from '@/types';

export const caseStatusLabel: Record<CaseStatus, string> = {
  actual: '실제 구축',
  poc: 'PoC',
  design: '설계',
  research: '연구개발',
  example: '적용 예시',
};

export const cases: CaseStudy[] = [
  {
    slug: 'edge-ai-safety-control',
    title: 'Edge AI 기반 산업안전 통합관제 설계',
    status: 'design',
    industry: '산업안전·관제',
    problem: '다채널 CCTV를 사람이 지속적으로 감시하기 어렵습니다.',
    approach:
      '전 채널을 동시에 분석하는 대신 위험도가 높은 채널을 선택해 AI로 분석하고, 이벤트 발생 시에만 경보를 보내며 시스템 부하를 함께 모니터링하는 구조로 설계했습니다.',
    architecture: ['CCTV', 'Edge AI', '관제 UI', 'Telegram·음성 알림'],
    outcomeStatus: 'pending',
  },
  {
    slug: 'smart-farm-digital-twin',
    title: '스마트팜 환경 데이터 디지털트윈',
    status: 'design',
    industry: '스마트팜·농업',
    problem: '온습도·조도·관수 데이터가 분리되어 운영 판단이 어렵습니다.',
    approach:
      '공급사별로 흩어진 센서를 하나의 수집 계층으로 통합하고, 작물별 기준값을 설정해 이상알림과 시각화까지 연결했습니다.',
    architecture: ['센서', 'Gateway', '데이터 플랫폼', 'Dashboard'],
    outcomeStatus: 'pending',
  },
  {
    slug: 'national-rnd-ax-planning',
    title: '정부 R&D용 AX 시스템 기술기획',
    status: 'research',
    industry: '연구개발·정부과제',
    problem: '복합 기술을 평가 가능한 개발계획과 성능지표로 구조화해야 했습니다.',
    approach:
      '요구사항, 시스템 구조, 정량지표와 공인시험 계획을 함께 설계해 평가자가 검증할 수 있는 형태로 정리했습니다.',
    architecture: ['요구사항 정의', '시스템 구조', '정량 성능지표', '공인시험 계획'],
    outcomeStatus: 'not-disclosed',
  },
];

/** 결과 미검증 사례에 표시하는 문구 — 임의의 수치를 만들지 않는다. */
export const outcomePendingLabel = '검증된 결과 데이터 확보 후 공개 예정';
export const outcomeNotDisclosedLabel = '고객·기관 정책에 따라 비공개';

export const casesNotice =
  '아래 항목은 고객명과 성과 수치가 확인되기 전까지 "대표 수행 분야"로 표기합니다. 검증된 결과만 공개합니다.';
