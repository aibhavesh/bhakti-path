import type { SanitizedConfig } from 'payload'
import payload from 'payload'

import legacyMedia from './data/legacy-media.json'
import { aboutContent, legacyEvents, legacyQuotes, legacySiteSettings } from './data/legacy-site'

function lexicalFromParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

type SeedDoc = {
  id: string | number
  slug?: string
  featured?: boolean
}

async function upsertBySlug(
  collection: 'events' | 'tracks' | 'videos' | 'quotes' | 'pages',
  slug: string,
  data: Record<string, unknown>,
): Promise<SeedDoc> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs[0]) {
    return (await payload.update({
      collection,
      id: existing.docs[0].id,
      data: data as never,
      draft: false,
    })) as unknown as SeedDoc
  }

  return (await payload.create({
    collection,
    data: { ...data, slug } as never,
    draft: false,
  })) as unknown as SeedDoc
}

async function upsertGlobal(slug: 'site-settings' | 'homepage', data: Record<string, unknown>) {
  const existing = await payload.findGlobal({ slug, depth: 0 })
  if (existing) {
    return payload.updateGlobal({ slug, data, depth: 0 })
  }
  return payload.db.createGlobal({ slug, data })
}

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  const adminEmail = process.env.SEED_ADMIN_EMAIL
  const adminPassword = process.env.SEED_ADMIN_PASSWORD

  if (adminEmail && adminPassword) {
    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: adminEmail } },
      limit: 1,
      depth: 0,
    })

    if (!existingAdmin.docs[0]) {
      await payload.create({
        collection: 'users',
        data: {
          email: adminEmail,
          password: adminPassword,
          name: 'Bhaktipath Administrator',
          role: 'admin',
        },
      })
      payload.logger.info(`Created admin user: ${adminEmail}`)
    }
  } else {
    payload.logger.warn('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are not set; skipping admin user.')
  }

  const eventDocs: SeedDoc[] = []
  for (const event of legacyEvents) {
    const doc = await upsertBySlug('events', event.slug, {
      title: event.title,
      legacyId: event.legacyId,
      summary: event.summary,
      description: event.description,
      startAt: event.startDate,
      endAt: event.endDate,
      timeLabel: event.timeLabel,
      status: event.status,
      venue: event.venue,
      city: event.city,
      region: event.region,
      imageURL: event.image,
      imageAlt: event.imageAlt,
      contactNumbers: event.contactNumbers.map((number) => ({ number })),
      registrationOpen: false,
      featured: event.featured,
    })
    eventDocs.push(doc)
  }

  const trackDocs: SeedDoc[] = []
  for (const [index, track] of legacyMedia.tracks.entries()) {
    const doc = await upsertBySlug('tracks', track.slug, {
      title: track.title,
      artist: track.artist,
      album: track.album,
      audioURL: track.audioUrl,
      coverArtURL: track.coverArtUrl,
      duration: track.duration,
      playCount: track.playCount,
      featured: track.featured,
      publishedAt: new Date().toISOString(),
    })
    trackDocs.push(doc)
    if (index === legacyMedia.tracks.length - 1) {
      payload.logger.info(`Seeded ${trackDocs.length} audio tracks.`)
    }
  }

  const videoDocs: SeedDoc[] = []
  for (const video of legacyMedia.videos) {
    videoDocs.push(
      await upsertBySlug('videos', video.slug, {
        title: video.title,
        category: video.category,
        youtubeID: video.youtubeId,
        featured: video.featured,
        publishedAt: new Date().toISOString(),
      }),
    )
  }

  const quoteDocs: SeedDoc[] = []
  for (const [index, quote] of legacyQuotes.entries()) {
    quoteDocs.push(
      await upsertBySlug('quotes', quote.id, {
        text: quote.text,
        translation: quote.translation,
        attribution: quote.attribution,
        language: 'hi',
        featured: index === 0,
      }),
    )
  }

  await upsertBySlug('pages', 'about', {
    title: aboutContent.title,
    excerpt: aboutContent.paragraphs[0],
    body: lexicalFromParagraphs(aboutContent.paragraphs),
    seoTitle: 'About Shri Indresh Upadhyay Ji — Bhaktipath',
    seoDescription:
      'Learn about Pujya Shri Indresh Upadhyay Ji and Bhaktipath’s mission to share Shrimad Bhagwat Katha, bhajana, and spiritual teachings.',
  })

  await upsertGlobal('site-settings', {
    siteName: legacySiteSettings.siteName,
    tagline: legacySiteSettings.tagline,
    description: legacySiteSettings.description,
    phones: legacySiteSettings.phones.map((number) => ({ number })),
    social: legacySiteSettings.social,
    registrationPhone: legacySiteSettings.phones[0],
    defaultSEODescription: legacySiteSettings.description,
  })

  await upsertGlobal('homepage', {
    hero: {
      eyebrow: 'Official channel of Pujya Shri Indresh Upadhyay Ji',
      title: 'Where devotion becomes a living path',
      description:
        'Listen to devotional bhajans, watch Shrimad Bhagwat Katha, and stay connected to gatherings that bring hearts closer to the divine.',
      imageURL: '/images/gallery/devotional-2.png',
      imageAlt: 'Shri Indresh Upadhyay Ji sharing a devotional teaching',
    },
    announcement: {
      text: 'New live gatherings are announced through the official schedule.',
      linkLabel: 'View schedule',
      linkURL: '/schedule',
    },
    featuredEvents: eventDocs.filter((event) => Boolean(event.featured)).slice(0, 4).map((event) => event.id),
    featuredTracks: trackDocs.filter((track) => Boolean(track.featured)).map((track) => track.id),
    featuredVideos: videoDocs.filter((video) => Boolean(video.featured)).slice(0, 4).map((video) => video.id),
    featuredQuote: quoteDocs[0]?.id,
  })

  payload.logger.info(
    `Seed complete: ${eventDocs.length} events, ${trackDocs.length} tracks, ${videoDocs.length} videos, and ${quoteDocs.length} quotes.`,
  )

  process.exit(0)
}
