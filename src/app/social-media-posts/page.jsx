import SiteShell from '@/components/site/site-shell'
import PageHero from '@/components/site/page-hero'
import KineticButton from '@/components/ui/kinetic-button'
import SocialGallery from '@/components/social/social-gallery'
import ContactStrip from '@/sections/contact-strip'

export const metadata = {
  title: 'Social Media Posts',
  description:
    'A curated library of campaign-ready social creatives — feed posts and stories built to ship at the speed of the news cycle.',
}

export default function SocialMediaPostsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Press Kit · Social Library"
        title="The social media library."
        description="A curated set of feed posts and stories — built to ship at the speed of the news cycle. Browse the full library, preview every creative end-to-end, and grab the one you need."
      >
        <div className="flex flex-wrap items-center gap-4">
          <KineticButton href="#library" variant="primary" size="lg">
            Browse the library
          </KineticButton>
          <KineticButton href="/contact" variant="ghost" size="lg">
            Request a custom post
          </KineticButton>
        </div>
      </PageHero>

      <div id="library">
        <SocialGallery />
      </div>

      <ContactStrip />
    </SiteShell>
  )
}
