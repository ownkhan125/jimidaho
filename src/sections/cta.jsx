'use client'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import KineticButton from '@/components/ui/kinetic-button'

import { useInView } from '@/hooks/use-in-view'
import { useTilt } from '@/hooks/use-tilt'
import { cn } from '@/utils/cn'

const ACTIONS = [
  {
    eyebrow: 'A · Donate',
    title: 'Fuel the campaign',
    body: 'Every dollar comes from Idahoans. We do not take corporate PAC money — and we never will.',
    cta: 'Donate',
    href: '/donate',
    accent: 'iris',
  },
  {
    eyebrow: 'B · Volunteer',
    title: 'Door knocks, phone banks, more',
    body: 'Two hours or twenty. The campaign is built one neighbor at a time — and it shows.',
    cta: 'Volunteer',
    href: '/volunteer',
    accent: 'lilac',
  },
  {
    eyebrow: 'C · Host an event',
    title: 'Bring Jim to your county',
    body: 'Town halls, living-room chats, ag breakfasts. Tell us where, we will be there.',
    cta: 'Host',
    href: '/contact',
    accent: 'mist',
  },
]

const tones = {
  iris: {
    bg: 'bg-iris',
    text: 'text-cream',
    subText: 'text-cream/80',
    btn: 'light',
    glare: 'bg-cream',
    trace: '#f2eae0',
    chipBorder: 'border-cream/35',
    chipBg: 'bg-cream/15',
    iconColor: 'text-cream/45',
  },
  lilac: {
    bg: 'bg-lilac',
    text: 'text-ink-900',
    subText: 'text-ink-700',
    btn: 'dark',
    glare: 'bg-ink-900',
    trace: '#14122b',
    chipBorder: 'border-ink-900/20',
    chipBg: 'bg-cream/40',
    iconColor: 'text-ink-900/25',
  },
  mist: {
    bg: 'bg-mist',
    text: 'text-ink-900',
    subText: 'text-ink-700',
    btn: 'dark',
    glare: 'bg-ink-900',
    trace: '#14122b',
    chipBorder: 'border-ink-900/20',
    chipBg: 'bg-cream/40',
    iconColor: 'text-ink-900/25',
  },
}

const ActionCard = ({ a, i }) => {
  const tilt = useTilt({ max: 4 })
  const t = tones[a.accent]

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
      className={cn(
        'group relative isolate flex h-full flex-col gap-6 overflow-hidden rounded-3xl p-7 lg:p-9',
        t.bg,
        t.text,
      )}
    >
      {/* Layered shadow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit]"
        style={{
          boxShadow: '0 30px 80px -40px rgba(20,18,43,0.35), 0 14px 28px -16px rgba(20,18,43,0.20)',
        }}
      />

      {/* Glare follow */}
      <motion.span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -z-0 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl',
          t.glare,
        )}
        style={{ left: tilt.glareX, top: tilt.glareY, opacity: tilt.glareO }}
      />

      {/* Top border draw */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'absolute left-0 right-0 top-0 h-px origin-left',
          a.accent === 'iris' ? 'bg-cream/30' : 'bg-ink-900/15',
        )}
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
          stroke={t.trace}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          whileHover={{ pathLength: 1, opacity: 0.6 }}
          transition={{
            pathLength: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2 },
          }}
        />
      </svg>

      <div className="relative flex items-center justify-between">
        <span
          className={cn('font-mono-display text-[11px] uppercase tracking-[0.24em]', t.subText)}
        >
          {a.eyebrow}
        </span>
        <span
          className={cn(
            'grid size-10 place-items-center rounded-full border font-mono-display text-[11px]',
            t.chipBorder,
            t.chipBg,
          )}
        >
          0{i + 1}
        </span>
      </div>

      <h3 className="relative font-display text-2xl font-medium leading-tight tracking-[-0.03em] lg:text-3xl">
        {a.title}
      </h3>

      <p className={cn('relative text-[14.5px] leading-relaxed', t.subText)}>{a.body}</p>

      <div className="relative mt-auto flex items-end justify-between gap-4 pt-4">
        <KineticButton href={a.href} variant={t.btn} size="md">
          {a.cta}
        </KineticButton>

        <motion.svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className={cn('shrink-0', t.iconColor)}
          whileHover={{ rotate: 12, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          {i === 0 && (
            <>
              <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M32 14v36M14 32h36" stroke="currentColor" strokeWidth="1.5" />
            </>
          )}
          {i === 1 && (
            <>
              <rect
                x="8"
                y="8"
                width="48"
                height="48"
                rx="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M22 32l8 8 16-16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
          {i === 2 && (
            <>
              <path
                d="M10 50 L32 14 L54 50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="38" r="6" fill="currentColor" />
            </>
          )}
        </motion.svg>
      </div>
    </motion.article>
  )
}

const Cta = () => {
  const [headlineRef, headlineInView] = useInView({ threshold: 0.3 })

  return (
    <SectionFrame
      id="get-involved"
      eyebrow="06 · Get Involved"
      number="// Three ways to make it real"
      className="relative overflow-hidden bg-cream pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-32"
    >
      <div className="relative">
        <div className="relative grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
          <div className="col-span-12 lg:col-span-7">
            <div ref={headlineRef}>
              <SplitText
                as="h2"
                text="This is not a campaign without you."
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
                Big or small — every action stacks. Pick the lane that fits your life, and we will
                take it from there.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
          {ACTIONS.map((a, i) => (
            <Reveal key={a.eyebrow} y={32} delay={0.08 * i} className="flex">
              <ActionCard a={a} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </SectionFrame>
  )
}

export default Cta
