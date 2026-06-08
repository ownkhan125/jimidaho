'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import PropTypes from 'prop-types'

import { cn } from '@/utils/cn'

const NavLink = ({ href, label, onDark = false }) => {
  const [hovered, setHovered] = useState(false)
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname?.startsWith(href))

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
        onDark
          ? isActive
            ? 'text-cream'
            : 'text-cream/70 hover:text-cream'
          : isActive
            ? 'text-ink-900'
            : 'text-ink-700 hover:text-ink-900',
      )}
    >
      <span className="relative inline-block overflow-hidden py-0.5">
        <span className="relative block">
          <motion.span
            className="block"
            animate={{ y: hovered ? '-110%' : '0%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {label}
          </motion.span>
          <motion.span
            aria-hidden
            className="absolute inset-0 block"
            initial={false}
            animate={{ y: hovered ? '0%' : '110%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {label}
          </motion.span>
        </span>
      </span>

      {/* Animated SVG underline */}
      <svg
        className="pointer-events-none absolute inset-x-4 bottom-1 h-1"
        viewBox="0 0 60 4"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M0 2 Q 15 0, 30 2 T 60 2"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          className="text-iris"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: hovered || isActive ? 1 : 0,
            opacity: hovered || isActive ? 1 : 0,
          }}
          transition={{
            pathLength: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2 },
          }}
        />
      </svg>

      {/* Active dot */}
      {isActive && (
        <span className="absolute -top-0.5 right-2 size-1.5 rounded-full bg-iris shadow-[0_0_10px_rgba(155,142,199,0.85)]" />
      )}

      {/* Traveling hover dot */}
      <AnimatePresence>
        {hovered && !isActive && (
          <motion.span
            key="dot"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-0.5 right-2 size-1.5 rounded-full bg-iris shadow-[0_0_10px_rgba(155,142,199,0.85)]"
          />
        )}
      </AnimatePresence>
    </Link>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onDark: PropTypes.bool,
}

export default NavLink
