import Link from "next/link";
import { person } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          <span className="font-medium text-fg">{person.fullName}</span> · {person.location}
        </p>
        <p className="font-mono text-xs">
          Next.js 16 static export ·{" "}
          <Link href="/work/" className="underline decoration-line-strong underline-offset-4 hover:text-fg">
            all work
          </Link>{" "}
          ·{" "}
          <a
            href="https://github.com/Irrelevantmofo/portfolio"
            className="underline decoration-line-strong underline-offset-4 hover:text-fg"
          >
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
