'use client'

import { CalendarDays, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { EventRecord } from '@/lib/types'
import { EventCard } from './EventCard'

type Filter = 'all' | 'upcoming' | 'completed'

export function ScheduleBrowser({ events }: { events: EventRecord[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const counts = useMemo(
    () => ({
      all: events.length,
      upcoming: events.filter((event) => event.status === 'upcoming' || event.status === 'ongoing').length,
      completed: events.filter((event) => event.status === 'completed' || event.status === 'cancelled').length,
    }),
    [events],
  )

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return events.filter((event) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'upcoming' && (event.status === 'upcoming' || event.status === 'ongoing')) ||
        (filter === 'completed' && (event.status === 'completed' || event.status === 'cancelled'))
      const matchesQuery =
        !normalizedQuery ||
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.city.toLowerCase().includes(normalizedQuery) ||
        event.venue.toLowerCase().includes(normalizedQuery)
      return matchesFilter && matchesQuery
    })
  }, [events, filter, query])

  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All gatherings' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Archive' },
  ]

  return (
    <div className="schedule-browser">
      <div className="schedule-browser__toolbar">
        <div className="filter-pills" aria-label="Filter schedule">
          {filters.map((item) => (
            <button
              className={filter === item.value ? 'is-active' : ''}
              type="button"
              key={item.value}
              onClick={() => setFilter(item.value)}
            >
              {item.label} <span>{counts[item.value]}</span>
            </button>
          ))}
        </div>
        <label className="search-field">
          <Search aria-hidden="true" size={19} />
          <span className="sr-only">Search schedule</span>
          <input
            type="search"
            placeholder="Search by city, venue, or event"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      {!counts.upcoming ? (
        <div className="notice-card notice-card--compact">
          <span className="notice-card__icon">
            <CalendarDays aria-hidden="true" size={22} />
          </span>
          <div>
            <strong>No upcoming date is currently published.</strong>
            <p>The latest verified gatherings are available in the archive.</p>
          </div>
        </div>
      ) : null}

      {filteredEvents.length ? (
        <div className="event-grid event-grid--schedule">
          {filteredEvents.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      ) : (
        <div className="empty-state empty-state--wide">
          <Search aria-hidden="true" size={32} />
          <h3>No gatherings match your search</h3>
          <p>Try another city, venue, or schedule filter.</p>
        </div>
      )}
    </div>
  )
}
