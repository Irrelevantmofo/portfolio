"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import type { StepStatus } from "@/data/flows";

export interface LogLine {
  id: number;
  text: string;
  status: StepStatus;
}

const tone: Record<StepStatus, string> = {
  ok: "text-accent",
  run: "text-cyan",
  retry: "text-warn",
  wait: "text-muted",
  error: "text-danger",
};

export default function ReplayLog({ lines, phase }: { lines: LogLine[]; phase: "idle" | "running" | "done" }) {
  const box = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = box.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines.length]);

  return (
    <div className="flex min-h-56 flex-col rounded-2xl border border-line bg-[#07080b] font-mono text-xs lg:h-auto">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5 text-subtle">
        <span>execution.log</span>
        <span className={clsx(phase === "running" && "text-cyan", phase === "done" && "text-accent")}>
          {phase === "idle" ? "idle" : phase === "running" ? "running…" : "succeeded"}
        </span>
      </div>
      <ol ref={box} aria-live="polite" aria-label="Execution log" className="max-h-72 flex-1 space-y-1.5 overflow-y-auto p-4 lg:max-h-[22rem]">
        {lines.length === 0 && <li className="text-subtle">Press ▶ Run to replay an execution.</li>}
        {lines.map((l) => (
          <li key={l.id} className="fade-up leading-relaxed text-muted">
            <span className={clsx("mr-1.5", tone[l.status])} aria-hidden="true">
              ›
            </span>
            {l.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
