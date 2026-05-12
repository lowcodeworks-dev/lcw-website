'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const team = [
  {
    key: 'danny',
    photo: '/screenshots/dhi_cartoony.png',
    linkedin: 'https://www.linkedin.com/in/dannyhildebrand/',
  },
  {
    key: 'jessy',
    photo: '/screenshots/Jessy_cartoony.png',
    linkedin: 'https://www.linkedin.com/in/jessyhollander/',
  },
]

export function About() {
  const t = useTranslations('about')

  return (
    <section id="about" className="relative bg-background py-28 overflow-hidden">

<div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              {t('label')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight mb-6">
              {t('headline')}
            </h2>

            {/* Previously at */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Previously at</span>
              <span className="h-px w-4 bg-border" />
              <span className="text-xs font-bold text-foreground border border-border rounded-full px-3 py-1">Mendix NL</span>
              <span className="text-xs font-bold text-foreground border border-border rounded-full px-3 py-1">Siemens Korea</span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">{t('body')}</p>
            <p className="text-muted-foreground leading-relaxed mb-6">{t('body2')}</p>
            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-border pl-4">{t('body3')}</p>
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
                key={member.key}
                className="flex items-center gap-5 p-6 bg-muted rounded-2xl"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-muted-foreground/10">
                  <Image
                    src={member.photo}
                    alt={t(`${member.key}_name`)}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-foreground">{t(`${member.key}_name`)}</p>
                  <p className="text-sm text-muted-foreground">{t(`${member.key}_role`)}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1 leading-snug">{t(`${member.key}_desc`)}</p>
                </div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  aria-label={`${t(`${member.key}_name`)} on LinkedIn`}
                >
                  <LinkedinIcon className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Self-qualification block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 pt-16 border-t border-border grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start"
        >
          <p className="text-xl md:text-2xl font-bold text-foreground leading-snug tracking-tight">
            {t('qualify_label')}
          </p>
          <div>
            <ul className="space-y-4">
              {(['qualify_item1', 'qualify_item2', 'qualify_item3', 'qualify_item4'] as const).map((key) => (
                <li key={key} className="flex gap-3">
                  <span className="text-muted-foreground select-none shrink-0 mt-0.5">—</span>
                  <span className="text-foreground leading-snug">{t(key)}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-8 italic">{t('qualify_closing')}</p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

