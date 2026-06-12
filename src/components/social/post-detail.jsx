'use client'

import Link from 'next/link'

import { motion } from 'motion/react'
import PropTypes from 'prop-types'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import KineticButton from '@/components/ui/kinetic-button'
import PostPreview from '@/components/social/post-preview'

import { useInView } from '@/hooks/use-in-view'

const META = (post) => [
  { k: 'Format', v: post.formatLabel },
  { k: 'Aspect', v: post.ratioLabel },
  { k: 'Kind', v: post.kind },
  { k: 'Source', v: post.format === 'feed' ? '1080 × 1080' : '540 × 960' },
]

const NavCard = ({ post, direction }) => {
  const isPrev = direction === 'prev'
  return (
    <Link
      href={`/social-media-posts/${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-ink-900/15 bg-cream-soft transition-colors duration-500 hover:border-ink-900/40"
    >
      <div className="flex items-center justify-between gap-4 border-b border-ink-900/10 px-6 py-4">
        <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
          {isPrev ? '← Previous' : 'Next →'}
        </span>
        <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
          No.&nbsp;{post.id}
        </span>
      </div>
      <div className="grid grid-cols-[112px_1fr] gap-5 p-5 sm:grid-cols-[140px_1fr]">
        <div
          className="overflow-hidden rounded-2xl border border-ink-900/10"
          style={{ aspectRatio: `${post.width} / ${post.height}` }}
        >
          <PostPreview src={post.src} width={post.width} height={post.height} title={post.title} />
        </div>
        <div className="flex flex-col justify-center gap-2">
          <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
            {post.kind} · {post.formatLabel}
          </span>
          <h3 className="font-display text-lg font-semibold leading-tight tracking-[-0.03em] text-ink-900 sm:text-xl">
            {post.title}
          </h3>
          <span className="mt-1 inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-900 transition-colors group-hover:text-iris">
            Open
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

NavCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    formatLabel: PropTypes.string.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(['prev', 'next']).isRequired,
}

const PostDetail = ({ post, prev, next }) => {
  const [titleRef, titleInView] = useInView({ threshold: 0.3 })
  const isStory = post.format === 'story'

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-cream pt-32 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 top-20 size-[420px] rounded-full bg-mist blur-[120px] opacity-45" />
          <div className="absolute -right-10 top-[40%] size-[460px] rounded-full bg-lilac blur-[140px] opacity-30" />
        </div>

        <div className="relative mx-auto w-full max-w-[1320px] px-6 pb-16 lg:px-10 lg:pb-24">
          {/* Breadcrumb */}
          <Reveal
            y={10}
            className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ink-500"
          >
            <Link href="/" className="hover:text-ink-900">
              Home
            </Link>
            <span>/</span>
            <Link href="/social-media-posts" className="hover:text-ink-900">
              Social Library
            </Link>
            <span>/</span>
            <span className="text-ink-900">{post.kind}</span>
          </Reveal>

          <div className="mt-8 grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-7">
              <Reveal y={12}>
                <div className="inline-flex items-center gap-3 rounded-full border border-ink-900/15 bg-cream-soft px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-ink-700">
                  <span className="size-1.5 rounded-full bg-iris" />
                  {post.formatLabel} · {post.ratioLabel} · No.&nbsp;{post.id}
                </div>
              </Reveal>

              <div ref={titleRef} className="mt-8">
                <SplitText
                  as="h1"
                  text={post.title}
                  className="font-display text-[clamp(2.2rem,6vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink-900"
                  inView={titleInView}
                  stagger={0.05}
                  duration={0.9}
                  y={56}
                />
              </div>

              <Reveal y={20} delay={0.2} className="mt-8 max-w-xl">
                <p className="text-base leading-relaxed text-ink-700 sm:text-lg">{post.summary}</p>
              </Reveal>

              <Reveal
                y={20}
                delay={0.3}
                className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-900/15 bg-ink-900/15 sm:grid-cols-4"
              >
                {META(post).map((f) => (
                  <div key={f.k} className="bg-cream-soft p-5">
                    <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                      {f.k}
                    </div>
                    <div className="mt-2 font-display text-base font-semibold leading-tight text-ink-900">
                      {f.v}
                    </div>
                  </div>
                ))}
              </Reveal>

              <Reveal y={20} delay={0.4} className="mt-8 flex flex-wrap gap-4">
                <KineticButton href="#full-view" variant="primary" size="lg">
                  Open full view
                </KineticButton>
                <KineticButton
                  as="a"
                  href={post.src}
                  variant="ghost"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open standalone
                </KineticButton>
              </Reveal>
            </div>

            {/* Preview card */}
            <Reveal y={32} delay={0.15} className="col-span-12 lg:col-span-5">
              <div className="relative overflow-hidden rounded-[28px] border border-ink-900/10 bg-ink-900 shadow-[0_30px_80px_-40px_rgba(20,18,43,0.4)]">
                <div className="flex items-center justify-between gap-4 border-b border-cream/10 px-5 py-3 text-cream">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-signal/80" />
                    <span className="size-2 rounded-full bg-iris/70" />
                    <span className="size-2 rounded-full bg-ok/70" />
                  </div>
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-cream/55">
                    Preview · {post.formatLabel}
                  </span>
                </div>
                <div className={isStory ? 'mx-auto w-[70%] sm:w-[58%] lg:w-[74%]' : 'w-full'}>
                  <PostPreview
                    src={post.src}
                    width={post.width}
                    height={post.height}
                    title={post.title}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FULL VIEW */}
      <section id="full-view" className="relative isolate overflow-hidden bg-ink-900 py-20 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 right-[-10%] size-[520px] rounded-full bg-iris blur-[140px] opacity-30" />
          <div className="absolute bottom-[-30%] left-[10%] size-[520px] rounded-full bg-lilac blur-[160px] opacity-20" />
        </div>

        <div className="mx-auto w-full max-w-[1320px] px-6 lg:px-10">
          <Reveal
            y={16}
            className="mb-10 flex flex-wrap items-end justify-between gap-6 text-cream"
          >
            <div>
              <div className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-cream/55">
                Full view · uncropped
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,4.4vw,3rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
                The complete creative.
              </h2>
            </div>
            <div className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-cream/55">
              {post.format === 'feed' ? '1080 × 1080 px' : '540 × 960 px'}
            </div>
          </Reveal>

          <Reveal y={28} delay={0.1}>
            <div
              className="relative mx-auto overflow-hidden rounded-[28px] border border-cream/15 bg-cream/5 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.6)]"
              style={
                isStory
                  ? { maxWidth: 'min(560px, 92vw)' }
                  : { maxWidth: 'min(960px, 100%)' }
              }
            >
              <PostPreview
                src={post.src}
                width={post.width}
                height={post.height}
                title={post.title}
                interactive
              />
            </div>
          </Reveal>

          <Reveal y={20} delay={0.2} className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-xl text-sm leading-relaxed text-cream/70">
              The preview is rendered from the live HTML — exactly as it ships to Instagram,
              Facebook, and X. Open the standalone file to copy assets or hand it off to a designer.
            </p>
            <KineticButton
              as="a"
              href={post.src}
              variant="outline"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open standalone file
            </KineticButton>
          </Reveal>
        </div>
      </section>

      {/* PREV / NEXT */}
      <SectionFrame
        eyebrow="Keep browsing"
        number="// Prev · Next"
        className="bg-cream-soft"
        innerClassName="py-20 lg:py-28"
      >
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            <NavCard post={prev} direction="prev" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="flex"
          >
            <NavCard post={next} direction="next" />
          </motion.div>
        </div>

        <Reveal
          y={20}
          delay={0.15}
          className="mt-12 flex flex-wrap items-center justify-between gap-6"
        >
          <p className="text-sm text-ink-500">Back to the full library →</p>
          <KineticButton href="/social-media-posts" variant="dark" size="md">
            All posts
          </KineticButton>
        </Reveal>
      </SectionFrame>
    </>
  )
}

const postShape = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  formatLabel: PropTypes.string.isRequired,
  ratioLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
})

PostDetail.propTypes = {
  post: postShape.isRequired,
  prev: postShape.isRequired,
  next: postShape.isRequired,
}

export default PostDetail
