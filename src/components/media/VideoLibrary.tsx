'use client'

import Image from 'next/image'
import { ExternalLink, MonitorPlay, Play, Search } from 'lucide-react'
import { useMemo, useState } from 'react'

import type { VideoRecord } from '@/lib/types'
import { getYouTubeThumbnail, getYouTubeURL } from '@/lib/utils'

export function VideoLibrary({ videos }: { videos: VideoRecord[] }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [activeID, setActiveID] = useState(videos[0]?.youtubeId || '')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(videos.map((video) => video.category)))],
    [videos],
  )

  const filteredVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return videos.filter((video) => {
      const matchesCategory = category === 'All' || video.category === category
      const matchesQuery =
        !normalizedQuery ||
        video.title.toLowerCase().includes(normalizedQuery) ||
        video.category.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [category, query, videos])

  const activeVideo = videos.find((video) => video.youtubeId === activeID) || filteredVideos[0] || videos[0]

  return (
    <div className="video-library">
      <div className="video-library__toolbar">
        <label className="search-field">
          <Search aria-hidden="true" size={19} />
          <span className="sr-only">Search videos</span>
          <input
            type="search"
            placeholder="Search katha or bhajan"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="filter-pills" aria-label="Filter videos by category">
          {categories.map((item) => (
            <button
              className={category === item ? 'is-active' : ''}
              type="button"
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {activeVideo ? (
        <div className="video-player-card">
          <div className="video-player-card__frame">
            <iframe
              key={activeVideo.youtubeId}
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&modestbranding=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="video-player-card__copy">
            <p>{activeVideo.category}</p>
            <h2>{activeVideo.title}</h2>
            <a href={getYouTubeURL(activeVideo.youtubeId)} target="_blank" rel="noreferrer">
              Watch on YouTube <ExternalLink aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      ) : null}

      <div className="video-grid" aria-live="polite">
        {filteredVideos.length ? (
          filteredVideos.map((video) => (
            <button
              className={`video-card ${activeVideo?.youtubeId === video.youtubeId ? 'video-card--active' : ''}`}
              type="button"
              key={video.id}
              onClick={() => setActiveID(video.youtubeId)}
            >
              <span className="video-card__image">
                <Image
                  src={getYouTubeThumbnail(video.youtubeId)}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <span className="video-card__play">
                  <Play aria-hidden="true" size={20} fill="currentColor" />
                </span>
              </span>
              <span className="video-card__copy">
                <small>
                  <MonitorPlay aria-hidden="true" size={13} /> {video.category}
                </small>
                <strong>{video.title}</strong>
              </span>
            </button>
          ))
        ) : (
          <div className="empty-state empty-state--wide">
            <Search aria-hidden="true" size={30} />
            <h3>No videos found</h3>
            <p>Try another title or category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
