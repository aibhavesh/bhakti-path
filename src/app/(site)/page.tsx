import { AboutPreview } from '@/components/home/AboutPreview'
import { EventsPreview } from '@/components/home/EventsPreview'
import { HomeHero } from '@/components/home/HomeHero'
import { GirdharLalShrine } from '@/components/home/GirdharLalShrine'
import { MediaPreview } from '@/components/home/MediaPreview'
import { RegistrationBanner } from '@/components/home/RegistrationBanner'
import { SacredConversations } from '@/components/home/SacredConversations'
import { QuoteCard } from '@/components/quotes/QuoteCard'
import { getEvents, getQuotes, getSiteSettings, getTracks, getVideos } from '@/lib/content'

export default async function HomePage() {
  const [events, tracks, videos, quotes, settings] = await Promise.all([
    getEvents(),
    getTracks(),
    getVideos(),
    getQuotes(),
    getSiteSettings(),
  ])

  return (
    <main id="main-content">
      <HomeHero />
      <AboutPreview />
      <GirdharLalShrine />
      <SacredConversations />
      <EventsPreview events={events} />
      <MediaPreview tracks={tracks} videos={videos} />
      {quotes[0] ? (
        <section className="section quote-section">
          <div className="container quote-section__inner">
            <QuoteCard quote={quotes[0]} />
          </div>
        </section>
      ) : null}
      <RegistrationBanner phones={settings.phones} />
    </main>
  )
}
