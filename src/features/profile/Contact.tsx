import { profile } from '@/content/profile'

const contacts = [
  { label: 'Email', href: profile.links.email, icon: '✉' },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: 'in' },
  { label: 'GitHub', href: profile.links.github, icon: '⎇' },
  { label: 'Twitter / X', href: profile.links.twitter, icon: '𝕏' },
  { label: 'WhatsApp', href: profile.links.whatsapp, icon: '💬' },
]

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="contact-wrapper">
        <div className="contact-card">
          <div className="contact-title">Let's build <em>something.</em></div>
          <p className="contact-subtitle">{profile.availability}</p>
          <div className="contact-links">
            {contacts.map((c) => (
              <a key={c.label} className="contact-link" href={c.href} target="_blank" rel="noreferrer">
                {c.icon} {c.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
