'use client'

import Link from 'next/link'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import Scene from '@/components/illustrations/scene'
import KineticButton from '@/components/ui/kinetic-button'
import RsvpForm from '@/components/forms/rsvp-form'

import { useInView } from '@/hooks/use-in-view'
import { useTilt } from '@/hooks/use-tilt'

const FACTS = (event) => [
  { k: 'Date', v: `${event.month} ${event.day}, ${event.year}` },
  { k: 'Time', v: event.time },
  { k: 'Duration', v: event.duration },
  { k: 'Region', v: event.region },
]

const RelatedCard = ({ e }) => {
  const tilt = useTilt({ max: 4 })
  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className="group h-full"
    >
      <Link
        href={`/events/${e.slug}`}
        className="block h-full overflow-hidden rounded-3xl border border-ink-900/15 bg-cream-soft transition-colors duration-500 hover:border-ink-900/40"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Scene variant={e.scene} className="absolute inset-0 size-full" label={e.title} />
          <div className="absolute left-5 top-5 flex items-baseline gap-2 rounded-2xl bg-cream/90 px-4 py-3 backdrop-blur">
            <span className="font-display text-2xl font-semibold leading-none tracking-[-0.04em] text-ink-900">
              {e.day}
            </span>
            <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
              {e.month}
              <br />
              {e.year}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-6">
          <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
            {e.tag}
          </span>
          <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.03em] text-ink-900">
            {e.title}
          </h3>
          <p className="text-[14px] leading-relaxed text-ink-700">{e.excerpt}</p>
          <span className="mt-2 inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-900 transition-colors group-hover:text-iris">
            View event
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

