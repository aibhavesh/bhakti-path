import 'server-only'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import legacyMedia from '@/data/legacy-media.json'
import { legacyEvents, legacyQuotes, legacySiteSettings } from '@/data/legacy-site'
import type { EventRecord, QuoteRecord, SiteSettingsRecord, TrackRecord, VideoRecord } from '@/lib/types'
import type { AudioMedia, Event, Media, Page, Quote, Track, Video } from '@/payload-types'

const payloadClient = cache(async () => getPayload({ config }))

const fallbackTracks: TrackRecord[] = legacyMedia.tracks.map((track) => ({
  id: track.slug,
  ...track,
}))

const fallbackVideos: VideoRecord[] = legacyMedia.videos.map((video) => ({
  id: video.slug,
  ...video,
}))

function uploadedFileURL(value: string | Media | AudioMedia | null | undefined) {
  if (value && typeof value === 'object' && 'url' in value) {
    return value.url || ''
  }
  return ''
}

function normalizeEvent(event: Event): EventRecord {
  return {
    id: event.id,
    legacyId: event.legacyId || undefined,
    title: event.title,
    slug: event.slug,
    summary: event.summary,
    description: event.description,
    startDate: event.startAt,
    endDate: event.endAt || undefined,
    timeLabel: event.timeLabel || undefined,
    venue: event.venue,
    city: event.city,
    region: event.region || undefined,
    status: event.status,
    image: uploadedFileURL(event.image as string | Media) || event.imageURL || '/images/events/jaipur-2025.jpg',
    imageAlt: event.imageAlt,
    contactNumbers: event.contactNumbers?.map((item) => item.number) || [],
    featured: Boolean(event.featured),
  }
}

function normalizeTrack(track: Track): TrackRecord {
  return {
    id: track.id,
    title: track.title,
    slug: track.slug,
    artist: track.artist,
    album: track.album,
    audioUrl:
      uploadedFileURL(track.audioFile as string | AudioMedia) || track.audioURL || fallbackTracks[0]?.audioUrl || '',
    coverArtUrl:
      uploadedFileURL(track.coverArt as string | Media) || track.coverArtURL || undefined,
    duration: track.duration || '',
    playCount: track.playCount || 0,
    featured: Boolean(track.featured),
  }
}

function normalizeVideo(video: Video): VideoRecord {
  return {
    id: video.id,
    title: video.title,
    slug: video.slug,
    category: video.category,
    youtubeId: video.youtubeID,
    featured: Boolean(video.featured),
  }
}

function normalizeQuote(quote: Quote): QuoteRecord {
  return {
    id: quote.id,
    text: quote.text,
    translation: quote.translation || undefined,
    attribution: quote.attribution,
  }
}

export const getEvents = cache(async (): Promise<EventRecord[]> => {
  try {
    const payload = await payloadClient()
    const result = await payload.find({
      collection: 'events',
      sort: '-startAt',
      limit: 100,
      depth: 1,
    })
    return result.docs.length ? result.docs.map(normalizeEvent) : legacyEvents
  } catch (error) {
    console.error('Falling back to legacy events:', error)
    return legacyEvents
  }
})

export const getEvent = cache(async (identifier: string): Promise<EventRecord | null> => {
  try {
    const payload = await payloadClient()
    const result = await payload.find({
      collection: 'events',
      where: {
        or: [{ slug: { equals: identifier } }, { legacyId: { equals: identifier } }],
      },
      limit: 1,
      depth: 1,
    })
    if (result.docs[0]) return normalizeEvent(result.docs[0])
  } catch (error) {
    console.error('Falling back to legacy event:', error)
  }

  return legacyEvents.find((event) => event.slug === identifier || event.legacyId === identifier) || null
})

export const getTracks = cache(async (): Promise<TrackRecord[]> => {
  try {
    const payload = await payloadClient()
    const result = await payload.find({
      collection: 'tracks',
      sort: 'title',
      limit: 200,
      depth: 1,
    })
    return result.docs.length ? result.docs.map(normalizeTrack) : fallbackTracks
  } catch (error) {
    console.error('Falling back to legacy tracks:', error)
    return fallbackTracks
  }
})

export const getVideos = cache(async (): Promise<VideoRecord[]> => {
  try {
    const payload = await payloadClient()
    const result = await payload.find({
      collection: 'videos',
      sort: '-publishedAt',
      limit: 200,
      depth: 0,
    })
    return result.docs.length ? result.docs.map(normalizeVideo) : fallbackVideos
  } catch (error) {
    console.error('Falling back to legacy videos:', error)
    return fallbackVideos
  }
})

export const getQuotes = cache(async (): Promise<QuoteRecord[]> => {
  try {
    const payload = await payloadClient()
    const result = await payload.find({
      collection: 'quotes',
      sort: '-featured',
      limit: 50,
      depth: 0,
    })
    return result.docs.length ? result.docs.map(normalizeQuote) : legacyQuotes
  } catch (error) {
    console.error('Falling back to legacy quotes:', error)
    return legacyQuotes
  }
})

export const getPage = cache(async (slug: string): Promise<Page | null> => {
  try {
    const payload = await payloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
    })
    return result.docs[0] || null
  } catch (error) {
    console.error(`Unable to load page ${slug}:`, error)
    return null
  }
})

export const getSiteSettings = cache(async (): Promise<SiteSettingsRecord> => {
  try {
    const payload = await payloadClient()
    const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
    return {
      siteName: settings.siteName || legacySiteSettings.siteName,
      tagline: settings.tagline || legacySiteSettings.tagline,
      description: settings.description || legacySiteSettings.description,
      phones: settings.phones?.map((item) => item.number).filter(Boolean) || legacySiteSettings.phones,
      social: {
        youtube: settings.social?.youtube || legacySiteSettings.social.youtube,
        facebook: settings.social?.facebook || legacySiteSettings.social.facebook,
        instagram: settings.social?.instagram || legacySiteSettings.social.instagram,
      },
    }
  } catch (error) {
    console.error('Falling back to legacy site settings:', error)
    return legacySiteSettings
  }
})
