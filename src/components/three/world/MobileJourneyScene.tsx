'use client';

import { DataStream } from '@/components/three/world/DataStream';
import { EdgeGateway, InferenceLattice } from '@/components/three/world/props/EdgeProps';
import { CctvCamera, Factory, PlcCabinet, RobotArm } from '@/components/three/world/props/FieldProps';
import { ControlConsole } from '@/components/three/world/props/OperatorProps';
import { HoloPedestal } from '@/components/three/world/props/TwinProps';
import { ShadowBlob } from '@/components/three/world/props/ShadowBlob';
import { threeColors } from '@/lib/three-tokens';

export function MobileJourneyScene() {
  return (
    <group>
      {/* FIELD — 세로 화면에서 한눈에 읽히는 단일 생산 셀 */}
      <group position={[0, 0, 8]} scale={0.86}>
        <ShadowBlob position={[0, 0, 0]} radius={3.2} />
        <Factory depth={2.8} position={[-0.65, 0, 0]} width={3.8} />
        <RobotArm position={[1.15, 0, 1.45]} scale={1.08} />
        <PlcCabinet position={[-1.85, 0, 1.35]} rotation={[0, 0.22, 0]} />
        <CctvCamera position={[1.75, 0, -0.8]} rotation={[0, -2.4, 0]} />
        <DataStream count={6} from={[1.75, 1.5, -0.8]} speed={0.42} to={[0, 1.45, -2.8]} />
        <pointLight color={0xe3f8ff} distance={10} intensity={5.2} position={[0.4, 4.6, 4.5]} />
      </group>

      {/* EDGE + DIGITAL TWIN — 판단과 시뮬레이션을 하나의 장면으로 압축 */}
      <group position={[0, 0, -9]}>
        <ShadowBlob position={[0, 0, 0]} radius={2.6} />
        <EdgeGateway height={0.46} position={[0, 0, 0]} rotation={[0, 0.18, 0]} width={1.75} />
        <InferenceLattice layerGap={0.78} position={[0, 1.9, -0.15]} spread={0.46} />
        <HoloPedestal baseRadius={1.15} coneHeight={2.8} position={[0, 0, -3.1]} topRadius={2.1} />
        <DataStream count={7} from={[0, 1.2, 1.8]} speed={0.52} to={[0, 1.8, -0.2]} />
        <DataStream color={threeColors.accentHover} count={7} from={[0, 1.8, -0.4]} speed={0.56} to={[0, 1.4, -3.1]} />
        <pointLight color={threeColors.accent} distance={7} intensity={2.2} position={[0, 2.6, 1]} />
      </group>

      {/* OPERATOR — 마지막 전환은 관제 콘솔 하나에 집중 */}
      <group position={[0, 0, -42]}>
        <ShadowBlob position={[0, 0, 0.2]} radius={2.8} />
        <ControlConsole position={[0, 0, 0]} rotation={[0, 0.12, 0]} />
        <pointLight color={threeColors.accentHover} distance={6} intensity={1.6} position={[0, 3, 2]} />
      </group>
    </group>
  );
}
