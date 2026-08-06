import { Icon, type IconName } from '@/components/ui/Icon';
import { architectureLayers } from '@/content/home';

/**
 * 아키텍처 다이어그램 — 마스터 문서 7.7
 * - CSS/SVG 기반, 카드가 선으로 연결되는 형태
 * - JavaScript 없이도 모든 계층 설명이 보이도록 구현한다(hover 는 강조만 담당)
 */

const layerIcons: Record<string, IconName> = {
  field: 'camera',
  edge: 'edge',
  platform: 'database',
  twin: 'twin',
};

export function ArchitectureDiagram() {
  return (
    <ol className="flex flex-col">
      {architectureLayers.map((layer, index) => (
        <li key={layer.id}>
          <div className="group rounded-card border border-line-dark bg-bg-elevated/50 p-6 transition-colors hover:border-accent/50 md:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
              <div className="flex items-center gap-4 lg:w-[260px] lg:shrink-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button border border-accent/30 bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" name={layerIcons[layer.id] ?? 'edge'} />
                </span>
                <div>
                  <p className="font-display text-label uppercase tracking-[0.18em] text-accent">
                    {layer.label}
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-ink-primary-dark">
                    {layer.labelKo}
                  </p>
                </div>
              </div>

              <div className="flex-1">
                <ul className="flex flex-wrap gap-2">
                  {layer.nodes.map((node) => (
                    <li
                      className="rounded-badge border border-line-dark bg-white/5 px-3 py-1.5 text-[13px] text-ink-primary-dark transition-colors group-hover:border-accent/25"
                      key={node}
                    >
                      {node}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-small text-ink-secondary-dark">{layer.description}</p>
              </div>
            </div>
          </div>

          {/* 계층 간 연결선 */}
          {index < architectureLayers.length - 1 ? (
            <div aria-hidden="true" className="flex h-10 items-center justify-center lg:justify-start lg:pl-[46px]">
              <svg
                className="h-10 w-4 text-accent/50"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                viewBox="0 0 16 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0v32" strokeDasharray="4 4" />
                <path d="m3.5 27 4.5 5 4.5-5" />
              </svg>
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
