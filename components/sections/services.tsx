'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

// Placeholder copy — replaced with final copy in Phase 3
const LAYERS = [
  {
    title: 'Enterprise transformation',
    desc: 'Governance frameworks, Centre of Excellence setup, and delivery leadership for organisations scaling digital platforms — regardless of which platform.',
  },
  {
    title: 'Graph + AI + orchestration',
    desc: 'Where connected data, reasoning, and low-code execution meet. Graph gives context, AI reasons on it, orchestration makes it actionable.',
  },
]

export function Services() {
  const t = useTranslations('services')

  return (
    <section id="services" className="bg-foreground py-28">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-4">
            {t('label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-background leading-tight tracking-tight max-w-2xl">
            Two layers of the same problem.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border border-background/10 rounded-2xl p-8 flex flex-col gap-4 hover:bg-background/5 transition-colors"
            >
              <span className="text-4xl font-bold text-background/30 select-none">0{i + 1}</span>
              <h3 className="text-xl font-bold text-background">{layer.title}</h3>
              <p className="text-background/60 leading-relaxed text-sm">{layer.desc}</p>
            </motion.div>
          ))}
        </div>
        {/* Partner signal */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-background/40 text-center"
        >
          {t('partner_note')}{' '}
          <a href="#contact" className="text-background/60 underline underline-offset-2 hover:text-background/80 transition-colors">
            {t('partner_link')}
          </a>
        </motion.p>

      </div>
    </section>
  )
}
