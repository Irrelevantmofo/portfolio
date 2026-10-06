import type { Metadata } from "next";
import PageViewTracker from "@/components/PageViewTracker";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/work/ProjectCard";
import WorkGrid from "@/components/work/WorkGrid";
import { ToolFilterProvider } from "@/components/work/ToolFilter";
import { projects } from "@/data/projects";
import { tools, usedIn } from "@/data/tools";

export const metadata: Metadata = {
  title: "All work",
  description:
    "Every project: Next.js web apps, Sanity corporate sites, AWS Serverless SaaS and n8n / AI automation systems — filterable by stack.",
  alternates: { canonical: "work/" },
};

const toolNames = Object.fromEntries(tools.map((t) => [t.id, t.name]));
const toolOptions = tools
  .filter((t) => usedIn(t.id, projects).length > 0)
  .map((t) => ({ id: t.id, name: t.name }))
  .sort((a, b) => a.name.localeCompare(b.name));

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <PageViewTracker source="work-visit" />
      <SectionHeading
        as="h1"
        index="—"
        eyebrow="All work"
        title="Everything I've shipped."
        intro="Web apps, websites and automation systems for agencies, clients and Credit CRB. Filter by type or by tool."
      />
      <h2 className="sr-only">Projects</h2>
      <ToolFilterProvider>
        <WorkGrid
          toolNames={toolNames}
          toolOptions={toolOptions}
          items={projects.map((p, i) => ({
            slug: p.slug,
            kind: p.kind,
            featured: !!p.featured,
            stack: p.stack,
            card: <ProjectCard project={p} eager={i < 3} />,
          }))}
        />
      </ToolFilterProvider>
    </div>
  );
}
