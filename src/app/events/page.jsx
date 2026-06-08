import SiteShell from '@/components/site/site-shell'
import PageHero from '@/components/site/page-hero'
import KineticButton from '@/components/ui/kinetic-button'
import EventsList from '@/components/events/events-list'
import ContactStrip from '@/sections/contact-strip'

export const metadata = {
  title: 'Upcoming Events',
  description:
    "Town halls, rallies, and roundtables across Idaho's 1st District. Open to the public — no pre-screened questions.",
}

export default function EventsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Events · Across Idaho"
        title="Find Jim near you."
        description="Every event is open to the public and live-streamed on the campaign channel. There are no pre-screened questions and no podiums between you and the candidate."
      >
        <div className="flex flex-wrap items-center gap-4">
          <KineticButton href="/contact" variant="primary" size="lg">
            Host an event
          </KineticButton>
          <KineticButton href="/volunteer" variant="ghost" size="lg">
            Volunteer at one
          </KineticButton>
        </div>
      </PageHero>

      <EventsList />

      <ContactStrip />
    </SiteShell>
  )
}
