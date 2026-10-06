"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { notify } from "@/lib/notify";

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  /** Identifies which link was clicked, sent to the webhook as `source`. */
  source: string;
}

export default function TrackedLink({ source, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        notify(source);
        onClick?.(e);
      }}
    />
  );
}
