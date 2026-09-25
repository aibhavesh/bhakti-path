import Link from 'next/link'
import { Camera, MonitorPlay, Phone, ThumbsUp } from 'lucide-react'

import { Logo } from '@/components/ui/Logo'
import type { SiteSettingsRecord } from '@/lib/types'
import { getPhoneHref } from '@/lib/utils'

const footerLinks = [
  { href: '/about', label: 'About the guru' },
  { href: '/schedule', label: 'Event schedule' },
  { href: '/audio', label: 'Listen to bhajans' },
  { href: '/video', label: 'Watch katha' },
  { href: '/contact', label: 'Contact us' },
]

export function Footer({ settings }: { settings: SiteSettingsRecord }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__ornament" aria-hidden="true" />
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo inverse />
          <p>{settings.description}</p>
          <div className="social-links" aria-label="Social media">
            <a href={settings.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <MonitorPlay aria-hidden="true" size={19} />
            </a>
            <a href={settings.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <ThumbsUp aria-hidden="true" size={19} />
            </a>
            <a href={settings.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Camera aria-hidden="true" size={19} />
            </a>
          </div>
        </div>
        <div>
          <h2>Explore</h2>
          <ul className="footer-links">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Get in touch</h2>
          <p className="site-footer__label">Event and registration enquiries</p>
          {settings.phones.map((phone) => (
            <a className="site-footer__phone" key={phone} href={getPhoneHref(phone)}>
              <Phone aria-hidden="true" size={17} /> {phone}
            </a>
          ))}
          <Link className="button button--light site-footer__button" href="/register">
            Register your interest
          </Link>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>© {new Date().getFullYear()} Bhaktipath. All rights reserved.</p>
        <p>Devotion · Service · Understanding</p>
      </div>
    </footer>
  )
}
