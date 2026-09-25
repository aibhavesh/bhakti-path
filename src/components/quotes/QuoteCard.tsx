import { Quote } from 'lucide-react'

import type { QuoteRecord } from '@/lib/types'

export function QuoteCard({ quote, compact = false }: { quote: QuoteRecord; compact?: boolean }) {
  return (
    <figure className={`quote-card ${compact ? 'quote-card--compact' : ''}`}>
      <Quote className="quote-card__icon" aria-hidden="true" size={compact ? 28 : 38} />
      <blockquote lang="hi">{quote.text}</blockquote>
      {quote.translation ? <p className="quote-card__translation">{quote.translation}</p> : null}
      <figcaption>— {quote.attribution}</figcaption>
    </figure>
  )
}
