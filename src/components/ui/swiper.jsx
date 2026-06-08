'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { AnimatePresence, motion, useMotionValue } from 'motion/react'
import PropTypes from 'prop-types'

import { cn } from '@/utils/cn'

/* Custom Swiper — touch + mouse-drag with snap-to-slide.
 * No external dep. Uses Motion's drag + index-driven layout.
 */
const Swiper = ({
  items,
  renderItem,
  perView = { base: 1, sm: 1, md: 2, lg: 3 },
  gap = 24,
  ariaLabel = 'Carousel',
  className,
  autoPlay = false,
  autoPlayMs = 6000,
}) => {
  const trackRef = useRef(null)
  const containerRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [slideW, setSlideW] = useState(320)
  const [visible, setVisible] = useState(perView.lg ?? 3)
  const dragX = useMotionValue(0)

  /* Recalculate slide width when container resizes */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const resize = () => {
      const w = el.clientWidth
      let v = perView.base
      if (w >= 1024) v = perView.lg ?? perView.md ?? perView.sm ?? perView.base
      else if (w >= 768) v = perView.md ?? perView.sm ?? perView.base
      else if (w >= 640) v = perView.sm ?? perView.base
      setVisible(v)
      setSlideW((w - gap * (v - 1)) / v)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    return () => ro.disconnect()
  }, [perView, gap])

  const maxIndex = Math.max(0, items.length - visible)
  const clampedIndex = Math.min(index, maxIndex)
  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex)
  }, [index, maxIndex])

  /* Autoplay */
  useEffect(() => {
    if (!autoPlay) return
    const t = setInterval(() => {
      setIndex((p) => (p >= maxIndex ? 0 : p + 1))
    }, autoPlayMs)
    return () => clearInterval(t)
  }, [autoPlay, autoPlayMs, maxIndex])

  const trackX = useMemo(() => -clampedIndex * (slideW + gap), [clampedIndex, slideW, gap])

  const onDragEnd = (_, info) => {
    const v = info.velocity.x
    const o = info.offset.x
    const threshold = slideW * 0.25
    let next = clampedIndex
    if (o < -threshold || v < -400) next = clampedIndex + 1
    else if (o > threshold || v > 400) next = clampedIndex - 1
    setIndex(Math.max(0, Math.min(next, maxIndex)))
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', className)}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragElastic={0.12}
          dragMomentum={false}
          dragConstraints={{
            left: -maxIndex * (slideW + gap),
            right: 0,
          }}
          style={{ gap: `${gap}px`, x: dragX }}
          animate={{ x: trackX }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onDragEnd={onDragEnd}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ width: `${slideW}px` }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-500',
                i === clampedIndex ? 'w-10 bg-iris' : 'w-1.5 bg-ink-900/20 hover:bg-ink-900/40',
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIndex((p) => Math.max(0, p - 1))}
            disabled={clampedIndex === 0}
            aria-label="Previous"
            className="group inline-grid size-11 place-items-center rounded-full border border-ink-900/25 text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-cream disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
            onClick={() => setIndex((p) => Math.min(maxIndex, p + 1))}
            disabled={clampedIndex >= maxIndex}
            aria-label="Next"
            className="group inline-grid size-11 place-items-center rounded-full border border-ink-900/25 text-ink-900 transition-colors hover:border-ink-900 hover:bg-ink-900 hover:text-cream disabled:cursor-not-allowed disabled:opacity-30"
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
          </button>
        </div>
      </div>
    </div>
  )
}

export default Swiper
