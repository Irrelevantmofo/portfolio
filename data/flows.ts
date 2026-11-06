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

/** A labelled lane around the nodes of one workflow, for multi-workflow systems. */
export interface FlowGroup {
  id: string;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Flow {
  id: string;
  title: string;
  blurb: string;
  projectSlug: string;
  viewBox: { w: number; h: number };
  nodes: FlowNode[];
  edges: FlowEdge[];
  groups?: FlowGroup[];
  /** What each group is: separate workflows (default) or stages of one workflow. */
  groupKind?: "workflow" | "stage";
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
    blurb: "Three workflows around one phone call. The first places the call when there's room under the concurrency cap, the second answers the voice agent's booking requests while the caller is still on the line, and the third verifies, reads and routes the outcome once the call ends.",
    projectSlug: "ai-dialer",
    viewBox: { w: 1060, h: 600 },
    groups: [
      { id: "g1", label: "1 · place the call", x: 12, y: 12, w: 1036, h: 192 },
      { id: "g2", label: "2 · book during the call", x: 12, y: 214, w: 1036, h: 168 },
      { id: "g3", label: "3 · handle the outcome", x: 12, y: 392, w: 1036, h: 196 },
    ],
    nodes: [
      // 1 · place the call
      { id: "lead", label: "New lead", sub: "CRM webhook", kind: "trigger", x: 100, y: 72 },
      { id: "norm", label: "Normalize", sub: "E.164 · timezone", kind: "action", x: 275, y: 72 },
      { id: "live", label: "Live calls?", sub: "Telnyx API", kind: "logic", x: 450, y: 72 },
      { id: "wait", label: "Wait 45s", sub: "≥45 calls live", kind: "logic", x: 450, y: 158 },
      { id: "guard", label: "Guardrail", sub: "valid number", kind: "logic", x: 625, y: 72 },
      { id: "skip", label: "Tag skipped", sub: "CRM tag", kind: "action", x: 625, y: 158 },
      { id: "call", label: "AI voice call", sub: "Telnyx agent", kind: "ai", x: 800, y: 72 },
      // 2 · book during the call
      { id: "tool", label: "Agent tool call", sub: "mid-call webhook", kind: "trigger", x: 800, y: 268 },
      { id: "act", label: "Route action", sub: "check · book", kind: "logic", x: 625, y: 268 },
      { id: "slots", label: "Free slots", sub: "CRM calendar", kind: "action", x: 450, y: 268 },
      { id: "offer", label: "Offer 3 times", sub: "spoken reply", kind: "action", x: 275, y: 268 },
      { id: "owner", label: "Email owner?", sub: "dedupe check", kind: "logic", x: 450, y: 346 },
      { id: "book", label: "Book slot", sub: "no double-booking", kind: "store", x: 275, y: 346 },
      { id: "confirm", label: "Confirm aloud", sub: "spoken reply", kind: "action", x: 100, y: 346 },
      // 3 · handle the outcome
      { id: "hook", label: "Call ended", sub: "Telnyx webhook", kind: "trigger", x: 100, y: 452 },
      { id: "sig", label: "Verify signature", sub: "Ed25519", kind: "logic", x: 275, y: 452 },
      { id: "txt", label: "Transcript", sub: "Telnyx API", kind: "action", x: 450, y: 452 },
      { id: "extract", label: "Extract outcome", sub: "LLM extractor", kind: "ai", x: 625, y: 452 },
      { id: "crm", label: "Update contact", sub: "CRM fields", kind: "action", x: 800, y: 452 },
      { id: "switch", label: "Route outcome", sub: "4-way switch", kind: "logic", x: 975, y: 452 },
      { id: "tag", label: "Tag outcome", sub: "rep picks up", kind: "action", x: 975, y: 540 },
      { id: "log", label: "Run log", sub: "every branch", kind: "store", x: 800, y: 540 },
    ],
    edges: [
      { id: "p1", from: "lead", to: "norm" },
      { id: "p2", from: "norm", to: "live" },
      { id: "p3", from: "live", to: "wait", offset: -22 },
      { id: "p4", from: "wait", to: "live", offset: -22, label: "recheck", loop: true },
      { id: "p5", from: "live", to: "guard" },
      { id: "p6", from: "guard", to: "skip", label: "invalid" },
      { id: "p7", from: "guard", to: "call" },
      { id: "x1", from: "call", to: "tool", label: "agent asks", loop: true },
      { id: "b1", from: "tool", to: "act" },
      { id: "b2", from: "act", to: "slots" },
      { id: "b3", from: "slots", to: "offer" },
      { id: "b4", from: "act", to: "owner" },
      { id: "b5", from: "owner", to: "book" },
      { id: "b6", from: "book", to: "confirm" },
      { id: "x2", from: "confirm", to: "hook", loop: true },
      { id: "o1", from: "hook", to: "sig" },
      { id: "o2", from: "sig", to: "txt" },
      { id: "o3", from: "txt", to: "extract" },
      { id: "o4", from: "extract", to: "crm" },
      { id: "o5", from: "crm", to: "switch" },
      { id: "o6", from: "switch", to: "tag", label: "4 branches" },
      { id: "o7", from: "tag", to: "log" },
      { id: "o8", from: "crm", to: "log", label: "on error", loop: true },
    ],
    steps: [
      { node: "lead", status: "ok", log: "[CRM] new lead · contact c_8812" },
      { node: "norm", via: "p1", status: "ok", log: "[Normalize] +1 407 555 0142 · America/Chicago" },
      { node: "live", via: "p2", status: "retry", log: "[Telnyx] 47 calls live, over the cap of 45", hold: 520 },
      { node: "wait", via: "p3", status: "wait", log: "[Wait] 45s before checking again", hold: 650 },
      { node: "live", via: "p4", status: "ok", log: "[Telnyx] 38 calls live, room to dial" },
      { node: "guard", via: "p5", status: "ok", log: "[Guardrail] number is valid" },
      { node: "call", via: "p7", status: "ok", log: "[Telnyx] AI call placed · voicemail detection on", hold: 600 },
      { node: "tool", via: "x1", status: "ok", log: "[Agent] check_availability" },
      { node: "act", via: "b1", status: "ok", log: "[Route] check path" },
      { node: "slots", via: "b2", status: "ok", log: "[CRM] 23 free slots in the next 5 days" },
      { node: "offer", via: "b3", status: "ok", log: "[Reply] Tue 10:00 AM, Wed 1:30 PM or Thu 4:00 PM?", hold: 650 },
      { node: "tool", status: "ok", log: "[Agent] book_appointment · Thu 4:00 PM · email spelled out" },
      { node: "act", via: "b1", status: "ok", log: "[Route] book path" },
      { node: "owner", via: "b4", status: "ok", log: "[CRM] email not used by another contact" },
      { node: "book", via: "b5", status: "ok", log: "[CRM] appointment created, slot still free" },
      { node: "confirm", via: "b6", status: "ok", log: "[Reply] You're all set for Thursday at 4:00 PM", hold: 600 },
      { node: "hook", via: "x2", status: "ok", log: "[Webhook] call ended · outcome event received" },
      { node: "sig", via: "o1", status: "ok", log: "[Verify] Ed25519 signature matches" },
      { node: "txt", via: "o2", status: "ok", log: "[Telnyx] transcript · 41 turns" },
      { node: "extract", via: "o3", status: "ok", log: "[LLM] outcome confirmed · email rebuilt from spelling" },
      { node: "crm", via: "o4", status: "ok", log: "[CRM] outcome, call id and summary saved" },
      { node: "switch", via: "o5", status: "ok", log: "[Switch] confirmed branch" },
      { node: "tag", via: "o6", status: "ok", log: "[CRM] tagged ai-confirmed · a rep takes the next call" },
      { node: "log", via: "o7", status: "ok", log: "[Log] row appended · CRM write succeeded" },
    ],
  },
  {
    id: "content-engine",
    title: "Content Repurposing Engine",
    blurb: "Pulls facts from one source, drafts each asset, retries failed checks up to 3 times, then emails the drafts for approval.",
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
    id: "video-pipeline",
    title: "AI Video Pipeline",
    blurb: "One 77-node workflow in three stages: the voiceover and music bed, a checked prompt and still for every shot, then the clips, a lip-synced talking line and the final 9:16 render. Every slow step polls until it's done.",
    projectSlug: "ai-video-pipeline",
    viewBox: { w: 1060, h: 600 },
    groupKind: "stage",
    groups: [
      { id: "g1", label: "1 · voice and music", x: 12, y: 12, w: 1036, h: 120 },
      { id: "g2", label: "2 · shots and checks", x: 12, y: 142, w: 1036, h: 182 },
      { id: "g3", label: "3 · clips and render", x: 12, y: 334, w: 1036, h: 254 },
    ],
    nodes: [
      // 1 · voice and music
      { id: "row", label: "Next script", sub: "Sheets · lock row", kind: "trigger", x: 100, y: 72 },
      { id: "reuse", label: "Saved take?", sub: "reuse or record", kind: "logic", x: 275, y: 72 },
      { id: "vo", label: "Voiceover", sub: "ElevenLabs", kind: "ai", x: 450, y: 72 },
      { id: "trim", label: "Trim pauses", sub: "cut points", kind: "logic", x: 625, y: 72 },
      { id: "brief", label: "Music brief", sub: "Claude Haiku", kind: "ai", x: 800, y: 72 },
      { id: "music", label: "Music bed", sub: "ElevenLabs", kind: "ai", x: 975, y: 72 },
      // 2 · shots and checks
      { id: "plan", label: "Plan shots", sub: "timed to the VO", kind: "logic", x: 975, y: 200 },
      { id: "write", label: "Shot prompts", sub: "LLM", kind: "ai", x: 800, y: 200 },
      { id: "lint", label: "Rules linter", sub: "regex rules", kind: "logic", x: 625, y: 200 },
      { id: "route", label: "Route shot", sub: "still · talk line", kind: "logic", x: 450, y: 200 },
      { id: "still", label: "Still per shot", sub: "image model", kind: "ai", x: 275, y: 200 },
      { id: "spoll", label: "Poll 45s", sub: "until ready", kind: "logic", x: 275, y: 280 },
      { id: "qa", label: "Vision QA", sub: "Claude vision", kind: "ai", x: 100, y: 200 },
      // 3 · clips and render
      { id: "animate", label: "Animate", sub: "Hailuo 2.3 · 6s", kind: "ai", x: 100, y: 390 },
      { id: "merge", label: "Merge jobs", sub: "script order", kind: "logic", x: 275, y: 390 },
      { id: "lipsync", label: "Lip-sync line", sub: "InfiniteTalk", kind: "ai", x: 450, y: 390 },
      { id: "check", label: "Validate clips", sub: "no repeats", kind: "logic", x: 275, y: 470 },
      { id: "render", label: "Render 9:16", sub: "Json2Video", kind: "action", x: 450, y: 470 },
      { id: "rpoll", label: "Poll 60s", sub: "until rendered", kind: "logic", x: 450, y: 550 },
      { id: "done", label: "Render ok?", sub: "status check", kind: "logic", x: 625, y: 470 },
      { id: "save", label: "Save video", sub: "Drive · mark done", kind: "store", x: 800, y: 470 },
      { id: "failed", label: "Mark failed", sub: "Sheet", kind: "store", x: 625, y: 550 },
    ],
    edges: [
      { id: "v1", from: "row", to: "reuse" },
      { id: "v2", from: "reuse", to: "vo" },
      { id: "v3", from: "vo", to: "trim" },
      { id: "v4", from: "trim", to: "brief" },
      { id: "v5", from: "brief", to: "music" },
      { id: "v6", from: "music", to: "plan" },
      { id: "v7", from: "plan", to: "write" },
      { id: "v8", from: "write", to: "lint", offset: -22 },
      { id: "repair", from: "lint", to: "write", offset: -22, label: "repair ×1", loop: true },
      { id: "v9", from: "lint", to: "route" },
      { id: "v10", from: "route", to: "still" },
      { id: "v11", from: "still", to: "spoll", offset: -22 },
      { id: "v12", from: "spoll", to: "still", offset: -22, label: "not yet", loop: true },
      { id: "v13", from: "still", to: "qa" },
      { id: "v14", from: "qa", to: "animate", label: "passed only" },
      { id: "v15", from: "route", to: "lipsync", label: "talk line" },
      { id: "v16", from: "lipsync", to: "merge" },
      { id: "v17", from: "animate", to: "merge" },
      { id: "v18", from: "merge", to: "check" },
      { id: "v19", from: "check", to: "render" },
      { id: "v20", from: "render", to: "rpoll", offset: -22 },
      { id: "v21", from: "rpoll", to: "render", offset: -22, label: "not yet", loop: true },
      { id: "v22", from: "render", to: "done" },
      { id: "v23", from: "done", to: "save" },
      { id: "v24", from: "done", to: "failed", label: "failed" },
    ],
    steps: [
      { node: "row", status: "ok", log: "[Sheet] row 18 pending → locked as processing" },
      { node: "reuse", via: "v1", status: "ok", log: "[Voiceover] no saved take, recording a new one" },
      { node: "vo", via: "v2", status: "ok", log: "[ElevenLabs] voiceover · 31.4s raw" },
      { node: "trim", via: "v3", status: "ok", log: "[Trim] 9 long pauses shortened · 27.2s · 8 cut points" },
      { node: "brief", via: "v4", status: "ok", log: "[Claude] music brief: low, warm, hopeful" },
      { node: "music", via: "v5", status: "ok", log: "[ElevenLabs] 30s music bed generated" },
      { node: "plan", via: "v6", status: "ok", log: "[Plan] 8 shots, each matched to the words spoken in it" },
      { node: "write", via: "v7", status: "run", log: "[LLM] writing 8 shot prompts" },
      { node: "lint", via: "v8", status: "retry", log: "[Lint] shot 5 asks for a 'credit report' (printed text) → repair", hold: 560 },
      { node: "write", via: "repair", status: "ok", log: "[LLM] repairing shot 5 · show the reaction, not the paper" },
      { node: "lint", via: "v8", status: "ok", log: "[Lint] 8/8 prompts clean" },
      { node: "route", via: "v9", status: "ok", log: "[Route] 7 stills · 1 talking line" },
      { node: "lipsync", via: "v15", status: "ok", log: "[InfiniteTalk] closing line lip-synced to its own voice" },
      { node: "merge", via: "v16", status: "wait", log: "[Merge] talking line ready, waiting for the clips", hold: 500 },
      { node: "still", via: "v10", status: "run", log: "[Image] 7 stills queued" },
      { node: "spoll", via: "v11", status: "wait", log: "[Wait] 45s · 5 of 7 ready", hold: 600 },
      { node: "still", via: "v12", status: "ok", log: "[Image] 7/7 stills ready" },
      { node: "qa", via: "v13", status: "retry", log: "[QA] shot 3 rejected: lettering on a mug · not animated", hold: 560 },
      { node: "qa", status: "ok", log: "[QA] 6 passed · shot 3's time goes to shots 2 and 4" },
      { node: "animate", via: "v14", status: "ok", log: "[Hailuo] 6 clips × 6s done" },
      { node: "merge", via: "v17", status: "ok", log: "[Merge] 7 clips in script order" },
      { node: "check", via: "v18", status: "ok", log: "[Validate] no clip used twice" },
      { node: "render", via: "v19", status: "run", log: "[Json2Video] 1080×1920 · voiceover + music" },
      { node: "rpoll", via: "v20", status: "wait", log: "[Wait] 60s · still rendering", hold: 600 },
      { node: "render", via: "v21", status: "ok", log: "[Json2Video] render finished" },
      { node: "done", via: "v22", status: "ok", log: "[Check] render succeeded" },
      { node: "save", via: "v23", status: "ok", log: "[Done] video saved to Drive · row 18 marked completed" },
    ],
  },
  {
    id: "podcast-outreach",
    title: "Podcast Outreach",
    blurb: "Sends pitches on weekdays with follow-ups after 4 and 6 days. A reply watcher sorts the responses, tags them in GHL and alerts the owner.",
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
    blurb: "The report is parsed, an LLM extracts the key metrics, the simulator and roadmap are built from them, and the lead is synced to the CRM.",
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
