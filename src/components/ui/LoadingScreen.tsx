import Image from 'next/image'

export function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-live="polite" aria-label="Loading Bhaktipath">
      <div className="loading-screen__mark">
        <span className="loading-screen__ring" aria-hidden="true" />
        <Image src="/images/logo.png" alt="" width={82} height={82} priority />
      </div>
      <p className="loading-screen__name">Bhaktipath</p>
      <p className="loading-screen__message">Opening the path…</p>
    </div>
  )
}
