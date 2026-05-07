import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const NOTIFY_EMAIL = 'info@lowcodeworks.consulting'
const FROM_ADDRESS = 'LCW Assessment <assessment@lowcodeworks.consulting>'

interface Dimension {
  name: string
  score: number
}

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: token,
      ...(ip && { remoteip: ip }),
    }),
  })
  const data = await res.json()
  return data.success === true
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, message, honeypot, turnstileToken, stage, dimensions, answers } =
      body as {
        name: string
        company: string
        email: string
        message: string
        honeypot: string
        turnstileToken: string
        stage: string
        dimensions: Dimension[]
        answers: number[]
      }

    // Honeypot — silently succeed, do nothing
    if (honeypot) {
      return NextResponse.json({ success: true })
    }

    // Turnstile server-side verification
    const ip =
      request.headers.get('CF-Connecting-IP') ?? request.headers.get('x-forwarded-for')
    const valid = await verifyTurnstile(turnstileToken, ip)
    if (!valid) {
      return NextResponse.json(
        { error: 'Security check failed. Please refresh and try again.' },
        { status: 400 }
      )
    }

    const focusDimensions = [...dimensions]
      .sort((a, b) => a.score - b.score)
      .slice(0, 3)

    // TODO: POST to LCW Workspace CRM — endpoint to be built in lcw-workspace session
    // await fetch('https://workspace.lowcodeworks.consulting/api/leads', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.CRM_API_KEY}` },
    //   body: JSON.stringify({ name, company, email, message, stage, dimensions, answers }),
    // })
    console.log('[CRM TODO] New assessment lead:', { name, company, email, stage })

    // Notify Danny
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New assessment — ${stage} — ${name} at ${company || 'unknown company'}`,
      text: [
        `New Digital Transformation Readiness Assessment completed.`,
        ``,
        `Name:    ${name}`,
        `Company: ${company || '—'}`,
        `Email:   ${email}`,
        ``,
        `Stage: ${stage}`,
        ``,
        `Top 3 focus areas:`,
        ...focusDimensions.map((d, i) => `  ${i + 1}. ${d.name} — ${d.score.toFixed(1)} / 4`),
        ``,
        `All dimension scores:`,
        ...dimensions.map((d) => `  ${d.name}: ${d.score.toFixed(1)} / 4`),
        ``,
        `Message: ${message || '(none)'}`,
      ].join('\n'),
    })

    // Confirm to user
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: 'Your Digital Transformation Readiness Assessment',
      text: [
        `Hi ${name},`,
        ``,
        `Thanks for completing the Digital Transformation Readiness Assessment.`,
        ``,
        `Your result: ${stage} stage`,
        ``,
        `Your top 3 focus areas:`,
        ...focusDimensions.map((d, i) => `  ${i + 1}. ${d.name} — ${d.score.toFixed(1)} / 4`),
        ``,
        `We'll send you the full breakdown within 24 hours. In the meantime, feel free to reply to this email with any questions.`,
        ``,
        `— Danny & Jessy`,
        `LowCodeWorks`,
        `lowcodeworks.consulting`,
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[assessment/submit]', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
