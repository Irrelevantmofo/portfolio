"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { notify } from "@/lib/notify";
import { person } from "@/data/site";

interface CopyEmailButtonProps {
  source: string;
  className?: string;
  label?: string;
}

/**
 * Copies the address and shows a "Copied ✓" toast. Falls back to mailto: when
 * the Clipboard API is unavailable (insecure context, old browsers).
 */
export default function CopyEmailButton({ source, className, label = "Copy email" }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    notify(source);
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  }

  return (
    <>
      <button type="button" onClick={copy} className={className}>
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="6.5" y="6.5" width="10" height="10" rx="2" />
          <path d="M13.5 6.5V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v7A1.5 1.5 0 0 0 5 13.5h1.5" />
        </svg>
        {label}
      </button>
      <div
        role="status"
        aria-live="polite"
        className={clsx(
          "pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full border border-accent/40 bg-surface px-4 py-2 font-mono text-sm text-fg shadow-2xl transition-[opacity,transform] duration-300 ease-out-quint",
          copied ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        {copied && (
          <>
            <span className="text-accent">Copied ✓</span> {person.email}
          </>
        )}
      </div>
    </>
  );
}
