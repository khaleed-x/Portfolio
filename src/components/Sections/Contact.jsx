// components/Sections/Contact.jsx
export default function Contact() {
  const contacts = [
    { label: "Email", href: "mailto:Oyekunlekhalid0122@gmail.com", icon: "✉" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/khalid-ayomide-54944230b", icon: "in" },
    { label: "GitHub", href: "https://github.com/khaleed-x", icon: "⎇" },
    { label: "Twitter / X", href: "https://twitter.com/kha_leed_x", icon: "𝕏" },
    { label: "WhatsApp", href: "https://wa.me/2349061421795", icon: "💬" },
  ];

  return (
    <section className="section" id="contact">
      <div className="contact-wrapper">
        <div className="contact-card">
          <div className="contact-title">Let's build <em>something.</em></div>
          <p className="contact-subtitle">
            Open to internship roles, junior developer positions, and collaboration
            on interesting projects —  in the World tech space.
          </p>
          <div className="contact-links">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                className="contact-link"
                href={contact.href}
                target="_blank"
                rel="noreferrer"
              >
                {contact.icon} {contact.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}