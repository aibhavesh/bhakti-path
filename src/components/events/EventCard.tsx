import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'

import type { EventRecord } from '@/lib/types'
import { formatEventDateRange } from '@/lib/utils'

export function EventCard({ event }: { event: EventRecord }) {
  return (
    <article className="event-card">
      <Link className="event-card__image" href={`/schedule/${event.slug}`} tabIndex={-1} aria-hidden="true">
        <Image src={event.image} alt="" fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <span className={`status-pill status-pill--${event.status}`}>{event.status}</span>
      </Link>
      <div className="event-card__body">
        <p className="event-card__meta">
          <CalendarDays aria-hidden="true" size={16} />
          <span>{formatEventDateRange(event.startDate, event.endDate)}</span>
        </p>
        <h3>
          <Link href={`/schedule/${event.slug}`}>{event.title}</Link>
        </h3>
        <p className="event-card__summary">{event.summary}</p>
        <p className="event-card__meta event-card__meta--muted">
          <MapPin aria-hidden="true" size={16} />
          <span>
            {event.city}
            {event.region ? `, ${event.region}` : ''}
          </span>
        </p>
        <Link className="text-link" href={`/schedule/${event.slug}`}>
          View gathering <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </div>
    </article>
  )
}
