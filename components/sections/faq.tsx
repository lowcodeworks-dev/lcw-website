'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function FAQ() {
  const t = useTranslations('faq')

  const items = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
  ]

  return (
    <section className="bg-background py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left: header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              {t('label')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
              {t('headline')}
            </h2>
          </motion.div>

          {/* Right: Q&A list */}
          <div className="flex flex-col divide-y divide-border">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="py-8 first:pt-0"
              >
                <p className="font-semibold text-foreground mb-2">{item.q}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
