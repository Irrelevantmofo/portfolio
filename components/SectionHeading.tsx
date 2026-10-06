import type { ReactNode } from "react";

interface SectionHeadingProps {
  index?: string; // "03"
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  as?: "h1" | "h2";
}

export default function SectionHeading({ index, eyebrow, title, intro, id, as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 font-mono text-xs tracking-wide text-accent" aria-hidden="true">
        {index ? `// ${index} · ${eyebrow}` : `// ${eyebrow}`}
      </p>
      <Tag
        id={id}
        className={
          Tag === "h1"
            ? "text-4xl font-semibold tracking-tight text-balance text-fg sm:text-5xl"
            : "text-3xl font-semibold tracking-tight text-balance text-fg sm:text-4xl"
        }
      >
        {title}
      </Tag>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
