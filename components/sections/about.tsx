'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function About() {
  const t = useTranslations('about')

  const team = [
    { name: t('danny_name'), role: t('danny_role'), initials: 'DH' },
    { name: t('jessy_name'), role: t('jessy_role'), initials: 'JH' },
  ]

  return (
    <section id="about" className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#F04A00] mb-4">
              {t('label')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#17280B] leading-tight tracking-tight mb-8">
              {t('headline')}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">{t('body')}</p>
            <p className="text-gray-500 leading-relaxed">{t('body2')}</p>
          </motion.div>

          {/* Team cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-5 p-6 bg-[#F1F2EB] rounded-2xl"
              >
                <div className="w-14 h-14 rounded-full bg-[#17280B] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{member.initials}</span>
                </div>
                <div>
                  <p className="font-bold text-[#17280B]">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
