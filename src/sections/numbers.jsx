'use client'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import Counter from '@/components/ui/counter'

const NUMBERS = [
  { value: 44, suffix: '', label: 'Counties on the ground', note: 'Every Idaho county visited' },
  { value: 22, suffix: '+', label: 'Town halls completed', note: 'Eight more confirmed' },
  { value: 100, suffix: '%', label: 'Idaho-funded', note: 'No corporate PAC dollars' },
  { value: 12, suffix: 'K', label: 'Volunteers signed up', note: 'Across all 7 regions' },
]

const Numbers = () => {
  return (
    <SectionFrame
      id="numbers"
      eyebrow="02 · By the numbers"
      number="// Movement, on the record"
      className="relative overflow-hidden bg-ink-900 text-cream"
      innerClassName="pb-24 pt-12 lg:pb-32 lg:pt-20"
      topBorder={false}
    >
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <Reveal y={24}>
              <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.035em] text-cream">
                Built by Idahoans,
                <br />
                <span className="text-lilac">in every corner</span>
                <br />
                of the district.
              </h2>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/75">
                No staged photo-ops. No fly-in stops. The kind of campaign that shows up in Salmon,
                Sandpoint and Soda Springs alike — and listens before it talks.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {NUMBERS.map((n, i) => (
                <Reveal
                  key={n.label}
                  y={28}
                  delay={0.08 * i}
                  className="group relative border-b border-cream/15 px-2 py-8 sm:px-6"
                >
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 + 0.06 * i }}
                    className="absolute left-0 top-0 h-px w-full origin-left bg-cream/15"
                  />
                  {/* vertical divider for sm+ */}
                  {i % 2 === 0 && (
                    <motion.span
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.0,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.18 + 0.06 * i,
                      }}
                      className="absolute right-0 top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-cream/15 sm:block"
                    />
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[clamp(2.6rem,5.4vw,4.2rem)] font-semibold leading-none tracking-[-0.045em] text-cream">
                      <Counter to={n.value} suffix="" />
                    </span>
                    {n.suffix && (
                      <span className="font-display text-2xl text-lilac">{n.suffix}</span>
                    )}
                  </div>
                  <div className="mt-4 font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-cream/55">
                    {n.label}
                  </div>
                  <div className="mt-2 text-sm text-cream/75">{n.note}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}

export default Numbers
