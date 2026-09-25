import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function Breadcrumb({ label }: { label: string }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <ChevronRight aria-hidden="true" size={14} />
      <span aria-current="page">{label}</span>
    </nav>
  )
}
