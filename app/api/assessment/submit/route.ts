import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const NOTIFY_EMAIL = 'info@lowcodeworks.consulting'
const FROM_ADDRESS = 'LCW Assessment <assessment@lowcodeworks.consulting>'

const QUESTIONS = [
  {
    text: "What best describes why you're here?",
    answers: [
      "We want to use AI in our operations but don't know where to start",
      "We have a low-code platform but it's not delivering what we expected",
      "We're running digital transformation initiatives but struggling with delivery",
      'We need project or product leadership for a complex programme',
    ],
  },
  {
    text: 'How many people are involved in your digital initiatives?',
    answers: [
      'Just me or a small team (1–5)',
      'A dedicated team (6–20)',
      'A programme with multiple teams (20+)',
      "We don't have a clear team yet",
    ],
  },
  {
    text: 'Do you have defined standards for how digital products are built?',
    answers: [
      'No standards exist',
      'Some informal guidelines',
      "Documented standards that aren't consistently followed",
      'Enforced governance with clear ownership',
    ],
  },
  {
    text: 'Have you deployed any AI-assisted features into production?',
    answers: [
      "No, we haven't started",
      "We're experimenting but nothing in production",
      'One or two things in production',
      'AI is part of multiple live products',
    ],
  },
  {
    text: 'How would you describe your current platform situation?',
    answers: [
      "We don't have a platform strategy yet",
      "We have tools but they're fragmented",
      "One main platform but we've stalled after initial adoption",
      'A running platform that needs to scale or modernise',
    ],
  },
  {
    text: 'Who owns digital transformation decisions in your organisation?',
    answers: [
      "It's unclear or nobody owns it",
      "IT owns it but business isn't aligned",
      'Shared between IT and business but coordination is hard',
      'Clear ownership with executive sponsorship',
    ],
  },
  {
    text: "What's your biggest blocker right now?",
    answers: [
      "We don't know what good looks like",
      "We know what we want but can't execute",
      "We're executing but delivery is slow or inconsistent",
      'We have delivery but no governance or sustainability',
    ],
  },
  {
    text: 'What does success look like in 12 months?',
    answers: [
      'A clear strategy and roadmap',
      'AI or new platform capabilities in production',
      'A capable internal team that runs independently',
      'A programme delivered on time with measurable business impact',
    ],
  },
]

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
  const resend = new Resend(process.env.RESEND_API_KEY)
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

    const qaLines = answers.map((answerIndex, i) => {
      const q = QUESTIONS[i]
      return `Q${i + 1}: ${q.text}\n→ ${q.answers[answerIndex]}`
    })

    // TODO: POST to LCW Workspace CRM — endpoint to be built in lcw-workspace session
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
        `Answers:`,
        ...qaLines.map(line => `  ${line}`),
        ``,
        `What they want to discuss: ${message || '(not filled in)'}`,
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
        `We'll be in touch soon to walk through your results. Feel free to reply to this email in the meantime.`,
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
