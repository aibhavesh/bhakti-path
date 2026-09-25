export function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
    ...options,
  }).format(new Date(date))
}

export function formatEventDateRange(startDate: string, endDate?: string) {
  if (!endDate || startDate === endDate) return formatDate(startDate)

  const start = new Date(startDate)
  const end = new Date(endDate)
  const sameMonth = start.getUTCMonth() === end.getUTCMonth()
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear()

  if (sameMonth && sameYear) {
    const startDay = new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      timeZone: 'UTC',
    }).format(start)
    return `${startDay}–${formatDate(endDate)}`
  }

  return `${formatDate(startDate)} – ${formatDate(endDate)}`
}

export function getYouTubeThumbnail(videoID: string) {
  return `https://i.ytimg.com/vi/${videoID}/hqdefault.jpg`
}

export function getYouTubeURL(videoID: string) {
  return `https://www.youtube.com/watch?v=${videoID}`
}

export function getPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, '')}`
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
