'use client'

import { motion } from 'motion/react'

import { cn } from '@/utils/cn'

/* Reusable scenic SVG illustrations themed for the campaign palette.
 * Each variant produces a different scene so cards don't look identical.
 */

const variants = {
  mountains: (
    <>
      <defs>
        <linearGradient id="sk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2eae0" />
          <stop offset="100%" stopColor="#b4d3d9" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#sk)" />
      <circle cx="450" cy="120" r="46" fill="#f2eae0" opacity="0.9" />
      <path
        d="M0 280 L80 200 L160 250 L240 170 L320 230 L420 170 L500 220 L600 190 L600 400 L0 400 Z"
        fill="#bda6ce"
        opacity="0.6"
      />
      <path
        d="M0 320 L120 240 L240 300 L360 220 L480 280 L600 240 L600 400 L0 400 Z"
        fill="#9b8ec7"
      />
      <path d="M0 360 L160 320 L320 360 L480 320 L600 350 L600 400 L0 400 Z" fill="#14122b" />
    </>
  ),

  farmland: (
    <>
      <defs>
        <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2eae0" />
          <stop offset="100%" stopColor="#bda6ce" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#fl)" />
      <circle cx="160" cy="100" r="38" fill="#f2eae0" opacity="0.95" />
      <path
        d="M-20 220 Q 200 180, 410 220 T 620 200"
        stroke="#9b8ec7"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M-20 260 Q 200 230, 410 260 T 620 240"
        stroke="#9b8ec7"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M-20 300 Q 200 280, 410 300 T 620 290"
        stroke="#9b8ec7"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
      {/* Barn silhouette */}
      <g transform="translate(380 250)">
        <path d="M0 50 L0 20 L40 0 L80 20 L80 50 Z" fill="#14122b" />
        <rect x="30" y="25" width="20" height="25" fill="#9b8ec7" />
      </g>
      {/* Wheat */}
      <path d="M0 320 L600 320 L600 400 L0 400 Z" fill="#9b8ec7" opacity="0.6" />
      <path d="M0 360 L600 360 L600 400 L0 400 Z" fill="#14122b" />
    </>
  ),

  river: (
    <>
      <defs>
        <linearGradient id="rs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b4d3d9" />
          <stop offset="100%" stopColor="#9b8ec7" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#rs)" />
      {/* Sun reflection */}
      <circle cx="300" cy="180" r="40" fill="#f2eae0" opacity="0.55" />
      {/* Riverbanks */}
      <path d="M0 200 Q 150 220, 300 200 T 600 200 L600 0 L0 0 Z" fill="#bda6ce" opacity="0.5" />
      <path d="M0 240 Q 200 220, 360 245 T 600 230 L600 0 L0 0 Z" fill="#bda6ce" opacity="0" />
      <path d="M0 340 L120 320 L260 340 L420 330 L600 350 L600 400 L0 400 Z" fill="#14122b" />
      {/* Ripples */}
      {[230, 260, 290].map((y, i) => (
        <path
          key={i}
          d={`M${60 + i * 30} ${y} q 40 ${i % 2 ? -5 : 5}, 80 0`}
          stroke="#f2eae0"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          fill="none"
        />
      ))}
    </>
  ),

  capitol: (
    <>
      <defs>
        <radialGradient id="cap" cx="50%" cy="20%" r="70%">
          <stop offset="0%" stopColor="#f2eae0" />
          <stop offset="100%" stopColor="#bda6ce" />
        </radialGradient>
      </defs>
      <rect width="600" height="400" fill="url(#cap)" />
      {/* Statehouse silhouette */}
      <g transform="translate(150 80)">
        {/* Dome */}
        <ellipse cx="150" cy="80" rx="60" ry="50" fill="#14122b" />
        <rect x="140" y="0" width="20" height="50" fill="#14122b" />
        <circle cx="150" cy="-4" r="6" fill="#9b8ec7" />
        {/* Drum */}
        <rect x="90" y="100" width="120" height="40" fill="#14122b" />
        {/* Main building */}
        <rect x="40" y="140" width="220" height="120" fill="#14122b" />
        {/* Columns */}
        {[60, 90, 120, 150, 180, 210, 240].map((x, i) => (
          <rect key={i} x={x - 4} y="150" width="6" height="100" fill="#2c2945" />
        ))}
        {/* Steps */}
        <rect x="20" y="260" width="260" height="10" fill="#14122b" />
        <rect x="10" y="270" width="280" height="10" fill="#2c2945" />
      </g>
      <path d="M0 360 L600 360 L600 400 L0 400 Z" fill="#9b8ec7" opacity="0.7" />
    </>
  ),

  community: (
    <>
      <defs>
        <linearGradient id="cm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bda6ce" />
          <stop offset="100%" stopColor="#9b8ec7" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#cm)" />
      {/* Crowd silhouettes */}
      {[
        { x: 60, h: 120, w: 80 },
        { x: 140, h: 150, w: 70 },
        { x: 210, h: 130, w: 90 },
        { x: 300, h: 160, w: 80 },
        { x: 380, h: 140, w: 70 },
        { x: 450, h: 150, w: 80 },
        { x: 530, h: 130, w: 70 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${280 - p.h})`}>
          <circle cx={p.w / 2} cy="0" r={p.w * 0.18} fill="#14122b" />
          <path
            d={`M0 ${p.h * 0.25} Q 0 ${p.h * 0.05} ${p.w / 2} ${p.h * 0.05} T ${p.w} ${p.h * 0.25} L${p.w} ${p.h} L0 ${p.h} Z`}
            fill="#14122b"
          />
        </g>
      ))}
      {/* Stage / podium */}
      <g transform="translate(240 100)">
        <rect x="40" y="40" width="60" height="80" fill="#f2eae0" />
        <rect x="20" y="120" width="100" height="20" fill="#f2eae0" opacity="0.8" />
      </g>
      <path d="M0 360 L600 360 L600 400 L0 400 Z" fill="#14122b" />
    </>
  ),

  vista: (
    <>
      <defs>
        <linearGradient id="vs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2eae0" />
          <stop offset="60%" stopColor="#bda6ce" />
          <stop offset="100%" stopColor="#9b8ec7" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#vs)" />
      {/* Trees */}
      {[80, 150, 240, 330, 420, 510].map((x, i) => (
        <g key={i} transform={`translate(${x} ${230 + (i % 3) * 8})`}>
          <path
            d="M0 60 L-12 30 L-6 30 L-14 0 L-4 0 L-10 -30 L0 -45 L10 -30 L4 0 L14 0 L6 30 L12 30 L0 60 Z"
            fill="#14122b"
          />
        </g>
      ))}
      <path d="M0 290 L600 290 L600 400 L0 400 Z" fill="#14122b" />
      {/* Eagle silhouette */}
      <g transform="translate(440 90)">
        <path
          d="M0 0 Q -10 -8 -22 -4 Q -16 0 -8 4 Q -2 6 0 4 Q 2 6 8 4 Q 16 0 22 -4 Q 10 -8 0 0 Z"
          fill="#14122b"
          opacity="0.7"
        />
      </g>
    </>
  ),

  meeting: (
    <>
      <defs>
        <linearGradient id="mt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b4d3d9" />
          <stop offset="100%" stopColor="#f2eae0" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#mt)" />
      {/* Table */}
      <ellipse cx="300" cy="320" rx="200" ry="40" fill="#14122b" />
      {/* People around table */}
      {[
        { x: 120, h: 90 },
        { x: 230, h: 110 },
        { x: 370, h: 110 },
        { x: 480, h: 90 },
      ].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${250 - p.h})`}>
          <circle cx="0" cy="0" r="22" fill="#14122b" />
          <path
            d={`M -28 ${p.h} Q -28 14 0 14 T 28 ${p.h} L 28 ${p.h + 8} L -28 ${p.h + 8} Z`}
            fill="#14122b"
          />
        </g>
      ))}
      {/* Papers / docs */}
      <rect x="240" y="290" width="40" height="20" rx="2" fill="#f2eae0" opacity="0.9" />
      <rect x="320" y="295" width="40" height="20" rx="2" fill="#f2eae0" opacity="0.9" />
      {/* Lamp */}
      <line x1="300" y1="0" x2="300" y2="60" stroke="#14122b" strokeWidth="2" />
      <path d="M270 60 L330 60 L320 90 L280 90 Z" fill="#14122b" />
      <circle cx="300" cy="98" r="14" fill="#9b8ec7" opacity="0.6" />
    </>
  ),

  flag: (
    <>
      <defs>
        <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9b8ec7" />
          <stop offset="100%" stopColor="#14122b" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill="url(#fg)" />
      {/* Flag pole + flag */}
      <line x1="200" y1="60" x2="200" y2="360" stroke="#f2eae0" strokeWidth="3" />
      <path d="M200 80 Q 320 60, 440 90 Q 460 120, 440 150 Q 320 130, 200 150 Z" fill="#bda6ce" />
      {/* Stars */}
      {[
        { x: 230, y: 100 },
        { x: 260, y: 110 },
        { x: 290, y: 105 },
        { x: 240, y: 130 },
        { x: 280, y: 135 },
      ].map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="2.5" fill="#f2eae0" />
      ))}
      <path d="M0 360 L600 360 L600 400 L0 400 Z" fill="#14122b" />
    </>
  ),
}

const Scene = ({ variant = 'mountains', className, animated = true, label }) => {
  const content = variants[variant] ?? variants.mountains
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <motion.svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden={!label}
        role={label ? 'img' : undefined}
        aria-label={label}
        initial={animated ? { scale: 1.08 } : false}
        whileInView={animated ? { scale: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {content}
      </motion.svg>
      {/* Subtle grid overlay */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 size-full opacity-15">
        <defs>
          <pattern id={`sg-${variant}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="#f2eae0" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#sg-${variant})`} />
      </svg>
    </div>
  )
}

export default Scene
