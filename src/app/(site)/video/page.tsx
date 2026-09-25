import type { Metadata } from 'next'

import { VideoLibrary } from '@/components/media/VideoLibrary'
import { PageHero } from '@/components/ui/PageHero'
import { getVideos } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Video and Katha Archive',
  description:
    'Watch Bhaktipath katha, devotional programs, bhajans, and festival videos. Search the official YouTube collection.',
  alternates: { canonical: '/video' },
}

export default async function VideoPage() {
  const videos = await getVideos()

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Watch and reflect"
        title="Katha video archive"
        description="Explore the official collection of katha, bhajan, aarti, and festival recordings."
        image="/images/gallery/devotional-3.png"
        imageAlt="Shri Indresh Upadhyay Ji during a devotional gathering"
      />
      <section className="section video-page">
        <div className="container">
          <div className="video-page__intro">
            <div>
              <p className="eyebrow"><span aria-hidden="true" /> {videos.length} videos</p>
              <h2>Choose a recording</h2>
            </div>
            <p>Only the selected YouTube player is loaded, helping the page load faster and use less data.</p>
          </div>
          <VideoLibrary videos={videos} />
        </div>
      </section>
    </main>
  )
}
