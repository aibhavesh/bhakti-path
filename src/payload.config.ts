import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { AudioMedia } from './collections/AudioMedia'
import { ContactMessages } from './collections/ContactMessages'
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Quotes } from './collections/Quotes'
import { Registrations } from './collections/Registrations'
import { Tracks } from './collections/Tracks'
import { Users } from './collections/Users'
import { Videos } from './collections/Videos'
import { Homepage } from './globals/Homepage'
import { SiteSettings } from './globals/SiteSettings'
import { getServerSideURL } from './lib/get-server-url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = getServerSideURL()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Bhaktipath',
    },
    timezones: {
      defaultTimezone: 'Asia/Kolkata',
      supportedTimezones: [
        { label: 'India', value: 'Asia/Kolkata' },
        { label: 'Pacific', value: 'America/Los_Angeles' },
        { label: 'Eastern', value: 'America/New_York' },
        { label: 'UTC', value: 'UTC' },
      ],
    },
  },
  bin: [
    {
      scriptPath: path.resolve(dirname, 'seed.ts'),
      key: 'seed',
    },
  ],
  collections: [
    Users,
    Media,
    AudioMedia,
    Events,
    Tracks,
    Videos,
    Quotes,
    Pages,
    Registrations,
    ContactMessages,
  ],
  cors: [serverURL],
  csrf: [serverURL],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./bhaktipath.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    idType: 'uuid',
    migrationDir: path.resolve(dirname, 'migrations'),
    push: process.env.NODE_ENV !== 'production',
    wal: true,
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings, Homepage],
  secret: process.env.PAYLOAD_SECRET || 'development-only-change-this-secret',
  serverURL,
  sharp,
  telemetry: false,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
