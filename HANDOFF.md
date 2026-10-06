# Portfolio Redesign: Handoff

**Owner:** Joshua Irving B. Fabricante
**Repo:** `github.com/Irrelevantmofo/portfolio` (branch `main`)
**Live:** https://irrelevantmofo.github.io/portfolio/
**Updated:** 2026-10-07

This picks up from the original redesign brief. It covers what shipped, where things live, which
decisions changed from the brief and why, the rules to keep following, and what's still open.

---

## 1. Status

| | |
|---|---|
| Live on Pages | Commit `9b142e0`, "Redesigns portfolio around web apps + AI automation" |
| Pending (uncommitted) | Copy pass: no em dashes, less AI-sounding wording, new OG image text |
| CI | Lint, type-check and build on every push and PR. Deploys only on pushes to `main` |
| Browser checks | 31/31 passing (headless Chrome, see §7) |
| Lighthouse mobile | Perf 93 to 96, Accessibility 100, Best Practices 100, SEO 100 on every page |
| First-load JS on `/` | 154.9 KB gz (budget 180 KB) |

---

## 2. What's on the site

**Home (`/`)**, in order: hero with live system graph, proof bar, three "what I build" pillars,
four featured case studies, Automation Lab (three workflow replays), Toolbox, filterable project
grid, experience timeline, about, contact.

**Other routes**
- `/work/`: every project, filterable by type and by tool
- `/work/[slug]/`: case studies for `credit-score-simulator`, `nessy-application`,
  `content-engine`, `ai-dialer`
- `/projects/`: static redirect to `/work/` (old links from OnlineJobs.ph keep working)
- `sitemap.xml`, `robots.txt`, `og.png`, JSON-LD `Person` in the layout

---

## 3. Where things live

| Path | What |
|---|---|
| `data/projects.ts` | Every project. `featured: true` + `caseStudy` makes a case-study page |
| `data/tools.ts` | Tool registry. "Used in" is derived from each project's `stack`, never typed by hand |
| `data/flows.ts` | Workflow diagrams and replay steps. **Demo data only** |
| `data/site.ts` | Contact links, stats, timeline, canonical URL |
| `components/hero/` | System graph (server wrapper + small client canvas) |
| `components/flow/` | `FlowCanvas` (static, no hooks) and `FlowReplay` (Run button, packet, log) |
| `components/work/` | Case-study card, project card, filterable grid, shared tool filter |
| `lib/hooks.ts` | Native `useInViewOnce`, `usePrefersReducedMotion`, `useScrollProgress` |
| `lib/icon-registry.mjs` | Tool icons. Build writes them to `public/icons.svg` (git-ignored) |
| `lib/asset.ts` | `asset()` adds the `/portfolio` basePath; `screenshotSrcSet()` for 800px variants |
| `scripts/` | Image optimizer, thumbnail maker, OG image, icon sprite, JS size check |

To add a project, add an entry to `data/projects.ts`, put a 1600px WebP in `public/images/`, and
run `node scripts/make-thumbs.mjs`. Tools and counts update on their own.

---

## 4. Decisions that differ from the original brief

1. **Motion is only used in the score-gauge demo, loaded lazily.** Motion's layout animation for the
   project grid cost about 40 KB gz, more than the space left in the 180 KB budget. The grid
   reflow is a hand-written FLIP animation using the Web Animations API. In-view, reduced-motion
   and scroll progress use small native hooks.
2. **LCP target of under 2.0s is not reachable on this stack.** Lighthouse's simulated mobile LCP
   is 2.8 to 3.2s. A nearly empty Next 16 page measures 2.5s under the same throttling, so the
   framework alone takes most of the budget. Observed LCP on a normal connection is about 0.4s.
   The headline never starts fully transparent, so it counts as painted on first render.
3. **"Production projects shipped" shows 12, not 14.** The original data had 13 projects and one
   is a WIP hobby app. The number is computed from `data/projects.ts`.
4. **Tool links are conservative.** Telnyx links only to the AI dialer. GoHighLevel and the Google
   APIs link only where a project's own stack lists them.
5. **Workflow replays autoplay once** when the Automation Lab first scrolls into view, and on each
   tab switch. Case-study pages never autoplay.
6. **Icons are an SVG sprite** (`public/icons.svg`) instead of inline paths. That halved the home
   page HTML (80 KB to 42 KB gz).
7. **Not built (optional in the brief):** the ⌘K command palette and scroll-scrubbed replays.

---

## 5. Rules to keep following

**Confidentiality**
- Credit CRB may be named. Never add Credit CRB's customers, staff names, phone numbers, webhook
  URLs, workspace URLs, assistant IDs or API endpoints anywhere in the repo or site.
