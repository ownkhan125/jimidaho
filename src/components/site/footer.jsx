'use client'

import Link from 'next/link'

import { motion } from 'motion/react'

import Reveal from '@/components/reveal/reveal'

const COLS = [
  {
    title: 'Campaign',
    links: [
      { label: 'About Jim', href: '/about' },
      { label: 'The Platform', href: '/platform' },
      { label: 'Upcoming Events', href: '/events' },
      { label: 'Endorsements', href: '/endorsements' },
      { label: 'Social Library', href: '/social-media-posts' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Donate', href: '/donate' },
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Host an Event', href: '/contact' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Inquiries',
    links: [
      { label: 'Press & media', href: '/contact' },
      { label: 'Speaking requests', href: '/contact' },
      { label: 'Yard signs', href: '/contact' },
      { label: 'General questions', href: '/contact' },
    ],
  },
]

const SOCIALS = ['Instagram', 'X / Twitter', 'YouTube', 'Facebook']

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-cream">
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1320px] px-6 pb-12 pt-20 lg:px-10 lg:pt-28">
        <Reveal y={36} duration={1.1}>
          <p className="font-display text-[clamp(2.4rem,6.4vw,5.4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            A new chapter
            <br />
            <span className="text-lilac">for Idaho.</span>
          </p>
        </Reveal>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="my-14 h-px origin-left bg-cream/15"
        />

        <div className="grid gap-12 md:grid-cols-12">
          <Reveal y={24} className="md:col-span-4">
            <div className="font-mono-display text-[11px] uppercase tracking-[0.24em] text-cream/55">
              Campaign HQ
            </div>
            <p className="mt-4 font-display text-2xl font-semibold leading-snug text-cream">
              Jim Hartley
              <br />
              for Congress
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
              420 W Bannock St, Suite 410
              <br />
              Boise, Idaho 83702
            </p>
            <a
              href="mailto:hello@jimhartleyforidaho.com"
              className="mt-6 inline-flex items-center gap-2 border-b border-cream/30 pb-1 text-sm tracking-wide text-cream hover:border-lilac hover:text-lilac"
            >
              hello@jimhartleyforidaho.com
            </a>
          </Reveal>

          {COLS.map((col, idx) => (
            <Reveal
              key={col.title}
              y={24}
              delay={0.05 * (idx + 1)}
              className="md:col-span-2 lg:col-span-2"
            >
              <h3 className="font-mono-display text-[11px] uppercase tracking-[0.24em] text-cream/55">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group relative inline-block text-sm text-cream/85 hover:text-cream"
                    >
                      {l.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-lilac transition-transform duration-500 group-hover:scale-x-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal y={24} delay={0.25} className="md:col-span-2">
            <h3 className="font-mono-display text-[11px] uppercase tracking-[0.24em] text-cream/55">
              Follow
            </h3>
            <ul className="mt-5 space-y-3">
              {SOCIALS.map((s) => (
                <li key={s} className="inline-flex items-center gap-2 text-sm text-cream/55">
                  <span className="size-1.5 rounded-full bg-lilac/60" />
                  {s}
                  <span className="ml-1 font-mono-display text-[9px] uppercase tracking-[0.2em] text-cream/40">
                    soon
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-16 h-px origin-left bg-cream/15"
        />

        <div className="mt-8 flex flex-col gap-4 text-xs text-cream/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Hartley for Idaho · All rights reserved.</p>
          <p className="font-mono-display tracking-[0.18em] text-cream/45">
            Paid for by Hartley for Idaho · Not authorized by any candidate or candidate&apos;s
            committee.
          </p>
        </div>
      </div>

      {/* Subtle grid accent */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full opacity-[0.12]"
      >
        <defs>
          <pattern id="footer-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="#bda6ce" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>
    </footer>
  )
}

export default Footer
