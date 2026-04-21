'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen bg-[#F1F2EB] flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Label */}
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F04A00] mb-8">
            {t('label')}
          </p>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-[#17280B] leading-[1.05] tracking-tight max-w-4xl mb-8">
            {t('headline')}
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed mb-12">
            {t('subtext')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F04A00] text-white font-semibold rounded-full hover:bg-[#d43e00] transition-colors"
            >
              {t('cta_primary')}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 px-6 py-3.5 border-2 border-[#17280B] text-[#17280B] font-semibold rounded-full hover:bg-[#17280B] hover:text-white transition-colors"
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
          <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px h-8 bg-gray-300"
          />
        </motion.div>
      </div>
    </section>
  )
}
