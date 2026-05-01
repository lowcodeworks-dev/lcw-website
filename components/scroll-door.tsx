'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ScrollDoorProps {
  children: React.ReactNode
  label?: string
}

export function ScrollDoor({ children, label }: ScrollDoorProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Doors open fast — fully apart by 35% scroll
  const leftX  = useTransform(scrollYProgress, [0, 0.35], ['0%', '-102%'])
  const rightX = useTransform(scrollYProgress, [0, 0.35], ['0%',  '102%'])

  // Seam fades quickly
  const seamOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  // Scroll hint fades immediately
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  // Label on panels fades before doors open
  const labelOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <div ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Content — always fully visible, doors reveal it */}
        <div className="absolute inset-0 flex items-center justify-center bg-background">
          {children}
        </div>

        {/* Left panel */}
        <motion.div
          style={{ x: leftX }}
          className="absolute top-0 left-0 w-1/2 h-full bg-foreground flex items-center justify-end pr-8 select-none z-10"
        >
          {label && (
            <motion.span
              style={{ opacity: labelOpacity }}
              className="text-xs font-semibold uppercase tracking-widest text-background/30 rotate-180 [writing-mode:vertical-rl]"
            >
              {label}
            </motion.span>
          )}
        </motion.div>

        {/* Right panel */}
        <motion.div
          style={{ x: rightX }}
          className="absolute top-0 right-0 w-1/2 h-full bg-foreground flex items-center justify-start pl-8 select-none z-10"
        >
          {label && (
            <motion.span
              style={{ opacity: labelOpacity }}
              className="text-xs font-semibold uppercase tracking-widest text-background/30 [writing-mode:vertical-rl]"
            >
              {label}
            </motion.span>
          )}
        </motion.div>

        {/* Seam line */}
        <motion.div
          style={{ opacity: seamOpacity }}
          className="absolute inset-y-0 left-1/2 -translate-x-px w-px bg-background/10 z-20"
        />

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="text-xs text-background/30 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-px h-8 bg-background/20"
          />
        </motion.div>

      </div>
    </div>
  )
}
