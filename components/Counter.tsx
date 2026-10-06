"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "@/lib/hooks";

const DURATION = 1200;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts 0 → `to` once, the first time it scrolls into view. SSR renders the
 * final value, so crawlers / no-JS / reduced-motion users see the real number.
 */
export default function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref);
  const reduce = usePrefersReducedMotion();
  const [value, setValue] = useState(to);
  const armed = useRef(false);

  // Hydrated and not yet seen → reset to 0 so the count-up is visible.
  useEffect(() => {
    if (reduce || inView || armed.current) return;
    armed.current = true;
    setValue(0);
  }, [reduce, inView]);

  useEffect(() => {
    if (!inView || reduce || !armed.current) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setValue(Math.round(easeOut(t) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduce ? to : value}
      {suffix}
    </span>
  );
}
