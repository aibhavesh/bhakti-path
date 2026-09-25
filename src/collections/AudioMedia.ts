import path from 'path'
import { fileURLToPath } from 'url'
import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from './access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const AudioMedia: CollectionConfig = {
  slug: 'audio-media',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'artist', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'artist', type: 'text', required: true },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/uploads/audio'),
    mimeTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mp4'],
  },
}