const EventDetail = ({ event, related }) => {
  const [titleRef, titleInView] = useInView({ threshold: 0.3 })

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cream pt-32 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 top-20 size-[420px] rounded-full bg-mist blur-[120px] opacity-45" />
          <div className="absolute -right-10 top-[40%] size-[460px] rounded-full bg-lilac blur-[140px] opacity-30" />
        </div>

        <div className="relative mx-auto w-full max-w-[1320px] px-6 pb-16 lg:px-10 lg:pb-24">
          {/* Breadcrumb */}
          <Reveal
            y={10}
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-500"
          >
            <Link href="/" className="hover:text-ink-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/events" className="hover:text-ink-900">
              Events
            </Link>
            <span>/</span>
            <span className="text-ink-900">{event.tag}</span>
          </Reveal>

          <div className="mt-8 grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-7">
              <Reveal y={12}>
                <div className="inline-flex items-center gap-3 rounded-full border border-ink-900/15 bg-cream-soft px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-ink-700">
                  <span className="size-1.5 rounded-full bg-iris" />
                  {event.tag} · {event.region}
                </div>
              </Reveal>

              <div ref={titleRef} className="mt-8">
                <SplitText
                  as="h1"
                  text={event.title}
                  className="font-display text-[clamp(2.2rem,6vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink-900"
                  inView={titleInView}
                  stagger={0.05}
                  duration={0.9}
                  y={56}
                />
              </div>

              <Reveal y={20} delay={0.2} className="mt-8 max-w-xl">
                <p className="text-base leading-relaxed text-ink-700 sm:text-lg">{event.excerpt}</p>
              </Reveal>

              <Reveal
                y={20}
                delay={0.3}
                className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/15 bg-ink-900/15 sm:grid-cols-4"
              >
                {FACTS(event).map((f) => (
                  <div key={f.k} className="bg-cream-soft p-5">
                    <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                      {f.k}
                    </div>
                    <div className="mt-2 font-display text-base font-semibold leading-tight text-ink-900">
                      {f.v}
                    </div>
                  </div>
                ))}
              </Reveal>

              <Reveal y={20} delay={0.4} className="mt-8 flex flex-wrap gap-4">
                <KineticButton href="/donate" variant="primary" size="lg">
                  Donate
                </KineticButton>
                <KineticButton href="/events" variant="ghost" size="lg">
                  All events
                </KineticButton>
              </Reveal>
            </div>

            {/* Image */}
            <Reveal y={32} delay={0.15} className="col-span-12 lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-ink-900/10 shadow-[0_30px_80px_-40px_rgba(20,18,43,0.4)]">
                <Scene
                  variant={event.scene}
                  className="absolute inset-0 size-full"
                  label={event.title}
                />
                <div className="absolute left-4 right-4 top-4 flex items-center justify-between rounded-2xl bg-ink-900/85 px-4 py-3 text-cream backdrop-blur">
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-cream/70">
                    Forecast
                  </span>
                  <span className="font-display text-sm font-semibold">{event.weather}</span>
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-cream/90 px-4 py-4 backdrop-blur">
                  <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                    Venue · {event.region}
                  </div>
                  <div className="mt-1 font-display text-base font-semibold text-ink-900">
                    {event.venue}
                  </div>
                  <div className="mt-1 text-[12.5px] text-ink-700">{event.address}</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DESCRIPTION + HIGHLIGHTS */}
      <SectionFrame
        eyebrow="About this event"
        number="// What to expect"
        className="bg-cream"
        innerClassName="py-20 lg:py-28"
      >
        <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10">
          <Reveal y={20} className="col-span-12 lg:col-span-7">
            <p className="text-lg leading-relaxed text-ink-900 sm:text-xl">{event.description}</p>
          </Reveal>
          <Reveal y={20} delay={0.1} className="col-span-12 lg:col-span-5">
            <div className="rounded-3xl border border-ink-900/15 bg-cream-soft p-7 lg:p-8">
              <div className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-ink-500">
                Highlights
              </div>
              <ul className="mt-5 space-y-3">
                {event.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-3 text-[14.5px] leading-snug text-ink-900"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-iris" />
                    {h}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </SectionFrame>

      {/* AGENDA */}
      <SectionFrame
        eyebrow="Agenda · Minute-by-minute"
        number="// We respect your time"
        className="bg-cream-soft"
        innerClassName="py-20 lg:py-28"
      >
        <div className="grid grid-cols-12 gap-y-8 pt-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <Reveal y={20}>
              <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink-900">
                Doors open early.
                <br />
                <span className="text-iris">No tedious lines.</span>
              </h2>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-700">
                Plan your evening — every minute on the agenda is published, so you know exactly
                when you&apos;ll be home.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ol className="relative space-y-0 border-l border-ink-900/15 pl-8">
              {event.agenda.map((a, i) => (
                <Reveal key={i} y={16} delay={0.06 * i} className="relative py-5">
                  <span className="absolute -left-[35px] top-7 size-2.5 rounded-full bg-iris shadow-[0_0_0_4px_rgba(155,142,199,0.25)]" />
                  <div className="flex items-baseline gap-6">
                    <span className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-ink-500">
                      {a.time}
                    </span>
                    <span className="font-display text-lg font-medium leading-tight text-ink-900 sm:text-xl">
                      {a.item}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </SectionFrame>

      {/* RSVP FORM */}
      <SectionFrame
        id="rsvp"
        eyebrow="RSVP · Save your seat"
        number={`// ${event.seats} confirmed`}
        className="bg-cream"
        innerClassName="py-20 lg:py-28"
      >
        <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <Reveal y={20}>
              <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-900">
                Save your seat.
                <br />
                <span className="text-iris">It's that simple.</span>
              </h2>
            </Reveal>
            <Reveal
              y={20}
              delay={0.1}
              className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-700"
            >
              <p>
                RSVPs help our team plan seating, refreshments, and accessibility. We&apos;ll send a
                confirmation email and a quick text the day before.
              </p>
              <p className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-ink-500">
                Free · Open to public · Accessible venue
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal y={28} delay={0.05}>
              <RsvpForm event={event} />
            </Reveal>
          </div>
        </div>
      </SectionFrame>

      {/* RELATED */}
      {related.length > 0 && (
        <SectionFrame
          eyebrow="Related events"
          number="// More on the calendar"
          className="bg-cream-soft"
          innerClassName="py-20 lg:py-28"
        >
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {related.map((e, i) => (
              <Reveal key={e.slug} y={32} delay={0.08 * i} className="flex">
                <RelatedCard e={e} />
              </Reveal>
            ))}
          </div>

          <Reveal
            y={20}
            delay={0.15}
            className="mt-12 flex flex-wrap items-center justify-between gap-6"
          >
            <p className="text-sm text-ink-500">See the full calendar →</p>
            <KineticButton href="/events" variant="dark" size="md">
              All events
            </KineticButton>
          </Reveal>
        </SectionFrame>
      )}
    </>
  )
}

export default EventDetail
