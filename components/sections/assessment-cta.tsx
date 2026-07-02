'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { WORKSPACE_ASSESSMENT_URL } from '@/lib/config'
import posthog from 'posthog-js'

export function AssessmentCta() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 bg-card border border-border rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Start here
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight mb-3">
              Not sure where to begin?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Most engagements start with an assessment — a structured review across 6 dimensions, delivered as a scored report. It creates clarity before anything else is scoped or priced.
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <a
              href={WORKSPACE_ASSESSMENT_URL}
              onClick={() => posthog.capture('assessment_cta_clicked', { location: 'assessment_cta' })}
              className="inline-flex items-center gap-2 px-7 py-4 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/85 transition-colors whitespace-nowrap"
            >
              Take the free assessment
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="text-xs text-muted-foreground text-center">We'll scope it together</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
