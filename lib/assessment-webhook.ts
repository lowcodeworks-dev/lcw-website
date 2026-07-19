// Server-side forwarding to the LCW Workspace tool. ASSESSMENT_WEBHOOK_URL
// points at its /api/webhook/assessment endpoint; funnel step events go to
// the sibling /api/webhook/assessment-funnel endpoint at the same host.
const WEBHOOK_URL = process.env.ASSESSMENT_WEBHOOK_URL
const WEBHOOK_SECRET = process.env.ASSESSMENT_WEBHOOK_SECRET

async function post(suffix: string, body: unknown) {
  if (!WEBHOOK_URL || !WEBHOOK_SECRET) return
  try {
    await fetch(`${WEBHOOK_URL}${suffix}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-webhook-secret': WEBHOOK_SECRET },
      body: JSON.stringify(body),
    })
  } catch {
    // Best-effort — forwarding failures shouldn't break the assessment submit flow.
  }
}

export function forwardAssessmentLead(payload: {
  name: string
  company?: string | null
  email: string
  locale: string
  stage: string
  answers: number[]
  dimensions: { name: string; score: number }[]
  message?: string | null
  session_id?: string
}) {
  return post('', payload)
}

export function trackFunnelServerEvent(payload: {
  session_id: string
  event: 'submission_received' | 'submission_failed'
  reason?: string
  stage?: string
  locale?: string
}) {
  return post('-funnel', payload)
}
