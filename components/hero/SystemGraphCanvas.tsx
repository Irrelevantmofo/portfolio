"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { edgeGeometry, pct, type Pt } from "@/lib/graph";

export interface GraphNodeView {
  id: string;
  label: string;
  sub: string;
  href: string;
  usedIn: string[];
  icon: ReactNode;
}

export interface GraphLayout {
  w: number;
  h: number;
  nodeW: number;
  nodeH: number;
  pos: Record<string, Pt>;
  edges: [string, string][];
}

interface Props {
  nodes: GraphNodeView[];
  desktop: GraphLayout;
  mobile: GraphLayout;
}

const DRAW_STAGGER = 140; // ms between edge draw-ins
const PACKET_DUR = 2.4; // s per edge

export default function SystemGraphCanvas({ nodes, desktop, mobile }: Props) {
  const [hover, setHover] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);

  // Pause the SMIL packet loop when off-screen or the tab is hidden.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const svgs = () => Array.from(el.querySelectorAll<SVGSVGElement>("svg[data-packets]"));
    let visible = true;
    const sync = () =>
      svgs().forEach((s) => (visible && !document.hidden ? s.unpauseAnimations() : s.pauseAnimations()));
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={root} className="relative" onPointerLeave={() => setHover(null)}>
      <Graph layout={desktop} nodes={nodes} hover={hover} setHover={setHover} idPrefix="hg-d" className="hidden md:block" />
      <Graph layout={mobile} nodes={nodes} hover={hover} setHover={setHover} idPrefix="hg-m" className="md:hidden" />
    </div>
  );
}

function Graph({
  layout,
  nodes,
  hover,
  setHover,
  idPrefix,
  className,
}: {
  layout: GraphLayout;
  nodes: GraphNodeView[];
  hover: string | null;
  setHover: (id: string | null) => void;
  idPrefix: string;
  className: string;
}) {
  const { w, h, nodeW, nodeH, pos } = layout;
  const shown = nodes.filter((n) => pos[n.id]);
  const edges = layout.edges.map(([from, to], i) => ({
    from,
    to,
    id: `${idPrefix}-${i}`,
    ...edgeGeometry(pos[from], pos[to], nodeW, nodeH),
  }));
  const drawDone = edges.length * DRAW_STAGGER + 600;

  return (
    <div className={clsx("relative w-full", className)} style={{ aspectRatio: `${w} / ${h}` }}>
      <svg
        data-packets=""
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0 size-full overflow-visible"
        aria-hidden="true"
      >
        {edges.map((e, i) => {
          const lit = hover !== null && (e.from === hover || e.to === hover);
          return (
            <g key={e.id}>
              <path d={e.d} fill="none" stroke="var(--color-line)" strokeWidth={1.5} />
              <path
                id={e.id}
                d={e.d}
                pathLength={1}
                fill="none"
                strokeWidth={lit ? 2.25 : 1.5}
                strokeLinecap="round"
                className="edge-draw transition-[stroke,stroke-width] duration-200"
                stroke={lit ? "var(--color-accent)" : "rgb(198 244 50 / 0.45)"}
                style={{ "--d": `${i * DRAW_STAGGER}ms` } as React.CSSProperties}
              />
              {/* Data packet: starts after the edges finish drawing. */}
              <circle r={3} className="packet" fill={i % 3 === 2 ? "var(--color-cyan)" : "var(--color-accent)"} visibility="hidden">
                <set attributeName="visibility" to="visible" begin={`${drawDone / 1000 + i * 0.35}s`} />
                <animateMotion
                  dur={`${PACKET_DUR}s`}
                  begin={`${drawDone / 1000 + i * 0.35}s`}
                  repeatCount="indefinite"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.45 0 0.55 1"
                >
                  <mpath href={`#${e.id}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}
      </svg>

      {shown.map((n, i) => {
        const p = pos[n.id];
        const active = hover === n.id;
        const dim = hover !== null && !active;
        return (
          <a
            key={n.id}
            href={n.href}
            aria-label={`${n.label} · ${n.sub} — used in ${n.usedIn.join(", ")}. Jump to case study.`}
            onPointerEnter={() => setHover(n.id)}
            onFocus={() => setHover(n.id)}
            onBlur={() => setHover(null)}
            className={clsx(
              "fade-up group/node absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border bg-surface/95 px-2.5 text-left shadow-[0_8px_30px_-12px_rgb(0_0_0/0.8)] transition-[border-color,opacity,box-shadow] duration-200",
              active ? "z-10 border-accent shadow-[0_0_0_4px_rgb(198_244_50/0.12)]" : "border-line-strong",
              dim && "opacity-60",
            )}
            style={
              {
                left: pct(p.x, w),
                top: pct(p.y, h),
                width: pct(nodeW, w),
                height: pct(nodeH, h),
                "--d": `${120 + i * 70}ms`,
              } as React.CSSProperties
            }
          >
            <span
              className={clsx(
                "grid size-7 shrink-0 place-items-center rounded-md border transition-colors",
                active ? "border-accent/50 bg-accent/10 text-accent" : "border-line bg-surface-2 text-muted",
              )}
            >
              {n.icon}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[13px] font-medium text-fg">{n.label}</span>
              <span className="block truncate font-mono text-[11px] text-subtle">{n.sub}</span>
            </span>

            <span
              aria-hidden="true"
              className={clsx(
                "pointer-events-none absolute top-full left-1/2 z-20 mt-2 w-max max-w-56 -translate-x-1/2 rounded-md border border-line-strong bg-ink px-2.5 py-1.5 font-mono text-[11px] leading-snug text-muted shadow-xl transition-opacity duration-150",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              <span className="text-accent">Used in:</span> {n.usedIn.join(" · ")}
            </span>
          </a>
        );
      })}
    </div>
  );
}
