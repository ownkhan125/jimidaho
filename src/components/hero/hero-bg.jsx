'use client'

import { motion } from 'motion/react'

/* Subtle, performance-friendly animated background:
 * - Static SVG grid (CSS pattern) with fade-in stroke
 * - Three "data stream" curves that draw on mount + slowly pulse
 * - Three slow-orbiting circles (nodes)
 * - A few cross-hair markers that stagger in
 *
 * Nothing here re-runs on scroll — animation is keyframe / pathLength
 * which the browser keeps off the main thread.
 */
const HeroBg = () => {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Soft color blobs */}
      <div className="absolute -left-32 top-24 size-[520px] rounded-full bg-mist blur-[120px] opacity-50" />
      <div className="absolute right-[-15%] top-[40%] size-[640px] rounded-full bg-lilac blur-[140px] opacity-45" />
      <div className="absolute left-[35%] bottom-[-20%] size-[420px] rounded-full bg-iris blur-[150px] opacity-25" />

      {/* Animated grid */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <defs>
          <pattern
            id="hero-grid"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
            x="-1"
            y="-1"
          >
            <path
              d="M56 0H0V56"
              fill="none"
              stroke="#14122b"
              strokeOpacity="0.07"
              strokeWidth="0.6"
            />
          </pattern>
          <radialGradient id="grid-mask" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-fade">
            <rect width="100%" height="100%" fill="url(#grid-mask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#grid-fade)" />
      </motion.svg>

      {/* Data streams */}
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="stream-1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9b8ec7" stopOpacity="0" />
            <stop offset="55%" stopColor="#9b8ec7" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#9b8ec7" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="stream-2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b4d3d9" stopOpacity="0" />
            <stop offset="50%" stopColor="#b4d3d9" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#b4d3d9" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Long sweeping curves */}
        <motion.path
          d="M-100 240 C 240 120, 520 380, 820 220 S 1320 360, 1560 180"
          fill="none"
          stroke="url(#stream-1)"
          strokeWidth="1.2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        />
        <motion.path
          d="M-100 540 C 280 460, 560 700, 880 540 S 1240 620, 1560 480"
          fill="none"
          stroke="url(#stream-2)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
        />
        <motion.path
          d="M-100 780 C 200 720, 520 880, 800 760 S 1180 820, 1560 700"
          fill="none"
          stroke="#bda6ce"
          strokeOpacity="0.5"
          strokeWidth="0.9"
          strokeDasharray="2 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
        />

        {/* Node dots */}
        {[
          { cx: 220, cy: 200, r: 3, delay: 1.4 },
          { cx: 820, cy: 240, r: 4, delay: 1.55 },
          { cx: 1280, cy: 220, r: 3, delay: 1.65 },
          { cx: 560, cy: 600, r: 3, delay: 1.75 },
          { cx: 980, cy: 560, r: 4, delay: 1.85 },
        ].map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r={n.r}
            fill="#9b8ec7"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: n.delay }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

        {/* Crosshair markers */}
        {[
          { x: 220, y: 200, delay: 1.7 },
          { x: 820, y: 240, delay: 1.85 },
          { x: 1280, y: 220, delay: 2.0 },
          { x: 560, y: 600, delay: 2.1 },
        ].map((c, i) => (
          <motion.g
            key={`x-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5, delay: c.delay }}
          >
            <path
              d={`M${c.x - 10} ${c.y}h20M${c.x} ${c.y - 10}v20`}
              stroke="#14122b"
              strokeOpacity="0.35"
              strokeWidth="0.5"
            />
          </motion.g>
        ))}
      </svg>

      {/* Floating numeric tickers — slow pulse */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[14%] top-[18%] font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500"
      >
        SIG · 0.842
      </motion.div>
      <motion.div
        animate={{ opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        className="absolute left-[10%] top-[68%] font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500"
      >
        ID-01 · LIVE
      </motion.div>
    </div>
  )
}

export default HeroBg
