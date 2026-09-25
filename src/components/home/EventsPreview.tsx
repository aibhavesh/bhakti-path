import { CalendarClock, Sparkles } from 'lucide-react'

import { EventCard } from '@/components/events/EventCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { EventRecord } from '@/lib/types'

export function EventsPreview({ events }: { events: EventRecord[] }) {
  const upcoming = events.filter((event) => event.status === 'upcoming' || event.status === 'ongoing')
  const displayed = (upcoming.length ? upcoming : events.filter((event) => event.featured)).slice(0, 3)

  return (
    <section className="section section--tint events-preview">
      <div className="container">
        <div className="section-topline">
          <SectionHeading
            eyebrow="Gather in person"
            title={upcoming.length ? 'Upcoming gatherings' : 'Recent gatherings'}
            description={
              upcoming.length
                ? 'Join katha, aarti, and community moments that bring everyone closer to the divine.'
                : 'Our latest published gatherings are preserved here. New dates will appear on this page as soon as registrations open.'
            }
          />
          <ButtonLink href="/schedule" variant="secondary" showArrow>
            View full schedule
          </ButtonLink>
        </div>

        {!upcoming.length ? (
          <div className="notice-card">
            <span className="notice-card__icon">
              <CalendarClock aria-hidden="true" size={24} />
            </span>
            <div>
              <strong>No new date is published at this moment.</strong>
              <p>Register your interest and the team will notify you when the next gathering opens.</p>
            </div>
            <ButtonLink href="/register" variant="primary">
              Notify me
            </ButtonLink>
          </div>
        ) : null}

        <div className="event-grid">
          {displayed.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
        <p className="archive-note">
          <Sparkles aria-hidden="true" size={15} /> Past events are clearly marked and never presented as upcoming.
        </p>
      </div>
    </section>
  )
}
