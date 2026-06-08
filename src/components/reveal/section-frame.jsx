'use client'

import { motion } from 'motion/react'

import { useInView } from '@/hooks/use-in-view'
import { EASE, sectionBuild } from '@/animations/variants'
import { cn } from '@/utils/cn'

/*
 * SectionFrame — orchestrates the section-entry choreography:
 *  1. Borders / hairlines build in (scaleX)
 *  2. After ~0.35s delay, child content fades+slides up via stagger
 *
 * Children should use the `child` prop (motion variant) or wrap their
 * own content in motion.div variants={fadeUp}.
 */
const SectionFrame = ({
  id,
  className,
  innerClassName,
  topBorder = true,
  bottomBorder = false,
  eyebrow,
  number,
  children,
}) => {
  const [ref, inView] = useInView({ threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={sectionBuild}
      className={cn('relative', className)}
    >
      {topBorder && (
        <motion.span
          className="absolute left-0 right-0 top-0 block h-px origin-left bg-ink-900/15"
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1.0, ease: EASE } },
          }}
        />
      )}

      <div className={cn('mx-auto w-full max-w-[1320px] px-6 lg:px-10', innerClassName)}>
        {(eyebrow || number) && (
          <motion.div
            className="flex items-center justify-between gap-6 pt-8 text-xs font-medium uppercase tracking-[0.22em] text-ink-500"
            variants={{
              hidden: { opacity: 0, y: -8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {eyebrow && (
              <span className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-iris" />
                {eyebrow}
              </span>
            )}
            {number && <span className="font-mono-display text-ink-500">{number}</span>}
          </motion.div>
        )}

        {children}
      </div>

      {bottomBorder && (
        <motion.span
          className="absolute bottom-0 left-0 right-0 block h-px origin-left bg-ink-900/15"
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1.0, ease: EASE, delay: 0.1 } },
          }}
        />
      )}
    </motion.section>
  )
}

export default SectionFrame
