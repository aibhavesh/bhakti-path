import type { CollectionConfig } from 'payload'

import { ensureSlug } from '@/lib/slugify'
import { anyone, authenticated } from './access'

export const Tracks: CollectionConfig = {
  slug: 'tracks',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'album', 'duration', 'playCount', 'updatedAt'],
    listSearchableFields: ['title', 'artist', 'album'],
  },
  hooks: {
    beforeChange: [ensureSlug],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'artist', type: 'text', required: true },
    { name: 'album', type: 'text', required: true, index: true },
    { name: 'audioFile', type: 'relationship', relationTo: 'audio-media' },
    {
      name: 'audioURL',
      type: 'text',
      admin: {
        description: 'Optional direct MP3 URL. Upload a file for newly added bhajans.',
      },
    },
    { name: 'coverArt', type: 'relationship', relationTo: 'media' },
    { name: 'coverArtURL', type: 'text' },
    { name: 'duration', type: 'text' },
    { name: 'playCount', type: 'number', min: 0, defaultValue: 0 },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'publishedAt', type: 'date', defaultValue: () => new Date().toISOString() },
  ],
  timestamps: true,
}
