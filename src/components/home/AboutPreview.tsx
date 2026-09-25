import Image from 'next/image'
import { Heart, Sparkles } from 'lucide-react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { aboutContent } from '@/data/legacy-site'

export function AboutPreview() {
  return (
    <section className="section about-preview">
      <div className="container about-preview__grid">
        <div className="about-preview__visual">
          <div className="about-preview__image about-preview__image--main">
            <Image
              src="/images/about-speaking.jpg"
              alt="Shri Indresh Upadhyay Ji sharing teachings"
              fill
              sizes="(max-width: 800px) 90vw, 45vw"
            />
          </div>
          <div className="about-preview__image about-preview__image--small">
            <Image
              src="/images/about-prayer.jpg"
              alt="Shri Indresh Upadhyay Ji in prayer"
              fill
              sizes="220px"
            />
          </div>
          <div className="about-preview__badge">
            <Heart aria-hidden="true" size={20} fill="currentColor" />
            <span>
              <strong>Live teachings</strong>
              Shared with the world
            </span>
          </div>
        </div>
        <div className="about-preview__copy">
          <SectionHeading
            eyebrow={aboutContent.eyebrow}
            title="A teacher of love, humility, and living bhakti."
            description={aboutContent.paragraphs[0]}
          />
          <div className="about-preview__points">
            <div>
              <span><Sparkles aria-hidden="true" size={18} /></span>
              <p>
                <strong>Shrimad Bhagwat Katha</strong>
                Clear understanding rooted in the living spiritual tradition.
              </p>
            </div>
            <div>
              <span><Heart aria-hidden="true" size={18} /></span>
              <p>
                <strong>Universal devotion</strong>
                Messages of love and service shared with seekers worldwide.
              </p>
            </div>
          </div>
          <ButtonLink href="/about" variant="secondary" showArrow>
            Discover the full story
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
