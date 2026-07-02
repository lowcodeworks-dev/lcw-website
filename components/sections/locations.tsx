'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

const CARDS = [
  { key: 'seoul', src: '/images/seoul.jpg' },
  { key: 'bangkok', src: '/images/bangkok.jpg' },
] as const

export function Locations() {
  const t = useTranslations('locations')

  return (
    <section className="bg-background py-16">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          {t('eyebrow')}
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-border aspect-[16/10] cursor-default"
            >
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <Image
                  src={card.src}
                  alt={t(`${card.key}_city`)}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <div
                className="absolute inset-0 flex items-end p-5"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 10%, transparent 65%)' }}
              >
                <div>
                  <div className="text-base font-bold text-white">{t(`${card.key}_city`)}</div>
                  <div className="text-xs text-white/80 mt-1 max-w-[220px]">{t(`${card.key}_desc`)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
