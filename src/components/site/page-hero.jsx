'use client'

import { motion } from 'motion/react'

import SplitText from '@/components/reveal/split-text'
import Reveal from '@/components/reveal/reveal'

import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/utils/cn'

const PageHero = ({ eyebrow, title, description, children, className, tone = 'cream' }) => {
  const [ref, inView] = useInView({ threshold: 0.3 })

  const isDark = tone === 'dark'

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden pt-32 lg:pt-40',
        isDark ? 'bg-ink-900 text-cream' : 'bg-cream',
        className,
      )}
    >
      {/* Background SVG grid + curves */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {isDark ? (
          <>
            <div className="absolute -top-20 right-[-10%] size-[520px] rounded-full bg-iris blur-[140px] opacity-30" />
            <div className="absolute bottom-[-30%] left-[10%] size-[520px] rounded-full bg-lilac blur-[160px] opacity-20" />
          </>
        ) : (
          <>
            <div className="absolute -top-32 left-[-10%] size-[520px] rounded-full bg-mist blur-[120px] opacity-50" />
            <div className="absolute -top-24 right-[-15%] size-[640px] rounded-full bg-lilac blur-[140px] opacity-35" />
          </>
        )}

        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: isDark ? 0.18 : 0.4 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 size-full"
        >
          <defs>
            <pattern id="ph-grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path
                d="M56 0H0V56"
                fill="none"
                stroke={isDark ? '#f2eae0' : '#14122b'}
                strokeOpacity="0.18"
                strokeWidth="0.6"
              />
            </pattern>
            <radialGradient id="ph-mask" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="ph-fade">
              <rect width="100%" height="100%" fill="url(#ph-mask)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#ph-grid)" mask="url(#ph-fade)" />
        </motion.svg>

        <svg
          className="absolute inset-0 size-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M-100 240 C 240 120, 520 380, 820 220 S 1320 360, 1560 180"
            fill="none"
            stroke={isDark ? '#bda6ce' : '#9b8ec7'}
            strokeOpacity={isDark ? '0.4' : '0.5'}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
          <motion.path
            d="M-100 440 C 280 360, 560 580, 880 440 S 1240 520, 1560 380"
            fill="none"
            stroke={isDark ? '#b4d3d9' : '#b4d3d9'}
            strokeOpacity="0.4"
            strokeWidth="0.8"
            strokeDasharray="2 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-6 pb-16 lg:px-10 lg:pb-24">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'absolute left-6 right-6 top-24 block h-px origin-left lg:left-10 lg:right-10 lg:top-32',
            isDark ? 'bg-cream/15' : 'bg-ink-900/15',
          )}
        />

        {eyebrow && (
          <Reveal y={12}>
            <div
              className={cn(
                'flex items-center gap-3 text-[11px] uppercase tracking-[0.26em]',
                isDark ? 'text-cream/60' : 'text-ink-500',
              )}
            >
              <span className="size-1.5 rounded-full bg-iris" />
              {eyebrow}
            </div>
          </Reveal>
        )}

        <div ref={ref} className="mt-8">
          <SplitText
            as="h1"
            text={title}
            className={cn(
              'font-display font-semibold leading-[0.96] tracking-[-0.05em]',
              'text-[clamp(2.6rem,7.4vw,6.2rem)]',
              isDark ? 'text-cream' : 'text-ink-900',
            )}
            inView={inView}
            stagger={0.05}
            duration={0.9}
            y={56}
          />
        </div>

        {description && (
          <Reveal y={20} delay={0.2} className="mt-8 max-w-2xl">
            <p
              className={cn(
                'text-base leading-relaxed sm:text-lg',
                isDark ? 'text-cream/75' : 'text-ink-700',
              )}
            >
              {description}
            </p>
          </Reveal>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  )
}

export default PageHero
