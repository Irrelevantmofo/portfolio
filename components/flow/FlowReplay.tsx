"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "@/lib/hooks";
import clsx from "clsx";
import type { Flow, StepStatus } from "@/data/flows";
import FlowCanvas, { edgePathId } from "./FlowCanvas";
import ReplayLog, { type LogLine } from "./ReplayLog";

const EDGE_MS = 520;
const HOLD_MS = 380;

interface RunState {
  statuses: Record<string, StepStatus | undefined>;
  activeNode: string | null;
  activeEdge: string | null;
  visited: Set<string>;
  log: LogLine[];
  phase: "idle" | "running" | "done";
}

const initial = (): RunState => ({
  statuses: {},
  activeNode: null,
  activeEdge: null,
  visited: new Set(),
  log: [],
  phase: "idle",
});

const completeState = (flow: Flow): RunState => ({
  statuses: Object.fromEntries(flow.nodes.map((n) => [n.id, "ok" as const])),
  activeNode: null,
  activeEdge: null,
  visited: new Set(flow.edges.map((e) => e.id)),
  log: (flow.steps ?? []).map((s, i) => ({ id: i, text: s.log, status: s.status })),
  phase: "done",
});

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface FlowReplayProps {
  flow: Flow;
  /** Run once automatically the first time the replay scrolls into view. */
  autoPlay?: boolean;
}

export default function FlowReplay({ flow, autoPlay = false }: FlowReplayProps) {
  const prefix = `fr-${useId().replace(/:/g, "")}-${flow.id}`;
  const reduce = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const packet = useRef<SVGCircleElement>(null);
  const runId = useRef(0);
  const inView = useInViewOnce(root, { rootMargin: "0px", threshold: 0.4 });
  const [state, setState] = useState<RunState>(initial);

  // Cancel any in-flight run on unmount.
  useEffect(() => () => void runId.current++, []);

  const movePacket = useCallback(
    (edgeId: string, id: number) =>
      new Promise<void>((resolve) => {
        const path = document.getElementById(edgePathId(prefix, edgeId)) as SVGPathElement | null;
        const dot = packet.current;
        if (!path || !dot) return resolve();
        const len = path.getTotalLength();
        const start = performance.now();
        dot.setAttribute("opacity", "1");
        const frame = (now: number) => {
          if (runId.current !== id) return resolve();
          const t = Math.min(1, (now - start) / EDGE_MS);
          const p = path.getPointAtLength(ease(t) * len);
          dot.setAttribute("transform", `translate(${p.x} ${p.y})`);
          if (t < 1) requestAnimationFrame(frame);
          else {
            dot.setAttribute("opacity", "0");
            resolve();
          }
        };
        requestAnimationFrame(frame);
      }),
    [prefix],
  );

  const run = useCallback(async () => {
    const steps = flow.steps ?? [];
    if (reduce) return; // already rendered complete
    const id = ++runId.current;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    setState({ ...initial(), phase: "running" });

    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      if (s.via) {
        setState((st) => ({ ...st, activeEdge: s.via!, activeNode: null }));
        await movePacket(s.via, id);
        if (runId.current !== id) return;
      }
      setState((st) => ({
        ...st,
        activeEdge: null,
        activeNode: s.node,
        visited: s.via ? new Set(st.visited).add(s.via) : st.visited,
        statuses: { ...st.statuses, [s.node]: s.status },
        log: [...st.log, { id: i, text: s.log, status: s.status }],
      }));
      await wait(s.hold ?? HOLD_MS);
      if (runId.current !== id) return;
    }
    setState((st) => ({ ...st, activeNode: null, phase: "done" }));
  }, [flow, movePacket, reduce]);

  // Kick off from a frame callback (not synchronously inside the effect).
  useEffect(() => {
    if (!autoPlay || !inView || reduce) return;
    const raf = requestAnimationFrame(() => void run());
    return () => cancelAnimationFrame(raf);
    // Only the first time it's seen; the parent remounts per flow.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, inView]);

  // Reduced motion: always show the finished run, no movement.
  const view = reduce ? completeState(flow) : state;
  const running = view.phase === "running";

  return (
    <div ref={root} className="grid gap-4 lg:grid-cols-[1fr_300px]">
      <div className="min-w-0 rounded-2xl border border-line bg-ink/70 p-3 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-subtle">
            <span className="text-accent">●</span> workflow · {flow.nodes.length} nodes
            <span className="ml-2 rounded border border-line px-1.5 py-0.5 text-[10px] uppercase">demo data</span>
          </p>
          <button
            type="button"
            onClick={() => void run()}
            disabled={running}
            className={clsx(
              "inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm font-medium transition",
              running ? "cursor-wait bg-surface-2 text-muted" : "bg-accent text-ink hover:brightness-110",
            )}
          >
            <span aria-hidden="true">{running ? "⟳" : "▶"}</span>
            {running ? "Running…" : view.phase === "done" && !reduce ? "Run again" : "Run"}
            <span className="sr-only"> the {flow.title} workflow replay</span>
          </button>
        </div>
        <div className="-mx-3 overflow-x-auto px-3 pt-3 pb-2 sm:mx-0 sm:px-0">
          <FlowCanvas
            flow={flow}
            idPrefix={prefix}
            packetRef={packet}
            statuses={view.statuses}
            activeNode={view.activeNode}
            activeEdge={view.activeEdge}
            visited={view.visited}
            className="min-w-[700px]"
          />
        </div>
      </div>
      <ReplayLog lines={view.log} phase={view.phase} />
    </div>
  );
}
