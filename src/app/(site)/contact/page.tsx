import type { Metadata } from 'next'
import { Clock3, Mail, MapPin, Phone } from 'lucide-react'

import { ContactForm } from '@/components/forms/ContactForm'
import { PageHero } from '@/components/ui/PageHero'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getSiteSettings } from '@/lib/content'
import { getPhoneHref } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact the Bhaktipath team for event, registration, media, and spiritual inquiry support.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  return (
    <main id="main-content">
      <PageHero
        eyebrow="We are here to help"
        title="Contact Bhaktipath"
        description="Send a message or call the team for help with events, registration, and the media library."
        image="/images/about-speaking.jpg"
        imageAlt="Shri Indresh Upadhyay Ji addressing devotees"
      />
      <section className="section contact-page">
        <div className="container contact-page__grid">
          <div className="contact-page__intro">
            <SectionHeading
              eyebrow="Get in touch"
              title="How can we help?"
              description="Please include your full name, phone number, and the event or topic so the team can respond accurately."
            />
            <div className="contact-list">
              <a href={getPhoneHref(settings.phones[0])}>
                <span><Phone aria-hidden="true" size={20} /></span>
                <div><small>Call the team</small><strong>{settings.phones.join(' · ')}</strong></div>
              </a>
              <div>
                <span><Mail aria-hidden="true" size={20} /></span>
                <div><small>Online enquiries</small><strong>Use the secure message form</strong></div>
              </div>
              <div>
                <span><Clock3 aria-hidden="true" size={20} /></span>
                <div><small>Response time</small><strong>Usually within one working day</strong></div>
              </div>
              <div>
                <span><MapPin aria-hidden="true" size={20} /></span>
                <div><small>Event enquiries</small><strong>Available across India and internationally</strong></div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
