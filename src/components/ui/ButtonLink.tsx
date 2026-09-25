import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

import { ArrowRight } from 'lucide-react'

type Props = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'light' | 'ghost'
  showArrow?: boolean
  className?: string
} & Omit<ComponentProps<typeof Link>, 'href' | 'children' | 'className'>

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  showArrow = false,
  className = '',
  ...props
}: Props) {
  return (
    <Link className={`button button--${variant} ${className}`.trim()} href={href} {...props}>
      <span>{children}</span>
      {showArrow ? <ArrowRight aria-hidden="true" size={18} strokeWidth={2} /> : null}
    </Link>
  )
}
