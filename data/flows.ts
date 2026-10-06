// Hand-built, simplified versions of real workflows. DEMO DATA ONLY: no real
// names, phone numbers, IDs, URLs or customer data may appear in this file.
//
// Coordinates are node centers in the flow's viewBox units. FlowReplay draws
// HTML nodes over an SVG edge layer with the same aspect ratio, so they line up
// at any width.

export type FlowNodeKind = "trigger" | "action" | "ai" | "logic" | "store";
export type StepStatus = "ok" | "run" | "retry" | "wait" | "error";

export interface FlowNode {
  id: string;
  label: string;
  sub?: string; // tool / detail line
  kind: FlowNodeKind;
  x: number;
  y: number;
}

export interface FlowEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
  /** Perpendicular shift in viewBox units, for parallel edges (retry loops). */
  offset?: number;
  loop?: boolean; // styled dashed: a back-edge in the run
}

export interface FlowStep {
  node: string;
  via?: string; // edge the packet travels to reach `node`
  status: StepStatus;
  log: string;
  hold?: number; // ms to dwell on this node (defaults to 380)
}

export interface Flow {
  id: string;
  title: string;
  blurb: string;
  projectSlug: string;
  viewBox: { w: number; h: number };
  nodes: FlowNode[];
  edges: FlowEdge[];
  steps?: FlowStep[];
}

const VB = { w: 860, h: 290 };
const R1 = 58;
const R2 = 232;
const COL = [90, 260, 430, 600, 770];

