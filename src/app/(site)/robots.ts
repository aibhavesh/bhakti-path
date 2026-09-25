import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/lib/get-server-url'

export default function robots(): MetadataRoute.Robots {
  const baseURL = getServerSideURL()

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/'] },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
    host: baseURL,
  }
}
