import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bhaktipath',
    short_name: 'Bhaktipath',
    description: 'Devotional bhajans, katha videos, teachings, and event registration.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff8ec',
    theme_color: '#6d132d',
    icons: [
      {
        src: '/favicon.png',
        sizes: '256x256',
        type: 'image/png',
      },
    ],
  }
}
