import type { Metadata } from 'next'

import { AudioLibrary } from '@/components/media/AudioLibrary'
import { PageHero } from '@/components/ui/PageHero'
import { getTracks } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Bhajan Library',
  description:
    'Listen to Bhaktipath devotional bhajans, aarti, and pads by Shri Indresh Upadhyay Ji. Search and filter the complete audio collection.',
  alternates: { canonical: '/audio' },
}

export default async function AudioPage() {
  const tracks = await getTracks()

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Listen with devotion"
        title="Bhajan library"
        description="Search the complete collection, choose an album, and listen through one simple audio player."
        image="/images/audio-bg.jpg"
        imageAlt="Warm devotional atmosphere for the Bhaktipath audio library"
      />
      <section className="section audio-page">
        <div className="container">
          <div className="audio-page__intro">
            <div>
              <p className="eyebrow"><span aria-hidden="true" /> {tracks.length} bhajans</p>
              <h2>Choose a bhajan</h2>
            </div>
            <p>Playback starts only when you press play. Your selected audio remains visible while you browse.</p>
          </div>
          <AudioLibrary tracks={tracks} />
        </div>
      </section>
    </main>
  )
}
