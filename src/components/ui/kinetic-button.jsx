'use client'

import { useRef, useState } from 'react'

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import PropTypes from 'prop-types'

import { cn } from '@/utils/cn'

/* KineticButton — distinctive shape, magnetic body movement, animated SVG
 * border trace, pointer-origin directional fill, flying arrow.
 *
 * TIMING: every hover transition is tuned to land in ~220ms so the button
 * feels instant. Fill, label color, border trace, and arrow all peak together
 * — no delayed text-color flip. Pick label colors that have reasonable
 * contrast against BOTH surface AND fill so the brief mid-state stays legible.
 */
const FAST = 220 /* ms — single source of truth for hover-in transition timing */
const FAST_S = FAST / 1000
const variantStyles = {
  /* iris (light purple) surface, ink-900 (dark) fill. Cream label reads on
   * both — light purple is light enough that cream has decent contrast, and
   * cream on near-black is perfect. */
  primary: {
    surface: 'bg-iris',
    text: 'text-cream',
    fill: 'bg-ink-900',
    border: 'border-ink-900/30',
    trace: '#f2eae0',
  },
  /* Transparent surface (cream context). ink-900 label on cream is ✅.
   * Fill grows ink-900 — label flips to cream IN SYNC with the fill. */
  ghost: {
    surface: 'bg-transparent',
    text: 'text-ink-900 hover:text-cream',
    fill: 'bg-ink-900',
    border: 'border-ink-900/35',
    trace: '#9b8ec7',
    flips: true,
  },
  /* Cream surface, iris fill (light purple). ink-900 reads on both → no flip. */
  light: {
    surface: 'bg-cream',
    text: 'text-ink-900',
    fill: 'bg-iris',
    border: 'border-ink-900/25',
    trace: '#9b8ec7',
  },
  /* ink-900 surface, iris fill. Cream reads on both → no flip. */
  dark: {
    surface: 'bg-ink-900',
    text: 'text-cream',
    fill: 'bg-iris',
    border: 'border-ink-900',
    trace: '#bda6ce',
  },
  /* Transparent on dark context, fill=cream. Cream label on cream fill = BAD.
   * Flips to ink-900 IN SYNC with the fill. */
  outline: {
    surface: 'bg-transparent',
    text: 'text-cream hover:text-ink-900',
    fill: 'bg-cream',
    border: 'border-cream/40',
    trace: '#f2eae0',
    flips: true,
  },
}

const sizeStyles = {
  sm: { px: 'px-5', h: 'h-10', text: 'text-[11.5px]' },
  md: { px: 'px-7', h: 'h-12', text: 'text-[12.5px]' },
  lg: { px: 'px-8 sm:px-10', h: 'h-[58px]', text: 'text-[13px]' },
}

const KineticButton = ({
  as,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  arrow = true,
  intensity = 8,
  ...rest
}) => {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.5 })
  const labelX = useTransform(sx, (v) => v * 0.4)
  const labelY = useTransform(sy, (v) => v * 0.4)

  const v = variantStyles[variant] ?? variantStyles.primary
  const s = sizeStyles[size] ?? sizeStyles.md

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ox = ((e.clientX - rect.left) / rect.width) * 100
    const oy = ((e.clientY - rect.top) / rect.height) * 100
    setOrigin({ x: ox, y: oy })
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set((relX / rect.width) * intensity * 2)
    y.set((relY / rect.height) * intensity * 2)
  }

  const onEnter = () => setHovered(true)
  const onLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
  }

  const Tag = href ? motion.a : motion.button
  const props = href ? { href, ...rest } : { type: 'button', ...rest }

  /* Label color flip is SYNCED with the fill animation (no delay). Only
   * applied for variants that need to flip; others keep a constant label
   * color so no transition class is needed. */
  const labelColorTransition = v.flips
    ? 'transition-colors duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)]'
    : ''

  return (
    <Tag
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      style={{ x: sx, y: sy }}
      className={cn(
        'group relative isolate inline-flex select-none items-center justify-center gap-3 overflow-hidden border font-medium uppercase tracking-[0.18em]',
        'rounded-[14px]',
        s.h,
        s.px,
        s.text,
        v.surface,
        v.text,
        v.border,
        labelColorTransition,
        className,
      )}
      {...props}
    >
      {/* Animated SVG border trace — synced with fill */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 40"
      >
        <motion.rect
          x="0.5"
          y="0.5"
          width="99"
          height="39"
          rx="13"
          ry="13"
          fill="none"
          stroke={v.trace}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: hovered ? 1 : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{
            pathLength: { duration: FAST_S * 1.4, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.15 },
          }}
        />
      </svg>

      {/* Pointer-origin directional fill — fast & snappy so it finishes with
       * the label color flip and never leaves a low-contrast window */}
      <motion.span
        aria-hidden
        className={cn(
          'pointer-events-none absolute size-12 -translate-x-1/2 -translate-y-1/2 rounded-full',
          v.fill,
        )}
        style={{ left: `${origin.x}%`, top: `${origin.y}%` }}
        animate={{ scale: hovered ? 9 : 0 }}
        transition={{ duration: FAST_S, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Label — single span, always rendered, color is on the parent <Tag>.
       * Magnetic transform on a child wrapper. */}
      <motion.span
        style={{ x: labelX, y: labelY }}
        className="relative z-10 inline-flex items-center gap-3 whitespace-nowrap"
      >
        <span>{children}</span>

        {arrow && (
          <motion.span className="relative block overflow-hidden" aria-hidden>
            <motion.svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              className="block"
              animate={{ x: hovered ? 14 : 0, opacity: hovered ? 0 : 1 }}
              transition={{ duration: FAST_S, ease: [0.22, 1, 0.36, 1] }}
            >
              <path
                d="M1 5h12m0 0L9 1m4 4L9 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            <motion.svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              className="absolute inset-0 block"
              animate={{ x: hovered ? 0 : -14, opacity: hovered ? 1 : 0 }}
              transition={{ duration: FAST_S, ease: [0.22, 1, 0.36, 1] }}
            >
              <path
                d="M1 5h12m0 0L9 1m4 4L9 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.span>
        )}
      </motion.span>

      {/* Corner notch decoration */}
      <span className="pointer-events-none absolute right-2 top-2 z-10 size-1 rounded-full bg-current opacity-50" />
    </Tag>
  )
}

KineticButton.propTypes = {
  as: PropTypes.elementType,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'ghost', 'light', 'dark', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  arrow: PropTypes.bool,
  intensity: PropTypes.number,
}

export default KineticButton
