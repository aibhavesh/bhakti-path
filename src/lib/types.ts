export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'

export type EventRecord = {
  id: string
  legacyId?: string
  title: string
  slug: string
  summary: string
  description: string
  startDate: string
  endDate?: string
  timeLabel?: string
  venue: string
  city: string
  region?: string
  status: EventStatus
  image: string
  imageAlt: string
  contactNumbers: string[]
  featured: boolean
}

export type TrackRecord = {
  id: string
  title: string
  slug: string
  artist: string
  album: string
  audioUrl: string
  coverArtUrl?: string
  duration: string
  playCount: number
  featured: boolean
}

export type VideoRecord = {
  id: string
  title: string
  slug: string
  category: string
  youtubeId: string
  featured: boolean
}

export type QuoteRecord = {
  id: string
  text: string
  translation?: string
  attribution: string
}

export type SiteSettingsRecord = {
  siteName: string
  tagline: string
  description: string
  phones: string[]
  social: {
    youtube: string
    facebook: string
    instagram: string
  }
}
