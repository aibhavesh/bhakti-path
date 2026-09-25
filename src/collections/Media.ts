import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from './access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/uploads/images'),
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 320 },
      { name: 'card', width: 960, height: 640 },
      { name: 'hero', width: 1920, height: 1080 },
    ],
  },
}
