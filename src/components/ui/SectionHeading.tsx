type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  inverse?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverse = false,
}: SectionHeadingProps) {
  const classes = [
    'section-heading',
    align === 'center' ? 'section-heading--center' : '',
    inverse ? 'section-heading--inverse' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <p className="eyebrow">
        <span aria-hidden="true" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
    </div>
  )
}
