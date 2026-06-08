'use client'

import { useRef } from 'react'

import { useMotionValue, useSpring, useTransform } from 'motion/react'

/* useTilt — 3D tilt + glare position. Returns refs + motion values
 * suitable for hover-tilt cards.
 */
export function useTilt({ max = 6, glareMax = 0.18 } = {}) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.5 })
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.5 })

  const rotateX = useTransform(sy, [-1, 1], [max, -max])
  const rotateY = useTransform(sx, [-1, 1], [-max, max])
  const glareX = useTransform(sx, [-1, 1], ['10%', '90%'])
  const glareY = useTransform(sy, [-1, 1], ['10%', '90%'])
  const glareO = useMotionValue(0)
  const glareOSpring = useSpring(glareO, { stiffness: 200, damping: 24 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 2 - 1
    const y = ((e.clientY - r.top) / r.height) * 2 - 1
    mx.set(x)
    my.set(y)
    glareO.set(glareMax)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
    glareO.set(0)
  }

  return {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    rotateX,
    rotateY,
    glareX,
    glareY,
    glareO: glareOSpring,
  }
}
