import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = path.join(root, 'public', 'images', 'sacred-conversations')
const legacyRoot = path.resolve(root, '..', 'bhaktipaths.com')

await mkdir(outputDirectory, { recursive: true })

const sources = [
  {
    key: 'girdhar-lal',
    name: 'Shri Girdhar Lal Ji',
    source: 'User-provided bhaktipath.online/design-reference/webp/ShriGirdharLalJi.webp',
    localFile: path.resolve(root, '..', 'bhaktipath.online', 'design-reference', 'webp', 'ShriGirdharLalJi.webp'),
    alt: 'Shri Girdhar Lal Ji murti decorated with red and gold garments',
    extract: { left: 0, top: 0, width: 1920, height: 1829 },
    transparent: true,
  },
  {
    key: 'radha-raman',
    name: 'Shri Radha Raman Ji',
    source: 'https://www.youtube.com/watch?v=_CWcBWSKItk',
    thumbnail: 'https://i.ytimg.com/vi/_CWcBWSKItk/maxresdefault.jpg',
    alt: 'Shri Radha Raman Ji murti from the Bhaktipath Radha Ramanam Hare Hare recording',
    extract: { left: 990, top: 145, width: 290, height: 575 },
    letterbox: true,
  },
  {
    key: 'indresh-upadhyay',
    name: 'Shri Indresh Upadhyay Ji',
    source: 'Legacy Bhaktipath owned event photography',
    localFile: path.join(legacyRoot, 'uploads', '65981632b85bfIMG_2294.JPG'),
    alt: 'Shri Indresh Upadhyay Ji in a devotional gathering',
    extract: { left: 820, top: 0, width: 1228, height: 1365 },
  },
]

const manifest = []

for (const item of sources) {
  let input

  if (item.localFile) {
    input = await sharp(item.localFile).rotate().toBuffer()
  } else {
    const response = await fetch(item.thumbnail)
    if (!response.ok) throw new Error(`Unable to download ${item.thumbnail}`)
    input = Buffer.from(await response.arrayBuffer())
  }

  const filename = `${item.key}.webp`
  const outputPath = path.join(outputDirectory, filename)

  const extracted = await sharp(input).extract(item.extract).toBuffer()

  if (item.transparent) {
    await sharp(extracted)
      .resize(760, 950, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({ quality: 92, smartSubsample: true, alphaQuality: 100 })
      .toFile(outputPath)
  } else if (item.letterbox) {
    const backdrop = await sharp(extracted)
      .resize(760, 950, { fit: 'cover' })
      .blur(24)
      .modulate({ brightness: 0.48, saturation: 0.8 })
      .png()
      .toBuffer()
    const subject = await sharp(extracted)
      .resize({ height: 880 })
      .png()
      .toBuffer()

    await sharp(backdrop)
      .composite([{ input: subject, gravity: 'center' }])
      .modulate({ saturation: 0.98, brightness: 1.02 })
      .webp({ quality: 90, smartSubsample: true })
      .toFile(outputPath)
  } else {
    await sharp(extracted)
      .resize(760, 950, {
        fit: 'cover',
        position: 'attention',
        withoutEnlargement: false,
      })
      .modulate({ saturation: 0.96, brightness: 1.02 })
      .webp({ quality: 90, smartSubsample: true })
      .toFile(outputPath)
  }

  manifest.push({
    key: item.key,
    name: item.name,
    file: `/images/sacred-conversations/${filename}`,
    alt: item.alt,
    source: item.source,
    rights: 'Official/owned Bhaktipath media confirmed by project owner',
    treatment: 'Portrait crop and web optimization; no generative alteration to the subjects',
  })
}

await writeFile(
  path.join(outputDirectory, 'manifest.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), images: manifest }, null, 2)}\n`,
  'utf8',
)

console.log(`Prepared ${manifest.length} sacred-conversation images in ${outputDirectory}`)
