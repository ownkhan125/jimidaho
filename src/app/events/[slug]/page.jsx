import { notFound } from 'next/navigation'

import SiteShell from '@/components/site/site-shell'
import EventDetail from '@/components/events/event-detail'

import { EVENTS, findEvent, relatedEvents } from '@/data/events'

export const generateStaticParams = async () => EVENTS.map((e) => ({ slug: e.slug }))

export const generateMetadata = async ({ params }) => {
  const { slug } = await params
  const event = findEvent(slug)
  if (!event) return { title: 'Event not found' }
  return {
    title: event.title,
    description: event.excerpt,
  }
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params
  const event = findEvent(slug)
  if (!event) notFound()
  const related = relatedEvents(slug, 2)

  return (
    <SiteShell>
      <EventDetail event={event} related={related} />
    </SiteShell>
  )
}
