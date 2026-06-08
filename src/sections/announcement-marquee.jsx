'use client'

import { motion } from 'motion/react'

const ITEMS = [
  "Town Hall · Coeur d'Alene · April 22",
  'Now Endorsed by Idaho Farm Bureau',
  'Veteran-led, Idaho-funded',
  'Volunteer applications open',
  'RSVP — Spring Rally Boise',
  'Watch the launch speech',
]

const AnnouncementMarquee = () => {
  return (
    <section
      aria-label="Campaign announcements"
      className="relative border-y border-ink-900/15 bg-cream-soft py-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="relative overflow-hidden"
      >
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center gap-12">
              {ITEMS.map((item, i) => (
                <div
                  key={`${dup}-${i}`}
                  className="flex items-center gap-5 font-mono-display text-[12.5px] uppercase tracking-[0.22em] text-ink-700"
                >
                  <span className="size-1.5 rounded-full bg-iris" />
                  {item}
                  <span className="text-ink-300">/</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-cream-soft to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-cream-soft to-transparent" />
      </motion.div>
    </section>
  )
}

export default AnnouncementMarquee
