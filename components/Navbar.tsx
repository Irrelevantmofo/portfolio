import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#automation-lab", label: "Automation" },
  { href: "/#toolbox", label: "Toolbox" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2 font-mono text-sm text-fg">
          <span className="grid size-8 place-items-center rounded-md border border-line-strong bg-surface font-semibold text-accent transition group-hover:border-accent">
            JF
          </span>
          <span className="hidden text-muted sm:inline">joshua.fabricante</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <TrackedLink
            href="/#contact"
            source="navbar-hire-me"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            Hire me
          </TrackedLink>

          {/* Zero-JS mobile menu */}
          <details className="group relative md:hidden">
            <summary
              className="grid size-9 cursor-pointer list-none place-items-center rounded-md border border-line text-muted [&::-webkit-details-marker]:hidden"
              aria-label="Menu"
            >
              <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 6h14M3 10h14M3 14h14" className="group-open:hidden" />
                <path d="M5 5l10 10M15 5 5 15" className="hidden group-open:block" />
              </svg>
            </summary>
            <ul className="absolute right-0 mt-2 w-48 rounded-lg border border-line bg-surface p-2 shadow-2xl">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-md px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
