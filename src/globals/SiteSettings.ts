import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/collections/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Website',
  },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Bhaktipath' },
    { name: 'tagline', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true, maxLength: 500 },
    {
      name: 'phones',
      type: 'array',
      required: true,
      fields: [{ name: 'number', type: 'text', required: true }],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'youtube', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
      ],
    },
    { name: 'registrationEmail', type: 'email' },
    { name: 'registrationPhone', type: 'text' },
    { name: 'defaultSEODescription', type: 'textarea', maxLength: 320 },
  ],
  versions: {
    drafts: true,
  },
}
