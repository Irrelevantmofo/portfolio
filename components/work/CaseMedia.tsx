import { ViewTransition } from "react";
import clsx from "clsx";
import { asset, screenshotSrcSet } from "@/lib/asset";
import { getFlow } from "@/data/flows";
import type { Project } from "@/data/projects";
import FlowCanvas from "@/components/flow/FlowCanvas";

/**
 * Screenshot (or flow diagram for automations). Shares a view-transition name
 * between the home card and the case-study hero so one morphs into the other.
 */
export default function CaseMedia({
  project: p,
  priority = false,
  className,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  const flow = getFlow(p.flowId);
  return (
    <ViewTransition name={`case-media-${p.slug}`} share="morph">
      <div className={clsx("relative overflow-hidden bg-ink", className)}>
        {p.image ? (
          <img
            src={asset(p.image.src)}
            srcSet={screenshotSrcSet(p.image)}
            sizes={priority ? "(min-width: 1024px) 976px, 100vw" : "(min-width: 768px) 560px, 100vw"}
            alt={p.image.alt}
            width={p.image.width}
            height={p.image.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className="kenburns size-full object-cover object-top"
          />
        ) : flow ? (
          <div className="dot-grid kenburns flex size-full items-center p-4 sm:p-6">
            <FlowCanvas flow={flow} idPrefix={`media-${p.slug}`} complete className="w-full" />
          </div>
        ) : null}
      </div>
    </ViewTransition>
  );
}
