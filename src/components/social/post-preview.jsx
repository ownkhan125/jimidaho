'use client'

import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { cn } from '@/utils/cn'

/* Renders the source HTML creative inside an iframe scaled to fit the
 * container, preserving the original aspect ratio. The iframe is set to
 * the creative's design width and height; a CSS scale transform maps it
 * into the available space. */
const PostPreview = ({ src, width, height, title, className, interactive = false }) => {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const update = () => {
      const w = el.clientWidth
      if (w > 0) setScale(w / width)
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  return (
    <div
      ref={wrapRef}
      className={cn('relative w-full overflow-hidden bg-ink-900/95', className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        scrolling="no"
        tabIndex={interactive ? 0 : -1}
        aria-hidden={interactive ? undefined : true}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: scale > 0 ? `scale(${scale})` : 'scale(0)',
          transformOrigin: 'top left',
          pointerEvents: interactive ? 'auto' : 'none',
        }}
        className="absolute left-0 top-0 block border-0"
      />
    </div>
  )
}

PostPreview.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  interactive: PropTypes.bool,
}

export default PostPreview
