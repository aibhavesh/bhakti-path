import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { BookOpen, Heart, Lightbulb, Users } from 'lucide-react'

import { QuoteCard } from '@/components/quotes/QuoteCard'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { aboutContent, legacyQuotes } from '@/data/legacy-site'
import { getPage, getQuotes } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About Shri Indresh Upadhyay Ji',
  description:
    'Learn about Pujya Shri Indresh Upadhyay Ji, the founder of Bhaktipath, and the organization’s mission to share Shrimad Bhagwat Katha and living bhakti.',
  alternates: { canonical: '/about' },
}

const values = [
  {
    icon: Heart,
    title: 'Love beyond boundaries',
    text: 'Bhakti is expressed through love, humility, and service toward every being.',
  },
  {
    icon: BookOpen,
    title: 'Living scripture',
    text: 'Shrimad Bhagwat Katha is presented as a living source of understanding, not simply a text.',
  },
  {
    icon: Lightbulb,
    title: 'Clarity for seekers',
    text: 'Teachings make spiritual ideas understandable, relevant, and practical for daily life.',
  },
  {
    icon: Users,
    title: 'A global community',
    text: 'Devotees from India and around the world connect through katha, bhajana, and service.',
  },
]

export default async function AboutPage() {
  const [page, quotes] = await Promise.all([getPage('about'), getQuotes()])
  const quote = quotes[0] || legacyQuotes[0]

  return (
    <main id="main-content">
      <PageHero
        eyebrow="The heart of Bhaktipath"
        title="About Shri Indresh Upadhyay Ji"
        description="A spiritual teacher carrying forward the wisdom, humility, and service of his respected family tradition."
        image="/images/about-speaking.jpg"
        imageAlt="Shri Indresh Upadhyay Ji sharing a teaching"
      />

      <section className="section about-story">
        <div className="container about-story__grid">
          <div className="about-story__copy">
            <SectionHeading
              eyebrow={page?.title || aboutContent.title}
              title="Bhakti for a seeker in every age."
            />
            {page ? (
              <RichText className="rich-text" data={page.body} />
            ) : (
              aboutContent.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
            )}
            <div className="about-story__line" aria-hidden="true" />
            <p className="about-story__signature">Shri Indresh Upadhyay Ji</p>
            <p className="about-story__role">Founder, Bhaktipath</p>
          </div>
          <div className="about-story__images">
            <div className="about-story__image about-story__image--large">
              <Image src="/images/about-portrait.jpg" alt="Portrait of Shri Indresh Upadhyay Ji" fill sizes="500px" />
            </div>
            <div className="about-story__image about-story__image--small">
              <Image src="/images/about-prayer.jpg" alt="Shri Indresh Ji in a devotional prayer" fill sizes="260px" />
            </div>
            <div className="about-story__seal" aria-hidden="true">
              <span>श्रद्धा</span>
              <small>सेवा</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint values-section">
        <div className="container">
          <SectionHeading
            eyebrow="The path of Bhaktipath"
            title="Teaching that becomes lived experience."
            description="Bhaktipath presents knowledge as a path of love, service, and transformation."
            align="center"
          />
          <div className="value-grid">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <article className="value-card" key={value.title}>
                  <span><Icon aria-hidden="true" size={24} /></span>
                  <h2>{value.title}</h2>
                  <p>{value.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {quote ? (
        <section className="section about-quote">
          <div className="container about-quote__inner">
            <QuoteCard quote={quote} />
          </div>
        </section>
      ) : null}
    </main>
  )
}
