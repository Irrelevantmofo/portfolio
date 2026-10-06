// Single source for tool icons, shared by lib/icons.tsx (hex colors) and
// scripts/build-icon-sprite.mjs (writes public/icons.svg). Plain JS so the
// build script can import it without a TypeScript loader.
import {
  siClaude,
  siElevenlabs,
  siFirebase,
  siGithubactions,
  siGooglesheets,
  siGraphql,
  siHtml5,
  siI18next,
  siJavascript,
  siLaravel,
  siMinimax,
  siMui,
  siN8n,
  siNextdotjs,
  siOpenrouter,
  siPostgresql,
  siPrisma,
  siPuppeteer,
  siPython,
  siReact,
  siSanity,
  siStripe,
  siSupabase,
  siTailwindcss,
  siTelegram,
  siTypescript,
  siVercel,
  siWordpress,
} from "simple-icons";

/** `si:<Name>` keys → simple-icons entry. */
export const brand = {
  Claude: siClaude,
  Elevenlabs: siElevenlabs,
  Firebase: siFirebase,
  Githubactions: siGithubactions,
  Googlesheets: siGooglesheets,
  Graphql: siGraphql,
  Html5: siHtml5,
  I18next: siI18next,
  Javascript: siJavascript,
  Laravel: siLaravel,
  Minimax: siMinimax,
  Mui: siMui,
  N8n: siN8n,
  Nextdotjs: siNextdotjs,
  Openrouter: siOpenrouter,
  Postgresql: siPostgresql,
  Prisma: siPrisma,
  Puppeteer: siPuppeteer,
  Python: siPython,
  React: siReact,
  Sanity: siSanity,
  Stripe: siStripe,
  Supabase: siSupabase,
  Tailwindcss: siTailwindcss,
  Telegram: siTelegram,
  Typescript: siTypescript,
  Vercel: siVercel,
  Wordpress: siWordpress,
};

/** `glyph:<name>` keys → 24×24 stroke path, for tools simple-icons doesn't cover. */
export const glyphs = {
  lambda: "M6 20 11 10M9 4h2.5L18 20h-2",
  database:
    "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
  prompt: "M4 5h16v14H4zM7 10l3 2-3 2M12 15h5",
  crm: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M16 4a3 3 0 0 1 0 6M18 20a6 6 0 0 0-2.5-4.9",
  webhook: "M9 16a4 4 0 1 1-1.5-6.2L11 4M15 8a4 4 0 1 1 3 6.8L13 15M8 16h8.5",
  phone: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  video: "M3 6h12v12H3zM15 10l6-3v10l-6-3",
  image: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 9.5h.01",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM21 21l-5-5",
  check: "M4 12.5 9 17.5 20 6.5",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
};

/** Sprite <symbol> id for an icon key like "si:N8n" or "glyph:phone". */
export function symbolId(icon) {
  const [kind, name] = icon.split(":");
  if (kind === "si" && brand[name]) return `si-${name}`;
  return `g-${glyphs[name] ? name : "bolt"}`;
}
