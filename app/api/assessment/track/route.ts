import { NextResponse } from 'next/server'

// Same-origin proxy: the browser calls this route (no secret involved), and
// this route forwards to the LCW Workspace webhook server-side, where
// ASSESSMENT_WEBHOOK_SECRET actually lives. Keeps that secret out of the
// client bundle entirely.
export async function POST(request: Request) {
  const url = process.env.ASSESSMENT_WEBHOOK_URL
  const secret = process.env.ASSESSMENT_WEBHOOK_SECRET
  if (!url || !secret) {
    // Tracking is best-effort — missing config shouldn't surface as an error to the visitor.
    return NextResponse.json({ success: true })
  }

  const body = await request.text()
  const forwardedIp =
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('x-forwarded-for') ??
    ''

  try {
    await fetch(`${url}-funnel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': secret,
        ...(forwardedIp && { 'x-forwarded-for': forwardedIp }),
      },
      body,
    })
  } catch {
    // Best-effort — swallow network errors from the downstream call too.
  }

  return NextResponse.json({ success: true })
}
