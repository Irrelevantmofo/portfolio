// Site-wide facts. Anything marked TODO(Joshua) is waiting on confirmation —
// leave it unset rather than inventing a value; the UI hides unset items.

// TODO(Joshua): is joshuafabricante.com owned? If so, switch this and add a CNAME.
export const SITE_URL = "https://irrelevantmofo.github.io/portfolio";

export const person = {
  name: "Joshua Fabricante",
  fullName: "Joshua Irving B. Fabricante",
  jobTitle: "Full-Stack Next.js & AI Automation Engineer",
  email: "joshua.starkiller115@gmail.com",
  location: "Iligan City, Philippines",
  timezone: "PH (UTC+8)",
  alumniOf: "Mindanao State University – Iligan Institute of Technology",
  availability: "Open to full-time remote",
} as const;

export const links = {
  linkedin: "https://www.linkedin.com/in/joshuafabricante",
  github: "https://github.com/Irrelevantmofo",
  onlinejobs: "https://www.onlinejobs.ph/jobseekers/info/485156",
  // Set at build time: "/resume.pdf" when public/resume.pdf exists, else hidden.
  // Keep phone number and home address out of that PDF — it's public.
  resume: (process.env.NEXT_PUBLIC_RESUME_PATH || null) as string | null,
  // TODO(Joshua): booking link (Cal.com / Calendly), if any.
  booking: null as string | null,
  // TODO(Joshua): keep or drop X / Facebook / Instagram? Dropped per the handoff's
  // recommendation (LinkedIn, GitHub, OnlineJobs only). Old handles:
  // x: "https://x.com/Joshua_irvingF", facebook: "Joshua.starkiller115", instagram: "joshuanderful"
} as const;

export const stats = {
  years: 7,
  // TODO(Joshua): confirm. The n8n workspace shows 92, some of them one-off.
  n8nWorkflows: 90,
  concurrentCalls: 50,
  loadBefore: 11,
  loadAfter: "2–3",
} as const;

export interface TimelineEntry {
  period: string;
  role: string;
  /** Named only where approved; agency work stays unnamed on purpose. */
  org: string | null;
  summary: string;
  highlights: string[];
}

export const timeline: TimelineEntry[] = [
  {
    period: "2026 – present",
    role: "Full-stack & AI automation engineer",
    org: "Credit CRB",
    summary: "Building AI-powered tools and the automation systems behind a US credit & business-funding firm.",
    highlights: ["Credit analyzer & loan-matching apps", "Content repurposing engine", "AI outbound dialer", "Outreach systems"],
  },
  {
    period: "2022 – present",
    role: "Full-stack Next.js developer",
    org: "Agency work (Germany)",
    summary:
      "Next.js + Sanity corporate sites and SaaS for German clients — Danaher, DFK Group, Vita Core, Tourismus Damp, First Automotive Parts and Nessy Cloud.",
    highlights: ["Next.js + Sanity", "i18n", "GraphQL + Prisma", "AWS Serverless"],
  },
  {
    period: "2019 – 2021",
    role: "Web developer",
    org: "Freelance & contract",
    summary:
      "React front ends (including one for an air traffic control system), Laravel and CodeIgniter business systems, WordPress landing pages and a Shopify app for product embroidery.",
    highlights: ["React", "Laravel", "CodeIgniter", "WordPress", "Shopify app"],
  },
];
