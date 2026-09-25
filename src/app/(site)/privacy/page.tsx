import type { Metadata } from 'next'

import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Bhaktipath handles information submitted through contact and registration forms.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Your information"
        title="Privacy policy"
        description="A clear explanation of the information collected by the redesigned Bhaktipath website."
        image="/images/gallery/devotional-3.png"
        imageAlt="Bhaktipath devotional gathering"
      />
      <article className="section legal-page">
        <div className="container legal-page__content">
          <p className="legal-page__updated">Last updated: 25 September 2026</p>
          <h2>Information you provide</h2>
          <p>
            When you submit a contact or registration form, Bhaktipath stores the details you provide so the
            team can respond to your enquiry. Registration submissions can include your name, email, phone
            number, event interest, number of attendees, and message.
          </p>
          <h2>How the information is used</h2>
          <p>
            Information is used to respond to enquiries, confirm event availability, provide registration
            details, and maintain necessary communication records. It is not sold to third parties.
          </p>
          <h2>Administrators and service providers</h2>
          <p>
            Form data is stored in the website content system and can only be viewed by authorized Bhaktipath
            administrators. The hosting provider processes technical data required to operate the website.
          </p>
          <h2>Audio and video</h2>
          <p>
            Bhajans are streamed from the existing Bhaktipath media URLs. Videos use YouTube’s privacy-enhanced
            player, which may receive viewing data according to Google’s policies.
          </p>
          <h2>Contact</h2>
          <p>
            For questions about this policy or to request access to your submitted information, use the
            <a href="/contact"> contact form</a> or call the number shown on that page.
          </p>
        </div>
      </article>
    </main>
  )
}
