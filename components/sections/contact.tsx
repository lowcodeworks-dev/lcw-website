'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function Contact() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="bg-[#17280B] py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F04A00] mb-6">
            {t('label')}
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            {t('headline')}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-12">
            {t('subtext')}
          </p>
          <a
            href={`mailto:${t('email')}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#F04A00] text-white font-semibold text-lg rounded-full hover:bg-[#d43e00] transition-colors"
          >
            {t('cta')}
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-6 text-sm text-gray-500">{t('email')}</p>
        </motion.div>
      </div>
    </section>
  )
}
