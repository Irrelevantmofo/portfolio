import clsx from "clsx";
import { toolCategories, tools, usedIn, type ToolCategory } from "@/data/tools";
import { projects } from "@/data/projects";
import { ToolIconSvg, iconColor } from "@/lib/icons";
import ToolChip from "./ToolChip";

// Bento spans on the 4-column desktop grid.
const span: Partial<Record<ToolCategory, string>> = {
  Frontend: "lg:col-span-2",
  "Backend & data": "lg:col-span-2",
  Automation: "lg:col-span-2",
  "Voice & media AI": "lg:col-span-2",
};

export default function Toolbox() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {toolCategories.map((cat) => {
        const inCat = tools.filter((t) => t.category === cat);
        return (
          <section
            key={cat}
            aria-label={cat}
            className={clsx("rounded-2xl border border-line bg-surface p-4", span[cat])}
          >
            <h3 className="mb-3 font-mono text-xs text-subtle">{cat}</h3>
            <div className="flex flex-wrap gap-1.5">
              {inCat.map((t) => (
                <ToolChip
                  key={t.id}
                  id={t.id}
                  name={t.name}
                  note={"note" in t ? t.note : undefined}
                  color={iconColor(t.icon)}
                  count={usedIn(t.id, projects).length}
                  icon={<ToolIconSvg icon={t.icon} className="size-4" />}
                />
              ))}
            </div>
          </section>
        );
      })}
      <div className="flex items-center rounded-2xl border border-dashed border-line-strong p-4 text-sm text-muted sm:col-span-2">
        <p>
          <span className="font-mono text-accent">tip:</span> click any tool to filter the projects below to the ones
          that use it. Numbers are project counts; tools without a public project yet are marked{" "}
          <em>in production use</em>.
        </p>
      </div>
    </div>
  );
}
