'use client'

import { Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { FormStatus } from './FormStatus'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })
      const result = (await response.json()) as { message?: string }
      if (!response.ok) throw new Error(result.message || 'Unable to send your message.')

      form.reset()
      setStatus('success')
      setMessage(result.message || 'Thank you. Your message has reached our team.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your message.')
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className="field">
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </label>
        <label className="field">
          <span>Subject</span>
          <input name="subject" type="text" required maxLength={160} />
        </label>
      </div>
      <label className="field">
        <span>How can we help?</span>
        <textarea name="message" rows={7} required maxLength={5000} />
      </label>
      <label className="form-trap" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-actions">
        <button className="button button--primary" type="submit" disabled={status === 'submitting'}>
          Send message <Send aria-hidden="true" size={18} />
        </button>
        <FormStatus state={status} message={message} />
      </div>
    </form>
  )
}
