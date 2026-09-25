import type { CollectionConfig } from 'payload'

import { ensureSlug } from '@/lib/slugify'
import { anyone, authenticated } from './access'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startAt', 'status', 'city', 'updatedAt'],
    listSearchableFields: ['title', 'city', 'venue'],
  },
  hooks: {
    beforeChange: [ensureSlug],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, index: true },
    { name: 'legacyId', type: 'text', index: true },
    { name: 'summary', type: 'textarea', required: true, maxLength: 500 },
    { name: 'description', type: 'textarea', required: true, maxLength: 5000 },
    { name: 'startAt', type: 'date', required: true, index: true },
    { name: 'endAt', type: 'date' },
    { name: 'timeLabel', type: 'text' },
    {
      name: 'timezone',
      type: 'select',
      defaultValue: 'Asia/Kolkata',
      options: [
        { label: 'India', value: 'Asia/Kolkata' },
        { label: 'Pacific', value: 'America/Los_Angeles' },
        { label: 'Eastern', value: 'America/New_York' },
        { label: 'UTC', value: 'UTC' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'upcoming',
      index: true,
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
    { name: 'venue', type: 'text', required: true },
    { name: 'city', type: 'text', required: true, index: true },
    { name: 'region', type: 'text' },
    { name: 'image', type: 'relationship', relationTo: 'media' },
    {
      name: 'imageURL',
      type: 'text',
      admin: {
        description: 'Optional fallback URL for migrated or externally hosted artwork.',
      },
    },
    { name: 'imageAlt', type: 'text', required: true },
    {
      name: 'contactNumbers',
      type: 'array',
      fields: [{ name: 'number', type: 'text', required: true }],
    },
    { name: 'registrationOpen', type: 'checkbox', defaultValue: false },
    { name: 'registrationURL', type: 'text' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
  timestamps: true,
}
