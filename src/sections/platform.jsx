'use client'

import { useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import KineticButton from '@/components/ui/kinetic-button'

import { useInView } from '@/hooks/use-in-view'
import { useTilt } from '@/hooks/use-tilt'
import { cn } from '@/utils/cn'

const ISSUES = [
  {
    id: 'economy',
    eyebrow: 'I-01',
    title: 'Economy & Jobs',
    summary:
      "Tax relief for working families and a tariff strategy that doesn't punish Idaho farmers.",
    pillars: ['Small-business tax cut', 'Skilled-trade apprenticeships', 'Energy-cost relief'],
    glyph: '⟁',
  },
  {
    id: 'education',
    eyebrow: 'I-02',
    title: 'Education & School Choice',
    summary: 'Empower parents, fund classrooms, and keep DC out of Idaho schools.',
    pillars: ['School choice', 'Vocational pathways', 'Local-board authority'],
    glyph: '✦',
  },
  {
    id: 'healthcare',
    eyebrow: 'I-03',
    title: 'Healthcare for Families & Veterans',
    summary:
      'Rural clinics, mental-health access for veterans, and price transparency you can actually use.',
    pillars: ['Rural-clinic grants', 'VA reform', 'Price transparency'],
    glyph: '✚',
  },
  {
    id: 'land',
    eyebrow: 'I-04',
    title: 'Forest & Land Stewardship',
    summary:
      'Active forest management that prevents megafires — and respects multi-use traditions.',
    pillars: ['Active management', 'Multi-use access', 'Fire prevention'],
    glyph: '◬',
  },
  {
    id: 'housing',
    eyebrow: 'I-05',
    title: 'Housing for Idahoans',
    summary: 'Make it possible to buy a home in the town you grew up in — not just rent one.',
    pillars: ['First-time-buyer relief', 'Permitting reform', 'Workforce housing'],
    glyph: '◇',
  },
  {
    id: 'transport',
    eyebrow: 'I-06',
    title: 'Roads, Rail & River Transport',
    summary:
      'Modernize I-90, protect Snake River shipping, and connect rural Idaho to its markets.',
    pillars: ['I-90 modernization', 'Snake River corridor', 'Rural broadband'],
    glyph: '⌖',
  },
  {
    id: 'safety',
    eyebrow: 'I-07',
    title: 'Public Safety & The Border',
    summary: 'Back the blue, defend the border, and stop the fentanyl supply chain into Idaho.',
    pillars: ['Police support', 'Border security', 'Fentanyl interdiction'],
    glyph: '▣',
  },
]

const IssueCard = ({ issue, idx, isOpen, onOpen }) => {
  const tilt = useTilt({ max: 4 })

  return (
    <motion.button
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      type="button"
      onClick={onOpen}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'group relative isolate flex h-full w-full flex-col items-start gap-5 overflow-hidden rounded-3xl border p-6 text-left transition-colors duration-500 sm:p-7 lg:p-8',
        isOpen
          ? 'border-iris bg-iris text-cream'
          : 'border-ink-900/15 bg-cream-soft text-ink-900 hover:border-ink-900/35',
      )}
    >
      {/* Layered shadow ring (depth) */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit]"
        style={{
          boxShadow: isOpen
            ? '0 30px 80px -40px rgba(155,142,199,0.85), 0 12px 24px -16px rgba(20,18,43,0.25)'
            : '0 18px 40px -24px rgba(20,18,43,0.15)',
        }}
      />

      {/* Glare */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -z-0 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream blur-2xl"
        style={{ left: tilt.glareX, top: tilt.glareY, opacity: tilt.glareO }}
      />

      {/* Trace border */}
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
          stroke={isOpen ? '#f2eae0' : '#9b8ec7'}
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

      <div className="relative flex w-full items-center justify-between">
        <span
          className={cn(
            'font-mono-display text-[11px] uppercase tracking-[0.24em]',
            isOpen ? 'text-cream/70' : 'text-ink-500',
          )}
        >
          {issue.eyebrow}
        </span>
        <motion.span
          className={cn(
            'grid size-10 place-items-center rounded-full border text-lg',
            isOpen
              ? 'border-cream/40 bg-cream/15 text-cream'
              : 'border-ink-900/15 bg-cream text-ink-900',
          )}
          animate={{ rotate: isOpen ? 90 : 0 }}
          whileHover={{ rotate: isOpen ? 90 : 18, scale: 1.06 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {issue.glyph}
        </motion.span>
      </div>

      <h3
        className={cn(
          'relative font-display text-2xl font-medium leading-tight tracking-[-0.025em] lg:text-[26px]',
          isOpen ? 'text-cream' : 'text-ink-900',
        )}
      >
        {issue.title}
      </h3>

      <p
        className={cn(
          'relative text-[14.5px] leading-relaxed',
          isOpen ? 'text-cream/85' : 'text-ink-700',
        )}
      >
        {issue.summary}
      </p>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            key="pillars"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full space-y-2 overflow-hidden border-t border-cream/25 pt-4"
          >
            {issue.pillars.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                className="flex items-center gap-3 text-[13.5px] text-cream/95"
              >
                <span className="size-1.5 rounded-full bg-cream" />
                {p}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="relative mt-auto flex w-full items-center justify-between pt-4">
        <span
          className={cn(
            'font-mono-display text-[10.5px] uppercase tracking-[0.22em]',
            isOpen ? 'text-cream/60' : 'text-ink-500',
          )}
        >
          {String(idx + 1).padStart(2, '0')} / 07
        </span>
        <span
          className={cn(
            'inline-flex items-center gap-2 text-[12.5px] font-medium',
            isOpen ? 'text-cream' : 'text-ink-900 group-hover:text-iris',
          )}
        >
          {isOpen ? 'Hide pillars' : 'Show pillars'}
          <span
            className={cn(
              'inline-block transition-transform duration-300',
              isOpen ? 'rotate-180' : 'group-hover:translate-y-0.5',
            )}
          >
            ↓
          </span>
        </span>
      </div>
    </motion.button>
  )
}

const Platform = () => {
  const [open, setOpen] = useState(null)
  const [headlineRef, headlineInView] = useInView({ threshold: 0.3 })

  return (
    <SectionFrame
      id="platform"
      eyebrow="03 · The Platform"
      number="// Seven things we will fight for"
      className="bg-cream pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-32"
    >
      <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
        <div className="col-span-12 lg:col-span-7">
          <div ref={headlineRef}>
            <SplitText
              as="h2"
              text="Specific promises. Not slogans."
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
              Click any pillar to expand the concrete steps we&apos;ll take in the first 100 days.
              Every plan is published — and every promise is signed.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
        {ISSUES.map((issue, idx) => (
          <Reveal key={issue.id} y={32} delay={0.05 * idx} className="flex">
            <IssueCard
              issue={issue}
              idx={idx}
              isOpen={open === issue.id}
              onOpen={() => setOpen((prev) => (prev === issue.id ? null : issue.id))}
            />
          </Reveal>
        ))}
      </div>

      <Reveal
        y={20}
        delay={0.15}
        className="mt-12 flex flex-wrap items-center justify-between gap-6"
      >
        <p className="text-sm text-ink-500">Every pillar has a published 100-day plan attached.</p>
        <KineticButton href="/platform" variant="dark" size="md">
          Read the full platform
        </KineticButton>
      </Reveal>
    </SectionFrame>
  )
}

export default Platform
