import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Headphones, MonitorPlay, Play } from 'lucide-react'

import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TrackRecord, VideoRecord } from '@/lib/types'
import { getYouTubeThumbnail } from '@/lib/utils'

export function MediaPreview({ tracks, videos }: { tracks: TrackRecord[]; videos: VideoRecord[] }) {
  const featuredTracks = tracks.filter((track) => track.featured).slice(0, 3)
  const displayTracks = featuredTracks.length ? featuredTracks : tracks.slice(0, 3)
  const featuredVideos = videos.filter((video) => video.featured).slice(0, 2)
  const displayVideos = featuredVideos.length ? featuredVideos : videos.slice(0, 2)

  return (
    <section className="section media-preview">
      <div className="container">
        <SectionHeading
          eyebrow="Listen and watch"
          title="Teachings for every moment."
          description="Move between the complete bhajan collection and the katha video archive at your own pace."
          align="center"
        />
        <div className="media-preview__grid">
          <div className="media-panel media-panel--audio">
            <div className="media-panel__header">
              <span><Headphones aria-hidden="true" size={23} /></span>
              <div>
                <p>Bhajan collection</p>
                <h3>Listen</h3>
              </div>
            </div>
            <div className="media-panel__tracks">
              {displayTracks.map((track, index) => (
                <Link href={`/audio?track=${track.slug}`} key={track.id}>
                  <span className="media-panel__number">0{index + 1}</span>
                  <span>
                    <strong>{track.title}</strong>
                    <small>{track.artist} · {track.duration}</small>
                  </span>
                  <span className="media-panel__play">
                    <Play aria-hidden="true" size={16} fill="currentColor" />
                  </span>
                </Link>
              ))}
            </div>
            <Link className="media-panel__link" href="/audio">
              Open the full audio library <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>

          <div className="media-panel media-panel--video">
            <div className="media-panel__header">
              <span><MonitorPlay aria-hidden="true" size={23} /></span>
              <div>
                <p>Katha archive</p>
                <h3>Watch</h3>
              </div>
            </div>
            <div className="media-panel__videos">
              {displayVideos.map((video) => (
                <Link href="/video" key={video.id}>
                  <span className="media-panel__thumb">
                    <Image src={getYouTubeThumbnail(video.youtubeId)} alt="" fill sizes="320px" />
                    <span><Play aria-hidden="true" size={18} fill="currentColor" /></span>
                  </span>
                  <strong>{video.title}</strong>
                  <small>{video.category}</small>
                </Link>
              ))}
            </div>
            <Link className="media-panel__link" href="/video">
              Explore all videos <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
