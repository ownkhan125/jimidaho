'use client'

import { useState } from 'react'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import KineticButton from '@/components/ui/kinetic-button'

import { useInView } from '@/hooks/use-in-view'
import { EVENTS as ALL_EVENTS } from '@/data/events'
import { cn } from '@/utils/cn'

const FEATURED_ACCENTS = ['iris', 'lilac', 'mist', 'iris']
const EVENTS = ALL_EVENTS.slice(0, 4).map((e, i) => ({
  ...e,
  accent: FEATURED_ACCENTS[i] ?? 'iris',
}))

const accentSurface = {
  iris: 'bg-iris text-cream',
  lilac: 'bg-lilac text-ink-900',
  mist: 'bg-mist text-ink-900',
}

const Events = () => {
  const [active, setActive] = useState(0)
  const [headlineRef, headlineInView] = useInView({ threshold: 0.3 })

  return (
    <SectionFrame
      id="events"
      eyebrow="05 · Upcoming Events"
      number="// Find Jim near you"
      className="bg-cream pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-32"
    >
      <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
        <div className="col-span-12 lg:col-span-7">
          <div ref={headlineRef}>
            <SplitText
              as="h2"
              text="Coffee, questions, and straight answers."
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
              Open to the public. No filters, no pre-screened questions. If you cannot attend, every
              event is live-streamed on the campaign channel.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Timeline + stacked cards layout */}
      <div className="mt-14 grid grid-cols-12 gap-y-10 lg:gap-x-10 lg:mt-20">
        {/* Left rail timeline */}
        <Reveal y={20} className="col-span-12 lg:col-span-5">
          <ol className="relative space-y-1 border-l border-ink-900/15 pl-6">
            {/* progress indicator */}
            <motion.span
              aria-hidden
              className="absolute -left-px top-0 w-px origin-top bg-iris"
              animate={{ scaleY: (active + 1) / EVENTS.length }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: `100%`,
              }}
            />

            {EVENTS.map((e, i) => {
              const isActive = i === active
              return (
                <li key={`${e.month}-${e.day}-${i}`}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="group relative block w-full py-5 text-left lg:py-6"
                  >
                    {/* Node */}
                    <span
                      className={cn(
                        'absolute -left-[31px] top-7 grid size-3 place-items-center rounded-full transition-all duration-500',
                        isActive
                          ? 'scale-110 bg-iris shadow-[0_0_0_4px_rgba(155,142,199,0.25)]'
                          : 'bg-ink-900/20 group-hover:bg-iris/60',
                      )}
                    />

                    <div className="flex items-baseline gap-4">
                      <span
                        className={cn(
                          'font-display text-[clamp(2.2rem,4.2vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-500',
                          isActive ? 'text-ink-900' : 'text-ink-500 group-hover:text-ink-900',
                        )}
                      >
                        {e.day}
                      </span>
                      <span className="flex flex-col leading-none">
                        <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                          {e.month} 2026
                        </span>
                        <span
                          className={cn(
                            'mt-2 font-display text-lg font-medium tracking-tight transition-colors duration-500 sm:text-xl',
                            isActive ? 'text-ink-900' : 'text-ink-700 group-hover:text-ink-900',
                          )}
                        >
                          {e.title}
                        </span>
                        <span className="mt-1 text-[12.5px] text-ink-500">{e.venue}</span>
                      </span>
                    </div>

                    {/* Hover trace line */}
                    <motion.span
                      aria-hidden
                      className="mt-4 block h-px origin-left bg-iris/40"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </button>
                </li>
              )
            })}
          </ol>
        </Reveal>

        {/* Right: layered card stack with cinematic crossfade */}
        <div className="col-span-12 lg:col-span-7">
          <div className="relative h-[480px] w-full sm:h-[520px] lg:h-[560px]">
            {EVENTS.map((e, i) => {
              const offset = i - active
              const isActive = i === active
              const isStack = offset > 0 && offset < 3
              const visible = isActive || isStack
              return (
                <motion.article
                  key={`card-${i}`}
                  initial={false}
                  animate={{
                    y: isActive ? 0 : offset * 18,
                    scale: isActive ? 1 : 1 - Math.min(offset, 2) * 0.05,
                    opacity: visible ? (isActive ? 1 : 0.55) : 0,
                    zIndex: 10 - Math.abs(offset),
                    rotate: isActive ? 0 : offset * -1.5,
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[28px] border border-ink-900/15 p-6 sm:p-8 lg:p-10',
                    accentSurface[e.accent],
                  )}
                  style={{
                    boxShadow:
                      '0 30px 80px -40px rgba(20, 18, 43, 0.45), 0 12px 24px -16px rgba(20, 18, 43, 0.25)',
                  }}
                >
                  {/* Decorative grid + arc */}
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-0 size-full opacity-25"
                    viewBox="0 0 600 600"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <defs>
                      <pattern
                        id={`evt-grid-${i}`}
                        width="56"
                        height="56"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M56 0H0V56"
                          fill="none"
                          stroke={e.accent === 'iris' ? '#f2eae0' : '#14122b'}
                          strokeOpacity="0.18"
                          strokeWidth="0.6"
                        />
                      </pattern>
                    </defs>
                    <rect width="600" height="600" fill={`url(#evt-grid-${i})`} />
                    <motion.path
                      d="M-50 360 Q 200 220, 480 380 T 720 240"
                      fill="none"
                      stroke={e.accent === 'iris' ? '#f2eae0' : '#14122b'}
                      strokeOpacity="0.45"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: isActive ? 1 : 0.2 }}
                      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </svg>

                  {/* Top row */}
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <div className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] opacity-70">
                        {e.tag} · ID-01
                      </div>
                      <div className="mt-2 flex items-baseline gap-3">
                        <span className="font-display text-[clamp(3rem,7vw,5.4rem)] font-semibold leading-none tracking-[-0.045em]">
                          {e.day}
                        </span>
                        <span className="font-mono-display text-xs uppercase tracking-[0.22em] opacity-75">
                          {e.month}
                          <br />
                          2026
                        </span>
                      </div>
                    </div>
                    <span className="grid size-12 place-items-center rounded-full border border-current/30 font-mono-display text-[10.5px] uppercase tracking-[0.16em] opacity-80 sm:size-14">
                      0{i + 1}/
                      <br />0{EVENTS.length}
                    </span>
                  </div>

                  {/* Middle */}
                  <div className="relative">
                    <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.3rem)] font-medium leading-[1.1] tracking-[-0.025em]">
                      {e.title}
                    </h3>
                    <p className="mt-3 text-sm opacity-85 sm:text-[15px]">
                      {e.venue} · {e.time}
                    </p>
                  </div>

                  {/* Stats strip */}
                  <div className="relative grid grid-cols-2 gap-x-6 gap-y-3 border-t border-current/20 pt-5 text-sm sm:grid-cols-3">
                    <div>
                      <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] opacity-70">
                        RSVPs
                      </div>
                      <div className="mt-1 font-display text-base font-semibold">{e.seats}</div>
                    </div>
                    <div>
                      <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] opacity-70">
                        Forecast
                      </div>
                      <div className="mt-1 font-display text-base font-semibold">{e.weather}</div>
                    </div>
                    <div className="col-span-2 flex items-end justify-end sm:col-span-1">
                      <KineticButton
                        href={`/events/${e.slug}`}
                        variant={e.accent === 'iris' ? 'light' : 'dark'}
                        size="sm"
                      >
                        RSVP
                      </KineticButton>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* Nav controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono-display text-[11px] uppercase tracking-[0.22em] text-ink-500">
              <span className="text-ink-900">{String(active + 1).padStart(2, '0')}</span>
              <span>/</span>
              <span>{String(EVENTS.length).padStart(2, '0')}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActive((p) => (p - 1 + EVENTS.length) % EVENTS.length)}
                className="group inline-grid size-11 place-items-center rounded-full border border-ink-900/25 text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-cream"
                aria-label="Previous event"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-500 group-hover:-translate-x-0.5"
                >
                  <path
                    d="M11 7H3m0 0l4-4m-4 4l4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setActive((p) => (p + 1) % EVENTS.length)}
                className="group inline-grid size-11 place-items-center rounded-full border border-ink-900/25 text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-cream"
                aria-label="Next event"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-500 group-hover:translate-x-0.5"
                >
                  <path
                    d="M3 7h8m0 0L7 3m4 4l-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Reveal
        y={20}
        delay={0.15}
        className="mt-14 flex flex-wrap items-center justify-between gap-6"
      >
        <p className="text-sm text-ink-500">
          Want Jim in your county?{' '}
          <a
            href="/contact"
            className="text-ink-900 underline decoration-iris underline-offset-4 hover:decoration-2"
          >
            Invite him to host an event.
          </a>
        </p>
        <KineticButton href="/events" variant="dark" size="md">
          View all events
        </KineticButton>
      </Reveal>
    </SectionFrame>
  )
}

export default Events
