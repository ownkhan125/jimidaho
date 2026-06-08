'use client'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import Counter from '@/components/ui/counter'

const STATS = [
  { value: 12, suffix: 'K', label: 'Volunteers signed up' },
  { value: 44, suffix: '', label: 'Counties on the ground' },
  { value: 480, suffix: '+', label: 'Captains in the field' },
  { value: 22, suffix: '+', label: 'Town halls completed' },
]

const VolunteerStats = () => (
  <SectionFrame
    eyebrow="The team · By the numbers"
    number="// We're already moving"
    className="bg-ink-900 text-cream"
    innerClassName="py-20 lg:py-28"
    topBorder={false}
  >
    <div className="grain pointer-events-none absolute inset-0" />
    <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-cream/15 bg-cream/15 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <Reveal key={s.label} y={0} delay={0.05 * i} className="bg-ink-900 p-8 lg:p-10">
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
            className="block h-px origin-left bg-iris/60"
          />
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-semibold leading-none tracking-[-0.045em] text-cream">
              <Counter to={s.value} />
            </span>
            {s.suffix && <span className="font-display text-2xl text-lilac">{s.suffix}</span>}
          </div>
          <div className="mt-4 font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-cream/55">
            {s.label}
          </div>
        </Reveal>
      ))}
    </div>
  </SectionFrame>
)

export default VolunteerStats
