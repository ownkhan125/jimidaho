'use client'

import { useRef } from 'react'

import { motion, useScroll, useTransform } from 'motion/react'
import PropTypes from 'prop-types'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import Scene from '@/components/illustrations/scene'

import { useInView } from '@/hooks/use-in-view'

const PlatformPillar = ({ pillar: p, index }) => {
  const ref = useRef(null)
  const [headlineRef, headlineInView] = useInView({ threshold: 0.3 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-10%'])
  const isReversed = index % 2 === 1

  return (
    <SectionFrame
      id={p.id}
      eyebrow={p.eyebrow}
      number={`// ${String(index + 1).padStart(2, '0')} / 07`}
      className={index % 2 === 0 ? 'bg-cream' : 'bg-cream-soft'}
      innerClassName="py-20 lg:py-28"
    >
      <div ref={ref} className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-12 lg:pt-16">
        <div className={`col-span-12 lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
          <motion.div
            style={{ y }}
            className="relative aspect-[5/6] overflow-hidden rounded-[28px] border border-ink-900/10"
          >
            <Scene variant={p.scene} className="absolute inset-0 size-full" label={p.title} />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-ink-900/85 px-3 py-1.5 font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-cream backdrop-blur">
              <span className="size-1.5 rounded-full bg-mist" />
              {p.eyebrow}
            </div>
            <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-900/10">
              <div className="bg-cream/90 p-4 backdrop-blur">
                <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  Metric
                </div>
                <div className="mt-1 font-display text-xl font-semibold leading-none text-ink-900">
                  {p.metric.value}
                </div>
              </div>
              <div className="bg-cream/90 p-4 backdrop-blur">
                <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  Context
                </div>
                <div className="mt-1 text-[12.5px] leading-tight text-ink-900">
                  {p.metric.label}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div
          className={`col-span-12 lg:col-span-7 ${isReversed ? 'lg:order-1 lg:pr-8' : 'lg:pl-2'}`}
        >
          <div ref={headlineRef}>
            <SplitText
              as="h2"
              text={p.title}
              className="font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-ink-900"
              inView={headlineInView}
              stagger={0.04}
              duration={0.85}
            />
          </div>

          <Reveal y={20} delay={0.1} className="mt-6 max-w-xl">
            <p className="text-[15px] leading-relaxed text-ink-700 sm:text-[17px]">{p.summary}</p>
          </Reveal>

          <Reveal y={20} delay={0.2} className="mt-10">
            <div className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-ink-500">
              Concrete promises
            </div>
            <ul className="mt-5 space-y-4">
              {p.promises.map((pr, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-start gap-4 border-b border-ink-900/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="mt-1 inline-grid size-7 shrink-0 place-items-center rounded-full bg-iris font-mono-display text-[10px] font-semibold text-cream">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] leading-relaxed text-ink-900 sm:text-base">{pr}</p>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </SectionFrame>
  )
}

PlatformPillar.propTypes = {
  pillar: PropTypes.shape({
    id: PropTypes.string.isRequired,
    eyebrow: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    scene: PropTypes.string.isRequired,
    promises: PropTypes.arrayOf(PropTypes.string).isRequired,
    metric: PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
}

export default PlatformPillar
