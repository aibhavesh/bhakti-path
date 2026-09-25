import type { CollectionConfig } from 'payload'

import { toSlug } from '@/lib/slugify'
import { anyone, authenticated } from './access'

export const Quotes: CollectionConfig = {
  slug: 'quotes',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'attribution',
    defaultColumns: ['attribution', 'language', 'updatedAt'],
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        const next = data as Record<string, unknown>
        const text =
          typeof next.text === 'string'
            ? next.text
            : typeof originalDoc?.text === 'string'
              ? originalDoc.text
              : ''

        if (!next.slug && !originalDoc?.slug) {
          next.slug = toSlug(text).slice(0, 80) || `quote-${Date.now()}`
        }

        return next
      },
    ],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'text', type: 'textarea', required: true, maxLength: 2000 },
    { name: 'translation', type: 'textarea', maxLength: 2000 },
    { name: 'attribution', type: 'text', required: true, defaultValue: 'Shri Indresh Ji' },
    {
      name: 'language',
      type: 'select',
      required: true,
      defaultValue: 'hi',
      options: [
        { label: 'Hindi', value: 'hi' },
        { label: 'English', value: 'en' },
        { label: 'Sanskrit', value: 'sa' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}
