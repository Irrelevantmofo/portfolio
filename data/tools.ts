import type { Project } from "./projects";

export type ToolCategory =
  | "Frontend"
  | "CMS"
  | "Backend & data"
  | "Cloud & DevOps"
  | "Payments"
  | "AI / LLM"
  | "Automation"
  | "Voice & media AI"
  | "Scraping & data"
  | "QA";

/**
 * `si:<name>` → simple-icons export (e.g. `si:Nextdotjs` → `siNextdotjs`).
 * `glyph:<name>` → generic glyph from lib/icons.ts, for tools simple-icons
 * doesn't cover (AWS services, Telnyx, GoHighLevel, OpenAI, …).
 */
export type ToolIcon = `si:${string}` | `glyph:${string}`;

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  icon: ToolIcon;
  /** Short qualifier shown under the chip, e.g. "this site's CI". */
  note?: string;
}

export const toolCategories: ToolCategory[] = [
  "Frontend",
  "Backend & data",
  "Cloud & DevOps",
  "AI / LLM",
  "Automation",
  "Voice & media AI",
  "CMS",
  "Payments",
  "Scraping & data",
  "QA",
];

export const tools = [
  // Frontend
  { id: "nextjs", name: "Next.js", category: "Frontend", icon: "si:Nextdotjs" },
  { id: "react", name: "React", category: "Frontend", icon: "si:React" },
  { id: "typescript", name: "TypeScript", category: "Frontend", icon: "si:Typescript" },
  { id: "javascript", name: "JavaScript", category: "Frontend", icon: "si:Javascript" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", icon: "si:Tailwindcss" },
  { id: "mui", name: "MUI", category: "Frontend", icon: "si:Mui" },
  { id: "html-css", name: "HTML5 / CSS3", category: "Frontend", icon: "si:Html5" },
  { id: "i18n", name: "i18n", category: "Frontend", icon: "si:I18next" },

  // CMS
  { id: "sanity", name: "Sanity", category: "CMS", icon: "si:Sanity" },
  { id: "wordpress", name: "WordPress", category: "CMS", icon: "si:Wordpress" },

  // Backend & data
  { id: "supabase", name: "Supabase", category: "Backend & data", icon: "si:Supabase" },
  { id: "postgresql", name: "PostgreSQL", category: "Backend & data", icon: "si:Postgresql" },
  { id: "prisma", name: "Prisma", category: "Backend & data", icon: "si:Prisma" },
  { id: "graphql", name: "GraphQL", category: "Backend & data", icon: "si:Graphql" },
  { id: "firebase", name: "Firebase", category: "Backend & data", icon: "si:Firebase" },
  { id: "laravel", name: "Laravel / PHP", category: "Backend & data", icon: "si:Laravel" },
  { id: "python", name: "Python", category: "Backend & data", icon: "si:Python" },

  // Cloud & DevOps
  { id: "aws-lambda", name: "AWS Lambda", category: "Cloud & DevOps", icon: "glyph:lambda" },
  { id: "dynamodb", name: "DynamoDB", category: "Cloud & DevOps", icon: "glyph:database" },
  { id: "vercel", name: "Vercel", category: "Cloud & DevOps", icon: "si:Vercel" },
  { id: "github-actions", name: "GitHub Actions", category: "Cloud & DevOps", icon: "si:Githubactions", note: "this site's CI" },

  // Payments
  // TODO(Joshua): which project used Stripe? Until then it shows as "in production use".
  { id: "stripe", name: "Stripe", category: "Payments", icon: "si:Stripe" },

  // AI / LLM
  { id: "openrouter", name: "OpenRouter", category: "AI / LLM", icon: "si:Openrouter" },
  { id: "openai", name: "OpenAI", category: "AI / LLM", icon: "glyph:spark" },
  { id: "claude", name: "Claude", category: "AI / LLM", icon: "si:Claude" },
  { id: "prompt-engineering", name: "Prompt engineering", category: "AI / LLM", icon: "glyph:prompt" },

  // Automation
  { id: "n8n", name: "n8n", category: "Automation", icon: "si:N8n" },
  { id: "gohighlevel", name: "GoHighLevel", category: "Automation", icon: "glyph:crm" },
  { id: "webhooks", name: "Webhooks / REST APIs", category: "Automation", icon: "glyph:webhook" },
  { id: "google-apis", name: "Google Sheets & Gmail APIs", category: "Automation", icon: "si:Googlesheets" },
  { id: "telegram", name: "Telegram Bot API", category: "Automation", icon: "si:Telegram" },

  // Voice & media AI
  { id: "telnyx", name: "Telnyx AI voice", category: "Voice & media AI", icon: "glyph:phone" },
  { id: "elevenlabs", name: "ElevenLabs", category: "Voice & media AI", icon: "si:Elevenlabs" },
  { id: "json2video", name: "Json2Video", category: "Voice & media AI", icon: "glyph:video" },
  { id: "higgsfield", name: "Higgsfield", category: "Voice & media AI", icon: "glyph:image" },
  { id: "kling", name: "Kling", category: "Voice & media AI", icon: "glyph:video" },
  { id: "minimax", name: "Minimax", category: "Voice & media AI", icon: "si:Minimax" },

  // Scraping & data
  { id: "puppeteer", name: "Puppeteer", category: "Scraping & data", icon: "si:Puppeteer" },
  { id: "wizit", name: "Lead enrichment (Wizit)", category: "Scraping & data", icon: "glyph:search" },

  // QA
  { id: "qa-testing", name: "Software QA testing", category: "QA", icon: "glyph:check" },
] as const satisfies readonly Tool[];

export type ToolId = (typeof tools)[number]["id"];

const toolById = new Map<string, Tool>(tools.map((t) => [t.id, t]));

export function getTool(id: ToolId): Tool {
  return toolById.get(id)!;
}

/**
 * Projects that use each tool, derived from `project.stack` so the mapping has
 * one source of truth. Tools with no entry render as "in production use".
 */
export function usedIn(id: ToolId, projects: readonly Project[]): Project[] {
  return projects.filter((p) => p.stack.includes(id));
}
