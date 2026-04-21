'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function Services() {
  const t = useTranslations('services')

  const items = [
    { title: t('item1_title'), desc: t('item1_desc') },
    { title: t('item2_title'), desc: t('item2_desc') },
    { title: t('item3_title'), desc: t('item3_desc') },
  ]

  return (
    <section id="services" className="bg-[#17280B] py-28">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F04A00] mb-4">
            {t('label')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
            {t('headline')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#17280B] p-8 flex flex-col gap-4 hover:bg-white/5 transition-colors"
            >
              <span className="text-4xl font-bold text-white/10 select-none">0{i + 1}</span>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
