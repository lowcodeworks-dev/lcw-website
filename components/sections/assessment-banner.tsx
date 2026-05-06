'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { WORKSPACE_ASSESSMENT_URL } from '@/lib/config'

export function AssessmentBanner() {
  const t = useTranslations('assessment_banner')

  return (
    <section className="bg-muted border-b border-border py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              {t('label')}
            </p>
            <p className="text-xl md:text-2xl font-bold text-foreground leading-snug tracking-tight mb-2">
              {t('headline')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('body')}
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex flex-wrap gap-3">
              <a
                href={WORKSPACE_ASSESSMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/85 transition-colors whitespace-nowrap"
              >
                {t('cta_primary')}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-foreground font-semibold rounded-full hover:bg-background transition-colors whitespace-nowrap"
              >
                {t('cta_secondary')}
              </a>
            </div>
            <p className="text-xs text-muted-foreground">{t('qualifier')}</p>
          </div>

        </div>
      </div>
    </section>
  )
}
