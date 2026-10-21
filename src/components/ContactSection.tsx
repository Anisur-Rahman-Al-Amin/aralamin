import { useState, type FormEvent } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { profile } from '../data/portfolio'

export function ContactSection() {
  const [formStatus, setFormStatus] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!profile.contactEmail) {
      setFormStatus('Email contact is not configured yet.')
      return
    }

    const values = new FormData(event.currentTarget)
    const name = String(values.get('name') ?? '').trim()
    const email = String(values.get('email') ?? '').trim()
    const message = String(values.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`)
    window.location.href = `mailto:${profile.contactEmail}?subject=${subject}&body=${body}`
    setFormStatus('Your email app is opening with your message.')
  }

  return (
    <section className="contact-section section-wrap" id="contact" aria-labelledby="contact-title">
      <div className="contact-topline"><span className="eyebrow">08 / Start a conversation</span><Sparkles className="contact-star" size={34} aria-hidden="true" /></div>
      <h2 id="contact-title">{profile.phdStatus}</h2>
      <div className="contact-layout">
        <div className="contact-copy">
          <p>{profile.contactInvitation}</p>
          <div className="contact-methods">
            <a href={`mailto:${profile.contactEmail}`}>{profile.contactEmail}</a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer">Message on WhatsApp</a>
            <a href={`tel:${profile.phone.replaceAll(' ', '')}`}>{profile.phone}</a>
            <span>{profile.name}, {profile.institution}, {profile.location}</span>
          </div>
          <div className="profile-links">
            {profile.links.map((link) => <a href={link.url} key={link.label} target="_blank" rel="noreferrer">{link.label}</a>)}
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label className="message-field">Message<textarea name="message" rows={3} placeholder="What would you like to discuss?" required /></label>
          <div className="form-footer"><button className="button button-dark" type="submit">Send a note <Send size={14} aria-hidden="true" /></button><p className="form-status" role="status" aria-live="polite">{formStatus}</p></div>
        </form>
      </div>
    </section>
  )
}
