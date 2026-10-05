'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo, useRef, type CSSProperties, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { OrthographicCamera, PerspectiveCamera, Vector3, type Camera, type Group, type Object3D } from 'three';

/**
 * 3D 위치에 붙는 HTML 라벨 — drei `<Html>`의 비변환(non-transform) 경로만 옮긴 경량 대체본.
 *
 * 왜 따로 두나: drei `<Html>`은 라벨마다 별도 React 루트를 만들고, 정리 시 그 루트를
 * useLayoutEffect 안에서 동기적으로 unmount 한다. React 19.3 + R3F 9.8에서는 이 동기 unmount가
 * 바깥 렌더 커밋 도중에 다른 루트의 작업까지 flush 하면서, 홈(3D 월드)을 떠날 때
 * "Failed to execute 'removeChild'" 예외를 낸다(drei 10.7.9에도 같은 코드). 여기서는 라벨 DOM은
 * 즉시 떼어 내고, 루트 unmount만 현재 렌더가 끝난 다음 태스크로 미룬다. 미룬 unmount가 다음
 * 루트의 노드를 건드리지 않도록 컨테이너 요소는 effect마다 새로 만든다(StrictMode 이중 마운트).
 *
 * 이 프로젝트가 쓰는 옵션만 지원한다: position, center, distanceFactor, zIndexRange, style.
 */

const objectPos = new Vector3();
const cameraPos = new Vector3();
const cameraDir = new Vector3();

function screenPosition(object: Object3D, camera: Camera, width: number, height: number): [number, number] {
  objectPos.setFromMatrixPosition(object.matrixWorld).project(camera);
  return [objectPos.x * (width / 2) + width / 2, -(objectPos.y * (height / 2)) + height / 2];
}

function isBehindCamera(object: Object3D, camera: Camera): boolean {
  objectPos.setFromMatrixPosition(object.matrixWorld);
  cameraPos.setFromMatrixPosition(camera.matrixWorld);
  return objectPos.sub(cameraPos).angleTo(camera.getWorldDirection(cameraDir)) > Math.PI / 2;
}

function distanceToCamera(object: Object3D, camera: Camera): number {
  objectPos.setFromMatrixPosition(object.matrixWorld);
  cameraPos.setFromMatrixPosition(camera.matrixWorld);
  return objectPos.distanceTo(cameraPos);
}

function objectScale(object: Object3D, camera: Camera): number {
  if (camera instanceof OrthographicCamera) return camera.zoom;
  if (camera instanceof PerspectiveCamera) {
    const scaleFov = 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * distanceToCamera(object, camera);
    return 1 / scaleFov;
  }
  return 1;
}

function objectZIndex(object: Object3D, camera: Camera, [near, far]: [number, number]): number | undefined {
  if (!(camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera)) return undefined;
  const a = (far - near) / (camera.far - camera.near);
  const b = far - a * camera.far;
  return Math.round(a * distanceToCamera(object, camera) + b);
}

export function SceneLabel({
  children,
  position,
  center = false,
  distanceFactor,
  zIndexRange = [16777271, 0],
  style,
}: {
  children: ReactNode;
  position?: [number, number, number];
  center?: boolean;
  distanceFactor?: number;
  zIndexRange?: [number, number];
  style?: CSSProperties;
}) {
  const { gl, camera, size, events } = useThree();
  const group = useRef<Group>(null);
  const root = useRef<Root | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const visible = useRef(true);
  const target = (events.connected as HTMLElement | undefined) ?? (gl.domElement.parentNode as HTMLElement | null);

  useLayoutEffect(() => {
    if (!group.current || !target) return;

    const el = document.createElement('div');
    const labelRoot = createRoot(el);
    container.current = el;
    root.current = labelRoot;
    visible.current = true;
    const [x, y] = screenPosition(group.current, camera, size.width, size.height);
    el.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${x}px,${y}px,0);transform-origin:0 0;`;
    target.appendChild(el);

    return () => {
      el.remove();
      if (container.current === el) container.current = null;
      if (root.current === labelRoot) root.current = null;
      // 바깥 렌더가 커밋되는 도중에 동기 unmount 하지 않는다(위 설명 참고).
      setTimeout(() => labelRoot.unmount(), 0);
    };
    // camera·size 변화는 매 프레임 useFrame에서 반영한다. 루트는 대상 요소가 바뀔 때만 다시 만든다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const contentStyle = useMemo<CSSProperties>(
    () => ({ position: 'absolute', transform: center ? 'translate3d(-50%,-50%,0)' : 'none', ...style }),
    [center, style],
  );

  useLayoutEffect(() => {
    root.current?.render(<div style={contentStyle}>{children}</div>);
  });

  useFrame(() => {
    const object = group.current;
    const el = container.current;
    if (!object || !el) return;

    camera.updateMatrixWorld();
    object.updateWorldMatrix(true, false);

    const nowVisible = !isBehindCamera(object, camera);
    if (nowVisible !== visible.current) {
      visible.current = nowVisible;
      el.style.display = nowVisible ? 'block' : 'none';
    }

    const [x, y] = screenPosition(object, camera, size.width, size.height);
    const scale = distanceFactor === undefined ? 1 : objectScale(object, camera) * distanceFactor;
    el.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
    const zIndex = objectZIndex(object, camera, zIndexRange);
    if (zIndex !== undefined) el.style.zIndex = String(zIndex);
  });

  return <group position={position} ref={group} />;
}
