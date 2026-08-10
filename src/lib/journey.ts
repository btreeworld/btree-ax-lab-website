/**
 * 여정 정의 — 홈 3D 월드 "디지털트윈 안으로"의 단일 소스.
 *
 * 이 파일은 의도적으로 three.js 를 import 하지 않는다. 서버 컴포넌트(HUD 카피 매핑)와
 * 클라이언트 컴포넌트(카메라 리그)가 같은 정의를 공유해야 하는데, THREE 를 여기서 import 하면
 * 서버 번들까지 three 가 딸려 들어간다. 곡선 객체는 CameraRig 안에서 이 좌표로 생성한다.
 */

export type StationId =
  | 'boot'
  | 'field'
  | 'gap'
  | 'edge'
  | 'platform'
  | 'twin'
  | 'operator'
  | 'contact';

export type Waypoint = {
  id: StationId;
  /** 카메라가 이 스테이션에서 놓이는 위치 */
  cameraPosition: [number, number, number];
  /** 카메라가 바라보는 지점 */
  lookAt: [number, number, number];
};

/**
 * 월드는 -Z 방향으로 깊어진다. 좌우·고도를 번갈아 주어 스플라인이 단조로운 직진이 되지 않게 했다.
 * 순서 = 서사 순서: 스캔 → 현장 → 단절 → 엣지 → 플랫폼 → 트윈 전경 → 운영자 → 대화.
 */
export const WAYPOINTS: Waypoint[] = [
  { id: 'boot', cameraPosition: [7, 4.4, 16.4], lookAt: [0, 1.2, 7.6] },
  { id: 'field', cameraPosition: [7, 3.6, 15], lookAt: [0, 1.55, 8] },
  { id: 'gap', cameraPosition: [-7.5, 4.8, 4.5], lookAt: [0, 2.4, -1] },
  { id: 'edge', cameraPosition: [2.8, 2.5, -4], lookAt: [0, 1.75, -9] },
  { id: 'platform', cameraPosition: [-6.4, 3.8, -15.5], lookAt: [0, 1.8, -21.5] },
  { id: 'twin', cameraPosition: [10.5, 8.2, -25.5], lookAt: [0, 2.5, -32] },
  { id: 'operator', cameraPosition: [3.4, 2.8, -37.2], lookAt: [0, 1.9, -42] },
  { id: 'contact', cameraPosition: [0, 5.5, -47], lookAt: [0, 3.5, -58] },
];

export const MOBILE_WAYPOINTS: Waypoint[] = [
  { id: 'boot', cameraPosition: [0, 3.4, 17], lookAt: [0, 1.25, 8.1] },
  { id: 'field', cameraPosition: [0.65, 2.9, 14.4], lookAt: [0, 1.25, 8.15] },
  { id: 'edge', cameraPosition: [0.55, 2.85, -4.2], lookAt: [0, 1.55, -9.35] },
  { id: 'operator', cameraPosition: [0.6, 2.8, -36.7], lookAt: [0, 1.7, -42] },
];

/**
 * 웨이포인트 사이 간격(진행률 기준). CatmullRomCurve3 를 `getPoint(u)`(균일 파라미터)로 샘플링하면
 * i번째 제어점이 정확히 u = i/(n-1) 에 놓인다. 따라서 HUD 단계와 카메라 위치가 어긋나지 않는다.
 * (`getPointAt` 은 호길이 재파라미터화라 제어점과 t 가 어긋나므로 쓰지 않는다.)
 */
export const STATION_SPAN = 1 / (WAYPOINTS.length - 1);

/** index번째 스테이션이 화면 중앙에 오는 진행률 */
export function stationProgress(index: number): number {
  return index * STATION_SPAN;
}

/**
 * HUD 단계의 불투명도 — 스테이션 중심에서 평평하게 1, 가장자리로 갈수록 0.
 * 스크롤 프레임마다 호출되므로 할당 없이 산술만 한다.
 */
