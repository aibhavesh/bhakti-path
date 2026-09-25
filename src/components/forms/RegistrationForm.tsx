'use client'

import { CalendarCheck, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import type { EventRecord } from '@/lib/types'
import { FormStatus } from './FormStatus'

export function RegistrationForm({ events }: { events: EventRecord[] }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const consent = formData.get('consent') === 'on'

    setStatus('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/forms/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          event: formData.get('event') || undefined,
          attendeeCount: Number(formData.get('attendeeCount') || 1),
          message: formData.get('message'),
          website: formData.get('website'),
          consent,
        }),
      })
      const result = (await response.json()) as { message?: string }
      if (!response.ok) throw new Error(result.message || 'Unable to submit your registration.')

      form.reset()
      setStatus('success')
      setMessage(result.message || 'Registration received. Our team will contact you shortly.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to submit your registration.')
    }
  }

  return (
    <form className="form-card form-card--accent" onSubmit={onSubmit}>
      <div className="form-intro">
        <CalendarCheck aria-hidden="true" size={28} />
        <div>
          <h2>Registration enquiry</h2>
          <p>Share your details and the Bhaktipath team will call you with event information.</p>
        </div>
      </div>
      <div className="form-grid">
        <label className="field">
          <span>Full name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className="field">
          <span>Email address</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label className="field">
          <span>Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" required maxLength={40} />
        </label>
        <label className="field">
          <span>Number of attendees</span>
          <input name="attendeeCount" type="number" min={1} max={100} defaultValue={1} required />
        </label>
      </div>
      <label className="field">
        <span>Event of interest</span>
        <select name="event" defaultValue="">
          <option value="">General / upcoming event notification</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title} — {event.city}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Message <small>(optional)</small></span>
        <textarea name="message" rows={6} maxLength={2000} />
      </label>
      <label className="form-trap" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="checkbox-field">
        <input name="consent" type="checkbox" required />
        <span>I agree that Bhaktipath may contact me about this enquiry.</span>
      </label>
      <div className="form-actions">
        <button className="button button--primary" type="submit" disabled={status === 'submitting'}>
          Submit registration <Send aria-hidden="true" size={18} />
        </button>
        <FormStatus state={status} message={message} />
      </div>
    </form>
  )
}
