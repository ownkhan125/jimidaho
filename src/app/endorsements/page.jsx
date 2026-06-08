import SiteShell from '@/components/site/site-shell'
import PageHero from '@/components/site/page-hero'
import KineticButton from '@/components/ui/kinetic-button'
import EndorsementsBoard from '@/components/endorsements/endorsements-board'
import EndorsementSwiper from '@/components/endorsements/endorsement-swiper'
import ContactStrip from '@/sections/contact-strip'

export const metadata = {
  title: 'Endorsements',
  description:
    "Sheriffs, ag co-ops, veterans groups, and small-business associations across Idaho's 1st District backing Jim Hartley.",
}

export default function EndorsementsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Endorsements · ID-01"
        title="The people closest to the work."
        description="Endorsements from law enforcement, ag, small business, veterans, and healthcare leaders across all 10 counties of Idaho's 1st Congressional District."
      >
        <div className="flex flex-wrap items-center gap-4">
          <KineticButton href="/volunteer" variant="primary" size="lg">
            Stand with Jim
          </KineticButton>
          <KineticButton href="/contact" variant="ghost" size="lg">
            Endorse the campaign
          </KineticButton>
        </div>
      </PageHero>

      <EndorsementSwiper />
      <EndorsementsBoard />

      <ContactStrip />
    </SiteShell>
  )
}
