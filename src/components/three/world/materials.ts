import * as THREE from 'three';

import { threeColors } from '@/lib/three-tokens';

/**
 * 월드 공용 재질·절차적 텍스처.
 *
 * ── 왜 조명을 도입했는가 ──
 * 초기 구현은 전 구간 `MeshBasicMaterial`(무조명)이었다. 조명 계산이 0이라 빠르지만,
 * 무조명 재질은 면의 방향(normal)을 완전히 무시하므로 정육면체의 여섯 면이 전부 똑같은
 * 색으로 칠해진다. 형태가 오직 엣지 와이어프레임으로만 읽히고, 그래서 아무리 디테일한
 * 지오메트리를 만들어도 "납작한 도형" 인상을 벗지 못했다. 텍스처가 없어서가 아니라
 * 명암이 없어서 단순해 보였던 것.
 *
 * 이제 `MeshStandardMaterial` + 키/필 라이트 + 절차적 환경맵을 쓴다. 면마다 밝기가
 * 달라지면서 볼륨이 생기고, metalness/roughness 차이만으로 금속·유리·플라스틱이
 * 구분된다 — 외부 텍스처 파일을 하나도 쓰지 않고 재질감을 만든다.
 *
 * 텍스처도 파일 대신 캔버스로 즉석 생성한다(아래 create*Texture). 에셋 파이프라인이
 * 없다는 제약을 유지하면서 표면 디테일만 얻는 방법.
 */

/** 텍스처는 모듈 스코프에서 1회만 만들어 모든 인스턴스가 공유한다(GPU 업로드 1회). */
let corrugationTexture: THREE.Texture | null = null;
let panelTexture: THREE.Texture | null = null;
let shadowBlobTexture: THREE.Texture | null = null;

function makeCanvas(size: number) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

/** 공장 외벽용 세로 골판 — 밝기 줄무늬로 요철을 흉내낸다. */
export function getCorrugationTexture(): THREE.Texture {
  if (corrugationTexture) return corrugationTexture;

  const size = 128;
  const canvas = makeCanvas(size);
  const ctx = canvas.getContext('2d')!;

  // 밝기 기준을 흰색 근처에 둔다: map은 재질의 color와 곱해지므로, 중간 회색 텍스처를 쓰면
  // 이미 어두운 structure 색(0x27435e)과 곱해져 거의 검게 가라앉는다. 흰색을 기준으로
  // "깎아내는" 방식이어야 원래 의도한 색을 유지하면서 요철 변화만 얻는다.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  for (let x = 0; x < size; x += 8) {
    // 밝은 능선 → 어두운 골 순으로 반복해 원통형 요철처럼 보이게 한다.
    const gradient = ctx.createLinearGradient(x, 0, x + 8, 0);
    gradient.addColorStop(0, '#9c9c9c');
    gradient.addColorStop(0.45, '#ffffff');
    gradient.addColorStop(1, '#9c9c9c');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, 8, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  corrugationTexture = texture;
  return texture;
}

/** 장비 외장용 패널 분할선 — 큰 면에 이음매를 넣어 "조립된 물건"으로 보이게 한다. */
export function getPanelTexture(): THREE.Texture {
  if (panelTexture) return panelTexture;

  const size = 256;
  const canvas = makeCanvas(size);
  const ctx = canvas.getContext('2d')!;
  // 골판 텍스처와 같은 이유로 흰색을 기준으로 삼는다(map은 color와 곱해진다).
  ctx.fillStyle = '#f4f4f4';
  ctx.fillRect(0, 0, size, size);

  ctx.strokeStyle = '#8e8e8e';
  ctx.lineWidth = 2;
  [0.25, 0.5, 0.75].forEach((f) => {
    ctx.beginPath();
    ctx.moveTo(0, size * f);
    ctx.lineTo(size, size * f);
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.moveTo(size * 0.5, 0);
  ctx.lineTo(size * 0.5, size);
  ctx.stroke();

  // 미세한 얼룩 — 완전히 균일한 표면은 CG 티가 난다.
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.06})`;
    ctx.fillRect(x, y, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  panelTexture = texture;
  return texture;
}

/** 바닥 접지 그림자용 방사형 그라디언트 — 섀도우맵 없이 물체를 지면에 붙여 보이게 한다. */
export function getShadowBlobTexture(): THREE.Texture {
  if (shadowBlobTexture) return shadowBlobTexture;

  const size = 128;
  const canvas = makeCanvas(size);
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(0,0,0,0.55)');
  gradient.addColorStop(0.55, 'rgba(0,0,0,0.22)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  shadowBlobTexture = texture;
  return texture;
}

/**
 * 공유 텍스처를 특정 반복 횟수로 쓰기 위한 복제본.
 * 텍스처 인스턴스는 모듈 스코프에서 공유하므로 `repeat`을 직접 바꾸면 그 텍스처를 쓰는
 * 모든 메시가 함께 바뀐다. 물체마다 크기가 달라 반복 횟수도 달라야 하므로 복제해서 쓴다.
 * (clone은 GPU 텍스처를 공유하고 래핑 파라미터만 분리하므로 메모리 부담이 거의 없다.)
 */
export function cloneWithRepeat(texture: THREE.Texture, repeatX: number, repeatY: number): THREE.Texture {
  const cloned = texture.clone();
  cloned.wrapS = THREE.RepeatWrapping;
  cloned.wrapT = THREE.RepeatWrapping;
  cloned.repeat.set(repeatX, repeatY);
  cloned.needsUpdate = true;
  return cloned;
}

/**
 * 구조물(공장·캐비닛·랙 등) 기본 금속 재질.
 * metalness를 중간값으로 두는 이유: 1.0에 가까우면 환경맵 반사에만 의존해 어두운 씬에서
 * 새까맣게 보이고, 0에 가까우면 플라스틱처럼 보인다. 0.55~0.7 구간이 "도장된 금속"에 가깝다.
 */
export function createStructureMaterial(options?: {
  color?: number;
  roughness?: number;
  metalness?: number;
  map?: THREE.Texture | null;
  mapRepeat?: [number, number];
}): THREE.MeshStandardMaterial {
  const map = options?.map ?? null;
  if (map && options?.mapRepeat) {
    // 텍스처 인스턴스를 공유하므로 repeat이 다르면 복제해서 쓴다.
    const cloned = map.clone();
    cloned.needsUpdate = true;
    cloned.wrapS = THREE.RepeatWrapping;
    cloned.wrapT = THREE.RepeatWrapping;
    cloned.repeat.set(options.mapRepeat[0], options.mapRepeat[1]);
    return new THREE.MeshStandardMaterial({
      color: options?.color ?? threeColors.structure,
      roughness: options?.roughness ?? 0.62,
      metalness: options?.metalness ?? 0.62,
      map: cloned,
    });
  }

  return new THREE.MeshStandardMaterial({
    color: options?.color ?? threeColors.structure,
    roughness: options?.roughness ?? 0.62,
    metalness: options?.metalness ?? 0.62,
    map,
  });
}

/** 온실 외피 같은 반투명 유리. */
export function createGlassMaterial(color = threeColors.structure): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.16,
    metalness: 0.1,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });
}

/**
 * 화면·LED처럼 스스로 빛나는 표면. emissive를 쓰면 후처리 Bloom이 실제로 번지므로
 * 무조명 MeshBasicMaterial로 밝은 색을 칠하는 것보다 훨씬 "켜져 있는" 느낌이 난다.
 */
export function createEmissiveMaterial(color = threeColors.accent, intensity = 1.6): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x000000,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 1,
    metalness: 0,
  });
}
