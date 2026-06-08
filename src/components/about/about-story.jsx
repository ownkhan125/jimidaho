'use client'

import { motion, useScroll, useTransform } from 'motion/react'

import { useRef } from 'react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import Scene from '@/components/illustrations/scene'

import { useInView } from '@/hooks/use-in-view'

const STORIES = [
  {
    eyebrow: 'Idaho-born',
    title: 'From a Lewiston sawmill town',
    body: 'Jim grew up outside Lewiston, the son of a mill foreman and a public-school librarian. He learned to fix engines before he learned to drive, and learned what a family ledger looked like before he turned twelve.',
    scene: 'mountains',
  },
  {
    eyebrow: 'Service',
    title: 'Two tours, a Bronze Star, and the long way home',
    body: "He enlisted in the US Army at 19, served two tours with the 1st Battalion, 24th Infantry, and came home with a Bronze Star — and a deep skepticism of leaders who send other people's kids to war on a whim.",
    scene: 'flag',
  },
  {
    eyebrow: 'Career',
    title: 'Building a business — and paychecks for Idahoans',
    body: 'After the Army, Jim came back to Idaho and built a timber business from a single crew. Today the company employs more than 100 Idahoans across three counties, with full health benefits and an apprenticeship program for veterans.',
    scene: 'farmland',
  },
  {
    eyebrow: 'Family',
    title: 'A father, a husband, a neighbor',
    body: "Jim and Megan have three kids and three rescue dogs. They coach little-league soccer, attend the same church their grandparents did, and have the same neighbors they had a decade ago — that's by design, not by accident.",
    scene: 'community',
  },
]

const StoryRow = ({ s, i }) => {
  const ref = useRef(null)
  const [headlineRef, headlineInView] = useInView({ threshold: 0.4 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])
  const isReversed = i % 2 === 1

  return (
    <article ref={ref} className="grid grid-cols-12 gap-y-8 py-12 lg:gap-x-10 lg:py-20">
      <div className={`col-span-12 lg:col-span-5 ${isReversed ? 'lg:order-2' : ''}`}>
        <motion.div
          style={{ y }}
          className="relative aspect-[5/6] overflow-hidden rounded-[28px] border border-ink-900/10"
        >
          <Scene variant={s.scene} className="absolute inset-0 size-full" label={s.title} />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-cream/85 px-4 py-3 backdrop-blur">
            <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
              Chapter · {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-display text-sm font-semibold text-ink-900">{s.eyebrow}</span>
          </div>
        </motion.div>
      </div>

      <div className={`col-span-12 lg:col-span-7 ${isReversed ? 'lg:order-1 lg:pr-8' : 'lg:pl-8'}`}>
        <Reveal y={20}>
          <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-iris">
            {s.eyebrow}
          </span>
        </Reveal>
        <div ref={headlineRef} className="mt-4">
          <SplitText
            as="h3"
            text={s.title}
            className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink-900"
            inView={headlineInView}
            stagger={0.03}
            duration={0.8}
          />
        </div>
        <Reveal y={20} delay={0.15} className="mt-6 max-w-xl">
          <p className="text-[15px] leading-relaxed text-ink-700 sm:text-base">{s.body}</p>
        </Reveal>
      </div>
    </article>
  )
}

const AboutStory = () => (
  <SectionFrame
    id="story"
    eyebrow="Story · In four chapters"
    number="// A short biography"
    className="bg-cream"
    innerClassName="pb-8"
  >
    <div className="divide-y divide-ink-900/15">
      {STORIES.map((s, i) => (
        <StoryRow key={s.eyebrow} s={s} i={i} />
      ))}
    </div>
  </SectionFrame>
)

export default AboutStory
