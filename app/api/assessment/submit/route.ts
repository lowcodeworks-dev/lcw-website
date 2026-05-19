import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import enMessages from '@/messages/en.json'
import koMessages from '@/messages/ko.json'
import jaMessages from '@/messages/ja.json'

const NOTIFY_EMAIL = 'info@lowcodeworks.consulting'
const FROM_ADDRESS = 'LCW Assessment <assessment@lowcodeworks.consulting>'

// ─── Email templates (user confirmation) ─────────────────────────────────────

const EMAIL_TEMPLATES = {
  en: {
    subject: 'Your Digital Transformation Readiness Assessment',
    greeting: (name: string) => `Hi ${name},`,
    thanks: 'Thanks for completing the Digital Transformation Readiness Assessment.',
    result: (stage: string) => `Your result: ${stage} stage`,
    focusHeader: 'Your top 3 focus areas:',
    closing: "We'll be in touch soon to walk through your results. Feel free to reply to this email in the meantime.",
  },
  ko: {
    subject: '디지털 전환 준비도 평가 결과',
    greeting: (name: string) => `안녕하세요 ${name}님,`,
    thanks: '디지털 전환 준비도 평가를 완료해 주셔서 감사합니다.',
    result: (stage: string) => `귀하의 결과: ${stage} 단계`,
    focusHeader: '상위 3가지 집중 영역:',
    closing: '귀하의 결과를 함께 검토할 수 있도록 곧 연락드리겠습니다. 그 전에 언제든지 이 이메일에 답장하셔도 됩니다.',
  },
  ja: {
    subject: 'デジタルトランスフォーメーション準備度アセスメント',
    greeting: (name: string) => `${name}様、`,
    thanks: 'デジタルトランスフォーメーション準備度アセスメントをご完了いただきありがとうございます。',
    result: (stage: string) => `あなたの結果: ${stage}ステージ`,
    focusHeader: 'トップ3の重点領域:',
    closing: '結果についてご説明するために近日中にご連絡いたします。それまでの間、このメールにご返信いただいても構いません。',
  },
} as const

type SupportedLocale = keyof typeof EMAIL_TEMPLATES

// ─── Locale-specific lookups for stage and dimension names ────────────────────

type AssessmentT = typeof enMessages.assessment
const assessmentMessages: Record<string, AssessmentT> = {
  en: enMessages.assessment,
  ko: koMessages.assessment,
  ja: jaMessages.assessment,
}

function localizeStage(m: AssessmentT, stage: string): string {
  if (stage === 'Leading') return m.stage_leading
  if (stage === 'Scaling') return m.stage_scaling
  if (stage === 'Developing') return m.stage_developing
  return m.stage_foundation
}

function localizeDim(m: AssessmentT, name: string): string {
  if (name === 'AI & Platform Readiness') return m.dim_ai_platform
  if (name === 'Governance & Standards') return m.dim_governance
  if (name === 'Delivery Capability') return m.dim_delivery
  return m.dim_alignment
}

// ─── English question/answer list (for Danny's notification email) ────────────

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
    const { name, company, email, message, honeypot, turnstileToken, locale, stage, dimensions, answers } =
      body as {
        name: string
        company: string
        email: string
        message: string
        honeypot: string
        turnstileToken: string
        locale: string
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

    // English Q&A lines for Danny's notification
    const qaLines = answers.map((answerIndex, i) => {
      const q = QUESTIONS[i]
      return `Q${i + 1}: ${q.text}\n→ ${q.answers[answerIndex]}`
    })

    // Resolve locale-specific content for user email
    const safeLocale: SupportedLocale = (locale in EMAIL_TEMPLATES ? locale : 'en') as SupportedLocale
    const tmpl = EMAIL_TEMPLATES[safeLocale]
    const m = assessmentMessages[safeLocale] ?? assessmentMessages.en
    const localizedStage = localizeStage(m, stage)
    const localizedFocusDimensions = focusDimensions.map((d) => ({
      name: localizeDim(m, d.name),
      score: d.score,
    }))

    const localeTag = safeLocale !== 'en' ? `[${safeLocale}] ` : ''

    // TODO: POST to LCW Workspace CRM — endpoint to be built in lcw-workspace session
    console.log('[CRM TODO] New assessment lead:', { name, company, email, stage, locale })

    // Notify Danny — always in English, locale tag in subject for triage
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `${localeTag}New assessment — ${stage} — ${name} at ${company || 'unknown company'}`,
      text: [
        `New Digital Transformation Readiness Assessment completed.`,
        ``,
        `Name:    ${name}`,
        `Company: ${company || '—'}`,
        `Email:   ${email}`,
        `Locale:  ${safeLocale}`,
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

    // Confirm to user — in their locale
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: tmpl.subject,
      text: [
        tmpl.greeting(name),
        ``,
        tmpl.thanks,
        ``,
        tmpl.result(localizedStage),
        ``,
        tmpl.focusHeader,
        ...localizedFocusDimensions.map((d, i) => `  ${i + 1}. ${d.name} — ${d.score.toFixed(1)} / 4`),
        ``,
        tmpl.closing,
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
