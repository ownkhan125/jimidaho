'use client'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import Swiper from '@/components/ui/swiper'
import Scene from '@/components/illustrations/scene'

import { useInView } from '@/hooks/use-in-view'

const TESTIMONIALS = [
  {
    quote:
      "Jim shows up. He listened to our county for two days before he said a word. That is not how this usually goes — and that's exactly why we're with him.",
    name: 'Carla Reyes',
    role: 'Sheriff, Kootenai County',
    org: "Idaho Sheriffs' Assoc.",
    scene: 'mountains',
  },
  {
    quote:
      "We've watched representatives come and go. Jim is the first one in a decade who actually understands what it costs to keep a sawmill running.",
    name: 'Earl Wenz',
    role: 'President, North Idaho Loggers',
    org: 'Trade Association',
    scene: 'farmland',
  },
  {
    quote:
      'A serious candidate with a serious plan for rural healthcare. That is rare, and we do not take it for granted.',
    name: 'Dr. Lina Park',
    role: "Pediatrician, Coeur d'Alene",
    org: 'ID Rural Health',
    scene: 'river',
  },
  {
    quote:
      "Veterans don't need another speech. They need the VA on the phone within a week. Jim's plan actually gets us there.",
    name: 'Eli Brennan',
    role: 'Post Commander, VFW 4574',
    org: 'Veterans of Foreign Wars',
    scene: 'flag',
  },
  {
    quote:
      "He doesn't talk over us. He doesn't pander. He reads our briefs — and then he asks better questions. That is the bar.",
    name: 'Anita Whitlock',
    role: 'Director, Boise Small Business League',
    org: 'Boise SBL',
    scene: 'capitol',
  },
  {
    quote:
      'Active forest management saved the western half of Idaho County this past summer. Jim has been on that fight for ten years.',
    name: 'Marcus Hayle',
    role: 'Forester, Clearwater County',
    org: 'ID Forestry Coalition',
    scene: 'vista',
  },
]

const Card = ({ t }) => (
  <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-ink-900/15 bg-cream-soft">
    <div className="relative aspect-[16/9] overflow-hidden">
      <Scene variant={t.scene} className="absolute inset-0 size-full" label={t.name} />
      <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-ink-900/85 px-4 py-3 text-cream backdrop-blur">
        <span className="grid size-9 place-items-center rounded-full bg-cream font-display text-sm font-semibold text-ink-900">
          {t.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </span>
        <div>
          <div className="font-display text-[14px] font-semibold leading-tight">{t.name}</div>
          <div className="font-mono-display text-[9.5px] uppercase tracking-[0.22em] text-cream/70">
            {t.role}
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-5 p-7 lg:p-8">
      <svg width="36" height="28" viewBox="0 0 42 32" className="text-iris" aria-hidden>
        <path
          d="M0 32V18.4C0 10.4 4 4 12 0l3.2 4.8C9.6 8 6.4 12 6.4 16h6.4V32H0zm22.4 0V18.4c0-8 4-14.4 12-18.4l3.2 4.8c-5.6 3.2-8.8 7.2-8.8 11.2h6.4V32H22.4z"
          fill="currentColor"
        />
      </svg>
      <p className="font-display text-lg font-medium leading-snug tracking-[-0.02em] text-ink-900 lg:text-xl">
        {t.quote}
      </p>
      <div className="mt-auto border-t border-ink-900/10 pt-5">
        <div className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
          {t.org}
        </div>
      </div>
    </div>
  </article>
)

const EndorsementSwiper = () => {
  const [headlineRef, headlineInView] = useInView({ threshold: 0.3 })

  return (
    <SectionFrame
      eyebrow="Voices · From across the district"
      number="// Swipe to read more"
      className="bg-cream pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-32"
    >
      <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
        <div className="col-span-12 lg:col-span-7">
          <div ref={headlineRef}>
            <SplitText
              as="h2"
              text="What our endorsers are saying."
              className="font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-900"
              inView={headlineInView}
              stagger={0.04}
              duration={0.85}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Reveal y={20} delay={0.1}>
            <p className="max-w-md text-[15px] leading-relaxed text-ink-700 lg:text-base">
              Drag the cards — or use the arrows. Every quote is on the record and verifiable
              against the local press archive.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-12">
        <Swiper
          items={TESTIMONIALS}
          renderItem={(t) => <Card t={t} />}
          perView={{ base: 1, sm: 1, md: 2, lg: 3 }}
          gap={24}
          ariaLabel="Endorser testimonials"
        />
      </div>
    </SectionFrame>
  )
}

export default EndorsementSwiper
