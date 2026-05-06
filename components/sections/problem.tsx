'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function Problem() {
  const t = useTranslations('problem')

  return (
    <section className="bg-background py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-8"
          >
            {t('headline')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg text-muted-foreground leading-relaxed mb-10"
          >
            {t('body')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-foreground mb-12"
          >
            {t('punchline')}
          </motion.p>

        </div>
      </div>
    </section>
  )
}
