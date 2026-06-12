'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'

import KineticButton from '@/components/ui/kinetic-button'
import NavLink from '@/components/site/nav-link'

import { cn } from '@/utils/cn'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Platform', href: '/platform' },
  { label: 'Events', href: '/events' },
  { label: 'Endorsements', href: '/endorsements' },
  { label: 'Social', href: '/social-media-posts' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'Contact', href: '/contact' },
]

/* Routes whose page hero uses a dark background. At the top of these pages the
 * header is transparent over a dark hero, so its text must be cream. Once
 * scrolled past the hero, the header gets its cream backdrop and the text
 * flips back to ink-900. */
const DARK_HERO_ROUTES = ['/donate']

const Header = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isDarkHero = DARK_HERO_ROUTES.includes(pathname ?? '')
  /* light mode = use ink text/logo. dark mode = use cream text/logo. */
  const useLightOnDark = isDarkHero && !scrolled

  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 80], [0, 0.92])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,border-color] duration-500',
          scrolled ? 'backdrop-blur-xl' : '',
        )}
      >
        <motion.div
          style={{
            backgroundColor: useTransform(headerBg, (v) => `rgba(242, 234, 224, ${v})`),
          }}
          className={cn(
            'absolute inset-0 -z-10 transition-[border-color] duration-500',
            scrolled ? 'border-b border-ink-900/10' : 'border-b border-transparent',
          )}
        />
        <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-6 px-6 xl:h-20 xl:px-10">
          <Link href="/" className="group inline-flex items-center gap-3" aria-label="Home">
            <span
              className={cn(
                'relative grid size-9 place-items-center overflow-hidden rounded-full transition-colors duration-300 xl:size-10',
                useLightOnDark ? 'bg-cream text-ink-900' : 'bg-ink-900 text-cream',
              )}
            >
              <span className="absolute inset-0 translate-y-full bg-iris transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative font-display text-[15px] font-bold lg:text-base">H</span>
            </span>
            <span className="flex flex-col whitespace-nowrap leading-none">
              <span
                className={cn(
                  'font-display text-[15px] font-semibold tracking-[-0.04em] transition-colors xl:text-base',
                  open || useLightOnDark ? 'text-cream' : 'text-ink-900',
                )}
              >
                Jim&nbsp;Hartley
              </span>
              <span
                className={cn(
                  'mt-1 font-mono-display text-[9.5px] uppercase tracking-[0.22em] transition-colors xl:text-[10.5px]',
                  open || useLightOnDark ? 'text-cream/55' : 'text-ink-500',
                )}
              >
                for Idaho · ID-01
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onDark={useLightOnDark}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <KineticButton
              href="/volunteer"
              variant={useLightOnDark ? 'outline' : 'ghost'}
              size="sm"
              arrow={false}
            >
              Volunteer
            </KineticButton>
            <KineticButton href="/donate" variant="primary" size="sm">
              Donate
            </KineticButton>
          </div>

          {/* Tablet/medium: show donate + hamburger */}
          <div className="flex items-center gap-3 xl:hidden">
            <KineticButton
              href="/donate"
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
            >
              Donate
            </KineticButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                'relative inline-flex size-11 items-center justify-center rounded-full border transition-colors',
                open
                  ? 'border-cream/40 bg-cream/10'
                  : useLightOnDark
                    ? 'border-cream/40'
                    : 'border-ink-900/20',
              )}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span
                className={cn(
                  'absolute h-px w-5 transition-[transform,background-color] duration-300',
                  open
                    ? 'rotate-45 bg-cream'
                    : useLightOnDark
                      ? '-translate-y-1.5 bg-cream'
                      : '-translate-y-1.5 bg-ink-900',
                )}
              />
              <span
                className={cn(
                  'absolute h-px w-5 transition-[transform,background-color] duration-300',
                  open
                    ? '-rotate-45 bg-cream'
                    : useLightOnDark
                      ? 'translate-y-1.5 bg-cream'
                      : 'translate-y-1.5 bg-ink-900',
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grain absolute inset-0 overflow-y-auto bg-ink-900 px-6 pb-8 pt-20 text-cream"
            >
              <div className="flex min-h-full flex-col">
                <nav className="flex flex-1 flex-col gap-1">
                  {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.15 + i * 0.06,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between border-b border-cream/15 py-4 sm:py-5"
                      >
                        <span className="font-display text-[28px] font-medium text-cream sm:text-3xl">
                          {link.label}
                        </span>
                        <span className="text-cream/40 transition-transform duration-500 group-hover:translate-x-1">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 8h10m0 0L9 4m4 4l-4 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="mt-6 flex flex-col gap-3"
                >
                  <Link
                    href="/donate"
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-full bg-iris px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-cream"
                  >
                    Donate
                  </Link>
                  <Link
                    href="/volunteer"
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-full border border-cream/30 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-cream"
                  >
                    Volunteer
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
