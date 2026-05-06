'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const QUESTIONS = [
  {
    id: 1,
    routing: true,
    text: "What best describes why you're here?",
    answers: [
      "We want to use AI in our operations but don't know where to start",
      "We have a low-code platform but it's not delivering what we expected",
      "We're running digital transformation initiatives but struggling with delivery",
      "We need project or product leadership for a complex programme",
    ],
  },
  {
    id: 2,
    text: 'How many people are involved in your digital initiatives?',
    answers: [
      'Just me or a small team (1–5)',
      'A dedicated team (6–20)',
      'A programme with multiple teams (20+)',
      "We don't have a clear team yet",
    ],
  },
  {
    id: 3,
    text: 'Do you have defined standards for how digital products are built?',
    answers: [
      'No standards exist',
      'Some informal guidelines',
      "Documented standards that aren't consistently followed",
      'Enforced governance with clear ownership',
    ],
  },
  {
    id: 4,
    text: 'Have you deployed any AI-assisted features into production?',
    answers: [
      "No, we haven't started",
      "We're experimenting but nothing in production",
      'One or two things in production',
      'AI is part of multiple live products',
    ],
  },
  {
    id: 5,
    text: 'How would you describe your current platform situation?',
    answers: [
      "We don't have a platform strategy yet",
      "We have tools but they're fragmented",
      "One main platform but we've stalled after initial adoption",
      'A running platform that needs to scale or modernise',
    ],
  },
  {
    id: 6,
    text: 'Who owns digital transformation decisions in your organisation?',
    answers: [
      "It's unclear or nobody owns it",
      "IT owns it but business isn't aligned",
      'Shared between IT and business but coordination is hard',
      'Clear ownership with executive sponsorship',
    ],
  },
  {
    id: 7,
    text: "What's your biggest blocker right now?",
    answers: [
      "We don't know what good looks like",
      "We know what we want but can't execute",
      "We're executing but delivery is slow or inconsistent",
      'We have delivery but no governance or sustainability',
    ],
  },
  {
    id: 8,
    text: 'What does success look like in 12 months?',
    answers: [
      'A clear strategy and roadmap',
      'AI or new platform capabilities in production',
      'A capable internal team that runs independently',
      'A programme delivered on time with measurable business impact',
    ],
  },
]

const ANSWER_LABELS = ['A', 'B', 'C', 'D']

export default function AssessmentPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const direction = useRef(1)
  const [complete, setComplete] = useState(false)

  const question = QUESTIONS[step]

  const handleAnswer = (answerIndex: number) => {
    direction.current = 1
    const updated = [...answers.slice(0, step), answerIndex]
    setAnswers(updated)

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setComplete(true)
    }
  }

  const handleBack = () => {
    if (step === 0) return
    direction.current = -1
    setStep(step - 1)
  }

  const variants = {
    enter: () => ({ x: direction.current * 64, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: () => ({ x: direction.current * -64, opacity: 0 }),
  }

  if (complete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Assessment complete
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Calculating your baseline…
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Scoring and results UI coming in Prompt 2.
          </p>
        </div>
      </div>
    )
  }

  const progressPct = (step / QUESTIONS.length) * 100

  return (
    <div className="bg-background min-h-screen">
      {/* Thin progress line — sticky just below nav */}
      <div className="sticky top-16 z-10 w-full h-0.5 bg-muted">
        <motion.div
          className="h-full bg-foreground origin-left"
          initial={false}
          animate={{ scaleX: progressPct / 100 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-6 pt-10 pb-20">
        {/* Step counter + back */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={handleBack}
            className={`flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors ${
              step === 0 ? 'invisible pointer-events-none' : ''
            }`}
            aria-hidden={step === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <span className="text-sm text-muted-foreground tabular-nums">
            {step + 1} <span className="text-muted-foreground/40">/ {QUESTIONS.length}</span>
          </span>
        </div>

        {/* Animated question + answers */}
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
                  About you
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
    </div>
  )
}
