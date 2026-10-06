import Link from "next/link";
import { getTool } from "@/data/tools";
import type { Project } from "@/data/projects";
import Spotlight from "@/components/Spotlight";
import CaseMedia from "./CaseMedia";

export default function CaseStudyCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <article id={`case-${p.slug}`} className="group relative scroll-mt-24">
      <Spotlight className="card-spotlight relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors group-hover:border-line-strong">
        <CaseMedia project={p} className="aspect-[16/9] border-b border-line" />
        <div className="flex flex-1 flex-col p-6">
          <p className="mb-3 font-mono text-[11px] text-subtle">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span> · {p.client}
          </p>
          <h3 className="text-xl font-semibold text-fg">
            {/* Stretched link: the whole card is the click target. */}
            <Link href={`/work/${p.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {p.title}
            </Link>
          </h3>
          <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.outcome}</p>
          <ul className="chip-stagger mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
            {p.stack.slice(0, 6).map((id, i) => (
              <li
                key={id}
                style={{ "--i": i } as React.CSSProperties}
                className="rounded-md border border-line bg-ink/60 px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {getTool(id).name}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-medium text-accent">
            Read case study <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </p>
        </div>
      </Spotlight>
      {/* Focus ring for the stretched link. */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-accent ring-offset-2 ring-offset-ink group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
