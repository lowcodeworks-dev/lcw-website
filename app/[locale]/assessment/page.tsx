'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import Script from 'next/script'
import { useTranslations, useLocale } from 'next-intl'
import posthog from 'posthog-js'

const ANSWER_LABELS = ['A', 'B', 'C', 'D']

// ─── Scoring ──────────────────────────────────────────────────────────────────

const SCORE_Q2 = [2, 3, 4, 1]
const SCORE_Q3 = [1, 2, 3, 4]
const SCORE_Q4 = [1, 2, 3, 4]
const SCORE_Q5 = [1, 2, 2, 4]
const SCORE_Q6 = [1, 2, 3, 4]
const SCORE_Q7 = [1, 2, 3, 4]
const SCORE_Q8 = [1, 2, 3, 4]

type Dimension = { name: string; score: number }

// English dimension names — these are the canonical IDs used for scoring and API submission
function computeDimensions(answers: number[]): Dimension[] {
  const [, q2, q3, q4, q5, q6, q7, q8] = answers
  return [
    { name: 'AI & Platform Readiness', score: (SCORE_Q4[q4] + SCORE_Q5[q5]) / 2 },
    { name: 'Governance & Standards',  score: (SCORE_Q3[q3] + SCORE_Q6[q6]) / 2 },
    { name: 'Delivery Capability',     score: (SCORE_Q2[q2] + SCORE_Q7[q7]) / 2 },
    { name: 'Organisational Alignment', score: (SCORE_Q6[q6] + SCORE_Q8[q8]) / 2 },
  ]
}

// English stage name — used for API submission; localized separately for display
function getStage(dimensions: Dimension[]): string {
  const avg = dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length
  if (avg >= 3.5) return 'Leading'
  if (avg >= 2.8) return 'Scaling'
  if (avg >= 2.0) return 'Developing'
  return 'Foundation'
}

// ─── Radar chart (pure SVG) ───────────────────────────────────────────────────

function RadarChart({ dimensions }: { dimensions: Dimension[] }) {
  const cx = 110, cy = 110, maxR = 82
  const angles = dimensions.map((_, i) => (i * Math.PI) / 2 - Math.PI / 2)

  const toXY = (r: number, angle: number) => ({
    x: +(cx + r * Math.cos(angle)).toFixed(2),
    y: +(cy + r * Math.sin(angle)).toFixed(2),
  })

  const polyPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'

  const scorePoints = dimensions.map((d, i) => toXY((d.score / 4) * maxR, angles[i]))

  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[220px] mx-auto text-foreground">
      {[1, 2, 3, 4].map((level) => {
        const pts = angles.map((a) => toXY((level / 4) * maxR, a))
        return (
          <path key={level} d={polyPath(pts)} fill="none" stroke="currentColor"
            strokeOpacity={level === 4 ? 0.18 : 0.09} strokeWidth={1} />
        )
      })}
      {angles.map((angle, i) => {
        const end = toXY(maxR, angle)
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y}
          stroke="currentColor" strokeOpacity={0.14} strokeWidth={1} />
      })}
      <path d={polyPath(scorePoints)} fill="currentColor" fillOpacity={0.13}
        stroke="currentColor" strokeWidth={2} strokeLinejoin="round" />
      {scorePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="currentColor" />
      ))}
    </svg>
  )
}

// ─── Input shared style ───────────────────────────────────────────────────────

const inputCls =
  'px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-1 focus:ring-foreground/40 transition'

// ─── Results page ─────────────────────────────────────────────────────────────

