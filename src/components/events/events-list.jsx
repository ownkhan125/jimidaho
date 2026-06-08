'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import Scene from '@/components/illustrations/scene'

import { useTilt } from '@/hooks/use-tilt'
import { EVENTS } from '@/data/events'
import { cn } from '@/utils/cn'

const FILTERS = ['All', 'Town Hall', 'Rally', 'Community', 'Policy', 'Fundraiser']
const REGIONS = [
  'All Regions',
  'North Idaho',
  'Treasure Valley',
  'Clearwater Valley',
  'East Idaho',
  'Wood River Valley',
  'Magic Valley',
]

const accent = {
  'Town Hall': 'iris',
  Rally: 'lilac',
  Community: 'mist',
  Policy: 'iris',
  Fundraiser: 'lilac',
}

const accentSurface = {
  iris: 'bg-iris',
  lilac: 'bg-lilac',
  mist: 'bg-mist',
}

const EventCard = ({ event: e }) => {
  const tilt = useTilt({ max: 4 })
  const tone = accent[e.tag] ?? 'iris'
  const isDark = tone === 'iris'

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
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] border border-ink-900/15 bg-cream-soft transition-colors duration-500 hover:border-ink-900/35"
    >
      <Link href={`/events/${e.slug}`} className="contents">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Scene variant={e.scene} className="absolute inset-0 size-full" label={e.title} />
          {/* Date stamp */}
          <div className="absolute left-5 top-5 flex items-baseline gap-2 rounded-2xl bg-cream/90 px-4 py-3 backdrop-blur">
            <span className="font-display text-3xl font-semibold leading-none tracking-[-0.045em] text-ink-900">
              {e.day}
            </span>
            <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
              {e.month}
              <br />
              {e.year}
            </span>
          </div>
          {/* Tag */}
          <div
            className={cn(
              'absolute right-5 top-5 rounded-full px-3 py-1.5 font-mono-display text-[10.5px] uppercase tracking-[0.22em]',
              accentSurface[tone],
              isDark ? 'text-cream' : 'text-ink-900',
            )}
          >
            {e.tag}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-6 lg:p-7">
          <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 lg:text-[22px]">
            {e.title}
          </h3>
          <p className="text-[14.5px] leading-relaxed text-ink-700">{e.excerpt}</p>
          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-ink-900/10 pt-4">
            <div>
              <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                Venue
              </div>
              <div className="mt-1 text-[12.5px] text-ink-900">{e.venue}</div>
            </div>
            <div>
              <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                Time
              </div>
              <div className="mt-1 text-[12.5px] text-ink-900">{e.time}</div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3">
            <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
              {e.seats} RSVPs
            </span>
            <span className="inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-900 transition-colors group-hover:text-iris">
              RSVP
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

const EventsList = () => {
  const [tag, setTag] = useState('All')
  const [region, setRegion] = useState('All Regions')

  const filtered = useMemo(
    () =>
      EVENTS.filter((e) => (tag === 'All' ? true : e.tag === tag)).filter((e) =>
        region === 'All Regions' ? true : e.region === region,
      ),
    [tag, region],
  )

  return (
    <SectionFrame
      eyebrow="Upcoming · Spring 2026"
      number="// Don't miss out"
      className="bg-cream pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-32"
    >
      {/* Filter strip */}
      <Reveal
        y={20}
        className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setTag(f)}
              className={cn(
                'rounded-full border px-4 py-2 font-mono-display text-[11px] uppercase tracking-[0.18em] transition-colors duration-300',
                tag === f
                  ? 'border-iris bg-iris text-cream'
                  : 'border-ink-900/20 bg-cream-soft text-ink-700 hover:border-ink-900/40',
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
            Region
          </span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-full border border-ink-900/20 bg-cream-soft px-4 py-2 pr-9 text-[13px] text-ink-900 focus:border-iris focus:outline-none"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </Reveal>

      {/* Result count + reset */}
      <Reveal
        y={16}
        delay={0.05}
        className="mt-10 flex items-center justify-between border-t border-ink-900/15 pt-6"
      >
        <p className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-ink-500">
          Showing <span className="text-ink-900">{String(filtered.length).padStart(2, '0')}</span>{' '}
          of {String(EVENTS.length).padStart(2, '0')}
        </p>
        {(tag !== 'All' || region !== 'All Regions') && (
          <button
            type="button"
            onClick={() => {
              setTag('All')
              setRegion('All Regions')
            }}
            className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-iris hover:underline"
          >
            Reset filters
          </button>
        )}
      </Reveal>

      {/* Cards grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {filtered.map((e, i) => (
          <Reveal key={e.slug} y={32} delay={0.05 * i} className="flex">
            <EventCard event={e} />
          </Reveal>
        ))}
      </div>

      {filtered.length === 0 && (
        <Reveal
          y={20}
          className="mt-12 rounded-3xl border border-dashed border-ink-900/20 p-10 text-center"
        >
          <p className="font-display text-xl text-ink-900">No events match those filters.</p>
          <p className="mt-2 text-sm text-ink-500">
            Try a different region — or invite Jim to your county.
          </p>
        </Reveal>
      )}
    </SectionFrame>
  )
}

export default EventsList
