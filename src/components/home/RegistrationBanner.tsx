import Image from 'next/image'
import { Phone, Sparkles } from 'lucide-react'

import { ButtonLink } from '@/components/ui/ButtonLink'
import { getPhoneHref } from '@/lib/utils'

export function RegistrationBanner({ phones }: { phones: string[] }) {
  return (
    <section className="registration-wrap">
      <div className="container">
        <div className="registration-banner">
          <div className="registration-banner__image">
            <Image
              src="/images/guru-purnima-registration.jpg"
              alt="Bhaktipath Guru Purnima registration artwork"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="registration-banner__copy">
            <p className="eyebrow eyebrow--light">
              <span aria-hidden="true" /> Join the next gathering
            </p>
            <h2>Register your interest in a live Bhaktipath event.</h2>
            <p>
              Share your details online, or call the Bhaktipath team for direct help with dates, venues, and
              group registration.
            </p>
            <div className="registration-banner__phones">
              {phones.map((phone) => (
                <a href={getPhoneHref(phone)} key={phone}>
                  <Phone aria-hidden="true" size={17} /> {phone}
                </a>
              ))}
            </div>
            <ButtonLink href="/register" variant="primary" showArrow>
              Register your interest
            </ButtonLink>
            <span className="registration-banner__note">
              <Sparkles aria-hidden="true" size={14} /> No new date is published until confirmed by the team.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
