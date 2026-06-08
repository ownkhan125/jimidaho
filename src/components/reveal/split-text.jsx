'use client'

import { motion } from 'motion/react'
import PropTypes from 'prop-types'

import { EASE } from '@/animations/variants'
import { cn } from '@/utils/cn'

const splitToWords = (text) => text.split(/(\s+)/)

const SplitText = ({
  as = 'span',
  text = '',
  className,
  wordClassName,
  inView = false,
  delay = 0,
  duration = 0.9,
  stagger = 0.06,
  y = 36,
}) => {
  const Tag = motion[as] ?? motion.span
  const words = splitToWords(text)

  return (
    <Tag
      className={cn('inline-block', className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      aria-label={text}
    >
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}> </span>
        return (
          <span
            key={i}
            className={cn('relative inline-block overflow-hidden align-baseline', wordClassName)}
            aria-hidden="true"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration, ease: EASE },
                },
              }}
            >
              {w}
            </motion.span>
          </span>
        )
      })}
    </Tag>
  )
}

SplitText.propTypes = {
  as: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  wordClassName: PropTypes.string,
  inView: PropTypes.bool,
  delay: PropTypes.number,
  duration: PropTypes.number,
  stagger: PropTypes.number,
  y: PropTypes.number,
}

export default SplitText
