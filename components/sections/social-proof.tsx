'use client'

import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef, useState, useEffect } from 'react'

const STAT_NUMBERS = ['70+', '8', '3', '2']

const SCRAMBLE_MS = 500
const SETTLE_MS = 900

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState('0')
  const numeric = parseInt(value, 10)
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!isInView) return
    const digits = String(numeric).length
    const start = performance.now()
    let frame: number

    function tick(now: number) {
      const elapsed = now - start
      if (elapsed < SCRAMBLE_MS) {
        const rand = Math.floor(Math.random() * Math.pow(10, digits))
        setDisplay(String(rand))
        frame = requestAnimationFrame(tick)
      } else if (elapsed < SETTLE_MS) {
        const t = (elapsed - SCRAMBLE_MS) / (SETTLE_MS - SCRAMBLE_MS)
        const eased = 1 - Math.pow(1 - t, 3)
        setDisplay(String(Math.floor(eased * numeric)))
        frame = requestAnimationFrame(tick)
      } else {
        setDisplay(String(numeric))
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, numeric])

  return <span ref={ref}>{display}{suffix}</span>
}

const CASE_HREFS = [
  'https://www.mendix.com/customer-stories/usi-accelerates-development-and-enables-process-transformation-at-scale/',
  'https://www.macnica.co.jp/en/business/ai_iot/news/2021/136600/',
  null,
]

export function SocialProof() {
  const t = useTranslations('social_proof')

  const statLabels = [t('stat1_label'), t('stat2_label'), t('stat3_label'), t('stat4_label')]

  const cases = [
    { company: t('case1_company'), led: t('case1_led'), tag: t('case1_tag'), desc: t('case1_desc'), cta: t('case1_cta'), href: CASE_HREFS[0] },
    { company: t('case2_company'), led: t('case2_led'), tag: t('case2_tag'), desc: t('case2_desc'), cta: t('case2_cta'), href: CASE_HREFS[1] },
    { company: t('case3_company'), led: t('case3_led'), tag: t('case3_tag'), desc: t('case3_desc'), cta: null,           href: CASE_HREFS[2] },
  ]

  return (
    <section className="bg-muted py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-12">
          {STAT_NUMBERS.map((number, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-muted p-8 flex flex-col gap-2"
            >
              <span className="text-5xl font-bold text-foreground tracking-tight">
                <AnimatedNumber value={number} />
              </span>
              <span className="text-sm text-muted-foreground leading-snug">
                {statLabels[i]}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Case studies */}
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          {t('engagements_label')}
        </p>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-background rounded-2xl p-8 flex flex-col gap-5"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{c.company}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{t('led_by')} {c.led}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-right leading-relaxed">
                  {c.tag.split(' · ').map((tag, idx) => (
                    <span key={idx} className="block">{tag}</span>
                  ))}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {c.desc}
              </p>

              {/* Link or confidential badge */}
              {c.href ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors"
                >
                  {c.cta}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <span className="text-xs text-muted-foreground/60 uppercase tracking-widest font-semibold">
                  {t('case3_badge')}
                </span>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
