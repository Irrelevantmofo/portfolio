// Renders public/og.png (1200×630): name, title and a mini system graph.
// Usage: node scripts/make-og.mjs
import sharp from "sharp";

const lime = "#C6F432", cyan = "#5EEAD4", ink = "#0A0B0F", surface = "#12141A", line = "#353A48";
const nodes = [
  ["Lead form", "Next.js", 720, 210],
  ["AI analysis", "OpenRouter", 960, 210],
  ["n8n", "Orchestration", 960, 360],
  ["AI voice call", "Telnyx", 720, 360],
  ["Content engine", "LLM", 960, 510],
];
const W = 190, H = 64;
const node = ([l, s, x, y]) => `
  <rect x="${x - W / 2}" y="${y - H / 2}" width="${W}" height="${H}" rx="14" fill="${surface}" stroke="${line}" stroke-width="2"/>
  <text x="${x - W / 2 + 20}" y="${y - 4}" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="20" font-weight="600" fill="#ECEEF3">${l}</text>
  <text x="${x - W / 2 + 20}" y="${y + 20}" font-family="Consolas, monospace" font-size="15" fill="#7F8698">${s}</text>`;
const edge = (d, c = lime) => `<path d="${d}" fill="none" stroke="${c}" stroke-opacity="0.7" stroke-width="2.5"/>`;

const dots = [];
for (let x = 11; x < 1200; x += 22) for (let y = 11; y < 630; y += 22) dots.push(`<circle cx="${x}" cy="${y}" r="1" fill="#fff" fill-opacity="0.06"/>`);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${ink}"/>
  ${dots.join("")}
  <text x="72" y="120" font-family="Consolas, monospace" font-size="22" fill="${lime}">// Full-Stack Engineer · Next.js · AI Automation</text>
  <text x="72" y="215" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" fill="#ECEEF3" letter-spacing="-2">Joshua</text>
  <text x="72" y="290" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" fill="#ECEEF3" letter-spacing="-2">Fabricante</text>
  <text x="72" y="360" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="26" fill="#A0A6B4">I build the web app — and the</text>
  <text x="72" y="396" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="26" fill="#A0A6B4">automations that run the business.</text>
  <text x="72" y="540" font-family="Consolas, monospace" font-size="18" fill="#7F8698">Next.js · AWS Serverless · Supabase · n8n</text>
  ${edge("M815 210H865")}
  ${edge("M960 242V328")}
  ${edge("M865 360H815")}
  ${edge("M960 392V478", cyan)}
  <circle cx="840" cy="210" r="6" fill="${lime}"/><circle cx="960" cy="290" r="6" fill="${lime}"/><circle cx="960" cy="440" r="6" fill="${cyan}"/><circle cx="840" cy="360" r="6" fill="${lime}"/>
  ${nodes.map(node).join("")}
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile("public/og.png");
console.log("wrote public/og.png");
