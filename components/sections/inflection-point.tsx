'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function InflectionPoint() {
  const t = useTranslations('inflection_point')

  return (
    <section id="why-now" className="bg-foreground text-background py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-widest opacity-50 mb-8"
          >
            {t('label')}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-10"
          >
            {t('headline')}
          </motion.h2>

          <div className="space-y-6 mb-12">
            {(['body1', 'body2', 'body3'] as const).map((key, i) => (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="text-lg opacity-75 leading-relaxed"
              >
                {t(key)}
              </motion.p>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-2xl md:text-3xl font-bold"
          >
            {t('closing')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
