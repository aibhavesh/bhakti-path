import Image from 'next/image'
import Link from 'next/link'

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="Bhaktipath home">
      <span className="brand__mark">
        <Image src="/images/logo.png" alt="" width={52} height={52} priority />
      </span>
      <span className="brand__text">
        <strong>Bhaktipath</strong>
        <small className={inverse ? 'brand__tagline brand__tagline--inverse' : 'brand__tagline'}>
          Live with devotion
        </small>
      </span>
    </Link>
  )
}
