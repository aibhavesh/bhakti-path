import type { CollectionBeforeChangeHook } from 'payload'

export function toSlug(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const ensureSlug: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  const next = data as Record<string, unknown>
  const title =
    typeof next.title === 'string'
      ? next.title
      : typeof originalDoc?.title === 'string'
        ? originalDoc.title
        : ''

  if (!next.slug && !originalDoc?.slug && title) {
    next.slug = toSlug(title)
  }

  return next
}
