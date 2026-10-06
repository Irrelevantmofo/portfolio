"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Sets [data-active] while hovered/focused (pointer devices) or while in view
 * (touch devices), so CSS can play/pause looping illustrations.
 */
export default function ActivateOnInteract({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (matchMedia("(hover: hover)").matches) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.5 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-active={active || undefined}
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setActive(false)}
    >
      {children}
    </div>
  );
}
