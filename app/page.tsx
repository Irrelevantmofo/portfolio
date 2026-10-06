import PageViewTracker from "@/components/PageViewTracker";
import Hero from "@/components/hero/Hero";
import ProofBar from "@/components/ProofBar";
import Pillars from "@/components/Pillars";
import SectionHeading from "@/components/SectionHeading";
import CaseStudyCard from "@/components/work/CaseStudyCard";
import ProjectCard from "@/components/work/ProjectCard";
import WorkGrid from "@/components/work/WorkGrid";
import { ToolFilterProvider } from "@/components/work/ToolFilter";
import Toolbox from "@/components/toolbox/Toolbox";
import AutomationLab, { type LabFlow } from "@/components/AutomationLab";
import Timeline from "@/components/Timeline";
import ContactLinks from "@/components/ContactLinks";
import { featuredProjects, getProject, projects } from "@/data/projects";
import { labFlows } from "@/data/flows";
import { tools } from "@/data/tools";
import { person, stats, timeline } from "@/data/site";
import { asset } from "@/lib/asset";

const lab: LabFlow[] = labFlows.map((f) => {
  const p = getProject(f.projectSlug);
  return p?.featured
    ? { ...f, href: `/work/${p.slug}/`, hrefLabel: "Read the case study" }
    : { ...f, href: `/work/#${f.projectSlug}`, hrefLabel: "See the project" };
});

const toolNames = Object.fromEntries(tools.map((t) => [t.id, t.name]));

const facts = [
  { k: "Based in", v: "Iligan City, PH · UTC+8" }, // TODO(Joshua): note US-hours overlap availability
  { k: "Education", v: "Bachelor's degree, MSU-IIT" },
  { k: "English", v: "C2" },
  { k: "Looking for", v: "Full-time remote" },
];

export default function Home() {
  return (
    <>
      <PageViewTracker source="home-visit" />
      <Hero />
      <ProofBar />
      <Pillars />

      <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          index="02"
          eyebrow="Featured work"
          id="work-title"
          title="Four systems, start to finish."
          intro="Two production web apps and two automation systems — each with the problem, what I built, the architecture and the results."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((p, i) => (
            <CaseStudyCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      <section
        id="automation-lab"
        aria-labelledby="lab-title"
        className="relative border-y border-line bg-surface/30 py-24"
      >
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            index="03"
            eyebrow="Automation Lab"
            id="lab-title"
            title="Press run. Watch a real workflow execute."
            intro="Simplified, hand-built replays of n8n workflows I run in production — queues, locks, retry ladders and human-in-the-loop approvals. Demo data only."
          />
          <AutomationLab flows={lab} />
        </div>
      </section>

      <ToolFilterProvider>
        <section id="toolbox" aria-labelledby="toolbox-title" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
          <SectionHeading
            index="04"
            eyebrow="Toolbox"
            id="toolbox-title"
            title="Every tool, linked to the work that uses it."
          />
          <Toolbox />
        </section>

        <section id="more-work" aria-labelledby="more-work-title" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
          <SectionHeading index="05" eyebrow="More work" id="more-work-title" title="Sites, apps and automations." />
          <WorkGrid
            hideFeaturedByDefault
            toolNames={toolNames}
            items={projects.map((p) => ({
              slug: p.slug,
              kind: p.kind,
              featured: !!p.featured,
              stack: p.stack,
              card: <ProjectCard project={p} />,
            }))}
          />
        </section>
      </ToolFilterProvider>

      <section id="experience" aria-labelledby="experience-title" className="border-t border-line py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading index="06" eyebrow="Experience" id="experience-title" title="Where I've been building." />
          <Timeline entries={timeline} />
        </div>
      </section>

      <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading index="07" eyebrow="About" id="about-title" title="Rough idea in. Fast, reliable, measurable out." />
            <div className="space-y-4 text-base leading-relaxed text-muted">
              <p>
                I&apos;m Joshua, a full-stack engineer from Iligan City, Philippines, with an IT foundation from MSU-IIT
                and {stats.years}+ years building for the web.
              </p>
              <p>
                I&apos;ve shipped corporate sites and SaaS apps for agencies and international clients (largely in
                Germany), and today I build AI-powered tools and automation systems — from credit-analysis apps to
                voice-AI dialers — for a US credit &amp; business-funding firm.
              </p>
              <p>I like taking a rough idea or prototype and turning it into something fast, reliable and measurable.</p>
            </div>
          </div>
          <aside className="rounded-2xl border border-line bg-surface p-6">
            <div className="mb-6 flex items-center gap-4">
              <img
                src={asset("/images/profile.webp")}
                alt={`Portrait of ${person.name}`}
                width={400}
                height={400}
                loading="lazy"
                className="size-16 rounded-full object-cover ring-2 ring-line-strong"
              />
              <div>
                <p className="font-semibold text-fg">{person.fullName}</p>
                <p className="text-sm text-muted">{person.jobTitle}</p>
              </div>
            </div>
            <dl className="divide-y divide-line text-sm">
              {facts.map((f) => (
                <div key={f.k} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-subtle">{f.k}</dt>
                  <dd className="text-right text-fg">{f.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line">
        <div className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
          <p className="mb-4 font-mono text-xs text-accent" aria-hidden="true">
            {"// 08 — Contact"}
          </p>
          <h2 id="contact-title" className="mb-5 text-4xl font-semibold tracking-tight text-balance text-fg sm:text-5xl">
            Have an idea, prototype or slow system? Let&apos;s build it.
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-muted">
            {person.availability} · {person.timezone}.
          </p>
          <ContactLinks />
        </div>
      </section>
    </>
  );
}
