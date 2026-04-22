'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function PlatformPreview() {
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
              Built-in tooling
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-background leading-tight tracking-tight mb-6">
              We assess before we advise.
            </h2>
            <p className="text-background/60 leading-relaxed mb-6">
              Every engagement starts with a structured assessment — scored across multiple dimensions including architecture, governance, AI readiness, and organisational capability.
            </p>
            <p className="text-background/60 leading-relaxed">
              We run assessments across the full engagement lifecycle: CoE maturity, project health, PoC scoping, and AI &amp; data readiness. The output is a clear baseline, not a slide deck.
            </p>
          </motion.div>

          {/* Screenshots — result as hero, form as floating card */}
          <div className="relative h-[480px]">

            {/* Main — assessment result with radar chart */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute inset-0 right-0 bottom-12"
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-background/10 h-full">
                <Image
                  src="/screenshots/workspace-result.png"
                  alt="LCW Workspace — Assessment results and radar chart"
                  width={640}
                  height={520}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>

            {/* Floating — assessment scoring form */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="absolute bottom-0 -left-6 w-3/5 rounded-xl overflow-hidden shadow-2xl border border-background/10"
            >
              <Image
                src="/screenshots/workspace-assessment.png"
                alt="LCW Workspace — Assessment scoring"
                width={420}
                height={300}
                className="w-full h-auto object-cover object-top"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
