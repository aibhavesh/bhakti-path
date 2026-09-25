import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { isJSONRequest, isSameOrigin } from '@/lib/request'

const playbackSchema = z.object({
  slug: z.string().trim().min(2).max(160),
})

export async function POST(request: Request) {
  if (!isSameOrigin(request) || !isJSONRequest(request)) {
    return Response.json({ message: 'Invalid request.' }, { status: 403 })
  }

  try {
    const { slug } = playbackSchema.parse(await request.json())
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'tracks',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const track = result.docs[0]
    if (!track) return Response.json({ message: 'Track not found.' }, { status: 404 })

    const updated = await payload.update({
      collection: 'tracks',
      id: track.id,
      data: { playCount: (track.playCount || 0) + 1 },
      depth: 0,
      overrideAccess: true,
    })

    return Response.json({ playCount: updated.playCount || 0 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ message: 'Invalid track.' }, { status: 400 })
    }
    console.error('Playback count update failed:', error)
    return Response.json({ message: 'Unable to update playback count.' }, { status: 500 })
  }
}
