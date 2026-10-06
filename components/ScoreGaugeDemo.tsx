"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import clsx from "clsx";

const MIN = 300;
const MAX = 850;
const BASE = 580;
// Demo deltas only — chosen so all three land on 720.
const actions = [
  { id: "util", label: "Pay down card to 10%", delta: 60 },
  { id: "late", label: "Remove late payment", delta: 45 },
  { id: "tradeline", label: "Add tradeline", delta: 35 },
];

const ARC = "M 20 110 A 90 90 0 0 1 200 110";
const frac = (s: number) => (s - MIN) / (MAX - MIN);

export default function ScoreGaugeDemo() {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const reduce = useReducedMotion();
  const score = BASE + actions.reduce((sum, a) => sum + (on[a.id] ? a.delta : 0), 0);

  const mv = useMotionValue(BASE);
  const shown = useTransform(mv, (v) => Math.round(v));
  const length = useTransform(mv, (v) => frac(v));
  const [display, setDisplay] = useState(BASE);

  useEffect(() => shown.on("change", setDisplay), [shown]);
  useEffect(() => {
    const c = animate(mv, score, reduce ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [score, mv, reduce]);

  const band = display >= 700 ? "Good" : display >= 640 ? "Fair" : "Needs work";

  return (
    <figure className="rounded-2xl border border-line bg-surface p-6">
      <div className="grid items-center gap-6 sm:grid-cols-[240px_1fr]">
        <div className="relative mx-auto w-60">
          <svg viewBox="0 0 220 124" className="w-full" aria-hidden="true">
            <path d={ARC} fill="none" stroke="var(--color-line)" strokeWidth="14" strokeLinecap="round" />
            <motion.path
              d={ARC}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="14"
              strokeLinecap="round"
              style={{ pathLength: length }}
            />
            {/* 700 target tick */}
            <line
              x1={110 - 90 * Math.cos(Math.PI * frac(700))}
              y1={110 - 90 * Math.sin(Math.PI * frac(700))}
              x2={110 - 72 * Math.cos(Math.PI * frac(700))}
              y2={110 - 72 * Math.sin(Math.PI * frac(700))}
              stroke="var(--color-cyan)"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute inset-x-0 bottom-1 text-center">
            <p className="font-mono text-4xl font-medium text-fg tabular-nums" aria-live="polite" aria-atomic="true">
              {display}
            </p>
            <p className={clsx("text-xs", display >= 700 ? "text-accent" : "text-muted")}>{band}</p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm text-muted">Toggle actions to simulate their effect on the score:</p>
          <ul className="space-y-2">
            {actions.map((a) => (
              <li key={a.id}>
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-line bg-ink/50 px-3 py-2.5 text-sm text-fg transition-colors hover:border-line-strong has-checked:border-accent/60">
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!on[a.id]}
                      onChange={(e) => setOn((s) => ({ ...s, [a.id]: e.target.checked }))}
                      className="size-4 accent-[var(--color-accent)]"
                    />
                    {a.label}
                  </span>
                  <span className="font-mono text-xs text-accent">+{a.delta}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-5 border-t border-line pt-3 font-mono text-[11px] text-subtle">
        Demo data — not financial advice. The real simulator works from the visitor&apos;s parsed credit report.
      </figcaption>
    </figure>
  );
}
