import type { ToolId } from "./tools";

export type ProjectKind = "web-app" | "website" | "automation";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudy {
  role: string;
  problem: string;
  /** Extra narrative bullets shown only on the case-study page. */
  notes?: string[];
}

export interface Project {
  slug: string; // old ids kept as slugs for stability
  title: string;
  kind: ProjectKind;
  featured?: boolean; // the 4 case studies
  wip?: boolean;
  client?: string; // "Credit CRB", "Agency client (DE)", "Personal"
  outcome: string; // one-line result
  summary: string;
  contributions: string[];
  results?: string[]; // only confirmed numbers
  stack: ToolId[];
  image?: ProjectImage; // automations render their flow diagram instead
  link?: string; // live URL (automations have none)
  flowId?: string; // data/flows.ts
  caseStudy?: CaseStudy;
}

const agencyDE = "Agency client (DE)";

const sanityContributions = [
  "Responsive frontend development and component architecture",
  "Content information architecture and Sanity CMS schema design",
  "Multi-language localization and internationalization (i18n)",
];

export const projects: Project[] = [
  // ── Featured case studies ────────────────────────────────────────────────
  {
    slug: "credit-score-simulator",
    title: "Credit Report Analyzer & Credit Score Simulator",
    kind: "web-app",
    featured: true,
    client: "Credit CRB",
    outcome: "Turns a raw credit report PDF into a personalized roadmap to a 700+ score.",
    summary:
      "An AI-powered platform that parses credit report PDFs, extracts key metrics, powers an interactive credit score simulator, and generates personalized roadmaps to reach a 700+ credit score.",
    contributions: [
      "PDF ingestion and parsing, with AI metric extraction via OpenRouter",
      "An interactive score simulator",
      "Personalized roadmap generation",
      "GoHighLevel lead capture and automation",
      "Full-stack build on Next.js and Supabase (auth, database, storage)",
    ],
    stack: ["nextjs", "react", "supabase", "postgresql", "openrouter", "prompt-engineering", "gohighlevel"],
    image: {
      src: "/images/Credit-score-simulator.webp",
      alt: "Credit Score Simulator showing a score gauge and recommended actions",
      width: 1600,
      height: 815,
    },
    link: "https://creditcrb.com/identityIQ-credit-simulator/",
    flowId: "credit-analyzer",
    caseStudy: {
      role: "Full-stack developer",
      problem:
        "A credit report is a dense PDF most people can't act on. Credit CRB needed a tool that reads the report for the visitor, shows what each fix would do to their score, and hands the sales team a qualified lead.",
    },
  },
  {
    slug: "nessy-application",
    title: "Nessy Cloud",
    kind: "web-app",
    featured: true,
    client: agencyDE,
    outcome: "A cloud SaaS portal on Next.js and GraphQL, backed by serverless functions on AWS.",
    summary: "Cloud-based SaaS application built with Next.js, GraphQL and Prisma on an AWS Serverless backend.",
    contributions: [
      "Full-stack feature development and system architecture design",
      "REST API integration and third-party service connectivity",
      "Headless CMS features and content management implementation",
      // TODO(Joshua): replace with one concrete bullet — which functions/jobs ran on Lambda.
      "Serverless backend on AWS (Lambda, DynamoDB)",
    ],
    // TODO(Joshua): confirm the exact AWS services (API Gateway? S3? SQS? Cognito?).
    stack: ["nextjs", "react", "graphql", "prisma", "aws-lambda", "dynamodb", "webhooks"],
    image: {
      src: "/images/nessy.webp",
      alt: "Nessy Cloud portal login and dashboard",
      width: 1600,
      height: 813,
    },
    link: "https://portal.nessycloud.de",
    flowId: "nessy",
    caseStudy: {
      role: "Full-stack developer",
      problem:
        "A SaaS portal for German customers needed new product features shipped on a typed GraphQL API, with backend work running on serverless AWS instead of always-on servers.",
    },
  },
  {
    slug: "content-engine",
    title: "Content Repurposing Engine",
    kind: "automation",
    featured: true,
    client: "Credit CRB",
    outcome:
      "One source video or PDF in → a full set of blog, article and social drafts out, each with one-click approve/reject.",
    summary:
      "An n8n system that turns one long-form source into a reviewed, versioned set of channel-ready drafts, then generates hero images and queues them for publishing once approved.",
    contributions: [
      "A 71-node intake-to-generation workflow: form upload → text extraction → AI fact extraction → master content → per-asset generation",
      "A validation retry ladder of up to 3 attempts per asset",
      "Each draft is emailed with its own Approve / Reject links",
      "Client revisions by replying to the email — a Gmail trigger regenerates and versions the draft",
      "Approval triggers a second workflow for hero-image generation and the publish queue",
      "Idempotency: a draft_id (job__type__seq) join key prevents double approvals",
    ],
    results: [
      "71-node intake-to-generation workflow",
      "Up to 3 validation attempts per asset before a human sees it",
    ],
    stack: ["n8n", "openrouter", "prompt-engineering", "google-apis", "webhooks"],
    flowId: "content-engine",
    caseStudy: {
      role: "Automation engineer · design & build",
      problem:
        "Every webinar, video and PDF the company produced held material for a dozen posts, but turning it into blog, article and social drafts took hours of manual writing and back-and-forth review.",
      notes: [
        "A video-to-blog variant repurposes the company's YouTube videos into Facebook, LinkedIn and Instagram posts, varying text and CTAs to avoid platform flagging.",
      ],
    },
  },
  {
    slug: "ai-dialer",
    title: "AI Outbound Dialer",
    kind: "automation",
    featured: true,
    client: "Credit CRB",
    outcome: "Tag a list in the CRM → an AI voice agent calls every lead, 50 at a time, and logs every outcome.",
    summary:
      "An n8n + Telnyx dialer that drains a GoHighLevel-fed queue in concurrent batches, with a distributed lock, call polling and per-lead outcome logging.",
    contributions: [
      "GoHighLevel webhook intake into a queue table",
      "A debounce plus a distributed lock, so only one dialer run happens at a time",
      "Batches of 50 concurrent AI calls with premium answering-machine detection",
      "Polls active calls every 30s and starts the next batch only when the current one finishes",
      "A status webhook records the outcome and duration for every lead",
      "Error rows are captured without halting the run",
    ],
    results: [
      "50 concurrent AI calls per batch",
      "Active calls polled every 30s; next batch starts only when the line is clear",
      "Number warm-up ramp: 50 → 100 → 250 → 500 → 1k → 2k calls/day",
    ],
    stack: ["n8n", "telnyx", "gohighlevel", "webhooks"],
    flowId: "ai-dialer",
    caseStudy: {
      role: "Automation engineer · design & build",
      problem:
        "Sales had lists of leads in the CRM and not enough hours to call them. The dialer had to call everyone, never double-dial, survive errors, and protect the phone numbers' reputation.",
      notes: [
        "Planned a call ramp-up to warm new numbers (50 → 100 → 250 → 500 → 1k → 2k/day), so carriers don't flag them as spam.",
      ],
    },
  },

  // ── Web apps & websites ─────────────────────────────────────────────────
  {
    slug: "business-loan-analyzer",
    title: "Business Loan Analyzer Tool",
    kind: "web-app",
    client: "Credit CRB",
    outcome: "Matches a business with the loan offers it actually qualifies for.",
    summary:
      "An AI-powered tool that accepts business inputs and evaluates qualification criteria to automatically match users with eligible business loan offers.",
    contributions: [
      "Full-stack development with Next.js and Supabase (auth, database, storage)",
      "AI-driven qualification and loan-matching logic via OpenRouter",
      "GoHighLevel CRM integration for lead capture and automation",
    ],
    stack: ["nextjs", "react", "supabase", "postgresql", "openrouter", "gohighlevel"],
    image: {
      src: "/images/business-loan-analyzer.webp",
      alt: "Business Loan Analyzer intake form",
      width: 1600,
      height: 812,
    },
    link: "https://creditcrb.com/business-loan-analyzer/",
  },
  {
    slug: "danaher-website",
    title: "Danaher Website",
    kind: "website",
    client: agencyDE,
    outcome: "Multilingual corporate site on Next.js and Sanity.",
    summary: "Corporate website built with Next.js and the Sanity headless CMS.",
    contributions: sanityContributions,
    stack: ["nextjs", "react", "sanity", "i18n"],
    image: { src: "/images/danaher.webp", alt: "Danaher website homepage", width: 1600, height: 819 },
    link: "https://danahercn.com",
  },
  {
    slug: "dfkgruppe-website",
    title: "DFK Group Website",
    kind: "website",
    client: agencyDE,
    outcome: "Multilingual professional-services site on Next.js and Sanity.",
    summary: "Professional services company website using Next.js and Sanity CMS.",
    contributions: sanityContributions,
    stack: ["nextjs", "react", "sanity", "i18n"],
    image: { src: "/images/dfkgruppe.webp", alt: "DFK Group website homepage", width: 1600, height: 820 },
    link: "https://dfkgroup.de",
  },
  {
    slug: "vitacore-website",
    title: "Vita Core Website",
    kind: "website",
    client: agencyDE,
    outcome: "Recruitment and consulting site on Next.js and Sanity.",
    summary: "A specialized recruitment agency and consulting firm website using Next.js and Sanity CMS.",
    contributions: sanityContributions,
    stack: ["nextjs", "react", "sanity", "i18n"],
    image: { src: "/images/vitacore.webp", alt: "Vita Core website homepage", width: 1600, height: 821 },
    link: "https://vita-core.de",
  },
  {
    slug: "fap-web-website",
    title: "First Automotive Parts Website",
    kind: "website",
    client: agencyDE,
    outcome: "Automotive parts company site on Next.js and Sanity.",
    summary: "An automotive parts company website using Next.js and Sanity CMS.",
    contributions: sanityContributions,
    stack: ["nextjs", "react", "sanity", "i18n", "vercel"],
    image: { src: "/images/fap-web.webp", alt: "First Automotive Parts website homepage", width: 1600, height: 820 },
    link: "https://fap-web-theta.vercel.app",
  },
  {
    slug: "tourismus-damp-website",
    title: "Tourismus Damp Website",
    kind: "website",
    client: agencyDE,
    outcome: "Tourism site for a Baltic Sea resort town, on Next.js and Sanity.",
    summary:
      "A tourism website for the Baltic Sea resort town of Damp and the surrounding region, using Next.js and Sanity CMS.",
    contributions: sanityContributions,
    stack: ["nextjs", "react", "sanity", "i18n"],
    image: {
      src: "/images/tourismus-damp.webp",
      alt: "Tourismus Damp website homepage",
      width: 1600,
      height: 821,
    },
    link: "https://tourismus-damp.de",
  },
  {
    slug: "sobriety-hub",
    title: "Sobriety Hub",
    kind: "web-app",
    outcome: "Recovery support platform front end on Next.js.",
    summary: "A recovery support platform built with Next.js.",
    contributions: [
      "Frontend development with Next.js",
      "Component architecture and design system implementation",
      "Performance optimization",
    ],
    stack: ["nextjs", "react"],
    image: { src: "/images/sobriety-hub.webp", alt: "Sobriety Hub logo", width: 400, height: 133 },
    link: "https://www.sobrietyhub.com",
  },
  {
    slug: "lender-marketplace-landing",
    title: "Lender Marketplace Landing Page",
    kind: "website",
    outcome: "Lead-capture landing page wired straight into GoHighLevel.",
    summary: "A marketing landing page for a lender marketplace, built with Next.js and integrated with GoHighLevel.",
    contributions: [
      "Responsive landing page development with Next.js",
      "GoHighLevel integration for lead capture and automation",
    ],
    stack: ["nextjs", "react", "gohighlevel", "vercel"],
    image: {
      src: "/images/35-lenders-marketplace.webp",
      alt: "Lender marketplace landing page hero",
      width: 1600,
      height: 817,
    },
    link: "https://lender-marketplace-landing-page.vercel.app",
  },
  {
    slug: "caimandata-application",
    title: "Caimandata",
    kind: "web-app",
    outcome: "Data analytics platform with automated ETL on Laravel.",
    summary: "Data analytics platform built on a Laravel backend.",
    contributions: [
      "Full-stack feature development and UI/UX implementation",
      "Data integration and automated ETL pipeline development",
      "Advanced data processing and analytics algorithm implementation",
    ],
    stack: ["laravel"],
    image: { src: "/images/CaimanMainLogo-white.webp", alt: "Caimandata logo", width: 1600, height: 400 },
    link: "https://caimandata.com",
  },
  {
    slug: "veronica-robles",
    title: "Veronica Robles",
    kind: "website",
    outcome: "Professional portfolio and services site on WordPress.",
    summary: "Professional portfolio and services website.",
    contributions: ["WordPress theme customization", "Plugin integration and configuration"],
    stack: ["wordpress"],
    image: { src: "/images/veronica.webp", alt: "Veronica Robles website homepage", width: 1600, height: 777 },
    link: "https://veronicarobles.com",
  },
  {
    slug: "iligan-car-rentals",
    title: "Iligan Car Rentals",
    kind: "web-app",
    wip: true,
    client: "Personal",
    outcome: "Hobby car-rental platform exploring Next.js, MUI and Supabase.",
    summary:
      "A car rental platform for Iligan City — a personal hobby project exploring Next.js with Material UI and Supabase as the backend and database.",
    contributions: [
      "Full-stack development with Next.js and Supabase (auth, database, storage)",
      "UI implementation using the Material UI (MUI) component library",
      "Car listing, booking flow, and availability management",
    ],
    stack: ["nextjs", "react", "mui", "supabase", "postgresql", "vercel"],
    image: { src: "/images/car-rental-app.webp", alt: "Iligan Car Rentals listing page", width: 1600, height: 822 },
    link: "https://car-rental-app-rose-two.vercel.app",
  },

  // ── Automations & other work ────────────────────────────────────────────
  {
    slug: "podcast-outreach",
    title: "Podcast Outreach System",
    kind: "automation",
    client: "Credit CRB",
    outcome: "Pitches 129 fit-ranked podcasts on autopilot and flags the ones that say yes.",
    summary:
      "A weekday sender with +4d and +6d follow-ups, a reply/bounce watcher, GoHighLevel tagging and tasks, and alerts on interested replies.",
    contributions: [
      "Weekday sender with +4 day and +6 day follow-ups",
      "Reply / bounce watcher that classifies responses",
      "GoHighLevel tagging and task creation",
      "Owner alerts on interested replies",
      "Outreach list of 129 shows, ranked by fit",
    ],
    stack: ["n8n", "gohighlevel", "google-apis"],
    flowId: "podcast-outreach",
  },
  {
    slug: "ai-video-pipeline",
    title: "AI Video & Asset Pipeline",
    kind: "automation",
    client: "Credit CRB",
    outcome: "Generated stills and clips, quality-gated by AI vision, assembled into voiced videos.",
    summary:
      "Higgsfield stills pass a fail-closed Claude vision rules check and are auto-tagged into a clip library, then assembled with Json2Video and ElevenLabs voiceover.",
    contributions: [
      "Claude vision “fail-closed” rules check on generated stills (no lettering, logos or cartoons)",
      "Auto-tagging into a reusable clip library",
      "Json2Video assembly with ElevenLabs voiceover",
      "Tested Kling and Minimax video models",
    ],
    stack: ["higgsfield", "claude", "json2video", "elevenlabs", "kling", "minimax"],
  },
  {
    slug: "site-performance-rescue",
    title: "Website Performance Rescue",
    kind: "website",
    client: "Credit CRB",
    outcome: "creditcrb.com load time cut from ~11s to 2–3s.",
    summary: "Audited the company site and removed about 20 unused plugins.",
    contributions: ["Performance audit of creditcrb.com", "Removed ~20 unused plugins"],
    results: ["Load time ~11s → 2–3s"],
    // TODO(Joshua): confirm the platform (WordPress?) so the right tool can be linked.
    stack: [],
    link: "https://creditcrb.com",
  },
  {
    slug: "ops-automations",
    title: "Ops Automations",
    kind: "automation",
    client: "Credit CRB",
    outcome: "Small automations that take daily admin off the team's plate.",
    summary:
      "A Telegram AI agent, Fathom meeting notes → Gmail, a document-upload intake flow, and outbound-call booking and logging.",
    contributions: [
      "Telegram AI agent",
      "Fathom meeting notes delivered to Gmail",
      "Document-upload intake flow",
      "Outbound-call booking and logging",
    ],
    stack: ["n8n", "telegram", "google-apis", "webhooks"],
  },
  {
    slug: "this-portfolio",
    title: "This site",
    kind: "web-app",
    client: "Personal",
    outcome: "Next 16 static export, CI to GitHub Pages, and n8n → Telegram visit alerts.",
    summary:
      "The portfolio you're reading: a statically exported Next.js 16 site deployed by GitHub Actions, with an n8n webhook that pings Telegram on visits and contact clicks.",
    contributions: [
      "Next.js 16 App Router static export with Tailwind v4",
      "GitHub Actions: lint, type-check, build and deploy to Pages",
      "n8n webhook → Telegram visit and contact-click alerts",
      "Hand-built SVG workflow replays — no diagram library",
    ],
    stack: ["nextjs", "react", "typescript", "tailwind", "github-actions", "n8n", "telegram", "webhooks"],
    link: "https://github.com/Irrelevantmofo/portfolio",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Proof-bar count: client web projects that are live. Excludes automations,
 * personal/WIP work and the performance audit (not a new build).
 */
export const shippedProjectCount = projects.filter(
  (p) => p.kind !== "automation" && p.client !== "Personal" && p.slug !== "site-performance-rescue",
).length;

export const kindLabel: Record<ProjectKind, string> = {
  "web-app": "Web app",
  website: "Website",
  automation: "Automation",
};
