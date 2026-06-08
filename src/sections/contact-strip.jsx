'use client'

import { motion } from 'motion/react'

import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import KineticButton from '@/components/ui/kinetic-button'

import { useInView } from '@/hooks/use-in-view'

const ContactStrip = () => {
  const [ref, inView] = useInView({ threshold: 0.3 })

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink-900 text-cream">
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Animated topographic line system */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-[0.18]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 640"
      >
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.path
            key={i}
            d={`M0 ${120 + i * 70} Q 360 ${60 + i * 70}, 720 ${130 + i * 70} T 1440 ${110 + i * 70}`}
            fill="none"
            stroke="#bda6ce"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>

      <div className="relative mx-auto w-full max-w-[1320px] px-6 py-28 lg:px-10 lg:py-36">
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-6 right-6 top-0 block h-px origin-left bg-cream/15 lg:left-10 lg:right-10"
        />

        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.26em] text-cream/55">
          <span className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-lilac" />
            07 · Stay in touch
          </span>
          <span className="font-mono-display">// We answer every message</span>
        </div>

        <div ref={ref} className="mt-10">
          <SplitText
            as="h2"
            text="Help us write the next chapter."
            className="font-display text-[clamp(2.2rem,6.4vw,5.4rem)] font-semibold leading-[1.0] tracking-[-0.045em] text-cream"
            inView={inView}
            stagger={0.04}
            duration={0.95}
            y={48}
          />
        </div>

        <Reveal y={20} delay={0.15} className="mt-8 max-w-2xl">
          <p className="text-[15px] leading-relaxed text-cream/75 lg:text-base">
            Drop a note. Subscribe to the weekly briefing. Or just say hi. Jim&apos;s team reads
            everything — and we reply to every Idahoan within 48 hours.
          </p>
        </Reveal>

        <Reveal y={20} delay={0.25} className="mt-10 flex flex-wrap items-center gap-4">
          <KineticButton href="/donate" variant="primary" size="lg">
            Donate now
          </KineticButton>
          <KineticButton href="mailto:hello@jimhartleyforidaho.com" variant="outline" size="lg">
            hello@jimhartleyforidaho.com
          </KineticButton>
        </Reveal>
      </div>
    </section>
  )
}

export default ContactStrip
