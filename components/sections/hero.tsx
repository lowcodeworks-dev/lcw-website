'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { WORKSPACE_ASSESSMENT_URL } from '@/lib/config'
import posthog from 'posthog-js'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen bg-background flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Byline */}
          <div className="flex items-center gap-3 mb-7">
            <Image
              src="/images/founder-photo.jpg"
              alt="Danny Hildebrand"
              width={44}
              height={44}
              className="w-11 h-11 rounded-full border border-border object-cover shrink-0"
            />
            <p className="text-xs text-muted-foreground leading-snug">{t('byline')}</p>
          </div>

          {/* Label */}
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            {t('label')}
            <span className="block">{t('label_sub')}</span>
          </p>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-[1.05] tracking-tight max-w-4xl mb-8">
            {t('headline')}
          </h1>

          {/* Subtext */}
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
            {t('subtext')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href={WORKSPACE_ASSESSMENT_URL}
              onClick={() => posthog.capture('hero_cta_clicked', { cta: 'primary' })}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/85 transition-colors"
            >
              {t('cta_primary')}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              onClick={() => posthog.capture('hero_contact_clicked')}
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-border text-foreground font-semibold rounded-full hover:bg-muted transition-colors"
            >
              {t('cta_secondary')}
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px h-8 bg-border"
          />
        </motion.div>
      </div>
    </section>
  )
}
