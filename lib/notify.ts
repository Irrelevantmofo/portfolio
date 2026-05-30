// n8n production webhook that pings you (via Telegram) about portfolio
// activity. The n8n workflow must be set to Active for this to fire.
export const WEBHOOK_URL =
  "https://joshuairvingf.app.n8n.cloud/webhook/projects-viewed";

const VISITOR_ID_KEY = "portfolio_visitor_id";

/**
 * Returns a stable per-browser ID so you can tell that multiple events (e.g. a
 * home visit followed by a projects click) came from the same person. Persists
 * in localStorage; generated once on first visit. Resets if storage is cleared
 * or a different browser/device is used.
 */
function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
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
      visitorId: getVisitorId(),
    });
    navigator.sendBeacon(WEBHOOK_URL, payload);
  } catch {
    // Tracking must never break the page — swallow any error.
  }
}
