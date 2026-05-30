"use client";

import { useEffect, useRef } from "react";
import { notify } from "@/lib/notify";

interface PageViewTrackerProps {
  /** Identifies the visited page, sent to the webhook as `source`. */
  source: string;
}

/**
 * Renders nothing — fires a single webhook notification when the page it's
 * placed on first loads. The ref guard prevents a duplicate ping from React's
 * double-invoked effects in dev (Strict Mode); production fires once.
 */
export default function PageViewTracker({ source }: PageViewTrackerProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    notify(source);
  }, [source]);

  return null;
}
