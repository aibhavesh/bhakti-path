import Image from 'next/image'

const portraits = [
  {
    key: 'radha',
    name: 'Shri Radha Raman Ji',
    sanskrit: 'राधा',
    meaning: 'प्रेम · Divine love',
    image: '/images/sacred-conversations/radha-raman.webp',
    alt: 'Shri Radha Raman Ji murti from the official Bhaktipath recording',
    className: 'sacred-portal--radha',
  },
  {
    key: 'indresh',
    name: 'Shri Indresh Upadhyay Ji',
    sanskrit: 'इन्द्रेश जी',
    meaning: 'ज्ञान · Living wisdom',
    image: '/images/sacred-conversations/indresh-upadhyay.webp',
    alt: 'Shri Indresh Upadhyay Ji in a devotional gathering',
    className: 'sacred-portal--indresh',
  },
  {
    key: 'girdhar',
    name: 'Shri Girdhar Lal Ji',
    sanskrit: 'गिरधरलाल',
    meaning: 'आनंद · Divine joy',
    image: '/images/sacred-conversations/girdhar-lal.webp',
    alt: 'Shri Girdhar Lal Ji murti decorated for Vyahula Utsav',
    className: 'sacred-portal--girdhar',
  },
]

export function SacredConversations() {
  return (
    <section className="sacred-conversations" aria-labelledby="sacred-dialogue-title">
      <div className="sacred-conversations__halo sacred-conversations__halo--one" aria-hidden="true" />
      <div className="sacred-conversations__halo sacred-conversations__halo--two" aria-hidden="true" />
      <span className="sacred-conversations__watermark" aria-hidden="true">
        प्रेम
      </span>

      <div className="container">
        <div className="sacred-conversations__intro">
          <div>
            <p className="eyebrow">
              <span aria-hidden="true" /> A living dialogue
            </p>
            <h2 id="sacred-dialogue-title">
              Three sacred presences. <em>One current of devotion.</em>
            </h2>
          </div>
          <div className="sacred-conversations__intro-copy">
            <p>
              Radha’s love, Girdhar Lal Ji’s joy, and Shri Indresh Ji’s living explanation—presented as one
              continuous conversation rather than separate portraits.
            </p>
            <span lang="hi">राधा • गिरधरलाल • इन्द्रेश जी</span>
          </div>
        </div>

        <div className="sacred-collage">
          <div className="sacred-thread" aria-hidden="true">
            <span className="sacred-thread__line" />
            <span className="sacred-thread__point sacred-thread__point--one" />
            <span className="sacred-thread__point sacred-thread__point--two" />
            <span className="sacred-thread__point sacred-thread__point--three" />
          </div>

          {portraits.map((portrait, index) => (
            <figure className={`sacred-portal ${portrait.className}`} key={portrait.key}>
              <div className="sacred-portal__frame">
                <Image
                  src={portrait.image}
                  alt={portrait.alt}
                  fill
                  sizes="(max-width: 720px) 82vw, (max-width: 1050px) 42vw, 30vw"
                />
                <span className="sacred-portal__shine" aria-hidden="true" />
                <span className="sacred-portal__number" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <figcaption>
                <span lang="hi">{portrait.sanskrit}</span>
                <strong>{portrait.name}</strong>
                <small>{portrait.meaning}</small>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="sacred-conversations__closing">
          <span aria-hidden="true">ॐ</span>
          <p>दर्शन • श्रद्धा • सेवा</p>
          <small>Darshan · Shraddha · Seva</small>
        </div>
      </div>
    </section>
  )
}