function Results({ answers, onRetake }: { answers: number[]; onRetake: () => void }) {
  const t = useTranslations('assessment')
  const locale = useLocale()

  const dimensions = computeDimensions(answers)
  const stage = getStage(dimensions)

  // Localized stage name for display
  const localizedStage =
    stage === 'Leading' ? t('stage_leading') :
    stage === 'Scaling' ? t('stage_scaling') :
    stage === 'Developing' ? t('stage_developing') :
    t('stage_foundation')

  // Localized paragraphs — built as array to avoid dynamic key lookup
  const paragraphs = [
    t('q1_para1', { stage: localizedStage }),
    t('q1_para2', { stage: localizedStage }),
    t('q1_para3', { stage: localizedStage }),
    t('q1_para4', { stage: localizedStage }),
  ]
  const paragraph = paragraphs[answers[0]]

  // Split stage_headline so the stage word can be wrapped in a <span>
  const STAGE_MARKER = '⁠STAGE⁠'
  const rawHeadline = t('stage_headline', { stage: STAGE_MARKER })
  const headlineParts = rawHeadline.split(STAGE_MARKER)

  const focusAreas = [...dimensions].sort((a, b) => a.score - b.score).slice(0, 3)

  // Form state
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    ;(window as any).__lcwTurnstileOk = (token: string) => setTurnstileToken(token)
    ;(window as any).__lcwTurnstileErr = () => setTurnstileToken(null)
    return () => {
      delete (window as any).__lcwTurnstileOk
      delete (window as any).__lcwTurnstileErr
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const name = fd.get('name') as string
    const email = fd.get('email') as string
    const company = fd.get('company') as string

    setFormStatus('loading')
    setFormError('')

    const distinctId = posthog.get_distinct_id()

    try {
      const res = await fetch('/api/assessment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-POSTHOG-DISTINCT-ID': distinctId ?? '',
        },
        body: JSON.stringify({
          name,
          company,
          email,
          message: fd.get('message'),
          honeypot: fd.get('website'),
          turnstileToken,
          locale,
          stage,       // English — used for Danny's notification email
          dimensions,  // English names — used for Danny's notification email
          answers,
        }),
      })

      const data = await res.json()
      if (data.success) {
        posthog.identify(email, { name, email, company })
        posthog.capture('assessment_contact_form_submitted', {
          stage,
          locale,
          dimensions: dimensions.map((d) => ({ name: d.name, score: d.score })),
        })
        setFormStatus('success')
      } else {
        posthog.capture('assessment_contact_form_errored', {
          stage,
          locale,
          error: data.error,
        })
        setFormStatus('error')
        setFormError(data.error ?? t('error_generic'))
      }
    } catch (err) {
      posthog.captureException(err)
      posthog.capture('assessment_contact_form_errored', {
        stage,
        locale,
        error: 'network_error',
      })
      setFormStatus('error')
      setFormError(t('error_generic'))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl mx-auto px-6 pt-14 pb-24"
    >
      {/* Stage headline */}
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          {t('your_baseline')}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-6">
          {headlineParts[0]}
          <span className="border-b-2 border-foreground pb-0.5">{localizedStage}</span>
          {headlineParts[1]}
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl">{paragraph}</p>
      </div>

      {/* Radar + dimension scores */}
      <div className="grid md:grid-cols-[220px_1fr] gap-10 items-center mb-14">
        <RadarChart dimensions={dimensions} />
        <div className="flex flex-col gap-5">
          {dimensions.map((d, i) => (
            <motion.div key={d.name}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-foreground">
                  {d.name === 'AI & Platform Readiness' ? t('dim_ai_platform') :
                   d.name === 'Governance & Standards' ? t('dim_governance') :
                   d.name === 'Delivery Capability' ? t('dim_delivery') :
                   t('dim_alignment')}
                </span>
                <span className="text-muted-foreground tabular-nums">
                  {d.score.toFixed(1)}&thinsp;/&thinsp;4
                </span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div className="h-full bg-foreground rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(d.score / 4) * 100}%` }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: 'easeOut' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Where to focus first */}
      <div className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
          {t('where_to_focus')}
        </p>
        <div className="flex flex-col gap-3">
          {focusAreas.map((d, i) => (
            <motion.div key={d.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.35 }}
              className="flex items-center gap-3 md:gap-5 px-4 md:px-6 py-4 rounded-2xl border border-border">
              <span className="text-xs font-bold text-muted-foreground w-4 shrink-0">{i + 1}</span>
              <span className="font-medium text-foreground flex-1">
                {d.name === 'AI & Platform Readiness' ? t('dim_ai_platform') :
                 d.name === 'Governance & Standards' ? t('dim_governance') :
                 d.name === 'Delivery Capability' ? t('dim_delivery') :
                 t('dim_alignment')}
              </span>
              <span className="text-sm text-muted-foreground tabular-nums">
                {d.score.toFixed(1)}&thinsp;/&thinsp;4
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="border-t border-border pt-14"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          {t('get_breakdown')}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          {t('talk_results')}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10 max-w-lg">
          {t('talk_results_body')}
        </p>

        {formStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg p-6 rounded-2xl border border-border bg-muted"
          >
            <p className="font-semibold text-foreground mb-1">{t('message_sent_title')}</p>
            <p className="text-sm text-muted-foreground">{t('message_sent_body')}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg" noValidate>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="afterInteractive"
            />

            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 0, height: 0, overflow: 'hidden' }}
            >
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" placeholder={t('name_placeholder')} required className={inputCls} />
              <input name="company" placeholder={t('company_placeholder')} className={inputCls} />
            </div>
            <input name="email" type="email" placeholder={t('email_placeholder')} required className={inputCls} />
            <textarea
              name="message"
              rows={3}
              placeholder={t('message_placeholder')}
              className={`${inputCls} resize-none`}
            />

            <div
              className="cf-turnstile"
              data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''}
              data-callback="__lcwTurnstileOk"
              data-error-callback="__lcwTurnstileErr"
              data-theme="light"
            />

            {formStatus === 'error' && (
              <p className="text-sm text-red-500">{formError}</p>
            )}

            <div className="flex items-center gap-4 flex-wrap pt-1">
              <button
                type="submit"
                disabled={formStatus === 'loading' || !turnstileToken}
                className="px-6 py-3 bg-foreground text-background font-semibold rounded-full text-sm hover:bg-foreground/85 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {formStatus === 'loading' ? t('sending') : t('send_message')}
              </button>
              <button
                type="button"
                onClick={onRetake}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t('retake')}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const t = useTranslations('assessment')

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const direction = useRef(1)
  const [complete, setComplete] = useState(false)

  // Questions built from translations — localized for the current locale
  const QUESTIONS = [
    {
      id: 1,
      routing: true,
      text: t('q1_text'),
      answers: [t('q1_a1'), t('q1_a2'), t('q1_a3'), t('q1_a4')],
    },
    { id: 2, text: t('q2_text'), answers: [t('q2_a1'), t('q2_a2'), t('q2_a3'), t('q2_a4')] },
    { id: 3, text: t('q3_text'), answers: [t('q3_a1'), t('q3_a2'), t('q3_a3'), t('q3_a4')] },
    { id: 4, text: t('q4_text'), answers: [t('q4_a1'), t('q4_a2'), t('q4_a3'), t('q4_a4')] },
    { id: 5, text: t('q5_text'), answers: [t('q5_a1'), t('q5_a2'), t('q5_a3'), t('q5_a4')] },
    { id: 6, text: t('q6_text'), answers: [t('q6_a1'), t('q6_a2'), t('q6_a3'), t('q6_a4')] },
    { id: 7, text: t('q7_text'), answers: [t('q7_a1'), t('q7_a2'), t('q7_a3'), t('q7_a4')] },
    { id: 8, text: t('q8_text'), answers: [t('q8_a1'), t('q8_a2'), t('q8_a3'), t('q8_a4')] },
  ]

  const question = QUESTIONS[step]

  const handleAnswer = (answerIndex: number) => {
    direction.current = 1
    const updated = [...answers.slice(0, step), answerIndex]
    setAnswers(updated)

    if (step === 0) {
      posthog.capture('assessment_started', { question_number: 1, total_questions: QUESTIONS.length })
    }

    posthog.capture('assessment_question_answered', {
      question_number: step + 1,
      total_questions: QUESTIONS.length,
      answer_index: answerIndex,
    })

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      const dimensions = computeDimensions(updated)
      const stage = getStage(dimensions)
      posthog.capture('assessment_completed', {
        stage,
        dimensions: dimensions.map((d) => ({ name: d.name, score: d.score })),
      })
      setComplete(true)
    }
  }

  const handleBack = () => {
    if (step === 0) return
    direction.current = -1
    setStep(step - 1)
  }

  const handleRetake = () => {
    posthog.capture('assessment_retaken')
    setStep(0)
    setAnswers([])
    setComplete(false)
  }

  const variants = {
    enter: () => ({ x: direction.current * 64, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: () => ({ x: direction.current * -64, opacity: 0 }),
  }

  return (
    <div className="bg-background min-h-screen">
      {!complete && (
        <div className="sticky top-16 z-10 w-full h-0.5 bg-muted">
          <motion.div
            className="h-full bg-foreground origin-left"
            initial={false}
            animate={{ scaleX: step / QUESTIONS.length }}
            style={{ transformOrigin: 'left' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      )}

      {complete ? (
        <Results answers={answers} onRetake={handleRetake} />
      ) : (
        <div className="max-w-2xl mx-auto px-6 pt-10 pb-20">
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={handleBack}
              className={`flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors ${
                step === 0 ? 'invisible pointer-events-none' : ''
              }`}
              aria-hidden={step === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              {t('back')}
            </button>
            <span className="text-sm text-muted-foreground tabular-nums">
              {step + 1}{' '}
              <span className="text-muted-foreground/40">/ {QUESTIONS.length}</span>
            </span>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              >
                {question.routing && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                    {t('about_you')}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug tracking-tight mb-10">
                  {question.text}
                </h2>
                <div className="flex flex-col gap-3">
                  {question.answers.map((answer, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.12 }}
                      className="group w-full text-left px-6 py-5 rounded-2xl border border-border bg-background hover:bg-foreground hover:border-foreground transition-colors"
                    >
                      <span className="flex items-start gap-4">
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-background/40 shrink-0 mt-0.5 w-4">
                          {ANSWER_LABELS[i]}
                        </span>
                        <span className="text-sm md:text-base font-medium leading-snug text-foreground group-hover:text-background">
                          {answer}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
