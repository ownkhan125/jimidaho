import SiteShell from '@/components/site/site-shell'
import PageHero from '@/components/site/page-hero'
import KineticButton from '@/components/ui/kinetic-button'
import VolunteerStats from '@/components/volunteer/volunteer-stats'
import VolunteerForm from '@/components/forms/volunteer-form'
import SectionFrame from '@/components/reveal/section-frame'
import Reveal from '@/components/reveal/reveal'

export const metadata = {
  title: 'Volunteer',
  description:
    'Two hours or twenty — the campaign is built one neighbor at a time. Sign up to phone bank, door knock, host an event, or help on digital.',
}

export default function VolunteerPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Volunteer · Make a Difference"
        title="The campaign is built one neighbor at a time."
        description="There's a lane for every schedule and every skill. Two hours a week or twenty — every action stacks."
      >
        <div className="flex flex-wrap items-center gap-4">
          <KineticButton href="/donate" variant="primary" size="lg">
            Donate
          </KineticButton>
          <KineticButton href="/events" variant="ghost" size="lg">
            Browse events
          </KineticButton>
        </div>
      </PageHero>

      <VolunteerStats />

      <SectionFrame
        id="signup"
        eyebrow="Sign-up form · ~3 minutes"
        number="// Tell us how you can help"
        className="bg-cream pt-16 lg:pt-24"
        innerClassName="pb-24 lg:pb-32"
      >
        <div className="grid grid-cols-12 gap-y-10 pt-10 lg:gap-x-10 lg:pt-16">
          <div className="col-span-12 lg:col-span-4">
            <Reveal y={20}>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-ink-900">
                Tell us how you&apos;d like to help.
              </h2>
            </Reveal>
            <Reveal y={20} delay={0.1}>
              <p className="mt-6 text-[15px] leading-relaxed text-ink-700">
                We&apos;ll match you with a regional captain in your county and send a welcome
                packet within 48 hours. No spam — we promise.
              </p>
            </Reveal>
            <Reveal y={20} delay={0.2} className="mt-8">
              <div className="rounded-2xl border border-ink-900/10 bg-cream-soft p-6">
                <div className="font-mono-display text-[10.5px] uppercase tracking-[0.24em] text-ink-500">
                  Volunteer testimonial
                </div>
                <p className="mt-3 font-display text-base text-ink-900">
                  &ldquo;I signed up for two hours a week. A month in I&apos;m knocking my own
                  neighborhood and loving it. The team is serious — and kind.&rdquo;
                </p>
                <div className="mt-3 text-[12.5px] text-ink-500">
                  Anna T. · Caldwell · Volunteer Coordinator
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <Reveal y={28} delay={0.05}>
              <VolunteerForm />
            </Reveal>
          </div>
        </div>
      </SectionFrame>
    </SiteShell>
  )
}
