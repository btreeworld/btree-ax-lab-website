'use client';

import { Beam } from '@/components/three/primitives';
import { DataStream } from '@/components/three/world/DataStream';
import { CctvCamera, Factory, Greenhouse, PlcCabinet, RobotArm, SensorPost } from '@/components/three/world/props/FieldProps';
import { ShadowBlob } from '@/components/three/world/props/ShadowBlob';
import { FIELD_LAYOUT } from '@/lib/journey';
import { threeColors } from '@/lib/three-tokens';

/**
 * FIELD 스테이션 — hero 카피("제조·산업안전·스마트팜·시설 운영 현장을 진단하고")와
 * architectureLayers[0].nodes(카메라·센서·PLC·로봇·환경제어기)를 실제 설비 형태로 배치한다.
 *
 * 건물 좌표는 PointCloudScan이 수렴하는 지점(FIELD_LAYOUT)을 그대로 쓴다 — 부팅 시퀀스에서
 * 흩어진 점이 이 건물들의 자리로 모이는 연출이 어긋나지 않게 하기 위함.
 */
export function FieldStation() {
  const [fx, , fz] = FIELD_LAYOUT.factory.center;
  const [gx, , gz] = FIELD_LAYOUT.greenhouse.center;

  const cameraPos: [number, number, number] = [-0.5, 0, 9.8];
  const sensorPos: [number, number, number] = [gx - 0.9, 0, gz + 1.5];
  const plcPos: [number, number, number] = [fx - 2.3, 0, fz + 1.1];

  return (
    <group>
      {/* 접지 그림자 — 없으면 설비가 그리드 위에 떠 있는 것처럼 보인다 */}
      <ShadowBlob position={[fx, 0, fz]} radius={3.2} />
      <ShadowBlob opacity={0.85} position={[gx, 0, gz]} radius={2.2} />
      <ShadowBlob opacity={0.6} position={plcPos} radius={0.8} />
      <ShadowBlob opacity={0.6} position={[fx + 1.1, 0, fz + 1.6]} radius={0.7} />

      {/* 제조 — 톱니 지붕 공장동 */}
      <Factory depth={FIELD_LAYOUT.factory.size[2]} position={FIELD_LAYOUT.factory.center} width={FIELD_LAYOUT.factory.size[0]} />

      {/* 스마트팜 — 아치 온실 */}
      <Greenhouse length={2.4} position={[gx, 0, gz]} radius={1.2} />

      {/* 산업안전·관제 — 시야 콘을 가진 CCTV */}
      <CctvCamera position={cameraPos} rotation={[0, -Math.PI * 0.72, 0]} />

      {/* 환경 센서 */}
      <SensorPost position={sensorPos} />

      {/* 로봇 — 공장 앞 매니퓰레이터 */}
      <RobotArm position={[fx + 1.1, 0, fz + 1.6]} scale={0.9} />

      {/* 기존 설비 — PLC 제어반 */}
      <PlcCabinet position={plcPos} rotation={[0, 0.3, 0]} />

      {/* 장비에서 수집된 원천 데이터가 EDGE(−Z) 방향으로 흘러나간다 */}
      <Beam from={[cameraPos[0], 1.5, cameraPos[2]]} opacity={0.2} to={[0, 1.7, 2]} />
      <Beam from={[sensorPos[0], 1.2, sensorPos[2]]} opacity={0.2} to={[0, 1.7, 2]} />
      <DataStream color={threeColors.accent} count={8} from={[cameraPos[0], 1.5, cameraPos[2]]} speed={0.42} to={[0, 1.7, 2]} />
      <DataStream color={threeColors.accentDeep} count={6} from={[sensorPos[0], 1.2, sensorPos[2]]} speed={0.36} to={[0, 1.7, 2]} />
    </group>
  );
}
