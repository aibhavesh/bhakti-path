import Image from 'next/image'

import { Breadcrumb } from './Breadcrumb'

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
}

export function PageHero({ eyebrow, title, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="page-hero">
      <Image
        className="page-hero__image"
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
      />
      <div className="page-hero__wash" />
      <div className="container page-hero__content">
        <Breadcrumb label={title} />
        <p className="eyebrow eyebrow--light">
          <span aria-hidden="true" />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}
