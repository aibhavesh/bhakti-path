import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { isJSONRequest, isSameOrigin } from '@/lib/request'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(''),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).optional().default(''),
})

export async function POST(request: Request) {
  if (!isSameOrigin(request) || !isJSONRequest(request)) {
    return Response.json({ message: 'Invalid request.' }, { status: 403 })
  }

  try {
    const input = contactSchema.parse(await request.json())
    if (input.website) {
      return Response.json({ message: 'Thank you. Your message has been received.' }, { status: 201 })
    }

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-messages',
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone || undefined,
        subject: input.subject,
        message: input.message,
        status: 'new',
      },
      overrideAccess: false,
      draft: false,
    })

    return Response.json(
      { message: 'Thank you. Your message has reached the Bhaktipath team.' },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ message: 'Please check the form and try again.' }, { status: 400 })
    }
    console.error('Contact form submission failed:', error)
    return Response.json({ message: 'We could not send your message. Please try again.' }, { status: 500 })
  }
}
