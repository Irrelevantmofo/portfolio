import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageViewTracker from "@/components/PageViewTracker";
import CaseMedia from "@/components/work/CaseMedia";
import FlowCanvas from "@/components/flow/FlowCanvas";
import FlowReplay from "@/components/flow/FlowReplay";
import ScoreGaugeDemo from "@/components/ScoreGaugeDemoLazy";
import { featuredProjects, getProject, kindLabel } from "@/data/projects";
import { getFlow } from "@/data/flows";
import { getTool } from "@/data/tools";
import { ToolIconSvg } from "@/lib/icons";

export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.outcome,
    alternates: { canonical: `work/${p.slug}/` },
    openGraph: {
      title: `${p.title} (case study)`,
      description: p.outcome,
      url: `work/${p.slug}/`,
      images: [{ url: "og.png", width: 1200, height: 630 }],
    },
  };
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`s-${n}`} className="border-t border-line py-12">
      <p className="mb-2 font-mono text-xs text-accent" aria-hidden="true">{`// ${n}`}</p>
      <h2 id={`s-${n}`} className="mb-5 text-2xl font-semibold tracking-tight text-fg">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || !p.featured || !p.caseStudy) notFound();

  const flow = getFlow(p.flowId);
  const i = featuredProjects.findIndex((f) => f.slug === p.slug);
  const prev = featuredProjects[(i - 1 + featuredProjects.length) % featuredProjects.length];
  const next = featuredProjects[(i + 1) % featuredProjects.length];

  return (
    <article className="mx-auto max-w-5xl px-4 pt-12 pb-20 sm:px-6">
      <PageViewTracker source={`case-study:${p.slug}`} />
      <Link href="/#work" className="font-mono text-xs text-subtle hover:text-fg">
        ← All case studies
      </Link>

      {/* 1. Hero */}
      <header className="mt-6 mb-10">
        <p className="mb-3 font-mono text-xs text-accent">
          {kindLabel[p.kind]} · {p.client} · {p.caseStudy.role}
        </p>
        <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-fg">
          {p.title}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{p.outcome}</p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {p.stack.map((id) => (
            <span key={id} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-[11px] text-muted">
              {getTool(id).name}
            </span>
          ))}
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-ink hover:brightness-110"
            >
              Visit live site ↗
            </a>
          )}
        </div>
      </header>

      <CaseMedia project={p} priority className="aspect-[16/9] rounded-2xl border border-line" />

      <div className="mt-6">
        {/* 2. Problem */}
        <Block n="01" title="Problem">
          <p className="max-w-3xl text-base leading-relaxed text-muted">{p.caseStudy.problem}</p>
        </Block>

        {/* 3. What I built */}
        <Block n="02" title="What I built">
          <ul className="grid gap-3 sm:grid-cols-2">
            {p.contributions.map((c) => (
              <li key={c} className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-[15px] leading-relaxed text-fg">
                <span aria-hidden="true" className="text-accent">
                  ✓
                </span>
                {c}
              </li>
            ))}
          </ul>
          {p.caseStudy.notes?.map((n) => (
            <p key={n} className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              {n}
            </p>
          ))}
        </Block>

        {p.slug === "credit-score-simulator" && (
          <Block n="demo" title="Try it: score simulator">
            <ScoreGaugeDemo />
          </Block>
        )}

        {/* 4. Architecture */}
        {flow && (
          <Block n="03" title="Architecture">
            <p className="mb-5 max-w-3xl text-sm text-muted">{flow.blurb}</p>
            {flow.steps ? (
              <FlowReplay flow={flow} />
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-line bg-ink/70 p-4 sm:p-6">
                <FlowCanvas flow={flow} idPrefix={`arch-${p.slug}`} complete className="min-w-[640px]" />
              </div>
            )}
          </Block>
        )}

        {/* 5. Results */}
        <Block n="04" title="Results">
          {p.results?.length ? (
            <ul className="grid gap-3 sm:grid-cols-3">
              {p.results.map((r) => (
                <li key={r} className="rounded-xl border border-accent/30 bg-accent/5 p-4 text-[15px] leading-relaxed text-fg">
                  {r}
                </li>
              ))}
            </ul>
          ) : (
            // No confirmed metrics yet — say what shipped instead of inventing numbers.
            // TODO(Joshua): add confirmed impact numbers for this project, if any.
            <p className="max-w-3xl text-base leading-relaxed text-muted">
              It&apos;s live in production{p.link ? ", and you can try it at the link above" : ""}. I don&apos;t have numbers I can share for this one yet.
            </p>
          )}
        </Block>

        {/* 6. Stack */}
        <Block n="05" title="Stack">
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((id) => {
              const t = getTool(id);
              return (
                <li key={id} className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-fg">
                  <span className="text-muted">
                    <ToolIconSvg icon={t.icon} />
                  </span>
                  {t.name}
                </li>
              );
            })}
          </ul>
        </Block>
      </div>

      {/* 7. Prev / next */}
      <nav aria-label="More case studies" className="mt-8 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        {[
          { p: prev, dir: "← Previous" },
          { p: next, dir: "Next →" },
        ].map(({ p: q, dir }) => (
          <Link
            key={dir}
            href={`/work/${q.slug}/`}
            className="group rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:last:text-right"
          >
            <span className="font-mono text-xs text-subtle">{dir}</span>
            <span className="mt-1 block font-semibold text-fg group-hover:text-accent">{q.title}</span>
          </Link>
        ))}
      </nav>
    </article>
  );
}
