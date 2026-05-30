"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { notify } from "@/lib/notify";

interface TrackedProjectsLinkProps {
  /** Identifies which button was clicked, sent to the webhook as `source`. */
  source: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedProjectsLink({
  source,
  className,
  children,
}: TrackedProjectsLinkProps) {
  return (
    <Link href="/projects" className={className} onClick={() => notify(source)}>
      {children}
    </Link>
  );
}