- **Do not name Evelan GmbH anywhere.** Joshua still works there. The agency years appear as
  "Agency work (Germany)", and nothing on the site should state that he works for both Evelan and
  Credit CRB.
- Flow replays (`data/flows.ts`) use made-up numbers and names only.

**Résumé**
- Buttons appear automatically when `public/resume.pdf` exists (`next.config.ts` checks at build).
- The PDF is public and stays in git history. It must not contain a phone number or home address.
- If the résumé names both Evelan and Credit CRB, it undoes the rule above. Check before adding it.

**Copy style**
- No em dashes in anything visitors can read: site copy, metadata, OG image, README.
- Avoid wording that reads as AI-written: arrow chains inside sentences, slogan fragments
  ("X in. Y out."), filler ("that people actually use"), padded lists of three.
- En dashes in number ranges (2019 – 2021, 2–3s) are fine.

**Commits**
- No `Co-Authored-By` lines or any Claude attribution in commits or PR descriptions.

**Technical**
- Static export only: no server routes, no ISR, no runtime image optimization.
- Use `asset()` for any raw `<img>` or `<a>` to a file in `public/`. `next/link` handles routes.
- Animate `transform` and `opacity` only, and give every animation a reduced-motion final state.

---

## 6. Open items for Joshua

Each one is a `TODO(Joshua)` in the code. The site hides or softens anything that's unset.

| Item | Where |
|---|---|
| Cleaned résumé PDF (no phone or address) | drop at `public/resume.pdf` |
| Which project used Stripe, if any | `data/tools.ts:75` |
| Exact AWS services for Nessy Cloud | `data/projects.ts:93` |
| One concrete Lambda bullet for Nessy Cloud | `data/projects.ts:90` |
| Confirm the Nessy architecture diagram | `data/flows.ts:214` |
| Results numbers for the credit and Nessy case studies | `app/work/[slug]/page.tsx:154` |
| Is `joshuafabricante.com` owned? (else stay on Pages) | `data/site.ts:4` |
| Confirm the "90+ n8n workflows" stat | `data/site.ts:34` |
| Keep or drop X, Facebook, Instagram (currently dropped) | `data/site.ts:27` |
| Booking link, if any | `data/site.ts:25` |
| Platform for the creditcrb.com speed rescue | `data/projects.ts:388` |
| US-hours overlap availability | `app/page.tsx:30` |
| Timeline: both recent roles say "present", so the overlap is visible | `data/site.ts` (`timeline`) |

---

## 7. Operations

**GitHub settings**
- Add a `NOTIFY_WEBHOOK_URL` repository secret. Without it, `notify()` does nothing and no visit
  alerts reach Telegram.
- GitHub warns that the workflow's actions target Node 20, which is deprecated. Bump the action
  versions and `node-version` in `.github/workflows/deploy.yml`.
- `ubuntu-latest` moves to Ubuntu 26 from 2026-10-19. No change expected, but watch the first run.

**Local development**
- `npm run dev` runs without the basePath. `npm run build` exports to `out/` with `/portfolio`.
- Building on Windows: Next 16.2 writes route-segment prefetch files as nested folders, so
  prefetches 404 locally. Navigation still works, and the Linux CI build is correct.

**How it was verified** (tools were run outside the repo, not committed)
- Served `out/` under `/portfolio` with gzip, the way GitHub Pages does.
- Headless Chrome (puppeteer-core) checked: replay autoplay and completion, keyboard tabs, retry
  ladder, tool filtering (AWS Lambda shows only Nessy Cloud, Stripe shows the "no public project"
  note), counters, copy-email toast, hero node links, one `h1` per page, no horizontal overflow on
  desktop or a 375px phone, every internal link and asset under `/portfolio`, the `/projects`
  redirect, and the reduced-motion state of every animation.
- Lighthouse mobile on every route.
- `node scripts/measure-js.mjs out/index.html` reports first-load JS against the 180 KB budget.

---

## 8. Original acceptance criteria

| Criterion | Status |
|---|---|
| Static `out/` works under `/portfolio`, all links and assets resolve | Done |
| All original projects plus automation entries render; 4 case-study pages exist | Done |
| Every tool appears; clicking filters projects; AWS links to Nessy Cloud | Done |
| Hero graph, counters, 3 replays and timeline animate, with correct reduced-motion state | Done |
| No phone numbers, webhook URLs, IDs, customer or staff names in repo or site | Done |
| `notify()` fires when configured, no-ops when unset; deploy skips PRs | Done (secret not yet added) |
| Lighthouse mobile ≥90 Perf, ≥95 others; JS budget met | Done. LCP under 2.0s not reachable (see §4) |
| Remaining `TODO(Joshua)` items listed | See §6 |