export const flows: Flow[] = [
  {
    id: "ai-dialer",
    title: "AI Outbound Dialer",
    blurb: "GHL tag → queue → lock → 50 concurrent AI calls → poll every 30s → loop until the queue is empty.",
    projectSlug: "ai-dialer",
    viewBox: VB,
    nodes: [
      { id: "tag", label: "GHL tag added", sub: "Webhook", kind: "trigger", x: COL[0], y: R1 },
      { id: "queue", label: "Queue leads", sub: "n8n data table", kind: "store", x: COL[1], y: R1 },
      { id: "lock", label: "Lock the run", sub: "debounce + lock", kind: "logic", x: COL[2], y: R1 },
      { id: "fetch", label: "Get pending", sub: "limit 50", kind: "action", x: COL[3], y: R1 },
      { id: "dial", label: "Dial batch ×50", sub: "Telnyx AI voice", kind: "ai", x: COL[4], y: R1 },
      { id: "poll", label: "Poll every 30s", sub: "Wait loop", kind: "logic", x: COL[4], y: R2 },
      { id: "check", label: "Queue empty?", sub: "IF", kind: "logic", x: COL[3], y: R2 },
      { id: "release", label: "Release lock", sub: "Run complete", kind: "action", x: COL[2], y: R2 },
    ],
    edges: [
      { id: "e1", from: "tag", to: "queue" },
      { id: "e2", from: "queue", to: "lock" },
      { id: "e3", from: "lock", to: "fetch" },
      { id: "e4", from: "fetch", to: "dial" },
      { id: "e5", from: "dial", to: "poll" },
      { id: "e6", from: "poll", to: "check" },
      { id: "loop", from: "check", to: "fetch", label: "pending > 0", loop: true },
      { id: "e7", from: "check", to: "release" },
    ],
    steps: [
      { node: "tag", status: "ok", log: "[Webhook] tag \"ai-call\" added → 137 contacts" },
      { node: "queue", via: "e1", status: "ok", log: "[Queue] 137 rows inserted · status=pending" },
      { node: "lock", via: "e2", status: "ok", log: "[Lock] debounce 10s… run lock acquired" },
      { node: "fetch", via: "e3", status: "ok", log: "[Fetch] 50 pending leads" },
      { node: "dial", via: "e4", status: "run", log: "[Dial] batch 1 · 50 concurrent calls · AMD=premium" },
      { node: "poll", via: "e5", status: "wait", log: "[Wait 30s] polling active calls… 12 still active", hold: 700 },
      { node: "poll", status: "ok", log: "[Wait 30s] polling active calls… 0 still active" },
      { node: "check", via: "e6", status: "ok", log: "[Check] 87 pending → next batch" },
      { node: "fetch", via: "loop", status: "ok", log: "[Fetch] 50 pending leads" },
      { node: "dial", via: "e4", status: "run", log: "[Dial] batch 2 · 50 concurrent calls" },
      { node: "poll", via: "e5", status: "wait", log: "[Wait 30s] polling active calls… 7 still active", hold: 600 },
      { node: "check", via: "e6", status: "ok", log: "[Check] 37 pending → next batch" },
      { node: "fetch", via: "loop", status: "ok", log: "[Fetch] 37 pending leads" },
      { node: "dial", via: "e4", status: "run", log: "[Dial] batch 3 · 37 concurrent calls" },
      { node: "poll", via: "e5", status: "wait", log: "[Wait 30s] polling active calls… 0 still active", hold: 600 },
      { node: "check", via: "e6", status: "ok", log: "[Check] queue empty" },
      { node: "release", via: "e7", status: "ok", log: "[Done] lock released · 137 called · 2 error rows logged, run not halted" },
    ],
  },
  {
    id: "content-engine",
    title: "Content Repurposing Engine",
    blurb: "One source in → fact extraction → per-asset drafts, validated with a 3-attempt retry ladder, approved by email.",
    projectSlug: "content-engine",
    viewBox: VB,
    nodes: [
      { id: "intake", label: "PDF / video in", sub: "Form upload", kind: "trigger", x: COL[0], y: R1 },
      { id: "extract", label: "Extract text", sub: "Transcript", kind: "action", x: COL[1], y: R1 },
      { id: "facts", label: "Fact extraction", sub: "LLM", kind: "ai", x: COL[2], y: R1 },
      { id: "master", label: "Master content", sub: "LLM", kind: "ai", x: COL[3], y: R1 },
      { id: "gen", label: "Asset drafts", sub: "blog · social", kind: "ai", x: COL[4], y: R1 },
      { id: "validate", label: "Validate", sub: "rules + schema", kind: "logic", x: COL[4], y: R2 },
      { id: "email", label: "Email for review", sub: "Gmail", kind: "action", x: COL[3], y: R2 },
      { id: "approve", label: "Approve / Reject", sub: "draft_id join key", kind: "logic", x: COL[2], y: R2 },
      { id: "image", label: "Hero image", sub: "Image sub-flow", kind: "ai", x: COL[1], y: R2 },
      { id: "publish", label: "Publish queue", sub: "Google Sheets", kind: "store", x: COL[0], y: R2 },
    ],
    edges: [
      { id: "e1", from: "intake", to: "extract" },
      { id: "e2", from: "extract", to: "facts" },
      { id: "e3", from: "facts", to: "master" },
      { id: "e4", from: "master", to: "gen" },
      { id: "e5", from: "gen", to: "validate", offset: -22 },
      { id: "retry", from: "validate", to: "gen", offset: -22, label: "retry ≤3", loop: true },
      { id: "e6", from: "validate", to: "email" },
      { id: "e7", from: "email", to: "approve" },
      { id: "e8", from: "approve", to: "image" },
      { id: "e9", from: "image", to: "publish" },
    ],
    steps: [
      { node: "intake", status: "ok", log: "[Form] upload received · webinar-demo.mp4" },
      { node: "extract", via: "e1", status: "ok", log: "[Extract] transcript · 9,412 words" },
      { node: "facts", via: "e2", status: "ok", log: "[LLM] 38 facts extracted" },
      { node: "master", via: "e3", status: "ok", log: "[LLM] master content drafted" },
      { node: "gen", via: "e4", status: "run", log: "[Gen] asset 1/6 · blog_post" },
      { node: "validate", via: "e5", status: "retry", log: "[Validate] fail: missing CTA → retry 1/3", hold: 520 },
      { node: "gen", via: "retry", status: "run", log: "[Gen] regenerating blog_post (attempt 2)" },
      { node: "validate", via: "e5", status: "ok", log: "[Validate] pass · 6/6 assets valid" },
      { node: "email", via: "e6", status: "ok", log: "[Gmail] 6 drafts sent · job_42__blog__1 …" },
      { node: "approve", via: "e7", status: "wait", log: "[Wait] awaiting reviewer…", hold: 700 },
      { node: "approve", status: "ok", log: "[Approve] job_42__blog__1 approved · duplicate click ignored" },
      { node: "image", via: "e8", status: "ok", log: "[Image] hero image generated" },
      { node: "publish", via: "e9", status: "ok", log: "[Queue] job_42__blog__1 scheduled for publish" },
    ],
  },
  {
    id: "podcast-outreach",
    title: "Podcast Outreach",
    blurb: "Weekday sender with +4d / +6d follow-ups, and a reply watcher that classifies, tags in GHL and alerts the owner.",
    projectSlug: "podcast-outreach",
    viewBox: VB,
    nodes: [
      { id: "cron", label: "Weekday sender", sub: "Schedule 09:00", kind: "trigger", x: 90, y: R1 },
      { id: "e1", label: "Email 1", sub: "Pitch", kind: "action", x: 300, y: R1 },
      { id: "f1", label: "Follow-up +4d", sub: "if no reply", kind: "action", x: 510, y: R1 },
      { id: "f2", label: "Follow-up +6d", sub: "if no reply", kind: "action", x: 720, y: R1 },
      { id: "watch", label: "Reply watcher", sub: "Inbox trigger", kind: "trigger", x: 90, y: R2 },
      { id: "classify", label: "Classify reply", sub: "yes · bounce", kind: "ai", x: 300, y: R2 },
      { id: "tag", label: "Tag in GHL", sub: "+ create task", kind: "action", x: 510, y: R2 },
      { id: "alert", label: "Alert owner", sub: "Interested only", kind: "action", x: 720, y: R2 },
    ],
    edges: [
      { id: "a1", from: "cron", to: "e1" },
      { id: "a2", from: "e1", to: "f1", label: "wait 4d" },
      { id: "a3", from: "f1", to: "f2", label: "wait 6d" },
      { id: "r0", from: "e1", to: "watch", label: "reply", loop: true },
      { id: "r1", from: "watch", to: "classify" },
      { id: "r2", from: "classify", to: "tag" },
      { id: "r3", from: "tag", to: "alert" },
    ],
    steps: [
      { node: "cron", status: "ok", log: "[Cron] Mon 09:00 · 12 shows due today" },
      { node: "e1", via: "a1", status: "ok", log: "[Send] email 1 → 12 shows (demo list)" },
      { node: "f1", via: "a2", status: "wait", log: "[Wait 4d] 9 shows without a reply…", hold: 650 },
      { node: "f1", status: "ok", log: "[Send] follow-up 1 → 9 shows" },
      { node: "f2", via: "a3", status: "wait", log: "[Wait 6d] 7 shows without a reply…", hold: 650 },
      { node: "f2", status: "ok", log: "[Send] follow-up 2 → 7 shows · sequence ends" },
      { node: "watch", via: "r0", status: "ok", log: "[Inbox] new reply on thread #3 (demo)" },
      { node: "classify", via: "r1", status: "ok", log: "[Classify] interested · 1 bounce removed from sequence" },
      { node: "tag", via: "r2", status: "ok", log: "[GHL] tagged podcast-interested · task created" },
      { node: "alert", via: "r3", status: "ok", log: "[Alert] owner notified · \"Demo Show\" wants a date" },
    ],
  },

  // ── Architecture diagrams for web-app case studies (no replay) ───────────
  {
    id: "credit-analyzer",
    title: "Credit Report Analyzer",
    blurb: "PDF in → parsed → AI metrics → simulator + roadmap → lead synced to the CRM.",
    projectSlug: "credit-score-simulator",
    viewBox: VB,
    nodes: [
      { id: "upload", label: "Upload report", sub: "Next.js form", kind: "trigger", x: COL[0], y: R1 },
      { id: "store", label: "Auth + storage", sub: "Supabase", kind: "store", x: COL[1], y: R1 },
      { id: "parse", label: "Parse report", sub: "PDF ingestion", kind: "action", x: COL[2], y: R1 },
      { id: "ai", label: "AI metrics", sub: "OpenRouter LLM", kind: "ai", x: COL[3], y: R1 },
      { id: "db", label: "Save metrics", sub: "Supabase Postgres", kind: "store", x: COL[4], y: R1 },
      { id: "sim", label: "Score simulator", sub: "Interactive UI", kind: "action", x: COL[4], y: R2 },
      { id: "roadmap", label: "700+ roadmap", sub: "Personalized", kind: "ai", x: COL[3], y: R2 },
      { id: "ghl", label: "CRM lead", sub: "GoHighLevel", kind: "action", x: COL[2], y: R2 },
    ],
    edges: [
      { id: "c1", from: "upload", to: "store" },
      { id: "c2", from: "store", to: "parse" },
      { id: "c3", from: "parse", to: "ai" },
      { id: "c4", from: "ai", to: "db" },
      { id: "c5", from: "db", to: "sim" },
      { id: "c6", from: "sim", to: "roadmap" },
      { id: "c7", from: "roadmap", to: "ghl" },
    ],
  },
  {
    // TODO(Joshua): confirm this layering matches the real Nessy architecture
    // (which services sat behind GraphQL vs. ran as Lambda functions).
    id: "nessy",
    title: "Nessy Cloud",
    blurb: "Next.js portal on a typed GraphQL API, with serverless functions on AWS.",
    projectSlug: "nessy-application",
    viewBox: { w: 860, h: 200 },
    nodes: [
      { id: "portal", label: "Customer portal", sub: "Next.js", kind: "trigger", x: COL[0], y: 100 },
      { id: "api", label: "GraphQL API", sub: "Prisma", kind: "action", x: COL[1] + 40, y: 100 },
      { id: "lambda", label: "Functions", sub: "AWS Lambda", kind: "logic", x: COL[3] - 40, y: 100 },
      { id: "dynamo", label: "Data", sub: "DynamoDB", kind: "store", x: COL[4], y: 46 },
      { id: "rest", label: "3rd-party APIs", sub: "REST", kind: "action", x: COL[4], y: 154 },
    ],
    edges: [
      { id: "n1", from: "portal", to: "api" },
      { id: "n2", from: "api", to: "lambda" },
      { id: "n3", from: "lambda", to: "dynamo" },
      { id: "n4", from: "lambda", to: "rest" },
    ],
  },
];

export const labFlows = flows.filter((f) => f.steps);

export function getFlow(id: string | undefined): Flow | undefined {
  return id ? flows.find((f) => f.id === id) : undefined;
}
