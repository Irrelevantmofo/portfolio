"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import clsx from "clsx";
import type { ProjectKind } from "@/data/projects";
import { useToolFilter } from "./ToolFilter";

export interface WorkGridItem {
  slug: string;
  kind: ProjectKind;
  featured: boolean;
  stack: string[];
  card: ReactNode; // server-rendered <ProjectCard>
}

interface WorkGridProps {
  items: WorkGridItem[];
  /** Tool id → display name, for the active-filter banner. */
  toolNames: Record<string, string>;
  /** Home shows only non-featured work until a tool filter is active. */
  hideFeaturedByDefault?: boolean;
  /** Optional tool <select> (the /work index has no Toolbox above it). */
  toolOptions?: { id: string; name: string }[];
}

const kinds: { id: ProjectKind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web-app", label: "Web apps" },
  { id: "website", label: "Websites" },
  { id: "automation", label: "Automations" },
];

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function WorkGrid({ items, toolNames, hideFeaturedByDefault = false, toolOptions }: WorkGridProps) {
  const { tool, setTool, onBeforeChange } = useToolFilter();
  const [kind, setKindState] = useState<ProjectKind | "all">("all");
  const reduce = usePrefersReducedMotion();
  const list = useRef<HTMLUListElement>(null);
  const before = useRef<Map<string, DOMRect> | null>(null);

  // FLIP layout animation (Web Animations API, transform/opacity only).
  // Hand-rolled instead of Motion's `layout` prop: that costs ~40 KB gz, more
  // than the whole first-load budget headroom on `/`.
  const measure = useCallback(() => {
    const rects = new Map<string, DOMRect>();
    list.current?.querySelectorAll<HTMLElement>("[data-key]").forEach((el) => {
      rects.set(el.dataset.key!, el.getBoundingClientRect());
    });
    before.current = rects;
  }, []);

  useEffect(() => {
    onBeforeChange(measure);
    return () => onBeforeChange(null);
  }, [onBeforeChange, measure]);

  const setKind = (k: ProjectKind | "all") => {
    measure();
    setKindState(k);
  };

  useLayoutEffect(() => {
    const prev = before.current;
    before.current = null;
    if (!prev || reduce || !list.current) return;
    list.current.querySelectorAll<HTMLElement>("[data-key]").forEach((el) => {
      const was = prev.get(el.dataset.key!);
      const now = el.getBoundingClientRect();
      if (!was) {
        el.animate([{ opacity: 0, transform: "scale(0.97)" }, { opacity: 1, transform: "none" }], {
          duration: 450,
          easing: EASE,
        });
      } else if (was.left !== now.left || was.top !== now.top) {
        el.animate(
          [{ transform: `translate(${was.left - now.left}px, ${was.top - now.top}px)` }, { transform: "none" }],
          { duration: 500, easing: EASE },
        );
      }
    });
  }, [tool, kind, reduce]);

  const visible = items.filter(
    (it) =>
      (kind === "all" || it.kind === kind) &&
      (tool ? it.stack.includes(tool) : !(hideFeaturedByDefault && it.featured)),
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-1.5">
          {kinds.map((k) => (
            <button
              key={k.id}
              type="button"
              aria-pressed={kind === k.id}
              onClick={() => setKind(k.id)}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                kind === k.id ? "border-fg/50 bg-fg text-ink" : "border-line text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {k.label}
            </button>
          ))}
        </div>

        {toolOptions && (
          <label className="ml-auto flex items-center gap-2 text-sm text-muted">
            <span>Tool</span>
            <select
              value={tool ?? ""}
              onChange={(e) => setTool(e.target.value || null)}
              className="rounded-lg border border-line bg-surface px-3 py-1.5 text-fg"
            >
              <option value="">Any</option>
              {toolOptions.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <p aria-live="polite" className="mb-5 min-h-6 text-sm text-muted">
        {tool && (
          <>
            Showing {visible.length} project{visible.length === 1 ? "" : "s"} using{" "}
            <span className="font-medium text-accent">{toolNames[tool]}</span>
            {visible.length === 0 && " — in production use, no public project yet"}.{" "}
            <button type="button" onClick={() => setTool(null)} className="text-fg underline underline-offset-4">
              Clear filter
            </button>
          </>
        )}
      </p>

      <ul ref={list} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((it) => (
          <li key={it.slug} data-key={it.slug} className={clsx("rounded-xl", tool && "ring-1 ring-accent/50")}>
            {it.card}
          </li>
        ))}
      </ul>
    </div>
  );
}
