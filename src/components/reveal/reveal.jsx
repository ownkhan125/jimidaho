'use client'

import { motion } from 'motion/react'

import { useInView } from '@/hooks/use-in-view'
import { EASE } from '@/animations/variants'
import { cn } from '@/utils/cn'

const buildVariant = ({ x = 0, y = 24, scale = 1, duration = 0.9, delay = 0 }) => ({
  hidden: { opacity: 0, x, y, scale },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration, ease: EASE, delay },
  },
})

const Reveal = ({
  as = 'div',
  className,
  children,
  x = 0,
  y = 24,
  scale = 1,
  duration = 0.9,
  delay = 0,
  threshold = 0.2,
  rootMargin = '0px 0px -8% 0px',
  once = true,
  asChild,
  ...rest
}) => {
  const Tag = motion[as] ?? motion.div
  const [ref, inView] = useInView({ threshold, rootMargin, once })

  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={buildVariant({ x, y, scale, duration, delay })}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
