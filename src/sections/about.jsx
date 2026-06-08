'use client'

import { motion, useScroll, useTransform } from 'motion/react'

import { useRef } from 'react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'

import { useInView } from '@/hooks/use-in-view'

const FACTS = [
  { k: 'Born', v: 'Lewiston, Idaho · 1979' },
  { k: 'Service', v: 'US Army, 1st Bn 24th Inf' },
  { k: 'Career', v: 'Lumber & timber operations' },
  { k: 'Family', v: 'Married to Megan · 3 kids' },
]

const About = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yImg = useTransform(scrollYProgress, [0, 1], ['6%', '-10%'])

  const [headlineRef, headlineInView] = useInView({ threshold: 0.25 })

  return (
    <SectionFrame
      id="about"
      eyebrow="01 · About Jim"
      number="// Idaho, in his bones"
      className="bg-cream pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-36"
    >
      <div ref={ref} className="relative">
        <div className="relative grid grid-cols-12 gap-y-12 pt-12 lg:gap-x-12 lg:pt-20">
          <div className="col-span-12 lg:col-span-5">
            <motion.div
              style={{ y: yImg }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-ink-900/10 bg-gradient-to-br from-mist via-cream-deep to-lilac"
            >
              <svg viewBox="0 0 400 500" className="absolute inset-0 size-full" aria-hidden>
                <defs>
                  <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9b8ec7" />
                    <stop offset="100%" stopColor="#14122b" />
                  </linearGradient>
                  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f2eae0" />
                    <stop offset="100%" stopColor="#b4d3d9" />
                  </linearGradient>
                </defs>
                <rect width="400" height="500" fill="url(#sky)" />
                {/* Distant mountains */}
                <path
                  d="M0 360 L60 280 L120 320 L180 240 L240 300 L300 250 L360 310 L400 280 L400 500 L0 500 Z"
                  fill="#bda6ce"
                  opacity="0.65"
                />
                <path
                  d="M0 400 L80 320 L160 380 L240 300 L320 360 L400 320 L400 500 L0 500 Z"
                  fill="url(#land)"
                />
                {/* Sun */}
                <circle cx="290" cy="160" r="48" fill="#f2eae0" opacity="0.9" />
                <circle
                  cx="290"
                  cy="160"
                  r="58"
                  fill="none"
                  stroke="#f2eae0"
                  strokeWidth="1"
                  opacity="0.4"
                />
                <circle
                  cx="290"
                  cy="160"
                  r="68"
                  fill="none"
                  stroke="#f2eae0"
                  strokeWidth="1"
                  opacity="0.25"
                />
              </svg>
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-cream/85 px-4 py-3 backdrop-blur">
                <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  Hometown
                </div>
                <div className="mt-1 font-display text-sm font-semibold text-ink-900">
                  Clearwater Valley · 46.4°N
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal y={20}>
              <span className="font-mono-display text-[11px] uppercase tracking-[0.24em] text-ink-500">
                A short story
              </span>
            </Reveal>

            <div ref={headlineRef} className="mt-6">
              <SplitText
                as="h2"
                text="Built by Idaho. Accountable to Idaho. Nothing in between."
                className="font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink-900"
                inView={headlineInView}
                stagger={0.04}
                duration={0.85}
              />
            </div>

            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-ink-700 sm:text-[17px]">
              <Reveal y={20} delay={0.1}>
                <p>
                  Jim Hartley grew up in a sawmill town outside Lewiston, served two tours with the
                  US Army, and came home to run a family timber business that now employs more than
                  a hundred Idahoans across three counties.
                </p>
              </Reveal>
              <Reveal y={20} delay={0.18}>
                <p>
                  He&apos;s running for Congress because Idaho families deserve a representative who
                  answers to <span className="text-ink-900">them</span> — not to lobbyists, not to a
                  party machine, and not to the cable-news shouting class.
                </p>
              </Reveal>
            </div>

            {/* Facts grid */}
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/15 bg-ink-900/15 lg:grid-cols-4">
              {FACTS.map((f, i) => (
                <Reveal
                  key={f.k}
                  y={0}
                  delay={0.05 * i}
                  className="bg-cream-soft p-5 transition-colors hover:bg-cream-deep"
                >
                  <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                    {f.k}
                  </div>
                  <div className="mt-2 font-display text-base font-semibold leading-tight text-ink-900">
                    {f.v}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Signature */}
            <Reveal y={16} delay={0.25} className="mt-10 flex items-center gap-6">
              <svg width="120" height="44" viewBox="0 0 120 44" aria-hidden>
                <motion.path
                  d="M4 32 C 18 8, 32 8, 42 28 S 70 40, 80 14 S 108 8, 116 30"
                  fill="none"
                  stroke="#14122b"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
              <div>
                <div className="font-display text-sm font-semibold text-ink-900">Jim Hartley</div>
                <div className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                  Candidate · US House · ID-01
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </SectionFrame>
  )
}

export default About
