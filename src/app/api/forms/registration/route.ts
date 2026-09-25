import config from '@payload-config'
import { getPayload } from 'payload'
import { z } from 'zod'

import { isJSONRequest, isSameOrigin } from '@/lib/request'

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(40),
  event: z.string().trim().max(100).optional(),
  attendeeCount: z.coerce.number().int().min(1).max(100).default(1),
  message: z.string().trim().max(2000).optional().default(''),
  website: z.string().max(200).optional().default(''),
  consent: z.literal(true),
})

export async function POST(request: Request) {
  if (!isSameOrigin(request) || !isJSONRequest(request)) {
    return Response.json({ message: 'Invalid request.' }, { status: 403 })
  }

  try {
    const input = registrationSchema.parse(await request.json())
    if (input.website) {
      return Response.json(
        { message: 'Registration received. Our team will contact you shortly.' },
        { status: 201 },
      )
    }

    const payload = await getPayload({ config })
    await payload.create({
      collection: 'registrations',
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        event: input.event || undefined,
        attendeeCount: input.attendeeCount,
        message: input.message || undefined,
        consent: input.consent,
        source: 'website',
        status: 'new',
      },
      overrideAccess: false,
      draft: false,
    })

    return Response.json(
      { message: 'Registration received. Our team will contact you shortly.' },
      { status: 201 },
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ message: 'Please check the form and try again.' }, { status: 400 })
    }
    console.error('Registration form submission failed:', error)
    return Response.json(
      { message: 'We could not submit your registration. Please try again.' },
      { status: 500 },
    )
  }
}
