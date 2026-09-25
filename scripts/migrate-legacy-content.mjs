import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = path.join(root, 'src', 'data', 'legacy-media.json')
const legacyBaseUrl = 'https://bhaktipaths.com'

const trackNames = [
  'Girdhar Lal Humare',
  'Humari Pranam Shree Banke Bihari',
  'Radha Gori Gori',
  'Shri Radhashtami - Pyaro Radha Rani',
  'Charanan Ki Balihari',
  'Girdhar Lal Ji - Mangla Aarti',
  'Hari Ka Bhajan Karo',
  'Gopi Geet',
  'Aage Gaay Peeche Gaay',
  'Pyasi Ankhiyan Hari Darshan Ki',
  'Govardhan Wasi Sanwarey',
  'Hume Shyam Na Mila / Sun Radhika Dulari',
  'Mai Bairagan',
  'Mujhko Radharaman Kardo Aesa Magan',
  'Vrindavan Rasamrit',
  'Bhramar Geet',
  'Govind Damodar Madhaveti',
  'Jhulat Shyam Hindore',
  'Geet Govind',
  'Radha Ramanam Hare Hare',
]

function decodeEntities(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .trim()
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function fetchText(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`)
  return response.text()
}

function extractTracks(html) {
  const objects = [...html.matchAll(/songArray\.push\((\{[\s\S]*?\})\s*\);/g)]
  const seen = new Set()

  return objects
    .map((match, index) => {
      const record = JSON.parse(match[1])
      const name = trackNames[index] ?? decodeEntities(record.name)
      const url = decodeEntities(record.url)
      const slug = slugify(name)

      if (!url || url === `${legacyBaseUrl}/` || seen.has(slug)) return null
      seen.add(slug)

      return {
        title: name,
        slug,
        artist: decodeEntities(record.artist) || 'Shri Indresh Upadhyay Ji',
        album: decodeEntities(record.album) || 'Bhaktipath Bhajan',
        audioUrl: url,
        coverArtUrl: decodeEntities(record.cover_art_url),
        duration: decodeEntities(record.duration),
        playCount: Number(record.playCount) || 0,
        featured: ['Mai Bairagan', 'Radha Ramanam Hare Hare'].includes(name),
      }
    })
    .filter(Boolean)
}

function extractVideos(html) {
  const pattern = /<div class="col-sm-12 play-list" data-category="([^"]*)" data-title="([^"]*)" data-video-id="([^"]*)">/g
  const seen = new Set()
  const videos = []

  for (const match of html.matchAll(pattern)) {
    const title = decodeEntities(match[2])
    const category = decodeEntities(match[1])
    const youtubeId = decodeEntities(match[3]).split('&')[0]

    if (!/^[A-Za-z0-9_-]{11}$/.test(youtubeId) || seen.has(youtubeId)) continue
    seen.add(youtubeId)

    videos.push({
      title,
      slug: slugify(title) || youtubeId,
      category,
      youtubeId,
      featured: videos.length < 4,
    })
  }

  return videos
}

const [audioHtml, videoHtml] = await Promise.all([
  fetchText(`${legacyBaseUrl}/audio`),
  fetchText(`${legacyBaseUrl}/video`),
])

const content = {
  generatedAt: new Date().toISOString(),
  source: `${legacyBaseUrl}/audio, ${legacyBaseUrl}/video`,
  tracks: extractTracks(audioHtml),
  videos: extractVideos(videoHtml),
}

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8')

console.log(`Migrated ${content.tracks.length} tracks and ${content.videos.length} videos to ${outputPath}`)