export function stageOpacity(progress: number, index: number): number {
  const distance = Math.abs(progress - stationProgress(index));
  const plateau = STATION_SPAN * 0.34;
  const fadeEnd = STATION_SPAN * 0.62;

  if (distance <= plateau) return 1;
  if (distance >= fadeEnd) return 0;
  return 1 - (distance - plateau) / (fadeEnd - plateau);
}

export function mobileStageOpacity(progress: number, index: number, total = 4): number {
  const span = 1 / (total - 1);
  const distance = Math.abs(progress - index * span);
  const plateau = span * 0.3;
  const fadeEnd = span * 0.48;
  if (distance <= plateau) return 1;
  if (distance >= fadeEnd) return 0;
  return 1 - (distance - plateau) / (fadeEnd - plateau);
}

/**
 * 스크롤 스페이서 높이(vh). 웨이포인트 7구간 × 약 110vh.
 * 너무 짧으면 카메라가 순간이동하는 것처럼 느껴지고, 너무 길면 지루해진다.
 */
export const JOURNEY_SCROLL_VH = 780;
export const MOBILE_JOURNEY_SCROLL_VH = 390;

/**
 * FIELD 스테이션의 건물 배치 — PointCloudScan(부팅 시퀀스가 수렴하는 목표 지점)과
 * FieldStation(실제 지오메트리)이 같은 좌표를 공유해야 "점들이 모여 건물이 된다"는
 * 연출이 어긋나지 않는다. Y=0을 지면으로 두고 size[1]만큼 위로 올라간다.
 */
export const FIELD_LAYOUT = {
  factory: { center: [-2.4, 0, 8.2] as [number, number, number], size: [3.6, 2.2, 2.8] as [number, number, number] },
  greenhouse: { center: [2.8, 0, 7] as [number, number, number], size: [2.6, 1.6, 2.2] as [number, number, number] },
} satisfies Record<string, { center: [number, number, number]; size: [number, number, number] }>;

/** GAP 스테이션 — FIELD에서 나온 스트림이 끊겨 표류하는 파편들의 중심/범위. */
export const GAP_LAYOUT = {
  center: [0, 2.6, -1] as [number, number, number],
  spread: [3.2, 1.6, 2.4] as [number, number, number],
};

/**
 * EDGE 스테이션 — 추론 코어의 위치와 반경.
 * 패널은 +X(화면 오른쪽)에 둔다 — EDGE 단계의 HUD 텍스트가 왼쪽 정렬이라, 패널을 -X에 두면
 * 3D 라벨과 헤드라인이 화면에서 겹쳐 읽힌다.
 */
export const EDGE_LAYOUT = {
  core: { center: [0, 1.6, -9] as [number, number, number], radius: 1.0 },
  panel: { center: [2.4, 2.0, -9.5] as [number, number, number] },
};

/** PLATFORM 스테이션 — 여러 현장의 스트림이 정렬되는 레인. */
export const PLATFORM_LAYOUT = {
  laneCount: 4,
  laneLength: 6.4,
  laneSpacing: 1.9,
  centerZ: -20,
};

/** TWIN 스테이션 — FIELD의 축소 복제(진짜 "쌍둥이") + 대형 홀로 패널. */
export const TWIN_LAYOUT = {
  replicaCenter: [0, 0, -32] as [number, number, number],
  replicaScale: 0.6,
  panel: { center: [5.4, 3.4, -30.5] as [number, number, number] },
};

/**
 * OPERATOR 스테이션 — 콘솔 데스크와 가격 안내 패널.
 * 패널은 카메라([2.5,2.4,-38])에서 5유닛 이상 떨어뜨린다 — 3유닛 거리에 두었더니
 * 화면 절반을 덮어 콘솔과 HUD 텍스트를 모두 가렸다.
 */
export const OPERATOR_LAYOUT = {
  deskCenter: [0, 0, -42] as [number, number, number],
  // OPERATOR의 HUD 텍스트는 우측 정렬이라 패널을 +X에 두면 글자와 겹치고, 1440 폭에서는
  // 화면 밖으로 잘리기까지 한다. 텍스트 반대편(-X)에 놓아 좌: 3D / 우: 텍스트로 분리한다.
  panel: { center: [-2.6, 2.6, -42.5] as [number, number, number] },
};
