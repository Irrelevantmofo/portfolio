"use client";

import { useCallback, useRef } from "react";
import { useInViewOnce, usePrefersReducedMotion, useScrollProgress } from "@/lib/hooks";
import clsx from "clsx";
import type { TimelineEntry } from "@/data/site";

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = usePrefersReducedMotion();
  const fill = useRef<HTMLSpanElement>(null);

  // Line draws in with scroll: scaleY written straight to the DOM, no re-renders.
  const onProgress = useCallback(
    (p: number) => {
      if (fill.current) fill.current.style.transform = `scaleY(${reduce ? 1 : p})`;
    },
    [reduce],
  );
  useScrollProgress(ref, onProgress, 0.8, 0.6);

  return (
    <ol ref={ref} className="relative">
      {/* Track + scroll-driven fill */}
      <span aria-hidden="true" className="absolute top-0 bottom-0 left-[7px] w-px bg-line md:left-1/2" />
      <span
        ref={fill}
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[7px] w-px origin-top scale-y-0 bg-accent md:left-1/2"
      />

      {entries.map((e, i) => (
        <Entry key={i} entry={e} right={i % 2 === 1} />
      ))}
    </ol>
  );
}

function Entry({ entry: e, right }: { entry: TimelineEntry; right: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInViewOnce(ref, { rootMargin: "0px 0px -15% 0px" });
  return (
    <li className="relative grid pb-12 last:pb-0 md:grid-cols-2 md:gap-12">
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-0 size-[15px] rounded-full border-2 border-accent bg-ink md:left-1/2 md:-translate-x-1/2"
      />
      {/* Slides from the left on mobile, alternating sides on desktop (see .tl-entry). */}
      <div
        ref={ref}
        data-shown={shown || undefined}
        className={clsx("tl-entry pl-8 md:pl-0", right ? "tl-right md:col-start-2" : "md:col-start-1 md:text-right")}
      >
        <p className="font-mono text-xs text-accent">{e.period}</p>
        <h3 className="mt-1 text-lg font-semibold text-fg">
          {e.role}
          {e.org && <span className="text-muted"> · {e.org}</span>}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{e.summary}</p>
        <ul className={clsx("mt-3 flex flex-wrap gap-1.5", !right && "md:justify-end")}>
          {e.highlights.map((h) => (
            <li key={h} className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-subtle">
              {h}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
