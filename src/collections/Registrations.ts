import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

import { anyone, authenticated } from './access'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  access: {
    read: authenticated,
    create: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'event', 'status', 'createdAt'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.website) {
          throw new ValidationError({
            errors: [{ message: 'Invalid submission.', path: 'website' }],
          })
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 120 },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true, maxLength: 40 },
    { name: 'event', type: 'relationship', relationTo: 'events' },
    { name: 'attendeeCount', type: 'number', min: 1, max: 100, defaultValue: 1 },
    { name: 'message', type: 'textarea', maxLength: 2000 },
    { name: 'consent', type: 'checkbox', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    { name: 'source', type: 'text', defaultValue: 'website' },
    { name: 'website', type: 'text' },
  ],
  timestamps: true,
}
