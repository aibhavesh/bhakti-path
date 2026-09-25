import type { CollectionConfig } from 'payload'

import { ensureSlug } from '@/lib/slugify'
import { anyone, authenticated } from './access'

export const Videos: CollectionConfig = {
  slug: 'videos',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
    listSearchableFields: ['title', 'category'],
  },
  hooks: {
    beforeChange: [ensureSlug],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'category', type: 'text', required: true, index: true },
    { name: 'youtubeID', type: 'text', required: true, index: true },
    { name: 'description', type: 'textarea', maxLength: 2000 },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'publishedAt', type: 'date', defaultValue: () => new Date().toISOString() },
  ],
  timestamps: true,
}
