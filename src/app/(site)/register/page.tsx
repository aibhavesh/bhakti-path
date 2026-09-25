import type { Metadata } from 'next'
import { CheckCircle2, Headphones, Phone, ShieldCheck } from 'lucide-react'

import { RegistrationForm } from '@/components/forms/RegistrationForm'
import { PageHero } from '@/components/ui/PageHero'
import { getEvents, getSiteSettings } from '@/lib/content'
import { getPhoneHref } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Event Registration',
  description:
    'Register your interest in an upcoming Bhaktipath gathering and receive direct confirmation of date, venue, and registration details.',
  alternates: { canonical: '/register' },
}

export default async function RegisterPage() {
  const [events, settings] = await Promise.all([getEvents(), getSiteSettings()])
  const upcoming = events.filter((event) => event.status === 'upcoming' || event.status === 'ongoing')

  return (
    <main id="main-content">
      <PageHero
        eyebrow="Register your interest"
        title="Join the next gathering"
        description="Share your details and the Bhaktipath team will contact you with confirmed event and registration information."
        image="/images/events/jaipur-2025.jpg"
        imageAlt="Bhaktipath devotional event registration"
      />
      <section className="section register-page">
        <div className="container register-page__grid">
          <aside className="register-page__aside">
            <p className="eyebrow"><span aria-hidden="true" /> Before you register</p>
            <h2>Simple, direct, personal.</h2>
            <p>
              This form creates a registration enquiry in the Bhaktipath backend. The team can then confirm the
              date, venue, availability, and correct phone number before collecting any payment.
            </p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" size={18} /> No new date is shown until confirmed.</li>
              <li><Phone aria-hidden="true" size={18} /> A team member calls to verify attendance.</li>
              <li><Headphones aria-hidden="true" size={18} /> Online audio continues without registration.</li>
              <li><ShieldCheck aria-hidden="true" size={18} /> Your details are visible only to administrators.</li>
            </ul>
            <div className="register-page__phones">
              <span>Prefer to call?</span>
              {settings.phones.map((phone) => (
                <a key={phone} href={getPhoneHref(phone)}>{phone}</a>
              ))}
            </div>
            {!upcoming.length ? (
              <p className="register-page__note">
                No upcoming event is published yet. Choose “General / upcoming event notification” and the
                team will contact you when registrations open.
              </p>
            ) : null}
          </aside>
          <RegistrationForm events={events} />
        </div>
      </section>
    </main>
  )
}
