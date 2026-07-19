// Fire-and-forget step tracking for the assessment funnel, sent to our own
// /api/assessment/track route (same-origin, no secret exposed to the
// browser) which forwards to the LCW Workspace tool server-side. See
// app/api/assessment/track/route.ts and app/api/assessment/submit/route.ts.
type FunnelEvent = 'started' | 'question_answered' | 'completed' | 'retaken'

export function trackFunnelEvent(payload: {
  session_id: string
  event: FunnelEvent
  question_number?: number
  total_questions?: number
  answer_index?: number
  stage?: string
  locale?: string
}) {
  fetch('/api/assessment/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Best-effort — a dropped tracking call should never block the assessment UI.
  })
}
