import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

import { anyone, authenticated } from './access'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  access: {
    read: authenticated,
    create: anyone,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
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
    { name: 'phone', type: 'text', maxLength: 40 },
    { name: 'subject', type: 'text', required: true, maxLength: 160 },
    { name: 'message', type: 'textarea', required: true, maxLength: 5000 },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Read', value: 'read' },
        { label: 'Replied', value: 'replied' },
        { label: 'Spam', value: 'spam' },
      ],
    },
    { name: 'website', type: 'text' },
  ],
  timestamps: true,
}
