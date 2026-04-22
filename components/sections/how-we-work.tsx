'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function HowWeWork() {
  const t = useTranslations('process')

  const steps = [
    { num: t('step1_num'), title: t('step1_title'), desc: t('step1_desc') },
    { num: t('step2_num'), title: t('step2_title'), desc: t('step2_desc') },
    { num: t('step3_num'), title: t('step3_title'), desc: t('step3_desc') },
    { num: t('step4_num'), title: t('step4_title'), desc: t('step4_desc') },
  ]

  return (
    <section id="process" className="bg-muted py-28">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            {t('label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            {t('headline')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6 p-8 bg-background rounded-2xl"
            >
              <span className="text-5xl font-bold text-foreground/10 leading-none select-none shrink-0">
                {step.num}
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
