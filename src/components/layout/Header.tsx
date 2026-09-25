'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

import { Logo } from '@/components/ui/Logo'

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/audio', label: 'Audio' },
  { href: '/video', label: 'Video' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  const isActive = (href: string) => (href === '/' ? pathname === href : pathname.startsWith(href))

  return (
    <>
      <div className="announcement-bar">
        <div className="container announcement-bar__inner">
          <p>
            <span aria-hidden="true">✦</span> New live gatherings are announced through the official schedule.
          </p>
          <Link href="/schedule">
            View schedule <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? 'is-active' : ''}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link className="button button--primary site-header__cta" href="/register">
            Register <ArrowRight aria-hidden="true" size={17} />
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`} id="mobile-navigation">
        <button
          className="mobile-nav__backdrop"
          type="button"
          aria-label="Close navigation menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        />
        <div className="mobile-nav__panel" aria-hidden={!menuOpen}>
          <p className="mobile-nav__label">Explore Bhaktipath</p>
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={menuOpen ? 0 : -1}
                className={isActive(item.href) ? 'is-active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            className="button button--primary mobile-nav__cta"
            href="/register"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            Register for an event <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <p className="mobile-nav__verse">“मुझे प्रभु से प्रेम हो...”</p>
        </div>
      </div>
    </>
  )
}
