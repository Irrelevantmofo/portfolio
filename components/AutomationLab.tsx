"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import type { Flow } from "@/data/flows";
import FlowReplay from "@/components/flow/FlowReplay";

export type LabFlow = Flow & { href: string; hrefLabel: string };

export default function AutomationLab({ flows }: { flows: LabFlow[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const flow = flows[active];

  // Roving tabindex + arrow keys (WAI-ARIA tabs pattern).
  function onKey(e: React.KeyboardEvent) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + flows.length) % flows.length;
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Workflow replays" className="mb-5 flex gap-2 overflow-x-auto pb-1" onKeyDown={onKey}>
        {flows.map((f, i) => (
          <button
            key={f.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`lab-tab-${f.id}`}
            aria-selected={i === active}
            aria-controls="lab-panel"
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={clsx(
              "shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              i === active
                ? "border-accent/60 bg-accent/10 text-fg"
                : "border-line text-muted hover:border-line-strong hover:text-fg",
            )}
          >
            <span className="mr-2 font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
            {f.title}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="lab-panel" aria-labelledby={`lab-tab-${flow.id}`}>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="max-w-2xl text-sm text-muted">{flow.blurb}</p>
          <Link
            href={flow.href}
            className="shrink-0 text-sm text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent"
          >
            {flow.hrefLabel} →
          </Link>
        </div>
        {/* Remounts per tab: plays once when first seen, then on each tab switch. */}
        <FlowReplay key={flow.id} flow={flow} autoPlay />
      </div>
    </div>
  );
}
