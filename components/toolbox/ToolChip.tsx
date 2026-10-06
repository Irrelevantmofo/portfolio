"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import { useToolFilter } from "@/components/work/ToolFilter";
import { notify } from "@/lib/notify";

interface ToolChipProps {
  id: string;
  name: string;
  color?: string; // brand color revealed on hover
  count: number;
  note?: string;
  icon: ReactNode;
}

export default function ToolChip({ id, name, color, count, note, icon }: ToolChipProps) {
  const { tool, setTool } = useToolFilter();
  const selected = tool === id;

  function select() {
    const next = selected ? null : id;
    setTool(next);
    if (next) {
      notify(`toolbox:${id}`);
      // Bring the filtered grid into view on small screens, where it's far below.
      if (matchMedia("(max-width: 1023px)").matches) {
        document.getElementById("more-work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={select}
      title={[note, count ? `Used in ${count} project${count === 1 ? "" : "s"}` : "In production use"].filter(Boolean).join(" · ")}
      style={{ "--brand": color ?? "var(--color-accent)" } as React.CSSProperties}
      className={clsx(
        "group/chip inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-sm transition-colors",
        selected
          ? "border-accent bg-accent/10 text-fg"
          : "border-line bg-ink/50 text-muted hover:border-line-strong hover:text-fg",
      )}
    >
      <span
        className={clsx(
          "transition-colors",
          selected ? "text-(--brand)" : "text-subtle group-hover/chip:text-(--brand) group-focus-visible/chip:text-(--brand)",
        )}
      >
        {icon}
      </span>
      <span>
        {name}
        {note && <span className="sr-only"> ({note})</span>}
      </span>
      {count > 0 ? (
        <span className="rounded bg-surface-2 px-1.5 font-mono text-[10px] text-subtle tabular-nums">{count}</span>
      ) : (
        <span className="font-mono text-[10px] text-subtle italic">in production use</span>
      )}
    </button>
  );
}
