'use client'

import { useEffect, useRef, useState } from 'react'

import { animate } from 'motion'
import PropTypes from 'prop-types'

import { useInView } from '@/hooks/use-in-view'

const Counter = ({ to = 0, duration = 2.2, prefix = '', suffix = '', format = (v) => v }) => {
  /* threshold 0.3 — fires once 30% of the number element is in view; default
   * once: true means it never repeats unless the user navigates away and back. */
  const [ref, inView] = useInView({ threshold: 0.3 })
  const [val, setVal] = useState(0)
  const controlsRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    controlsRef.current?.stop?.()
    controlsRef.current = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => controlsRef.current?.stop?.()
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {prefix}
      {format(Math.round(val))}
      {suffix}
    </span>
  )
}

Counter.propTypes = {
  to: PropTypes.number,
  duration: PropTypes.number,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  format: PropTypes.func,
}

export default Counter
