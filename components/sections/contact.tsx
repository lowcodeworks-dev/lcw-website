'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import posthog from 'posthog-js'

export function Contact() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="bg-foreground py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-6">
            {t('label')}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-background leading-tight tracking-tight mb-6">
            {t('headline')}
          </h2>
          <p className="text-background/60 text-lg leading-relaxed mb-4">
            {t('subtext')}
          </p>
          <p className="text-background/70 text-sm mb-12">{t('availability')}</p>

          {/* Primary CTA — email */}
          <a
            href={`mailto:${t('email')}`}
            onClick={() => posthog.capture('contact_email_clicked', { location: 'contact_section' })}
            className="inline-flex items-center gap-3 px-8 py-4 bg-background text-foreground font-semibold text-lg rounded-full hover:bg-background/90 transition-colors"
          >
            {t('cta')}
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-5 text-sm text-background/40">{t('cta_followup')}</p>
        </motion.div>

        {/* Partner callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 max-w-2xl border-t border-background/10 pt-10"
        >
          <p className="text-sm font-semibold text-background/70 mb-1">{t('partner_headline')}</p>
          <p className="text-sm text-background/40 leading-relaxed">
            {t('partner_body')}{' '}
            <a
              href={`mailto:${t('email')}`}
              className="text-background/60 underline underline-offset-2 hover:text-background/80 transition-colors"
            >
              {t('email')}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
