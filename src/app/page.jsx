import SiteShell from '@/components/site/site-shell'
import Hero from '@/sections/hero'
import AnnouncementMarquee from '@/sections/announcement-marquee'
import About from '@/sections/about'
import Numbers from '@/sections/numbers'
import Platform from '@/sections/platform'
import Endorsements from '@/sections/endorsements'
import Events from '@/sections/events'
import Cta from '@/sections/cta'
import ContactStrip from '@/sections/contact-strip'

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <AnnouncementMarquee />
      <About />
      <Numbers />
      <Platform />
      <Endorsements />
      <Events />
      <Cta />
      <ContactStrip />
    </SiteShell>
  )
}
