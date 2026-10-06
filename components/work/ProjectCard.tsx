import Link from "next/link";
import clsx from "clsx";
import { asset, screenshotSrcSet } from "@/lib/asset";
import { getTool } from "@/data/tools";
import { kindLabel, type Project } from "@/data/projects";
import { getFlow } from "@/data/flows";
import FlowCanvas from "@/components/flow/FlowCanvas";

/** Compact card for the filterable grid. Contributions are visible, not tabbed. */
export default function ProjectCard({ project: p, eager = false }: { project: Project; eager?: boolean }) {
  const flow = getFlow(p.flowId);
  const caseHref = p.featured ? `/work/${p.slug}/` : null;

  return (
    <article id={p.slug} className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-ink">
        {p.image ? (
          <img
            src={asset(p.image.src)}
            srcSet={screenshotSrcSet(p.image)}
            sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
            alt={p.image.alt}
            width={p.image.width}
            height={p.image.height}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : undefined}
            decoding="async"
            className={clsx("size-full", p.image.width / p.image.height > 2.5 ? "object-contain p-8" : "object-cover object-top")}
          />
        ) : flow ? (
          <div className="dot-grid flex size-full items-center p-3">
            <FlowCanvas flow={flow} idPrefix={`thumb-${p.slug}`} complete className="w-full" />
          </div>
        ) : (
          <div className="dot-grid grid size-full place-items-center font-mono text-sm text-subtle">{p.outcome}</div>
        )}
        {caseHref && (
          <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-medium text-ink">
            Case study
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 font-mono text-[11px] text-subtle">
          {kindLabel[p.kind]}
          {p.client && ` · ${p.client}`}
          {p.wip && " · WIP"}
        </p>
        <h3 className="text-base font-semibold text-fg">
          {caseHref ? (
            <Link href={caseHref} className="hover:text-accent">
              {p.title}
            </Link>
          ) : (
            p.title
          )}
        </h3>
        <p className="mt-1.5 text-sm text-muted">{p.outcome}</p>

        <ul className="mt-4 space-y-1.5 text-[13px] leading-snug text-muted">
          {p.contributions.slice(0, 3).map((c) => (
            <li key={c} className="flex gap-2">
              <span aria-hidden="true" className="text-accent">
                ›
              </span>
              {c}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          {p.stack.length > 0 && (
            <ul className="mb-4 flex flex-wrap gap-1.5" aria-label="Stack">
              {p.stack.map((id) => (
                <li key={id} className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-subtle">
                  {getTool(id).name}
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-4 text-sm">
            {caseHref && (
              <Link href={caseHref} className="font-medium text-accent hover:underline">
                Read case study →
              </Link>
            )}
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-fg hover:text-accent">
                {p.link.includes("github.com") ? "View source ↗" : "Visit site ↗"}
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
