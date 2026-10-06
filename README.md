# Joshua Fabricante — Portfolio

Full-stack Next.js engineer who builds production web apps **and** the AI automation systems around them.

**Live:** https://irrelevantmofo.github.io/portfolio/

## Stack

- Next.js 16 (App Router) with `output: "export"` — fully static, deployed to GitHub Pages
- React 19, TypeScript, Tailwind CSS v4 (tokens in `app/globals.css`)
- Animations: CSS + SVG first, plain Web APIs (IntersectionObserver, WAAPI) for interaction;
  Motion is loaded lazily, only for the score-gauge demo
- No diagram library — the hero graph and the Automation Lab replays are hand-built SVG

## Where things live

| Path | What |
|---|---|
| `data/projects.ts` | Every project, incl. case-study copy (`featured`, `caseStudy`) |
| `data/tools.ts` | Tool registry; "used in" is derived from each project's `stack` |
| `data/flows.ts` | Workflow diagrams + replay steps (**demo data only**) |
| `data/site.ts` | Contact links, stats, timeline — `TODO(Joshua)` items live here |
| `components/hero/` | Live system graph |
| `components/flow/` | `FlowCanvas` (static diagram) + `FlowReplay` (Run button, log) |
| `app/work/[slug]/` | Case-study pages (one per featured project) |
| `lib/icon-registry.mjs` | Tool icons → `public/icons.svg` sprite (generated, git-ignored) |

## Scripts

```bash
npm run dev            # localhost:3000 (no basePath in dev)
npm run build          # static export to out/ (basePath /portfolio)
npm run lint
npm run typecheck
npm run optimize-images            # PNG/JPG in public/images → ≤1600px WebP
node scripts/make-thumbs.mjs       # 800px variants for srcset
node scripts/make-og.mjs           # regenerate public/og.png
```

## Résumé

Drop the PDF at `public/resume.pdf` and rebuild — the "Download résumé" buttons appear
automatically (`next.config.ts` checks for the file). It's publicly downloadable and stays in git
history, so export it **without** phone number or home address.

## Visit notifications

`lib/notify.ts` pings an n8n webhook (→ Telegram) on visits and contact clicks. The URL comes
from `NEXT_PUBLIC_NOTIFY_WEBHOOK_URL`, injected in CI from the `NOTIFY_WEBHOOK_URL` repository
secret. When it's unset (local dev, forks), `notify()` does nothing. Never commit the URL.

## Deploy

`.github/workflows/deploy.yml` lints, type-checks and builds on every push and PR; only pushes to
`main` deploy to Pages.

> Building on Windows: Next 16.2 writes route-segment prefetch files as nested folders there, so
> client prefetches 404 locally (navigation still works). CI builds on Linux, where they're correct.
