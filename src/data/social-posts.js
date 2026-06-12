/* Social Media Posts catalog.
 *
 * Every entry maps to a static HTML creative under /public/social/<format>/.
 * `width`/`height` are the source design dimensions — used by the gallery
 * and detail page to compute aspect-ratio-preserving scales. */

export const POST_FORMATS = {
  feed: {
    key: 'feed',
    label: 'Feed Post',
    ratioLabel: '1:1',
    width: 1080,
    height: 1080,
  },
  story: {
    key: 'story',
    label: 'Story',
    ratioLabel: '9:16',
    width: 540,
    height: 960,
  },
}

const buildPost = ({ id, format, file, title, kind, summary, palette }) => {
  const slug = `${format}-${id}-${file.replace(/^\d+-/, '').replace(/\.html$/, '')}`
  const src = `/social/${format === 'feed' ? 'feed' : 'stories'}/${file}`
  const dims = POST_FORMATS[format]

  return {
    slug,
    id,
    format,
    title,
    kind,
    summary,
    palette,
    src,
    width: dims.width,
    height: dims.height,
    ratioLabel: dims.ratioLabel,
    formatLabel: dims.label,
  }
}

const FEED = [
  {
    id: '01',
    file: '01-bold-quote.html',
    title: 'Bold Quote',
    kind: 'Editorial',
    summary:
      'A magazine-style pull-quote on a deep navy gradient. Built for thought-leadership posts and voter testimonials.',
    palette: ['navy', 'red'],
  },
  {
    id: '02',
    file: '02-hero-announcement.html',
    title: 'Hero Announcement',
    kind: 'Announcement',
    summary:
      'A full-bleed headline anchored by a date stamp and a single decisive CTA. Use it for launches and big news.',
    palette: ['navy', 'red'],
  },
  {
    id: '03',
    file: '03-diagonal-split.html',
    title: 'Diagonal Split',
    kind: 'Editorial',
    summary:
      'A diagonal red/navy composition for two-sided messages — past vs. future, problem vs. promise.',
    palette: ['red', 'navy'],
  },
  {
    id: '04',
    file: '04-event-date.html',
    title: 'Event Date',
    kind: 'Event',
    summary:
      'A datestamp-led card built for town halls, rallies, and meet-and-greets. Optimized for save-the-date drops.',
    palette: ['navy', 'cream'],
  },
  {
    id: '05',
    file: '05-testimonial-portrait.html',
    title: 'Testimonial Portrait',
    kind: 'Endorsement',
    summary:
      'A portrait-and-quote layout for endorsements. Strong contrast between the photo block and the editorial type.',
    palette: ['cream', 'red'],
  },
  {
    id: '06',
    file: '06-statistic-hero.html',
    title: 'Statistic Hero',
    kind: 'Data',
    summary:
      'A single oversized number with a short caption. Use it to anchor a stat-driven message.',
    palette: ['navy', 'red'],
  },
  {
    id: '07',
    file: '07-stat-grid.html',
    title: 'Stat Grid',
    kind: 'Data',
    summary:
      'A four-up data grid. Each tile is a self-contained number with a short label — perfect for an at-a-glance brief.',
    palette: ['cream', 'navy'],
  },
  {
    id: '08',
    file: '08-community-grid.html',
    title: 'Community Grid',
    kind: 'Community',
    summary:
      'A polaroid-style grid of community moments. Use it for volunteer thank-yous and door-knocking weekends.',
    palette: ['cream', 'red'],
  },
  {
    id: '09',
    file: '09-bold-cta.html',
    title: 'Bold CTA',
    kind: 'Call to Action',
    summary:
      'A single, unmissable call to action. Made for the moment you want one click and one click only.',
    palette: ['red', 'navy'],
  },
  {
    id: '10',
    file: '10-magazine-cover.html',
    title: 'Magazine Cover',
    kind: 'Editorial',
    summary:
      'A high-fashion magazine cover treatment. Use it for issue drops, platform launches, and milestone moments.',
    palette: ['navy', 'red'],
  },
]

const STORIES = [
  {
    id: '01',
    file: '01-vertical-quote.html',
    title: 'Vertical Quote',
    kind: 'Editorial',
    summary:
      'A tall pull-quote that holds the eye top-to-bottom. Built for re-shares of speeches and statements.',
    palette: ['navy', 'red'],
  },
  {
    id: '02',
    file: '02-photo-fullbleed.html',
    title: 'Full-Bleed Photo',
    kind: 'Editorial',
    summary:
      'A full-bleed photographic story with a sharp typographic overlay. Best for landscape and crowd shots.',
    palette: ['cream', 'navy'],
  },
  {
    id: '03',
    file: '03-countdown.html',
    title: 'Countdown',
    kind: 'Event',
    summary:
      'A days-to-go countdown with a save-the-date card. Use it in the 14-day window before any major event.',
    palette: ['red', 'navy'],
  },
  {
    id: '04',
    file: '04-sticker-poll.html',
    title: 'Poll Sticker',
    kind: 'Engagement',
    summary:
      'A poll-friendly sticker layout. Drop in the in-app sticker and the design becomes a single tap question.',
    palette: ['cream', 'red'],
  },
  {
    id: '05',
    file: '05-editorial-polaroid.html',
    title: 'Editorial Polaroid',
    kind: 'Community',
    summary:
      'A tilted polaroid set against editorial typography. Made for behind-the-scenes campaign moments.',
    palette: ['cream', 'navy'],
  },
  {
    id: '06',
    file: '06-vertical-stats.html',
    title: 'Vertical Stats',
    kind: 'Data',
    summary:
      'A stacked-stat story — three numbers, three stories, in a single scroll. Great for issue-by-issue rollouts.',
    palette: ['navy', 'red'],
  },
  {
    id: '07',
    file: '07-split-then-now.html',
    title: 'Then / Now Split',
    kind: 'Editorial',
    summary:
      'A horizontal split that contrasts past and future. Use it for before-and-after messaging.',
    palette: ['cream', 'navy'],
  },
  {
    id: '08',
    file: '08-quote-stack.html',
    title: 'Quote Stack',
    kind: 'Endorsement',
    summary:
      'Three stacked endorsement cards inside a single story. Built for press hits and headline collages.',
    palette: ['cream', 'red'],
  },
  {
    id: '09',
    file: '09-big-announcement.html',
    title: 'Big Announcement',
    kind: 'Announcement',
    summary:
      'An oversized announcement banner. Use it for endorsements, launches, and pivot moments.',
    palette: ['red', 'navy'],
  },
  {
    id: '10',
    file: '10-swipe-up-cta.html',
    title: 'Swipe-Up CTA',
    kind: 'Call to Action',
    summary:
      'A swipe-up call to action with a clear arrow and a single destination. Made for donate and RSVP runs.',
    palette: ['navy', 'red'],
  },
]

export const POSTS = [
  ...FEED.map((p) => buildPost({ ...p, format: 'feed' })),
  ...STORIES.map((p) => buildPost({ ...p, format: 'story' })),
]

export const POST_KINDS = Array.from(new Set(POSTS.map((p) => p.kind))).sort()

export const findPost = (slug) => POSTS.find((p) => p.slug === slug) ?? null

export const adjacentPosts = (slug) => {
  const i = POSTS.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  const prev = i === 0 ? POSTS[POSTS.length - 1] : POSTS[i - 1]
  const next = i === POSTS.length - 1 ? POSTS[0] : POSTS[i + 1]
  return { prev, next }
}
