import type { CollectionConfig } from 'payload'

import { adminFieldOnly, adminsOnly, authenticated } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: adminsOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        create: adminFieldOnly,
        update: adminFieldOnly,
      },
    },
  ],
  timestamps: true,
}
