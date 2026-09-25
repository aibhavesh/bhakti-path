import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function GirdharLalShrine() {
  return (
    <section className="girdhar-shrine-section" aria-labelledby="girdhar-shrine-title">
      <div className="container girdhar-shrine-section__grid">
        <div className="girdhar-shrine-section__copy">
          <p className="eyebrow">
            <span aria-hidden="true" /> Divine darshan
          </p>
          <h2 id="girdhar-shrine-title">
            A living presence of <em>Shri Girdhar Lal Ji.</em>
          </h2>
          <p>
            A sacred visual pause in the middle of the journey—honoring the deity, the tradition, and the
            devotees who keep the light alive.
          </p>
          <div className="girdhar-shrine-section__details">
            <span>श्रद्धा</span>
            <i aria-hidden="true" />
            <span>भक्ति</span>
            <i aria-hidden="true" />
            <span>सेवा</span>
          </div>
          <Link className="button button--secondary" href="/audio">
            Listen to Girdhar Lal bhajana <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>

        <div className="girdhar-shrine" aria-label="Three-dimensional devotional presentation of Shri Girdhar Lal Ji">
          <div className="girdhar-shrine__aura" aria-hidden="true" />
          <div className="girdhar-shrine__ring girdhar-shrine__ring--outer" aria-hidden="true" />
          <div className="girdhar-shrine__ring girdhar-shrine__ring--inner" aria-hidden="true" />
          <div className="girdhar-shrine__halo" aria-hidden="true" />
          <div className="girdhar-shrine__murti-wrap">
            <Image
              className="girdhar-shrine__murti"
              src="/images/sacred-conversations/girdhar-lal.webp"
              alt="Shri Girdhar Lal Ji murti decorated with red and gold garments"
              width={760}
              height={950}
              sizes="(max-width: 720px) 78vw, 42vw"
            />
            <Image
              className="girdhar-shrine__reflection"
              src="/images/sacred-conversations/girdhar-lal.webp"
              alt=""
              aria-hidden="true"
              width={760}
              height={950}
              sizes="(max-width: 720px) 78vw, 42vw"
            />
          </div>
          <div className="girdhar-shrine__pedestal" aria-hidden="true">
            <span />
          </div>
          <div className="girdhar-shrine__caption">
            <Sparkles aria-hidden="true" size={15} />
            <span>Shri Girdhar Lal Ji</span>
          </div>
        </div>
      </div>
    </section>
  )
}
