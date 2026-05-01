'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const stats = [
  { number: '70+', label: 'Developers enabled' },
  { number: '8',   label: 'Partners enabled' },
  { number: '3',   label: 'PoC wins vs. Outsystems & PowerApps' },
  { number: '2',   label: 'CoE setups across APAC' },
]

const cases = [
  {
    company: 'USI Global · Taiwan',
    led: 'Danny Hildebrand',
    tag: 'Digital Transformation · CoE Setup · App Development',
    description:
      'USI Global is a Taiwanese electronics manufacturer with 22,000 employees across 30 production sites. We led the Mendix CoE setup and digital transformation — consolidating 10 fragmented legacy systems into a single platform covering 70+ approval workflows. Result: 30% faster development and a unified foundation for enterprise-wide process transformation.',
    href: 'https://www.mendix.com/customer-stories/usi-accelerates-development-and-enables-process-transformation-at-scale/',
    cta: 'Read the full story on Mendix.com',
  },
  {
    company: 'Macnica · Japan',
    led: 'Jessy Hollander',
    tag: 'CoE Setup · DX Factory · Partner Enablement',
    description:
      "Macnica is Japan's leading Mendix partner and one of the country's largest IT distributors. We set up the Macnica DX Factory — a Mendix CoE enabling both internal application development and customer-facing projects. The factory became the foundation for Macnica's Mendix practice across Japan.",
    href: 'https://www.macnica.co.jp/en/business/ai_iot/columns/144646/',
    cta: 'Read more on Macnica.co.jp',
  },
  {
    company: 'Mendix Ecosystem · APAC & Europe',
    led: 'Danny Hildebrand & Jessy Hollander',
    tag: 'Partner Enablement · PoC · Presales',
    description:
      'Before founding LCW, we operated inside Mendix and Siemens — enabling 8+ partners across APAC and Europe, winning competitive PoC cycles against OutSystems and Power Apps, supporting Siemens presales engagements, and presenting at Mendix community events. This front-line experience across the full partner landscape is where the pattern recognition comes from.',
    href: null,
    cta: null,
  },
]

export function SocialProof() {
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
            Track record
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Numbers from the field.
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-muted p-8 flex flex-col gap-2"
            >
              <span className="text-5xl font-bold text-accent tracking-tight">
                {stat.number}
              </span>
              <span className="text-sm text-muted-foreground leading-snug">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Case studies */}
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          Latest customer engagements
        </p>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-background rounded-2xl p-8 flex flex-col gap-5"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{c.company}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Led by {c.led}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-right leading-relaxed">
                  {c.tag.split(' · ').map((t, idx) => (
                    <span key={idx} className="block">{t}</span>
                  ))}
                </span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                {c.description}
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
                  Internal track record · Pre-LCW
                </span>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
