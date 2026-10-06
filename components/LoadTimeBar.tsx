"use client";

import { useRef } from "react";
import { useInViewOnce } from "@/lib/hooks";

/** "11s → 2–3s" as a bar that shrinks to its new length when it enters view. */
export default function LoadTimeBar({ before, after }: { before: number; after: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewOnce(ref);
  const afterHi = Number(after.split("–").pop());
  const ratio = afterHi / before;

  return (
    <div ref={ref}>
      <p className="font-mono text-3xl font-medium whitespace-nowrap text-fg">
        <span className="text-subtle line-through decoration-1">{before}s</span>
        <span className="mx-1.5 text-subtle">→</span>
        {after}s
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
        <div
          className="h-full origin-left rounded-full bg-accent transition-transform duration-[1200ms] ease-out-quint"
          style={{ transform: `scaleX(${inView ? ratio : 1})` }}
        />
      </div>
    </div>
  );
}
