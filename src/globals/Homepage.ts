import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/collections/access'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Website',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true, maxLength: 500 },
        { name: 'image', type: 'relationship', relationTo: 'media' },
        { name: 'imageURL', type: 'text' },
        { name: 'imageAlt', type: 'text', required: true },
      ],
    },
    {
      name: 'announcement',
      type: 'group',
      fields: [
        { name: 'text', type: 'text' },
        { name: 'linkLabel', type: 'text' },
        { name: 'linkURL', type: 'text' },
      ],
    },
    {
      name: 'featuredEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      maxRows: 6,
    },
    {
      name: 'featuredTracks',
      type: 'relationship',
      relationTo: 'tracks',
      hasMany: true,
      maxRows: 6,
    },
    {
      name: 'featuredVideos',
      type: 'relationship',
      relationTo: 'videos',
      hasMany: true,
      maxRows: 6,
    },
    { name: 'featuredQuote', type: 'relationship', relationTo: 'quotes' },
  ],
  versions: {
    drafts: true,
  },
}
