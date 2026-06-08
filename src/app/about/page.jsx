import SiteShell from '@/components/site/site-shell'
import PageHero from '@/components/site/page-hero'
import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'
import SplitText from '@/components/reveal/split-text'
import KineticButton from '@/components/ui/kinetic-button'
import Scene from '@/components/illustrations/scene'
import AboutTimeline from '@/components/about/about-timeline'
import AboutValues from '@/components/about/about-values'
import AboutStory from '@/components/about/about-story'
import ContactStrip from '@/sections/contact-strip'

export const metadata = {
  title: 'About Jim Hartley',
  description:
    "From a sawmill town outside Lewiston to a Bronze Star recipient and small-business owner — meet the man asking Idaho's 1st District for their vote.",
}

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About · The Candidate"
        title="Built by Idaho. Accountable to Idaho."
        description="Veteran. Father. Small-business owner. Jim Hartley spent two decades putting Idahoans to work — now he's putting that record on the ballot for U.S. Congress."
      >
        <div className="flex flex-wrap items-center gap-4">
          <KineticButton href="/donate" variant="primary" size="lg">
            Donate
          </KineticButton>
          <KineticButton href="/volunteer" variant="ghost" size="lg">
            Volunteer
          </KineticButton>
        </div>
      </PageHero>

      <AboutStory />
      <AboutTimeline />
      <AboutValues />

      <SectionFrame
        id="why-congress"
        eyebrow="Why Congress"
        number="// The case, in one paragraph"
        className="bg-cream pt-16 lg:pt-24"
        innerClassName="pb-24 lg:pb-32"
      >
        <div className="grid grid-cols-12 gap-y-12 pt-12 lg:gap-x-10 lg:pt-20">
          <Reveal y={20} className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-ink-900/10">
              <Scene
                variant="vista"
                className="absolute inset-0 size-full"
                label="Idaho vista with eagle silhouette"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-cream/85 px-4 py-3 backdrop-blur">
                <div className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-ink-500">
                  On the trail
                </div>
                <div className="mt-1 font-display text-sm font-semibold text-ink-900">
                  44 counties · zero corporate dollars
                </div>
              </div>
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-7">
            <Reveal y={20}>
              <SplitText
                as="h2"
                text="A representative who answers to Idaho — not to the cable-news shouting class."
                className="font-display text-[clamp(1.9rem,4.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-ink-900"
                inView
                stagger={0.04}
              />
            </Reveal>

            <Reveal
              y={20}
              delay={0.1}
              className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-ink-700 sm:text-[17px]"
            >
              <p>
                Jim is running for U.S. Congress because the people of Idaho&apos;s 1st District
                deserve a representative who reads the bills, shows up in their county, and tells
                them the truth — even when it&apos;s the harder story to tell.
              </p>
              <p>
                He&apos;s not running to be famous on cable news. He&apos;s running to be useful in
                Washington. That means a smaller staff, a bigger travel budget, and a public ledger
                of every meeting on the calendar.
              </p>
            </Reveal>

            <Reveal y={20} delay={0.2} className="mt-10 flex flex-wrap gap-4">
              <KineticButton href="/platform" variant="dark" size="md">
                Read the platform
              </KineticButton>
              <KineticButton href="/events" variant="ghost" size="md">
                Meet Jim at an event
              </KineticButton>
            </Reveal>
          </div>
        </div>
      </SectionFrame>

      <ContactStrip />
    </SiteShell>
  )
}
