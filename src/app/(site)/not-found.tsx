import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <main id="main-content" className="error-page">
      <div className="error-page__pattern" aria-hidden="true" />
      <div className="container error-page__content">
        <span className="error-page__icon">
          <Compass aria-hidden="true" size={34} />
        </span>
        <p className="eyebrow">
          <span aria-hidden="true" /> Page not found
        </p>
        <h1>This path is not part of the journey.</h1>
        <p>The page may have moved, or the address may be incomplete. Return home to continue exploring.</p>
        <Link className="button button--primary" href="/">
          <ArrowLeft aria-hidden="true" size={18} /> Return home
        </Link>
      </div>
    </main>
  )
}
