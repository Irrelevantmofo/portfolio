"use client";

import CopyEmailButton from "@/components/CopyEmailButton";
import { notify } from "@/lib/notify";
import { asset } from "@/lib/asset";
import { links, person } from "@/data/site";

const btn =
  "inline-flex items-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-fg/40 hover:bg-surface";

export default function ContactLinks() {
  const track = (channel: string) => () => notify(`contact-click:${channel}`);
  const channels = [
    { id: "linkedin", label: "LinkedIn", href: links.linkedin },
    { id: "onlinejobs", label: "OnlineJobs.ph profile", href: links.onlinejobs },
    { id: "github", label: "GitHub", href: links.github },
    links.booking && { id: "booking", label: "Book a call", href: links.booking },
  ].filter(Boolean) as { id: string; label: string; href: string }[];

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <a
        href={`mailto:${person.email}`}
        onClick={track("email")}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink hover:brightness-110"
      >
        Email me
      </a>
      <CopyEmailButton source="contact-click:copy-email" className={btn} />
      {channels.map((c) => (
        <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer" onClick={track(c.id)} className={btn}>
          {c.label} ↗
        </a>
      ))}
      {links.resume && (
        <a href={asset(links.resume)} download onClick={track("resume")} className={btn}>
          Résumé (PDF)
        </a>
      )}
    </div>
  );
}
