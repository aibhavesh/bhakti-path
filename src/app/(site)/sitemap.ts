import type { MetadataRoute } from 'next'

import { getEvents } from '@/lib/content'
import { getServerSideURL } from '@/lib/get-server-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = getServerSideURL()
  const events = await getEvents()
  const staticRoutes = ['', '/about', '/schedule', '/audio', '/video', '/contact', '/register', '/privacy']

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseURL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : route === '/schedule' || route === '/audio' ? 0.9 : 0.7,
    })),
    ...events.map((event) => ({
      url: `${baseURL}/schedule/${event.slug}`,
      lastModified: new Date(event.startDate),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
