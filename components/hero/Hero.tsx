import SystemGraph from "./SystemGraph";
import MagneticButton from "@/components/MagneticButton";
import CopyEmailButton from "@/components/CopyEmailButton";
import { asset } from "@/lib/asset";
import { links, person, stats } from "@/data/site";

const headline = "I build the web app — and the automations that run the business behind it.";

const secondaryBtn =
  "inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-fg/40 hover:bg-surface";

export default function Hero() {
  const words = headline.split(" ");
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_20%,transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 md:pt-16 lg:grid-cols-[1.25fr_1fr] lg:gap-10 lg:pb-20">
        <div>
          <p className="mb-4 font-mono text-xs tracking-wide text-accent">
            Full-Stack Engineer · Next.js · AI Automation
          </p>

          <h1
            id="hero-title"
            aria-label={headline}
            className="text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-fg"
          >
            {words.map((w, i) => (
              <span key={i} aria-hidden="true">
                <span className="word-rise" style={{ "--i": i } as React.CSSProperties}>
                  {w}
                </span>{" "}
              </span>
            ))}
          </h1>

          <p className="fade-up mt-6 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "350ms" } as React.CSSProperties}>
            {stats.years}+ years shipping production apps with React, Next.js, AWS Serverless and Supabase — plus
            n8n pipelines and AI agents that call leads, write content and sync your CRM.
          </p>

          <div className="fade-up mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "450ms" } as React.CSSProperties}>
            <MagneticButton
              href="#work"
              source="hero-see-work"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink hover:brightness-110"
            >
              See my work
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" />
              </svg>
            </MagneticButton>
            <CopyEmailButton source="hero-copy-email" className={secondaryBtn} />
            {links.resume && (
              <a href={asset(links.resume)} download className={secondaryBtn}>
                Download résumé
              </a>
            )}
          </div>

          <p
            className="fade-up mt-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 px-3 py-1.5 text-xs text-muted"
            style={{ "--d": "550ms" } as React.CSSProperties}
          >
            <span className="pulse-dot relative size-2 rounded-full bg-accent" aria-hidden="true" />
            {person.availability} · {person.timezone}
          </p>
        </div>

        <div className="fade-up relative" style={{ "--d": "200ms" } as React.CSSProperties}>
          <p className="mb-3 flex items-center justify-between font-mono text-[11px] text-subtle">
            <span>{"// a system I run in production"}</span>
            <span className="hidden sm:inline">hover a node · click to jump</span>
          </p>
          <SystemGraph />
        </div>
      </div>
    </section>
  );
}
