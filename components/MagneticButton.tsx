"use client";

import { useRef, type ComponentProps } from "react";
import TrackedLink from "@/components/TrackedLink";

const PULL = 6; // max px toward the cursor

/**
 * Primary CTA that leans up to 6px toward the pointer. Mouse-only (no effect on
 * touch) and disabled under prefers-reduced-motion via the CSS transition reset.
 */
export default function MagneticButton({ style, ...props }: ComponentProps<typeof TrackedLink>) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.transform = `translate(${dx * PULL}px, ${dy * PULL}px)`;
  }

  return (
    <TrackedLink
      ref={ref}
      {...props}
      style={{ transition: "transform 0.25s var(--ease-out-quint)", ...style }}
      onPointerMove={onMove}
      onPointerLeave={() => ref.current && (ref.current.style.transform = "")}
    />
  );
}
