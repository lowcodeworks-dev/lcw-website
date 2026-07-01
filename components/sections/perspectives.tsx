'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

const ITEMS = ['item1', 'item2', 'item3'] as const

export function Perspectives() {
  const t = useTranslations('perspectives')

  return (
    <section className="bg-background py-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          {t('eyebrow')}
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-10">
          {t('headline')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {ITEMS.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-l-2 border-border pl-5"
            >
              <p className="text-foreground leading-relaxed">
                &ldquo;{t(`${key}_quote`)}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground mt-3">{t(`${key}_src`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
