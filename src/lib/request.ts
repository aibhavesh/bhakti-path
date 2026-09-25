export function isSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host')

  if (!origin || !host) return true

  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export function isJSONRequest(request: Request) {
  return request.headers.get('content-type')?.includes('application/json') || false
}
