import type { Metadata } from 'next'

import { ScheduleBrowser } from '@/components/events/ScheduleBrowser'
import { PageHero } from '@/components/ui/PageHero'
import { getEvents } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Event Schedule',
  description:
    'View upcoming and archived Bhaktipath gatherings, including venue, date, festival, and registration information.',
  alternates: { canonical: '/schedule' },
}

export default async function SchedulePage() {
  const events = await getEvents()

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Gather in devotion"
        title="Event schedule"
        description="Explore verified Bhaktipath gatherings. Upcoming registrations and past festival archives are clearly separated."
        image="/images/events/jaipur-2025.jpg"
        imageAlt="Bhaktipath gathering in Jaipur"
      />
      <section className="section schedule-page">
        <div className="container">
          <div className="schedule-page__intro">
            <p className="eyebrow"><span aria-hidden="true" /> Schedule</p>
            <h2>Find a gathering</h2>
            <p>
              Search by city, venue, or event name. Dates are marked completed after an event ends so visitors
              always see accurate information.
            </p>
          </div>
          <ScheduleBrowser events={events} />
        </div>
      </section>
    </main>
  )
}
