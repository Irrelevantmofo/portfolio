// Presentational only (no hooks): rendered statically on the server for
// case-study diagrams, and driven by FlowReplay on the client.
import type { Ref } from "react";
import clsx from "clsx";
import type { Flow, FlowNodeKind, StepStatus } from "@/data/flows";
import { edgeGeometry, pct } from "@/lib/graph";

export const NODE_W = 150;
export const NODE_H = 58;

export interface FlowCanvasState {
  statuses?: Record<string, StepStatus | undefined>;
  activeNode?: string | null;
  activeEdge?: string | null;
  visited?: ReadonlySet<string>;
}

interface FlowCanvasProps extends FlowCanvasState {
  flow: Flow;
  idPrefix: string;
  packetRef?: Ref<SVGCircleElement>;
  /** All nodes rendered as completed (reduced motion / static diagrams). */
  complete?: boolean;
  className?: string;
}

const kindStyle: Record<FlowNodeKind, { glyph: string; tone: string }> = {
  trigger: { glyph: "⚡", tone: "text-accent" },
  action: { glyph: "▸", tone: "text-muted" },
  ai: { glyph: "✦", tone: "text-cyan" },
  logic: { glyph: "◇", tone: "text-warn" },
  store: { glyph: "▤", tone: "text-muted" },
};

const statusChip: Record<StepStatus, { label: string; cls: string; sr: string }> = {
  ok: { label: "✓", cls: "bg-accent text-ink", sr: "done" },
  run: { label: "●", cls: "bg-cyan text-ink animate-pulse", sr: "running" },
  retry: { label: "⟳", cls: "bg-warn text-ink", sr: "retrying" },
  wait: { label: "⏸", cls: "bg-surface-2 text-fg border border-line-strong", sr: "waiting" },
  error: { label: "✕", cls: "bg-danger text-ink", sr: "error" },
};

export function edgePathId(prefix: string, edgeId: string) {
  return `${prefix}-${edgeId}`;
}

export default function FlowCanvas({
  flow,
  idPrefix,
  packetRef,
  statuses = {},
  activeNode = null,
  activeEdge = null,
  visited,
  complete = false,
  className,
}: FlowCanvasProps) {
  const { w, h } = flow.viewBox;
  const byId = new Map(flow.nodes.map((n) => [n.id, n]));
  const marker = `${idPrefix}-arrow`;
  const markerLit = `${idPrefix}-arrow-lit`;

  return (
    // Container-relative type: the diagram scales like an image, text included.
    <div className={clsx("@container", className)}>
      <div
        className="relative w-full"
        style={{ aspectRatio: `${w} / ${h}`, fontSize: `calc(100cqw * ${12 / w})` }}
      >
        <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <defs>
            {[
              [marker, "var(--color-line-strong)"],
              [markerLit, "var(--color-accent)"],
            ].map(([id, fill]) => (
              <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 1 9 5 0 9Z" fill={fill} />
              </marker>
            ))}
          </defs>
          {flow.edges.map((e) => {
            const g = edgeGeometry(byId.get(e.from)!, byId.get(e.to)!, NODE_W, NODE_H, e.offset);
            const lit = complete || activeEdge === e.id || visited?.has(e.id);
            return (
              <path
                key={e.id}
                id={edgePathId(idPrefix, e.id)}
                d={g.d}
                fill="none"
                strokeWidth={activeEdge === e.id ? 2.5 : 1.6}
                strokeDasharray={e.loop ? "5 5" : undefined}
                stroke={lit ? "var(--color-accent)" : "var(--color-line-strong)"}
                strokeOpacity={lit && activeEdge !== e.id ? 0.55 : 1}
                markerEnd={`url(#${lit ? markerLit : marker})`}
                className="transition-[stroke,stroke-opacity] duration-300"
              />
            );
          })}
          <circle ref={packetRef} r={5} fill="var(--color-accent)" className="packet" opacity={0} />
        </svg>

        {flow.edges
          .filter((e) => e.label)
          .map((e) => {
            const { mid } = edgeGeometry(byId.get(e.from)!, byId.get(e.to)!, NODE_W, NODE_H, e.offset);
            const vertical = Math.abs(byId.get(e.from)!.x - byId.get(e.to)!.x) < 1;
            return (
              <span
                key={e.id}
                className={clsx(
                  "absolute rounded border border-line bg-ink px-[0.4em] py-[0.1em] font-mono text-[0.8em] whitespace-nowrap text-subtle",
                  vertical ? (e.offset && e.offset < 0 ? "translate-x-[12%] -translate-y-1/2" : "-translate-x-[112%] -translate-y-1/2") : "-translate-x-1/2 -translate-y-[130%]",
                )}
                style={{ left: pct(mid.x, w), top: pct(mid.y, h) }}
              >
                {e.label}
              </span>
            );
          })}

        <ol className="contents">
          {flow.nodes.map((n) => {
            const status = complete ? "ok" : statuses[n.id];
            const active = activeNode === n.id;
            const k = kindStyle[n.kind];
            return (
              <li
                key={n.id}
                className={clsx(
                  "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-[0.6em] rounded-[0.8em] border bg-surface px-[0.75em] transition-[border-color,box-shadow,background-color] duration-300",
                  active
                    ? "border-accent bg-surface-2 shadow-[0_0_0_0.35em_rgb(198_244_50/0.12)]"
                    : status
                      ? "border-accent/45"
                      : "border-line-strong",
                )}
                style={{ left: pct(n.x, w), top: pct(n.y, h), width: pct(NODE_W, w), height: pct(NODE_H, h) }}
              >
                <span aria-hidden="true" className={clsx("grid size-[1.9em] shrink-0 place-items-center rounded-[0.45em] bg-ink text-[0.95em]", k.tone)}>
                  {k.glyph}
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block truncate text-[1.05em] font-medium text-fg">{n.label}</span>
                  {n.sub && <span className="block truncate font-mono text-[0.82em] text-subtle">{n.sub}</span>}
                </span>
                {status && (
                  <span
                    className={clsx(
                      "absolute -top-[0.6em] -right-[0.6em] grid size-[1.6em] place-items-center rounded-full text-[0.8em] font-bold",
                      statusChip[status].cls,
                    )}
                  >
                    <span aria-hidden="true">{statusChip[status].label}</span>
                    <span className="sr-only">{statusChip[status].sr}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
