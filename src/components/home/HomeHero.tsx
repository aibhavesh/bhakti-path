import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Headphones, Play, Sparkles } from 'lucide-react'

import { ButtonLink } from '@/components/ui/ButtonLink'

export function HomeHero() {
  return (
    <section className="home-hero">
      <Image
        className="home-hero__image"
        src="/images/gallery/devotional-2.png"
        alt="Shri Indresh Upadhyay Ji sharing a devotional teaching"
        fill
        priority
        sizes="100vw"
      />
      <div className="home-hero__overlay" />
      <div className="home-hero__pattern" aria-hidden="true" />
      <div className="container home-hero__inner">
        <div className="home-hero__copy">
          <p className="hero-kicker">
            <Sparkles aria-hidden="true" size={16} /> Official channel of Pujya Shri Indresh Upadhyay Ji
          </p>
          <h1>
            Where devotion becomes a <span>living path</span>
          </h1>
          <p>
            Listen to devotional bhajans, watch Shrimad Bhagwat Katha, and join a community inspired by
            love, humility, and spiritual understanding.
          </p>
          <div className="home-hero__actions">
            <ButtonLink href="/register" variant="primary" showArrow>
              Register for a gathering
            </ButtonLink>
            <ButtonLink href="/schedule" variant="light">
              Explore the schedule
            </ButtonLink>
          </div>
        </div>
        <div className="home-hero__verse">
          <span className="home-hero__verse-icon" aria-hidden="true">
            ॐ
          </span>
          <div>
            <p lang="hi">मुझे प्रभु से प्रेम हो...</p>
            <span>I wish for love for the Divine — in that wish, all darkness fades.</span>
          </div>
        </div>
      </div>
      <div className="home-hero__media-links" aria-label="Featured media">
        <Link href="/audio">
          <Headphones aria-hidden="true" size={18} />
          <span>
            <small>Listen</small>
            Devotional bhajans
          </span>
          <Play aria-hidden="true" size={16} fill="currentColor" />
        </Link>
        <Link href="/video">
          <Play aria-hidden="true" size={18} />
          <span>
            <small>Watch</small>
            Live katha archive
          </span>
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  )
}
