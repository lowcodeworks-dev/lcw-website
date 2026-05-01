'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const spring = { type: 'spring' as const, stiffness: 280, damping: 22, mass: 0.9 }

const cards = [
  {
    src: '/screenshots/workspace-result.png',
    alt: 'LCW Workspace — Assessment results and radar chart',
    width: 800,
    height: 600,
    front: { y: 0, x: 0, rotate: -2, scale: 1, zIndex: 2, opacity: 1 },
    back:  { y: 30, x: 18, rotate: 5, scale: 0.91, zIndex: 1, opacity: 0.55 },
  },
  {
    src: '/screenshots/workspace-assessment.png',
    alt: 'LCW Workspace — Assessment scoring form',
    width: 800,
    height: 600,
    front: { y: 0, x: 0, rotate: -2, scale: 1, zIndex: 2, opacity: 1 },
    back:  { y: 30, x: 18, rotate: 5, scale: 0.91, zIndex: 1, opacity: 0.55 },
  },
]

export function PlatformPreview() {
  const [flipped, setFlipped] = useState(false)
  const t = useTranslations('platform_preview')

  return (
    <section className="bg-foreground py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-background/50 mb-4">
              {t('label')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-background leading-tight tracking-tight mb-6">
              {t('headline')}
            </h2>
            <p className="text-background/60 leading-relaxed mb-6">
              {t('body1')}
            </p>
            <p className="text-background/60 leading-relaxed">
              {t('body2')}
            </p>
          </motion.div>

          {/* Screenshot stack — hover to shuffle */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative aspect-[4/3] cursor-pointer"
            onHoverStart={() => setFlipped(true)}
            onHoverEnd={() => setFlipped(false)}
          >
            {cards.map((card, i) => {
              const isFront = flipped ? i === 1 : i === 0
              return (
                <motion.div
                  key={card.src}
                  animate={isFront ? card.front : card.back}
                  initial={i === 0 ? card.front : card.back}
                  transition={spring}
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-background/10 shadow-2xl"
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={card.width}
                    height={card.height}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
