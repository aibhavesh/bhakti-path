import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock3, MapPin, Phone, Users } from 'lucide-react'

import { EventCard } from '@/components/events/EventCard'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { getEvent, getEvents } from '@/lib/content'
import { formatEventDateRange, getPhoneHref } from '@/lib/utils'
import { getServerSideURL } from '@/lib/get-server-url'

type EventPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const event = await getEvent(slug)
  if (!event) return { title: 'Event not found' }

  return {
    title: event.title,
    description: event.summary,
    alternates: { canonical: `/schedule/${event.slug}` },
    openGraph: {
      type: 'article',
      title: event.title,
      description: event.summary,
      images: [{ url: event.image }],
    },
  }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params
  const [event, events] = await Promise.all([getEvent(slug), getEvents()])
  if (!event) notFound()

  const related = events
    .filter((item) => item.id !== event.id && (item.city === event.city || item.status === event.status))
    .slice(0, 3)
  const canonicalURL = `${getServerSideURL()}/schedule/${event.slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: `https://schema.org/Event${event.status === 'cancelled' ? 'Cancelled' : 'Scheduled'}`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: [event.image],
    location: {
      '@type': 'Place',
      name: event.venue,
      address: [event.city, event.region].filter(Boolean).join(', '),
    },
    organizer: {
      '@type': 'Organization',
      name: 'Bhaktipath',
      url: getServerSideURL(),
    },
  }

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <section className="event-detail-hero">
        <Image src={event.image} alt={event.imageAlt} fill priority sizes="100vw" />
        <div className="event-detail-hero__overlay" />
        <div className="container event-detail-hero__content">
          <Link className="back-link" href="/schedule">
            <ArrowLeft aria-hidden="true" size={17} /> Back to schedule
          </Link>
          <span className={`status-pill status-pill--${event.status}`}>{event.status}</span>
          <h1>{event.title}</h1>
          <p>{event.summary}</p>
        </div>
      </section>

      <section className="section event-detail">
        <div className="container event-detail__grid">
          <article className="event-detail__content">
            <p className="eyebrow"><span aria-hidden="true" /> About the gathering</p>
            <h2>{event.title}</h2>
            <p className="event-detail__lead">{event.summary}</p>
            <p>{event.description}</p>
            <div className="event-detail__notice">
              <strong>Date status</strong>
              <p>
                This event is marked <strong>{event.status}</strong>. Please check the event detail carefully
                before travelling or registering.
              </p>
            </div>
            <ButtonLink href="/contact" variant="secondary" showArrow>
              Ask about a future gathering
            </ButtonLink>
          </article>

          <aside className="event-facts">
            <h2>Event details</h2>
            <p>
              <CalendarDays aria-hidden="true" size={19} />
              <span>
                <small>Date</small>
                {formatEventDateRange(event.startDate, event.endDate)}
              </span>
            </p>
            {event.timeLabel ? (
              <p>
                <Clock3 aria-hidden="true" size={19} />
                <span><small>Time</small>{event.timeLabel}</span>
              </p>
            ) : null}
            <p>
              <MapPin aria-hidden="true" size={19} />
              <span>
                <small>Venue</small>
                {event.venue}, {event.city}{event.region ? `, ${event.region}` : ''}
              </span>
            </p>
            <p>
              <Users aria-hidden="true" size={19} />
              <span><small>Format</small>In-person devotional gathering</span>
            </p>
            {event.contactNumbers.length ? (
              <div className="event-facts__contact">
                <strong>Event contact</strong>
                {event.contactNumbers.map((phone) => (
                  <a key={phone} href={getPhoneHref(phone)}>
                    <Phone aria-hidden="true" size={15} /> {phone}
                  </a>
                ))}
              </div>
            ) : null}
            <ButtonLink href={`/register?event=${event.id}`} variant="primary" showArrow>
              Register your interest
            </ButtonLink>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className="section section--tint related-events">
          <div className="container">
            <h2 className="related-events__title">More from the archive</h2>
            <div className="event-grid">
              {related.map((item) => <EventCard event={item} key={item.id} />)}
            </div>
          </div>
        </section>
      ) : null}

      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', url: canonicalURL, mainEntity: structuredData }) }} />
    </main>
  )
}
