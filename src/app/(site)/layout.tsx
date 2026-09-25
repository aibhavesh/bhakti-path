import type { Metadata, Viewport } from 'next'
import { Anek_Devanagari, Tiro_Devanagari_Hindi } from 'next/font/google'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getSiteSettings } from '@/lib/content'
import { getServerSideURL } from '@/lib/get-server-url'

import './globals.css'

const bodyFont = Anek_Devanagari({
  subsets: ['latin', 'devanagari'],
  weight: 'variable',
  variable: '--font-body',
  display: 'swap',
})

const displayFont = Tiro_Devanagari_Hindi({
  subsets: ['latin', 'devanagari'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Bhaktipath — Live with devotion',
    template: '%s — Bhaktipath',
  },
  description:
    'Official Bhaktipath website for devotional bhajans, Shrimad Bhagwat Katha videos, spiritual teachings, and live event registration.',
  keywords: ['Bhaktipath', 'Shri Indresh Upadhyay Ji', 'bhajan', 'Shrimad Bhagwat Katha', 'devotional'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Bhaktipath',
    title: 'Bhaktipath — Live with devotion',
    description:
      'Listen to devotional bhajans, watch katha, and join the Bhaktipath spiritual community.',
    images: [{ url: '/images/gallery/devotional-2.png', width: 2048, height: 1365 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhaktipath — Live with devotion',
    description: 'Devotional bhajans, katha, teachings, and gatherings.',
    images: ['/images/gallery/devotional-2.png'],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6d132d',
}

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  const settings = await getSiteSettings()

  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      {/* Third-party shortcut/accessibility extensions can mutate body before React hydrates. */}
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer settings={settings} />
      </body>
    </html>
  )
}
