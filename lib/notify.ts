// n8n production webhook that pings you (via Telegram) about portfolio
// activity. The n8n workflow must be set to Active for this to fire.
export const WEBHOOK_URL =
  "https://joshuairvingf.app.n8n.cloud/webhook-test/projects-viewed";

// Per-session ID held in memory only — never written to localStorage/cookies,
// so it's not persistent tracking and needs no consent banner (GDPR/ePrivacy).
// It survives client-side navigation within one visit (Next keeps the JS
// runtime alive across <Link> route changes), letting you see that, e.g., a
// home visit and a projects click came from the same session. A hard refresh
// or a brand-new visit produces a fresh ID.
let sessionId: string | null = null;

function getSessionId(): string {
  try {
    if (!sessionId) {
      sessionId = crypto.randomUUID();
    }
    return sessionId;
  } catch {
    return "unknown";
  }
}

/**
 * Fire-and-forget notification to the n8n webhook. Uses sendBeacon so it
 * survives page navigation and never blocks it; form-encoded body keeps it
 * CORS-safelisted and lets n8n parse structured fields
 * ($json.body.source / $json.body.timestamp / $json.body.visitorId).
 *
 * `source` identifies the event, e.g. "home-visit", "navbar", "hero-cta".
 */
export function notify(source: string) {
  try {
    const payload = new URLSearchParams({
      source,
      timestamp: new Date().toISOString(),
      visitorId: getSessionId(),
    });
    navigator.sendBeacon(WEBHOOK_URL, payload);
  } catch {
    // Tracking must never break the page — swallow any error.
  }
}
