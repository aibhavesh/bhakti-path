'use client'

import { Headphones, Pause, Play, RotateCcw, Search, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import type { TrackRecord } from '@/lib/types'

export function AudioLibrary({ tracks }: { tracks: TrackRecord[] }) {
  const [query, setQuery] = useState('')
  const [album, setAlbum] = useState('All')
  const [activeSlug, setActiveSlug] = useState(tracks[0]?.slug || '')
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.85)
  const [mediaError, setMediaError] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null)
  const autoplayNextRef = useRef(false)
  const countedSlugRef = useRef('')

  const albums = useMemo(
    () => ['All', ...Array.from(new Set(tracks.map((track) => track.album)))],
    [tracks],
  )

  const filteredTracks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return tracks.filter((track) => {
      const matchesAlbum = album === 'All' || track.album === album
      const matchesQuery =
        !normalizedQuery ||
        track.title.toLowerCase().includes(normalizedQuery) ||
        track.artist.toLowerCase().includes(normalizedQuery)
      return matchesAlbum && matchesQuery
    })
  }, [album, query, tracks])

  const activeTrack = tracks.find((track) => track.slug === activeSlug) || tracks[0]
  const activeIndex = tracks.findIndex((track) => track.slug === activeTrack?.slug)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !activeTrack) return

    audio.src = activeTrack.audioUrl
    audio.load()
    setProgress(0)
    setMediaError('')

    if (autoplayNextRef.current) {
      autoplayNextRef.current = false
      void audio.play().catch(() => setIsPlaying(false))
    }
  }, [activeTrack])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  async function togglePlayback() {
    const audio = audioRef.current
    if (!audio || !activeTrack) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setMediaError('This audio could not be played. Please try another track.')
        setIsPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  function selectTrack(track: TrackRecord) {
    if (!audioRef.current) return
    if (track.slug === activeTrack?.slug) {
      void togglePlayback()
      return
    }
    autoplayNextRef.current = true
    setActiveSlug(track.slug)
    setIsPlaying(true)
  }

  function moveTrack(direction: -1 | 1) {
    if (!tracks.length) return
    const nextIndex = (activeIndex + direction + tracks.length) % tracks.length
    selectTrack(tracks[nextIndex])
  }

  function recordPlayback() {
    if (!activeTrack || countedSlugRef.current === activeTrack.slug) return
    countedSlugRef.current = activeTrack.slug
    void fetch('/api/media/playback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: activeTrack.slug }),
    }).catch(() => undefined)
  }

  return (
    <div className="audio-library">
      <div className="audio-library__toolbar">
        <label className="search-field">
          <Search aria-hidden="true" size={19} />
          <span className="sr-only">Search bhajans</span>
          <input
            type="search"
            placeholder="Search a bhajan or artist"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="filter-pills" aria-label="Filter by album">
          {albums.map((item) => (
            <button
              className={album === item ? 'is-active' : ''}
              type="button"
              key={item}
              onClick={() => setAlbum(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="audio-library__layout">
        <div className="track-list" aria-live="polite">
          {filteredTracks.length ? (
            filteredTracks.map((track) => {
              const active = track.slug === activeTrack?.slug
              return (
                <button
                  className={`track-row ${active ? 'track-row--active' : ''}`}
                  type="button"
                  key={track.id}
                  onClick={() => selectTrack(track)}
                  aria-label={`${active && isPlaying ? 'Pause' : 'Play'} ${track.title}`}
                >
                  <span className="track-row__art" aria-hidden="true">
                    <Headphones size={19} />
                  </span>
                  <span className="track-row__copy">
                    <strong>{track.title}</strong>
                    <small>
                      {track.artist} · {track.album}
                    </small>
                  </span>
                  <span className="track-row__duration">{track.duration || '—'}</span>
                  <span className="track-row__play" aria-hidden="true">
                    {active && isPlaying ? <Pause size={17} /> : <Play size={17} />}
                  </span>
                </button>
              )
            })
          ) : (
            <div className="empty-state">
              <Search aria-hidden="true" size={30} />
              <h3>No bhajans found</h3>
              <p>Try a different title, artist, or album.</p>
            </div>
          )}
        </div>

        {activeTrack ? (
          <aside className="audio-now-playing" aria-label="Now playing">
            <div className="audio-now-playing__visual" aria-hidden="true">
              <span className="audio-now-playing__halo" />
              <span className="audio-now-playing__disc">
                <Headphones size={46} />
              </span>
            </div>
            <p className="audio-now-playing__label">Now playing</p>
            <h2>{activeTrack.title}</h2>
            <p>{activeTrack.artist}</p>
            <span className="audio-now-playing__album">{activeTrack.album}</span>

            <div className="player-controls">
              <button type="button" onClick={() => moveTrack(-1)} aria-label="Previous bhajan">
                <SkipBack aria-hidden="true" size={20} />
              </button>
              <button
                className="player-controls__main"
                type="button"
                onClick={() => void togglePlayback()}
                aria-label={isPlaying ? 'Pause bhajan' : 'Play bhajan'}
              >
                {isPlaying ? <Pause aria-hidden="true" size={26} /> : <Play aria-hidden="true" size={26} />}
              </button>
              <button type="button" onClick={() => moveTrack(1)} aria-label="Next bhajan">
                <SkipForward aria-hidden="true" size={20} />
              </button>
            </div>

            <label className="player-progress">
              <span className="sr-only">Playback progress</span>
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(event) => {
                  const nextProgress = Number(event.target.value)
                  setProgress(nextProgress)
                  if (audioRef.current?.duration) {
                    audioRef.current.currentTime = (nextProgress / 100) * audioRef.current.duration
                  }
                }}
              />
              <span>
                {activeTrack.duration || '0:00'} <RotateCcw aria-hidden="true" size={12} />
              </span>
            </label>

            <label className="volume-control">
              <Volume2 aria-hidden="true" size={18} />
              <span className="sr-only">Volume</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
              />
            </label>
            {mediaError ? <p className="media-error">{mediaError}</p> : null}
            <audio
              ref={audioRef}
              preload="metadata"
              onPlay={() => {
                setIsPlaying(true)
                recordPlayback()
              }}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              onError={() => {
                if (audioRef.current?.src) {
                  setMediaError('This audio is currently unavailable. Please try another bhajan.')
                }
              }}
              onTimeUpdate={(event) => {
                const audio = event.currentTarget
                if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
              }}
            >
            </audio>
          </aside>
        ) : null}
      </div>
    </div>
  )
}
