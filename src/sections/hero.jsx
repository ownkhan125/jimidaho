'use client'

import { useEffect, useRef } from 'react'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import gsap from 'gsap'

import KineticButton from '@/components/ui/kinetic-button'
import HeroBg from '@/components/hero/hero-bg'

import { useGsap } from '@/hooks/use-gsap'

const STATS = [
  { value: '01', label: "Idaho's 1st District" },
  { value: '2026', label: 'Primary Election' },
  { value: '44', label: 'Counties Visited' },
  { value: '100%', label: 'Idaho-Funded' },
]

const Hero = () => {
  const cardWrapRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const sx = useSpring(mouseX, { stiffness: 80, damping: 16, mass: 0.5 })
  const sy = useSpring(mouseY, { stiffness: 80, damping: 16, mass: 0.5 })
  const rotateX = useTransform(sy, [-1, 1], [6, -6])
  const rotateY = useTransform(sx, [-1, 1], [-8, 8])
  const cardX = useTransform(sx, [-1, 1], [-12, 12])
  const cardY = useTransform(sy, [-1, 1], [-12, 12])

  useEffect(() => {
    const onMove = (e) => {
      const wrap = cardWrapRef.current
      if (!wrap) return
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouseX.set((e.clientX - cx) / (rect.width / 2))
      mouseY.set((e.clientY - cy) / (rect.height / 2))
    }
    const onLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [mouseX, mouseY])

  const scope = useGsap(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    /* Hairline borders draw first */
    tl.from('.hero-line', {
      scaleX: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.08,
    })

    tl.from(
      '.hero-eyebrow > *',
      { y: 14, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06 },
      '-=0.7',
    )

    /* Split headline lines */
    tl.from(
      '.hero-headline .line-wrap > span',
      {
        yPercent: 110,
        duration: 1.05,
        ease: 'expo.out',
        stagger: 0.09,
      },
      '-=0.55',
    )

    tl.from('.hero-sub', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')

    tl.from(
      '.hero-actions > *',
      { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07 },
      '-=0.5',
    )

    tl.from(
      '.hero-stat',
      {
        y: 16,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
      },
      '-=0.6',
    )

    tl.from(
      '.hero-card',
      { y: 60, opacity: 0, scale: 0.96, duration: 1.2, ease: 'expo.out' },
      '-=1.0',
    )

    tl.from(
      '.hero-card-meta > *',
      { x: -14, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06 },
      '-=0.6',
    )

    tl.from(
      '.hero-card-orbit',
      { scale: 0, opacity: 0, duration: 0.9, ease: 'back.out(1.6)', stagger: 0.08 },
      '-=0.6',
    )
  })

  return (
    <section ref={scope} className="relative isolate overflow-hidden pt-24 lg:pt-28">
      <HeroBg />
      <div className="grain pointer-events-none absolute inset-0 -z-10" />

      <div className="relative mx-auto w-full max-w-[1320px] px-6 lg:px-10">
        {/* Top hairline */}
        <span className="hero-line absolute left-6 right-6 top-0 block h-px origin-left bg-ink-900/15 lg:left-10 lg:right-10" />

        <div className="hero-eyebrow flex flex-wrap items-center justify-between gap-4 pt-8 text-[11px] uppercase tracking-[0.26em] text-ink-500">
          <span className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-iris" />
            Idaho · 1st Congressional District · 2026
          </span>
          <span className="font-mono-display">// Edition 01 — Spring</span>
        </div>

        <div className="grid grid-cols-12 gap-y-12 pb-16 pt-12 lg:gap-x-10 lg:pb-28 lg:pt-20">
          {/* Headline */}
          <div className="col-span-12 lg:col-span-7">
            <h1 className="hero-headline font-display text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-ink-900">
              <span className="line-wrap relative block overflow-hidden pb-2">
                <span className="inline-block">A steady hand</span>
              </span>
              <span className="line-wrap relative block overflow-hidden pb-2">
                <span className="inline-block">
                  for{' '}
                  <span className="relative whitespace-nowrap">
                    <span className="relative z-10 text-iris">Idaho&apos;s</span>
                    <svg
                      className="absolute -bottom-2 left-0 z-0 h-[0.6em] w-full"
                      viewBox="0 0 220 24"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M2 16 Q 110 4, 218 14"
                        fill="none"
                        stroke="#bda6ce"
                        strokeWidth="6"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </svg>
                  </span>
                </span>
              </span>
              <span className="line-wrap relative block overflow-hidden pb-2">
                <span className="inline-block">first district.</span>
              </span>
            </h1>

            <p className="hero-sub mt-8 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
              <span className="text-ink-900">Jim Hartley</span> is running for U.S. Congress to
              bring honest leadership, common-sense policy, and a steady voice back to Idaho — not
              the noise of Washington.
            </p>

            <div className="hero-actions mt-10 flex flex-wrap items-center gap-4">
              <KineticButton href="/donate" variant="primary" size="lg">
                Donate
              </KineticButton>
              <KineticButton href="/volunteer" variant="ghost" size="lg">
                Volunteer
              </KineticButton>
              <a
                href="/about"
                className="group ml-2 inline-flex items-center gap-3 text-sm font-medium text-ink-700 hover:text-ink-900"
              >
                <span className="grid size-10 place-items-center rounded-full border border-ink-900/25 transition-colors group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-cream">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 2v9m0 0l4-4m-4 4l-4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Meet Jim
              </a>
            </div>

            {/* Stats strip */}
            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="hero-stat">
                  <div className="font-display text-3xl font-semibold text-ink-900 lg:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-2 font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait card */}
          <div className="col-span-12 lg:col-span-5">
            <div
              ref={cardWrapRef}
              className="relative mx-auto w-full max-w-[440px]"
              style={{ perspective: 1200 }}
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  x: cardX,
                  y: cardY,
                  transformStyle: 'preserve-3d',
                }}
                className="hero-card relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-ink-900/10 bg-gradient-to-br from-iris via-lilac to-mist shadow-[0_50px_120px_-40px_rgba(20,18,43,0.45)]"
              >
                {/* Stylized portrait silhouette */}
                <svg
                  viewBox="0 0 400 500"
                  className="absolute inset-0 size-full"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="bg" cx="50%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#f2eae0" stopOpacity="0.85" />
                      <stop offset="60%" stopColor="#bda6ce" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#9b8ec7" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="figure" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14122b" />
                      <stop offset="100%" stopColor="#2c2945" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="500" fill="url(#bg)" />
                  {/* Idaho outline silhouette in background */}
                  <path
                    d="M120 60 L240 60 L250 120 L260 180 L270 230 L255 280 L260 340 L290 360 L320 380 L300 420 L260 440 L220 445 L180 440 L140 430 L110 420 L100 370 L110 310 L115 250 L120 200 L115 150 L120 100 Z"
                    fill="#f2eae0"
                    opacity="0.18"
                    transform="rotate(-6 200 250)"
                  />
                  {/* Figure */}
                  <circle cx="200" cy="190" r="58" fill="url(#figure)" />
                  <path
                    d="M90 500 L90 440 Q 90 360 200 360 Q 310 360 310 440 L310 500 Z"
                    fill="url(#figure)"
                  />
                  {/* Tie / collar accent */}
                  <path
                    d="M190 360 L200 410 L210 360 L222 372 L210 500 L190 500 L178 372 Z"
                    fill="#9b8ec7"
                  />
                </svg>

                {/* Orbit chips */}
                <div className="hero-card-orbit absolute -left-6 top-12 flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-cream shadow-lg">
                  <span className="size-2 animate-pulse rounded-full bg-mist" />
                  <span className="font-mono-display text-[10.5px] uppercase tracking-[0.2em]">
                    On the trail
                  </span>
                </div>

                <div className="hero-card-orbit absolute -right-4 bottom-24 rounded-2xl border border-cream/40 bg-cream/85 px-4 py-3 backdrop-blur">
                  <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                    Veteran · Father
                  </div>
                  <div className="mt-1 font-display text-sm font-semibold text-ink-900">
                    Idaho-Born, Idaho-First
                  </div>
                </div>

                <div className="hero-card-orbit absolute right-6 top-6 grid size-14 place-items-center rounded-full bg-cream text-ink-900 shadow-lg">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Meta caption inside card */}
                <div className="hero-card-meta absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 rounded-2xl bg-ink-900/80 p-5 text-cream backdrop-blur-md">
                  <div>
                    <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-cream/65">
                      Candidate
                    </div>
                    <div className="mt-1 font-display text-xl font-semibold leading-tight">
                      Jim Hartley
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-cream/70">
                      Iraq War Vet · Small-Business Owner
                    </div>
                  </div>
                  <a
                    href="/about"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-cream text-ink-900 transition-transform hover:scale-110"
                    aria-label="Learn more"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7h8m0 0L7 3m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </motion.div>

              {/* Floating background marker */}
              <motion.div
                aria-hidden
                className="absolute -bottom-8 -left-8 -z-10 size-40 rounded-full border border-ink-900/15"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-iris" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom hairline */}
        <span className="hero-line absolute bottom-0 left-6 right-6 block h-px origin-left bg-ink-900/15 lg:left-10 lg:right-10" />
      </div>
    </section>
  )
}

export default Hero
