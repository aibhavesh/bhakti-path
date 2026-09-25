import type { CollectionConfig } from 'payload'

import { ensureSlug } from '@/lib/slugify'
import { anyone, authenticated } from './access'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  hooks: {
    beforeChange: [ensureSlug],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'excerpt', type: 'textarea', maxLength: 500 },
    { name: 'body', type: 'richText', required: true },
    { name: 'seoTitle', type: 'text' },
    { name: 'seoDescription', type: 'textarea', maxLength: 320 },
  ],
  versions: true,
  timestamps: true,
}
