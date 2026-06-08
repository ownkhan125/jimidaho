'use client'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'

import { useInView } from '@/hooks/use-in-view'
import { useTilt } from '@/hooks/use-tilt'

const QuoteCard = ({ q, i }) => {
  const tilt = useTilt({ max: 4 })

  return (
    <motion.article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className="group relative isolate flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-ink-900/15 bg-cream p-7 transition-colors hover:border-iris lg:p-8"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit]"
        style={{ boxShadow: '0 18px 40px -28px rgba(20,18,43,0.18)' }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -z-0 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris blur-3xl"
        style={{ left: tilt.glareX, top: tilt.glareY, opacity: tilt.glareO }}
      />
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.12 * i, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-0 h-px origin-left bg-iris"
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <motion.rect
          x="0.5"
          y="0.5"
          width="99"
          height="99"
          rx="14"
          ry="14"
          fill="none"
          stroke="#9b8ec7"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          whileHover={{ pathLength: 1, opacity: 0.85 }}
          transition={{
            pathLength: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2 },
          }}
        />
      </svg>

      <svg width="42" height="32" viewBox="0 0 42 32" className="relative text-iris" aria-hidden>
        <path
          d="M0 32V18.4C0 10.4 4 4 12 0l3.2 4.8C9.6 8 6.4 12 6.4 16h6.4V32H0zm22.4 0V18.4c0-8 4-14.4 12-18.4l3.2 4.8c-5.6 3.2-8.8 7.2-8.8 11.2h6.4V32H22.4z"
          fill="currentColor"
        />
      </svg>
      <p className="relative font-display text-lg leading-snug tracking-[-0.015em] text-ink-900 lg:text-xl">
        {q.quote}
      </p>
      <div className="relative mt-auto flex items-center gap-4 border-t border-ink-900/10 pt-5">
        <span className="grid size-11 place-items-center rounded-full bg-iris/20 font-display text-base font-semibold text-iris-deep">
          {q.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </span>
        <div>
          <div className="font-display text-[15px] font-semibold text-ink-900">{q.name}</div>
          <div className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
            {q.role}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

const ENDORSERS = [
  'Idaho Farm Bureau',
  'Sheriff Carla Reyes',
  'Lewiston Builders Assoc.',
  'Veterans of Foreign Wars',
  'North Idaho Loggers',
  'Snake River Co-op',
  'Sandpoint Chamber',
  'Idaho Police Lodge 78',
  'Boise Small Business League',
]

const QUOTES = [
  {
    quote:
      'Jim shows up. He listened to our county for two days before he said a word. That is not how this usually goes — and that is exactly why we are with him.',
    name: 'Carla Reyes',
    role: 'Sheriff, Kootenai County',
  },
  {
    quote:
      'We have watched representatives come and go. Jim is the first one in a decade who actually understands what it costs to keep a sawmill running.',
    name: 'Earl Wenz',
    role: 'President, North Idaho Loggers',
  },
  {
    quote:
      'A serious candidate with a serious plan for rural healthcare. That is rare, and we do not take it for granted.',
    name: 'Dr. Lina Park',
    role: "Pediatrician, Coeur d'Alene",
  },
]

const Endorsements = () => {
  const [headlineRef, headlineInView] = useInView({ threshold: 0.3 })

  return (
    <SectionFrame
      id="endorsements"
      eyebrow="04 · Endorsements"
      number="// Across Idaho, across the aisle"
      className="bg-cream-soft pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-32"
    >
      <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
        <div className="col-span-12 lg:col-span-7">
          <div ref={headlineRef}>
            <SplitText
              as="h2"
              text="The people closest to the work, behind Jim."
              className="font-display text-[clamp(2rem,5vw,3.8rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink-900"
              inView={headlineInView}
              stagger={0.04}
              duration={0.85}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Reveal y={20} delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-700 lg:text-base">
              Endorsements from law enforcement, ag, small business, and healthcare leaders across
              all 10 counties of ID-01.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Quotes */}
      <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {QUOTES.map((q, i) => (
          <Reveal key={q.name} y={32} delay={0.08 * i} className="flex">
            <QuoteCard q={q} i={i} />
          </Reveal>
        ))}
      </div>

      {/* Endorser marquee */}
      <Reveal y={24} delay={0.1} className="mt-16">
        <div className="relative overflow-hidden rounded-3xl border border-ink-900/15 bg-cream py-7">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center gap-12 px-6">
                {ENDORSERS.map((e, i) => (
                  <div
                    key={`${dup}-${i}`}
                    className="flex items-center gap-5 font-display text-xl font-medium text-ink-900 lg:text-2xl"
                  >
                    <span className="size-2 rounded-full bg-iris" />
                    {e}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cream to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream to-transparent" />
        </div>
      </Reveal>
    </SectionFrame>
  )
}

export default Endorsements
