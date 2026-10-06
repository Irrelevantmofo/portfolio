"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

// Tiny native replacements for Motion's useInView / useReducedMotion / useScroll,
// so sections that only need these don't pull Motion into the first-load bundle.

const RM_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mq = matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** true when the user prefers reduced motion (false during SSR). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => matchMedia(RM_QUERY).matches,
    () => false,
  );
}

/** Becomes true the first time `ref` enters the viewport, then stays true. */
export function useInViewOnce(
  ref: RefObject<Element | null>,
  { rootMargin = "0px 0px -10% 0px", threshold = 0 }: { rootMargin?: string; threshold?: number } = {},
): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, rootMargin, threshold]);
  return seen;
}

/**
 * Calls `onProgress(0..1)` as `ref` scrolls from `start` (its top hits
 * start × viewport height) to `end` (its bottom hits end × viewport height).
 * rAF-throttled, passive listener.
 */
export function useScrollProgress(
  ref: RefObject<Element | null>,
  onProgress: (p: number) => void,
  start = 0.8,
  end = 0.6,
) {
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const from = r.top - start * vh;
      const to = r.bottom - end * vh;
      onProgress(Math.min(1, Math.max(0, -from / (to - from || 1))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, onProgress, start, end]);
}
