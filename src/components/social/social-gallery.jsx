'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

import { motion } from 'motion/react'

import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import PostPreview from '@/components/social/post-preview'

import { POSTS, POST_KINDS } from '@/data/social-posts'
import { cn } from '@/utils/cn'

const FORMAT_FILTERS = [
  { value: 'all', label: 'All Formats' },
  { value: 'feed', label: 'Feed · 1:1' },
  { value: 'story', label: 'Story · 9:16' },
]

const FormatBadge = ({ post }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-3 py-1.5 font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-900 backdrop-blur">
    <span className="size-1.5 rounded-full bg-iris" />
    {post.formatLabel} · {post.ratioLabel}
  </span>
)

import PropTypes from 'prop-types'

FormatBadge.propTypes = {
  post: PropTypes.shape({
    formatLabel: PropTypes.string.isRequired,
    ratioLabel: PropTypes.string.isRequired,
  }).isRequired,
}

const PostCard = ({ post }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-ink-900/15 bg-cream-soft transition-colors duration-500 hover:border-ink-900/35"
    >
      <Link href={`/social-media-posts/${post.slug}`} className="contents">
        <div className="relative">
          <PostPreview
            src={post.src}
            width={post.width}
            height={post.height}
            title={post.title}
          />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <FormatBadge post={post} />
          </div>
          <div className="absolute right-4 top-4 rounded-full bg-ink-900/85 px-3 py-1.5 font-mono-display text-[10px] uppercase tracking-[0.22em] text-cream backdrop-blur">
            {post.kind}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="pointer-events-none absolute bottom-4 right-4 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-mono-display text-[11px] uppercase tracking-[0.2em] text-ink-900">
              Open
              <span aria-hidden>→</span>
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6 lg:p-7">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 lg:text-[22px]">
              {post.title}
            </h3>
            <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
              No.&nbsp;{post.id}
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-ink-700">{post.summary}</p>
          <div className="mt-auto flex items-center justify-between border-t border-ink-900/10 pt-4">
            <span className="font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
              {post.format === 'feed' ? '1080 × 1080' : '540 × 960'}
            </span>
            <span className="inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-900 transition-colors group-hover:text-iris">
              View post
              <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    formatLabel: PropTypes.string.isRequired,
    ratioLabel: PropTypes.string.isRequired,
  }).isRequired,
}

const FilterChip = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'rounded-full border px-4 py-2 font-mono-display text-[11px] uppercase tracking-[0.18em] transition-colors duration-300',
      active
        ? 'border-iris bg-iris text-cream'
        : 'border-ink-900/20 bg-cream-soft text-ink-700 hover:border-ink-900/40',
    )}
  >
    {children}
  </button>
)

FilterChip.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

const SocialGallery = () => {
  const [format, setFormat] = useState('all')
  const [kind, setKind] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return POSTS.filter((p) => (format === 'all' ? true : p.format === format))
      .filter((p) => (kind === 'All' ? true : p.kind === kind))
      .filter((p) => {
        if (!q) return true
        return (
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.kind.toLowerCase().includes(q) ||
          p.formatLabel.toLowerCase().includes(q)
        )
      })
  }, [format, kind, query])

  const feedPosts = filtered.filter((p) => p.format === 'feed')
  const storyPosts = filtered.filter((p) => p.format === 'story')

  const resetFilters = () => {
    setFormat('all')
    setKind('All')
    setQuery('')
  }

  const hasActiveFilters = format !== 'all' || kind !== 'All' || query.length > 0

  return (
    <SectionFrame
      eyebrow="Library · 20 Creatives"
      number="// Press kit ready"
      className="bg-cream pt-16 lg:pt-24"
      innerClassName="pb-24 lg:pb-32"
    >
      {/* Search + format chips */}
      <Reveal y={20} className="mt-10 flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {FORMAT_FILTERS.map((f) => (
              <FilterChip
                key={f.value}
                active={format === f.value}
                onClick={() => setFormat(f.value)}
              >
                {f.label}
              </FilterChip>
            ))}
          </div>

          <label className="relative block w-full max-w-md">
            <span className="sr-only">Search posts</span>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono-display text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
              /
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, kind, or format"
              className="h-11 w-full rounded-full border border-ink-900/20 bg-cream-soft pl-9 pr-4 text-[13.5px] text-ink-900 placeholder:text-ink-300 focus:border-iris focus:outline-none"
            />
          </label>
        </div>

        {/* Kind filter row */}
        <div className="flex flex-wrap gap-2">
          <FilterChip active={kind === 'All'} onClick={() => setKind('All')}>
            All Kinds
          </FilterChip>
          {POST_KINDS.map((k) => (
            <FilterChip key={k} active={kind === k} onClick={() => setKind(k)}>
              {k}
            </FilterChip>
          ))}
        </div>
      </Reveal>

      {/* Result count + reset */}
      <Reveal
        y={16}
        delay={0.05}
        className="mt-10 flex items-center justify-between border-t border-ink-900/15 pt-6"
      >
        <p className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-ink-500">
          Showing{' '}
          <span className="text-ink-900">{String(filtered.length).padStart(2, '0')}</span> of{' '}
          {String(POSTS.length).padStart(2, '0')}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-iris hover:underline"
          >
            Reset filters
          </button>
        )}
      </Reveal>

      {filtered.length === 0 && (
        <Reveal
          y={20}
          className="mt-12 rounded-3xl border border-dashed border-ink-900/20 p-10 text-center"
        >
          <p className="font-display text-xl text-ink-900">No posts match those filters.</p>
          <p className="mt-2 text-sm text-ink-500">
            Try a different keyword — or clear the filters to see the full library.
          </p>
        </Reveal>
      )}

      {/* Feed grid */}
      {feedPosts.length > 0 && (
        <div className="mt-14">
          <Reveal y={16} className="mb-6 flex items-baseline justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 lg:text-3xl">
              Feed Posts
            </h2>
            <span className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-ink-500">
              {String(feedPosts.length).padStart(2, '0')} · square 1:1
            </span>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {feedPosts.map((post, i) => (
              <Reveal key={post.slug} y={32} delay={0.04 * i} className="flex">
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* Story grid */}
      {storyPosts.length > 0 && (
        <div className="mt-20">
          <Reveal y={16} className="mb-6 flex items-baseline justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink-900 lg:text-3xl">
              Stories
            </h2>
            <span className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-ink-500">
              {String(storyPosts.length).padStart(2, '0')} · vertical 9:16
            </span>
          </Reveal>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {storyPosts.map((post, i) => (
              <Reveal key={post.slug} y={28} delay={0.03 * i} className="flex">
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </SectionFrame>
  )
}

export default SocialGallery
