'use client'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'

import { useInView } from '@/hooks/use-in-view'

const MILESTONES = [
  {
    year: '1979',
    title: 'Born in Lewiston, Idaho',
    body: 'Son of a mill foreman and a public-school librarian.',
  },
  {
    year: '1997',
    title: 'Enlisted in the US Army',
    body: 'Trained at Fort Benning, assigned to the 1st Bn, 24th Infantry.',
  },
  {
    year: '2001-04',
    title: 'Two tours overseas',
    body: 'Awarded the Bronze Star for actions under fire.',
  },
  {
    year: '2006',
    title: 'Founded Clearwater Timber Co.',
    body: 'Started with a single crew. Today employs 100+ Idahoans.',
  },
  {
    year: '2014',
    title: 'Idaho Forest Stewardship Award',
    body: 'Recognized for active multi-use land management.',
  },
  {
    year: '2019',
    title: 'Veterans-to-Trades Apprenticeship',
    body: 'Launched a free apprenticeship for returning service members.',
  },
  {
    year: '2026',
    title: 'Declared for U.S. Congress',
    body: "Announced campaign for Idaho's 1st Congressional District.",
  },
]

const AboutTimeline = () => {
  const [headlineRef, headlineInView] = useInView({ threshold: 0.3 })

  return (
    <SectionFrame
      id="journey"
      eyebrow="The Journey"
      number="// Idaho-paced. Idaho-built."
      className="relative overflow-hidden bg-ink-900 text-cream"
      innerClassName="pb-24 pt-12 lg:pb-32 lg:pt-20"
      topBorder={false}
    >
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <div ref={headlineRef}>
              <SplitText
                as="h2"
                text="A working life, in seven dates."
                className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-cream"
                inView={headlineInView}
                stagger={0.04}
                duration={0.85}
              />
            </div>
            <Reveal y={20} delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/75">
                No headline-grabbing detours. No quick career pivots. Just steady, visible work —
                the kind voters can verify, year by year.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ol className="relative border-l border-cream/20 pl-8">
              {MILESTONES.map((m, i) => (
                <Reveal key={m.year} y={20} delay={0.06 * i} className="relative pb-10 last:pb-0">
                  {/* Node */}
                  <span className="absolute -left-[37px] top-2 size-3 rounded-full bg-iris shadow-[0_0_0_4px_rgba(155,142,199,0.25)]" />
                  {/* Vertical anim accent */}
                  <motion.span
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -left-[33.5px] top-5 h-full w-px origin-top bg-cream/5"
                  />

                  <div className="font-mono-display text-xs uppercase tracking-[0.22em] text-cream/55">
                    {m.year}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-tight tracking-[-0.025em] text-cream sm:text-2xl">
                    {m.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-cream/70">
                    {m.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}

export default AboutTimeline
