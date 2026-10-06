import Counter from "@/components/Counter";
import LoadTimeBar from "@/components/LoadTimeBar";
import { shippedProjectCount } from "@/data/projects";
import { stats } from "@/data/site";

const items = [
  { value: stats.years, suffix: "+", label: "Years building for the web" },
  { value: shippedProjectCount, suffix: "", label: "Production projects shipped" },
  { value: stats.n8nWorkflows, suffix: "+", label: "n8n workflows built" },
  { value: stats.concurrentCalls, suffix: "", label: "Concurrent AI calls per batch" },
];

export default function ProofBar() {
  return (
    <section id="proof" aria-label="Proof in numbers" className="border-y border-line bg-surface/40">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1.35fr]">
        {items.map((s) => (
          <div key={s.label} className="flex flex-col-reverse gap-1 bg-ink px-5 py-7 sm:px-6">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="font-mono text-3xl font-medium text-fg sm:text-4xl">
              <Counter to={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
        <div className="col-span-2 flex flex-col-reverse gap-2 bg-ink px-5 py-7 sm:col-span-1 sm:px-6">
          <dt className="text-sm text-muted">Site load time rescued</dt>
          <dd>
            <LoadTimeBar before={stats.loadBefore} after={stats.loadAfter} />
          </dd>
        </div>
      </dl>
    </section>
  );
}
