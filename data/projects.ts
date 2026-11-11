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
  featured?: boolean; // the case studies
  inGrid?: boolean; // featured, but also listed in the home "More projects" grid
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
    inGrid: true, // sits next to its sibling, the business loan analyzer
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
    slug: "referral-partner-program",
    title: "Referral Partner Program",
    kind: "web-app",
    client: "Credit CRB",
    outcome: "Partners sign up in about a minute, send in business owners they have talked to, and follow every deal and commission from their own account.",
    summary:
      "A standalone Next.js and Supabase app for Credit CRB's referral partners: a landing page, signup confirmed by a texted code, a partner account with deal stages and commission statements, and a staff page. Referrals become deals in a GoHighLevel pipeline and their stage syncs back to the partner.",
    contributions: [
      "Signup confirmed by a 6 digit code sent by SMS through GoHighLevel, passwords checked against leaked password lists, and a personal partner ID and referral link",
      "Two tier commissions: partners earn on the businesses they send and a share on businesses sent by partners they recruited, shown as a printable monthly statement",
      "Every referral becomes a GoHighLevel contact and deal. When staff move the deal, a webhook nudges the app, which reads the real stage back from the GHL API, so a forged call can't change anything",
      "Commission payments come in from GHL records on a schedule, and the partner's account updates live through Supabase Realtime",
      "One codebase builds two separately branded sites. Before release, a build check scans every file of one brand for the other brand's name, phone number and address",
      "The client's copy rules run as tests (banned words, title case headings, a grade 6 reading level, nothing that looks clickable unless it is), and every page is checked with axe",
    ],
    stack: ["nextjs", "react", "typescript", "tailwind", "supabase", "postgresql", "gohighlevel", "webhooks", "vercel"],
    image: {
      src: "/images/referral-partners.webp",
      alt: "Credit CRB Referral Partners landing page with a phone showing a texted signup code",
      width: 1600,
      height: 816,
    },
    link: "https://partners.creditcrbusa.com",
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
      "Every day it turns one of the company's videos into blog, article and social drafts, learns from how the owner edits them, and books the approved posts into GHL Social Planner.",
    summary:
      "Six n8n workflows: a daily video picker, a writer that drafts and validates five pieces per video, email review with approve, rewrite and as-is replies, a style learner, an image maker and an hourly scheduler that posts to GoHighLevel at the best time for each platform.",
    contributions: [
      "A daily picker reads the YouTube feeds and takes the newest video not used yet, skipping anything that is part of a series or course. If the writer fails on it, the next video is tried",
      "Transcripts through Gemini, with a wait and retry and then a backup model. A master article with compliance settings becomes the base for every piece",
      "Each piece is validated (key point, disclaimer, no links in social posts) and rewritten up to 3 times before it is emailed for review",
      "The owner replies by email: highlight colors mark what to add, cut or reword, and an AS IS reply saves his own text word for word",
      "From each AS IS edit, an LLM compares the AI draft with his version and saves reusable style rules, which go into every new draft",
      "Hourly, approved posts with an approved image get the best time for their platform, one post per platform per day and never two from the same video on the same day, then go into GHL Social Planner with the image",
    ],
    results: ["6 workflows, 220+ nodes", "5 drafts from every video, one video a day", "Up to 3 validation tries per piece before anyone reviews it"],
    stack: ["n8n", "openrouter", "gohighlevel", "prompt-engineering", "google-apis", "webhooks"],
    flowId: "content-engine",
    caseStudy: {
      role: "Automation engineer · design & build",
      problem:
        "The company posts videos often, and each one held material for a dozen posts. Turning them into blog, article and social drafts took hours of writing, the owner rewrote most drafts in his own voice, and nothing reached the social calendar without someone scheduling it by hand.",
      notes: [
        "Approve and Reject are plain links, so email scanners and double clicks can open them. Every click checks the current status first, and a draft_id (job__type__number) ties the sheet, the email thread, the links and the image together. A catch-up job every 30 minutes picks up AS IS replies the main workflow missed.",
      ],
    },
  },
  {
    slug: "ai-dialer",
    title: "AI Outbound Dialer",
    kind: "automation",
    featured: true,
    client: "Credit CRB",
    outcome: "An AI voice agent calls each new lead, books a consultation during the call, and the outcome lands back in the CRM.",
    summary:
      "Three n8n workflows around a Telnyx AI voice agent: one places calls under a live concurrency cap, one answers the agent's booking requests mid-call, and one verifies, reads and routes every call outcome into GoHighLevel.",
    contributions: [
      "Place call: normalizes the number and timezone, checks how many calls are live, and waits 45 seconds while 45 or more are running",
      "A guardrail on every number, with voicemail detection on the call. Leads that fail the check are tagged in the CRM instead of dropped",
      "Mid-call booking: the voice agent calls n8n as a tool. It reads the CRM calendar, offers three times out loud, and books the one the caller picks",
      "Before booking it checks whether the email belongs to another contact, and the calendar rejects taken slots, so nothing gets double-booked",
      "Outcome: verifies the Telnyx Ed25519 signature on the raw request, pulls the transcript and has an LLM extract the outcome, including emails spelled out letter by letter",
      "A 4-way switch tags confirmed, rebook, voicemail or no-answer. Every branch, failed CRM writes included, is written to a troubleshooting log",
    ],
    results: ["3 workflows, 44 nodes", "Up to 45 AI calls at once, capped by a live count", "Bookings confirmed while the caller is still on the line"],
    stack: ["n8n", "telnyx", "gohighlevel", "openrouter", "webhooks", "google-apis"],
    flowId: "ai-dialer",
    caseStudy: {
      role: "Automation engineer · design & build",
      problem:
        "Sales had more new leads than hours to call them, and a lead that waits a day goes cold. The dialer had to call quickly, stay under the carrier's concurrency limit, book appointments without a human, and leave a clear record when anything went wrong.",
      notes: [
        "I planned a gradual ramp-up for new numbers (50, 100, 250, 500, 1k, then 2k calls a day) so carriers don't flag them as spam.",
      ],
    },
  },
  {
    slug: "ai-video-pipeline",
    title: "AI Video Pipeline",
    kind: "automation",
    featured: true,
    client: "Credit CRB",
    outcome: "Turns a script in a Google Sheet into a finished vertical video with voiceover, AI-generated clips and music.",
    summary:
      "An n8n pipeline that reads a script from a Google Sheet, records the voiceover, plans shots to its timing, generates and checks a still for every shot, animates the stills into clips and renders the final 9:16 video with Json2Video.",
    contributions: [
      "A Google Sheet works as the job queue: the workflow takes the next pending script, locks the row and writes the finished video link back",
      "ElevenLabs voiceover, then a pause trimmer in plain JavaScript that shortens long silences and records exactly where each cut falls",
      "A shot list timed to the real voiceover, so each shot shows what is being said at that moment",
      "An LLM writes the prompt for every shot. A rules linter rejects anything that would put text, logos, documents or screens in frame, sends failures back for one repair, and swaps in a safe prompt if they still fail",
      "Every still goes through a Claude vision check before it is animated. The check fails closed, so a still with stray lettering never becomes a clip",
      "Approved stills become 6-second clips with MiniMax Hailuo 2.3, and scripts written as dialogue get one lip-synced shot per line in each speaker's voice",
      "Json2Video renders the 1080×1920 video with a generated music bed. If a shot fails, its neighbours stretch to cover the gap, so no clip ever plays twice",
    ],
    results: ["77-node n8n workflow", "About 4 to 6 minutes from script to finished video"],
    stack: ["n8n", "elevenlabs", "claude", "minimax", "json2video", "openrouter", "kling", "higgsfield", "google-apis", "prompt-engineering"],
    flowId: "video-pipeline",
    caseStudy: {
      role: "Automation engineer · design & build",
      problem:
        "Credit CRB wanted a steady supply of short vertical videos for social media. Each one meant writing shot ideas, generating footage, recording a voiceover and editing it all together by hand, and AI image models kept slipping lettering and fake logos into the frame.",
      notes: [
        "Generated clips are billed per second, so the expensive steps only run on stills that already passed the checks. I tried several models along the way, including Higgsfield and Kling AI Avatar, and kept the ones that gave the best result for the price.",
      ],
    },
  },

  // ── Web apps & websites ─────────────────────────────────────────────────
  {
    slug: "visual-verse-prints",
    title: "Visual Verse Prints",
    kind: "web-app",
    client: "Visual Verse Prints",
    outcome: "Moved a print shop off its daily orders spreadsheet and onto a website with online ordering.",
    summary:
      "Website and back office for a print shop in Caloocan City. Customers order and pay online, and the owner and sales agents track referrals, quotes, orders and commissions in one place instead of a shared spreadsheet.",
    contributions: [
      "Public site with a services catalog the owner edits from the admin",
      "Online ordering with no customer account: each order gets a private page for uploading artwork and bank-QR payment receipts",
      "Admin dashboard for quotations, orders, receipt checks and weekly and monthly sales",
      "Agent portal with referral tracking, a leaderboard and commission earned as the client pays",
      "Supabase row-level security, so each agent only sees their own clients",
      "A one-time import script that moved the old spreadsheet's history into Postgres",
    ],
    stack: ["nextjs", "react", "typescript", "tailwind", "supabase", "postgresql", "vercel"],
    image: {
      src: "/images/visual-verse.webp",
      alt: "Visual Verse Prints homepage with the headline Every print tells a story",
      width: 1600,
      height: 816,
    },
    link: "https://visual-verse-prints-alpha.vercel.app",
  },
  {
    slug: "fatf-website",
    title: "From Arms to Farms Foundation",
    kind: "website",
    wip: true,
    client: "Side project",
    outcome: "Community website for a Philippine foundation, with online donations and pages the staff build themselves. Still in progress.",
    summary:
      "A side project I'm building now: a Next.js and Sanity site where the foundation's staff put pages together from content blocks with a live preview, plus a donation page that takes payments through PayMongo.",
    contributions: [
      "A Sanity page builder with 16 content blocks that staff can add and reorder without a developer",
      "Live, click-to-edit preview with Sanity Presentation and Next.js draft mode",
      "A donation page that opens a PayMongo checkout for GCash, Maya and cards. The donation ledger and receipt emails come next",
      "An animated landing page built with Motion and Lenis smooth scrolling",
    ],
    stack: ["nextjs", "react", "typescript", "tailwind", "sanity", "vercel"],
    image: {
      src: "/images/fatf.webp",
      alt: "From Arms to Farms Foundation website homepage",
      width: 1600,
      height: 816,
    },
    link: "https://fatf-website.vercel.app",
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
      "A car rental platform for Iligan City. It's a personal hobby project where I'm trying out Next.js with Material UI, with Supabase as the backend and database.",
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
    outcome: "Pitches a list of 129 podcasts, ranked by fit, and flags the hosts who reply with interest.",
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
    slug: "site-performance-rescue",
    title: "Website Performance Rescue",
    kind: "website",
    client: "Credit CRB",
    outcome: "creditcrb.com load time cut from ~11s to 2–3s.",
    summary: "Audited the company site and removed about 20 unused plugins.",
    contributions: ["Performance audit of creditcrb.com", "Removed ~20 unused plugins"],
    results: ["Load time cut from about 11s to 2–3s"],
    // TODO(Joshua): confirm the platform (WordPress?) so the right tool can be linked.
    stack: [],
    link: "https://creditcrb.com",
  },
  {
    slug: "ops-automations",
    title: "Ops Automations",
    kind: "automation",
    client: "Credit CRB",
    outcome: "Smaller automations that handle routine admin for the team.",
    summary:
      "A Telegram AI agent, Fathom meeting notes sent to Gmail, a document-upload intake flow, and booking and logging for outbound calls.",
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
    outcome: "A static Next 16 site deployed by GitHub Actions, with Telegram alerts for visits sent through n8n.",
    summary:
      "The portfolio you're reading: a statically exported Next.js 16 site deployed by GitHub Actions, with an n8n webhook that pings Telegram on visits and contact clicks.",
    contributions: [
      "Next.js 16 App Router static export with Tailwind v4",
      "GitHub Actions: lint, type-check, build and deploy to Pages",
      "n8n webhook that sends visit and contact-click alerts to Telegram",
      "Workflow replays drawn in plain SVG, without a diagram library",
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
  (p) => !p.wip && p.kind !== "automation" && p.client !== "Personal" && p.slug !== "site-performance-rescue",
).length;

export const kindLabel: Record<ProjectKind, string> = {
  "web-app": "Web app",
  website: "Website",
  automation: "Automation",
};
