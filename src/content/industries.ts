/** 산업 분야 — 마스터 문서 7.5 / 9장 */
import type { Locale } from '@/i18n/locales';
import type { Industry } from '@/types';

export const industries: Record<Locale, Industry[]> = {
  ko: [
    {
      slug: 'manufacturing',
      name: '제조·스마트팩토리',
      headline: '기존 설비를 버리지 않고 시작하는 제조 AX',
      problems: [
        '설비별 데이터가 분리됨',
        '작업자 안전을 실시간 확인하기 어려움',
        '이상과 불량을 사후에 발견',
        '구축비용 대비 효과가 불명확',
      ],
      capabilities: [
        '설비·센서 데이터 통합',
        'Edge AI 영상분석',
        '공정·상태 대시보드',
        '이상 이벤트 알림',
        '품질·안전 PoC',
        '디지털트윈 운영화면',
      ],
      ctaLabel: '우리 공장의 적용 가능성 확인',
    },
    {
      slug: 'safety',
      name: '산업안전·관제',
      headline: '사람이 놓칠 수 있는 위험을 AI가 먼저 알립니다',
      problems: [
        '다채널 CCTV 상시 감시 한계',
        '위험 이벤트의 늦은 발견',
        '오탐으로 인한 알림 피로',
        '개인정보와 네트워크 제약',
      ],
      capabilities: [
        '침입·쓰러짐·위험구역 탐지',
        '보호구 착용 여부 검토',
        '선택 채널 AI 분석',
        'Edge 기반 로컬 추론',
        'Telegram·이메일·음성 알림',
        '통합관제 UI',
      ],
      caution:
        '실제 탐지 성능은 카메라 위치, 조도, 해상도, 대상 행동과 학습 데이터에 따라 달라집니다. PoC에서 조건별 성능을 검증합니다.',
      ctaLabel: '관제 환경 적용 가능성 확인',
    },
    {
      slug: 'smart-farm',
      name: '스마트팜·농업',
      headline: '흩어진 환경 데이터를 운영 판단으로 연결합니다',
      problems: [
        '센서 데이터가 쌓이지만 의사결정에 활용되지 못함',
        '공급사별로 데이터가 분리되어 있음',
        '작물별 기준값이 시스템에 반영되지 않음',
        '이상 상황을 늦게 인지함',
      ],
      capabilities: [
        '온도·습도·조도·CO₂ 데이터 통합',
        '관수·환기·환경제어 이력',
        '작물별 기준값과 이상알림',
        '생육 이미지 분석',
        '디지털트윈 대시보드',
        'Edge Gateway 및 제어 시스템 연동 검토',
      ],
      ctaLabel: '농장 데이터 구조 진단',
    },
    {
      slug: 'facility',
      name: '시설·공간 운영',
      headline: '공간과 설비의 상태를 하나의 운영화면으로',
      problems: [
        '환경·에너지 데이터가 분리되어 있음',
        '설비 이상을 사후에 인지함',
        '이용 현황을 정량적으로 파악하기 어려움',
        '유지관리 이력이 축적되지 않음',
      ],
      capabilities: [
        '환경·에너지 데이터',
        '설비 상태 모니터링',
        '방문·이용 현황 분석',
        '이상 이벤트 알림',
        '유지관리 이력 관리',
        '대형 디스플레이 관제화면',
      ],
      ctaLabel: '시설 운영 데이터 진단',
    },
  ],
  en: [
    {
      slug: 'manufacturing',
      name: 'Manufacturing & Smart Factory',
      headline: 'Manufacturing AX that starts without replacing your equipment',
      problems: [
        'Data is siloed by equipment',
        'Worker safety is hard to monitor in real time',
        'Defects and anomalies are found after the fact',
        'Return on build cost is unclear',
      ],
      capabilities: [
        'Equipment & sensor data integration',
        'Edge AI video analysis',
        'Process & status dashboards',
        'Anomaly event alerts',
        'Quality & safety PoC',
        'Digital twin operations screen',
      ],
      ctaLabel: 'Check Fit for Your Factory',
    },
    {
      slug: 'safety',
      name: 'Industrial Safety & Monitoring',
      headline: 'AI flags risks people can miss — before they escalate',
      problems: [
        'Continuous monitoring across many CCTV channels is impractical',
        'Hazardous events are detected late',
        'False positives cause alert fatigue',
        'Privacy and network constraints limit options',
      ],
      capabilities: [
        'Intrusion, fall, and restricted-zone detection',
        'PPE compliance review',
        'AI analysis on selected channels',
        'Edge-based local inference',
        'Telegram, email, and voice alerts',
        'Integrated monitoring UI',
      ],
      caution:
        'Actual detection performance depends on camera placement, lighting, resolution, subject behavior, and training data. Conditions are validated during the PoC.',
      ctaLabel: 'Check Fit for Your Monitoring Setup',
    },
    {
      slug: 'smart-farm',
      name: 'Smart Farm & Agriculture',
      headline: 'Connecting scattered environmental data to operating decisions',
      problems: [
        'Sensor data accumulates but rarely informs decisions',
        'Data is siloed by supplier',
        'Crop-specific thresholds are not reflected in the system',
        'Anomalies are noticed too late',
      ],
      capabilities: [
        'Temperature, humidity, light, and CO₂ data integration',
        'Irrigation, ventilation, and climate control history',
        'Crop-specific thresholds and anomaly alerts',
        'Growth-stage image analysis',
        'Digital twin dashboard',
        'Edge gateway and control-system integration review',
      ],
      ctaLabel: 'Diagnose Your Farm Data Structure',
    },
    {
      slug: 'facility',
      name: 'Facility & Space Operations',
      headline: 'One operating screen for the state of your space and equipment',
      problems: [
        'Environmental and energy data are siloed',
        'Equipment issues are noticed after the fact',
        'Usage patterns are hard to quantify',
        'Maintenance history is not accumulated systematically',
      ],
      capabilities: [
        'Environmental & energy data',
        'Equipment status monitoring',
        'Visitor & usage analysis',
        'Anomaly event alerts',
        'Maintenance history management',
        'Large-display monitoring screens',
      ],
      ctaLabel: 'Diagnose Your Facility Data',
    },
  ],
};

/** 홈 Section 05 에 사용하는 카드 요약 (적용 영역 3~4개만 노출 — 13.6) */
export const industryCardCapabilityLimit = 4;

type IndustriesPageCopy = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  problemsLabel: string;
  capabilitiesLabel: string;
};

export const industriesPageCopy: Record<Locale, IndustriesPageCopy> = {
  ko: {
    heroEyebrow: 'INDUSTRIES',
    heroTitle: '기술이 아니라 현장의 운영방식에 맞춥니다',
    heroDescription: '같은 기술이라도 현장의 운영방식과 기존 설비에 따라 필요한 구성이 달라집니다.',
    problemsLabel: '현장에서 자주 나타나는 문제',
    capabilitiesLabel: '제공 가능 영역',
  },
  en: {
    heroEyebrow: 'INDUSTRIES',
    heroTitle: "We fit the site's way of operating, not the other way around",
    heroDescription: 'The same technology needs a different setup depending on how the site operates and what equipment already exists.',
    problemsLabel: 'Common problems on site',
    capabilitiesLabel: 'What we can provide',
  },
};
