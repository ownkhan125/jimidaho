'use client'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'

import { useInView } from '@/hooks/use-in-view'

const GROUPS = [
  {
    title: 'Law Enforcement',
    items: [
      { name: "Idaho Sheriffs' Assoc. (Kootenai chapter)", note: 'Active member endorsement' },
      { name: 'Idaho Police Lodge 78', note: 'Boise & Treasure Valley' },
      { name: 'Sheriff Carla Reyes', note: 'Kootenai County' },
      { name: 'Lt. Hank Olafson (ret.)', note: 'Lewiston PD' },
    ],
  },
  {
    title: 'Agriculture & Forestry',
    items: [
      { name: 'North Idaho Loggers Association', note: 'Trade body endorsement' },
      { name: 'Snake River Cooperative', note: 'Producer co-op, 240 farms' },
      { name: 'Idaho Farm Bureau', note: 'ID-01 county boards' },
      { name: 'Marcus Hayle', note: 'Forester, Clearwater Co.' },
    ],
  },
  {
    title: 'Small Business & Trades',
    items: [
      { name: 'Boise Small Business League', note: '240-member trade body' },
      { name: 'Lewiston Builders Assoc.', note: 'Construction trades' },
      { name: 'Sandpoint Chamber of Commerce', note: 'Region 1 chapter' },
      { name: 'ID Trades Apprenticeship Coalition', note: 'Multi-shop endorsement' },
    ],
  },
  {
    title: 'Veterans & Service',
    items: [
      { name: 'Veterans of Foreign Wars · Post 4574', note: 'Lewiston' },
      { name: "American Legion · Coeur d'Alene", note: 'Post 14' },
      { name: 'Wounded Warrior Caucus (Idaho)', note: 'Independent endorsement' },
      { name: 'Idaho Gold Star Family Network', note: 'Statewide' },
    ],
  },
  {
    title: 'Healthcare & Education',
    items: [
      { name: 'Idaho Rural Health Network', note: 'Provider coalition' },
      { name: 'Dr. Lina Park', note: "Pediatrician, Coeur d'Alene" },
      { name: 'ID Parents for Local Schools', note: 'School-choice coalition' },
      { name: 'ISU College of Agriculture (alumni board)', note: 'Pocatello' },
    ],
  },
  {
    title: 'Community & Civic',
    items: [
      { name: 'Sun Valley Civic Forum', note: 'Wood River Valley' },
      { name: 'Magic Valley Brewing collective', note: 'Twin Falls' },
      { name: 'Riverview Rotary', note: 'Lewiston / Clarkston' },
      { name: 'ID Native American Affairs Liaison', note: 'Independent endorsement' },
    ],
  },
]

const Group = ({ g, i }) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden rounded-3xl border border-ink-900/15 bg-cream-soft p-7 lg:p-8"
  >
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.0, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 right-0 top-0 h-px origin-left bg-iris"
    />
    <div className="flex items-center justify-between gap-4">
      <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 lg:text-2xl">
        {g.title}
      </h3>
      <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
        {String(g.items.length).padStart(2, '0')} ·
      </span>
    </div>
    <ul className="mt-6 space-y-3">
      {g.items.map((it) => (
        <li
          key={it.name}
          className="group flex items-start gap-3 border-b border-ink-900/10 pb-3 last:border-b-0 last:pb-0"
        >
          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-iris" />
          <div>
            <div className="font-display text-[15px] font-semibold leading-tight text-ink-900">
              {it.name}
            </div>
            <div className="mt-1 text-[12.5px] text-ink-500">{it.note}</div>
          </div>
        </li>
      ))}
    </ul>
  </motion.section>
)

const EndorsementsBoard = () => {
  const [headlineRef, headlineInView] = useInView({ threshold: 0.3 })

  return (
    <SectionFrame
      eyebrow="Current endorsements · By group"
      number="// Across every region"
      className="bg-cream-soft pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-32"
    >
      <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
        <div className="col-span-12 lg:col-span-7">
          <div ref={headlineRef}>
            <SplitText
              as="h2"
              text="Backed by sheriffs, foresters, builders, doctors, and veterans."
              className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink-900"
              inView={headlineInView}
              stagger={0.04}
              duration={0.85}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Reveal y={20} delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-700 lg:text-base">
              Endorsements come from the people doing the work — not from party machines or coastal
              celebrities. Each group below has issued a public letter of support.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {GROUPS.map((g, i) => (
          <Group key={g.title} g={g} i={i} />
        ))}
      </div>
    </SectionFrame>
  )
}

export default EndorsementsBoard
