'use client'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'

import { useInView } from '@/hooks/use-in-view'
import { useTilt } from '@/hooks/use-tilt'

const VALUES = [
  {
    eyebrow: 'V-01',
    title: 'Accountability',
    body: 'Every meeting on the public calendar. Every vote explained on the record. Term limit pledge: three terms, then back to Idaho.',
    glyph: '◯',
  },
  {
    eyebrow: 'V-02',
    title: 'Evidence Over Ideology',
    body: 'Bills get read. Data gets cited. We follow the evidence — not the donor class, not the cable-news churn.',
    glyph: '△',
  },
  {
    eyebrow: 'V-03',
    title: 'Community First',
    body: 'Show up where the work is. Listen before talking. The job is local — even when the office is in DC.',
    glyph: '▢',
  },
]

const ValueCard = ({ v }) => {
  const tilt = useTilt({ max: 5 })
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
      className="group relative isolate flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-ink-900/15 bg-cream-soft p-7 lg:p-9"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -z-0 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-iris blur-3xl"
        style={{ left: tilt.glareX, top: tilt.glareY, opacity: tilt.glareO }}
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
          whileHover={{ pathLength: 1, opacity: 0.7 }}
          transition={{
            pathLength: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2 },
          }}
        />
      </svg>

      <div className="relative flex items-center justify-between">
        <span className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-ink-500">
          {v.eyebrow}
        </span>
        <motion.span
          className="grid size-10 place-items-center rounded-full border border-ink-900/15 bg-cream text-ink-900"
          whileHover={{ rotate: 12, scale: 1.06 }}
          transition={{ duration: 0.5 }}
        >
          {v.glyph}
        </motion.span>
      </div>
      <h3 className="relative font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 lg:text-[26px]">
        {v.title}
      </h3>
      <p className="relative text-[14.5px] leading-relaxed text-ink-700">{v.body}</p>
    </motion.article>
  )
}

const AboutValues = () => {
  const [headlineRef, headlineInView] = useInView({ threshold: 0.3 })

  return (
    <SectionFrame
      id="values"
      eyebrow="Core Values · Operating Principles"
      number="// How we run the office"
      className="bg-cream pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-28"
    >
      <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
        <div className="col-span-12 lg:col-span-7">
          <div ref={headlineRef}>
            <SplitText
              as="h2"
              text="Three principles. Stamped on every staff handbook."
              className="font-display text-[clamp(2rem,5vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-900"
              inView={headlineInView}
              stagger={0.04}
              duration={0.85}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Reveal y={20} delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-700 lg:text-base">
              These aren&apos;t slogans. They&apos;re the actual operating rules the campaign — and
              the future office — runs on.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {VALUES.map((v, i) => (
          <Reveal key={v.eyebrow} y={28} delay={0.08 * i} className="flex">
            <ValueCard v={v} />
          </Reveal>
        ))}
      </div>
    </SectionFrame>
  )
}

export default AboutValues
