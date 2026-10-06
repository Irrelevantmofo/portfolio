import Link from "next/link";
import ActivateOnInteract from "@/components/ActivateOnInteract";
import SectionHeading from "@/components/SectionHeading";

type CSSVars = React.CSSProperties & Record<`--${string}`, string>;

function WebAppsIllo() {
  return (
    <svg viewBox="0 0 160 96" className="illo h-24 w-full" aria-hidden="true">
      <rect x="8" y="6" width="144" height="84" rx="8" fill="var(--color-ink)" stroke="var(--color-line-strong)" />
      <path d="M8 22h144" stroke="var(--color-line)" />
      {[18, 26, 34].map((cx) => (
        <circle key={cx} cx={cx} cy="14" r="2.5" fill="var(--color-line-strong)" />
      ))}
      <rect x="20" y="32" width="64" height="8" rx="3" fill="var(--color-accent)" className="illo-fill" />
      {[
        [48, 112, 150],
        [60, 96, 300],
        [72, 120, 450],
      ].map(([y, w, d]) => (
        <rect
          key={y}
          x="20"
          y={y}
          width={w}
          height="5"
          rx="2.5"
          fill="var(--color-line-strong)"
          className="illo-fill"
          style={{ "--d": `${d}ms` } as CSSVars}
        />
      ))}
    </svg>
  );
}

function CloudIllo() {
  const cyl = (x: number, d: string) => (
    <g className="illo-blink" style={{ "--d": d } as CSSVars} key={x}>
      <path d={`M${x} 40v28c0 4 10 7 22 7s22-3 22-7V40`} fill="var(--color-surface-2)" stroke="var(--color-cyan)" />
      <ellipse cx={x + 22} cy="40" rx="22" ry="7" fill="var(--color-surface-2)" stroke="var(--color-cyan)" />
    </g>
  );
  return (
    <svg viewBox="0 0 160 96" className="illo h-24 w-full" aria-hidden="true">
      <path d="M50 48h20" stroke="var(--color-line-strong)" strokeDasharray="3 3" />
      <g className="illo-pulse" opacity="0.8">
        <circle cx="30" cy="48" r="20" fill="rgb(198 244 50 / 0.08)" stroke="var(--color-accent)" />
        <path d="M24 60 30 47M27 36h3l8 24" stroke="var(--color-accent)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
      {cyl(70, "0ms")}
      {cyl(114, "800ms")}
    </svg>
  );
}

function AutomationIllo() {
  return (
    <svg viewBox="0 0 160 96" className="illo h-24 w-full" aria-hidden="true">
      <path d="M38 48h30M92 48h30" stroke="var(--color-line-strong)" />
      {[14, 68, 122].map((x, i) => (
        <rect
          key={x}
          x={x}
          y="36"
          width="24"
          height="24"
          rx="6"
          fill="var(--color-surface-2)"
          stroke={i === 1 ? "var(--color-accent)" : "var(--color-line-strong)"}
        />
      ))}
      <circle
        cx="26"
        cy="48"
        r="4"
        fill="var(--color-accent)"
        className="illo-travel"
        style={{ "--dx1": "54px", "--dx2": "108px" } as CSSVars}
      />
    </svg>
  );
}

const pillars = [
  {
    title: "Web Apps",
    stack: "Next.js · React · TypeScript",
    body: "Production front ends and full-stack apps — CMS-driven corporate sites, SaaS portals and AI-powered tools that people actually use.",
    proof: [
      { href: "/work/credit-score-simulator/", label: "Credit Score Simulator" },
      { href: "/#more-work", label: "5 Next.js + Sanity sites" },
    ],
    Illo: WebAppsIllo,
  },
  {
    title: "Cloud Backends",
    stack: "AWS Serverless · Supabase · Postgres · Prisma · GraphQL",
    body: "APIs and data layers that scale without babysitting servers: Lambda + DynamoDB, Supabase auth/storage, typed GraphQL.",
    proof: [{ href: "/work/nessy-application/", label: "Nessy Cloud" }],
    Illo: CloudIllo,
  },
  {
    title: "AI & Automation",
    stack: "n8n · LLMs · Voice AI · CRM",
    body: "Pipelines that call leads, write content and keep the CRM in sync — with locks, retries and logs so they hold up in production.",
    proof: [
      { href: "/work/ai-dialer/", label: "AI Outbound Dialer" },
      { href: "/work/content-engine/", label: "Content Engine" },
    ],
    Illo: AutomationIllo,
  },
];

export default function Pillars() {
  return (
    <section id="what-i-build" aria-labelledby="what-i-build-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        index="01"
        eyebrow="What I build"
        id="what-i-build-title"
        title="One engineer for the app, the backend and the automations around it."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map(({ title, stack, body, proof, Illo }) => (
          <ActivateOnInteract
            key={title}
            className="group flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong data-active:border-line-strong"
          >
            <div className="mb-6 rounded-xl border border-line bg-ink/60 p-3">
              <Illo />
            </div>
            <h3 className="text-xl font-semibold text-fg">{title}</h3>
            <p className="mt-1 font-mono text-xs text-accent">{stack}</p>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{body}</p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {proof.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                    {p.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </ActivateOnInteract>
        ))}
      </div>
    </section>
  );
}
