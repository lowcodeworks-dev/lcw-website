'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function Services() {
  const t = useTranslations('services')

  const items = [
    { title: t('item1_title'), desc: t('item1_desc'), meta: t('item1_meta') },
    { title: t('item2_title'), desc: t('item2_desc') },
    { title: t('item3_title'), desc: t('item3_desc') },
    { title: t('item4_title'), desc: t('item4_desc') },
  ]

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
            {t('headline')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-px bg-background/10 rounded-2xl overflow-hidden mb-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-foreground p-8 flex flex-col gap-4 hover:bg-background/5 transition-colors"
            >
              <span className="text-4xl font-bold text-accent/40 select-none">0{i + 1}</span>
              <h3 className="text-xl font-bold text-background">{item.title}</h3>
              <p className="text-background/60 leading-relaxed text-sm">{item.desc}</p>
              {'meta' in item && item.meta && (
                <p className="text-xs text-background/30 border-t border-background/10 pt-3 mt-auto">
                  {item.meta}
                </p>
              )}
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
