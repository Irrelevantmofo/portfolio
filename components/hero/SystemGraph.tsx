import { ToolIconSvg } from "@/lib/icons";
import { getTool, type ToolId } from "@/data/tools";
import { getProject } from "@/data/projects";
import SystemGraphCanvas, { type GraphLayout, type GraphNodeView } from "./SystemGraphCanvas";

interface GraphNodeDef {
  id: string;
  label: string;
  sub: string;
  tool: ToolId;
  /** Featured case study the node scrolls to. */
  caseSlug: string;
  /** Real projects named in the tooltip. */
  usedIn: string[];
}

// The architecture built for Credit CRB (handoff §5.1).
const nodes: GraphNodeDef[] = [
  { id: "form", sub: "Next.js", label: "Lead form", tool: "nextjs", caseSlug: "credit-score-simulator", usedIn: ["credit-score-simulator", "business-loan-analyzer"] },
  { id: "db", sub: "Supabase", label: "Auth + data", tool: "supabase", caseSlug: "credit-score-simulator", usedIn: ["credit-score-simulator", "business-loan-analyzer"] },
  { id: "ai", sub: "OpenRouter", label: "AI analysis", tool: "openrouter", caseSlug: "credit-score-simulator", usedIn: ["credit-score-simulator", "content-engine"] },
  { id: "crm", sub: "GoHighLevel", label: "CRM", tool: "gohighlevel", caseSlug: "ai-dialer", usedIn: ["ai-dialer", "credit-score-simulator"] },
  { id: "n8n", sub: "n8n", label: "Workflows", tool: "n8n", caseSlug: "content-engine", usedIn: ["content-engine", "ai-dialer"] },
  { id: "voice", sub: "Telnyx", label: "AI voice call", tool: "telnyx", caseSlug: "ai-dialer", usedIn: ["ai-dialer"] },
  { id: "content", sub: "LLM", label: "Content AI", tool: "prompt-engineering", caseSlug: "content-engine", usedIn: ["content-engine"] },
  { id: "publish", sub: "Queue", label: "Blog / Social", tool: "google-apis", caseSlug: "content-engine", usedIn: ["content-engine"] },
];

const desktop: GraphLayout = {
  w: 560,
  h: 372,
  nodeW: 166,
  nodeH: 54,
  pos: {
    form: { x: 84, y: 40 },
    db: { x: 280, y: 40 },
    ai: { x: 476, y: 40 },
    crm: { x: 476, y: 186 },
    n8n: { x: 280, y: 186 },
    voice: { x: 84, y: 332 },
    content: { x: 280, y: 332 },
    publish: { x: 476, y: 332 },
  },
  edges: [
    ["form", "db"],
    ["db", "ai"],
    ["ai", "crm"],
    ["crm", "n8n"],
    ["n8n", "voice"],
    ["n8n", "content"],
    ["content", "publish"],
  ],
};

// <768px: vertical, 4 nodes.
const mobile: GraphLayout = {
  w: 300,
  h: 300,
  nodeW: 220,
  nodeH: 46,
  pos: {
    form: { x: 150, y: 30 },
    ai: { x: 150, y: 110 },
    n8n: { x: 150, y: 190 },
    voice: { x: 150, y: 270 },
  },
  edges: [
    ["form", "ai"],
    ["ai", "n8n"],
    ["n8n", "voice"],
  ],
};

export default function SystemGraph() {
  const views: GraphNodeView[] = nodes.map((n) => {
    const tool = getTool(n.tool);
    return {
      id: n.id,
      label: n.label,
      sub: n.sub,
      href: `#case-${n.caseSlug}`,
      usedIn: n.usedIn.map((s) => getProject(s)?.title ?? s),
      icon: <ToolIconSvg icon={tool.icon} className="size-4" />,
    };
  });

  return <SystemGraphCanvas nodes={views} desktop={desktop} mobile={mobile} />;
}
