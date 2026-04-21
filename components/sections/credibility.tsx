'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { BadgeCheck, Clock3, Globe2, MapPin } from 'lucide-react'

export function Credibility() {
  const t = useTranslations('credibility')

  const items = [
    { icon: BadgeCheck, text: t('item1') },
    { icon: Clock3,     text: t('item2') },
    { icon: MapPin,     text: t('item3') },
    { icon: Globe2,     text: t('item4') },
  ]

  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-gray-100"
        >
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 md:px-8 first:pl-0 last:pr-0">
              <Icon className="h-4 w-4 text-[#F04A00] shrink-0" />
              <span className="text-sm font-medium text-gray-700">{text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
