import { profile } from '@/content/profile'

const chips = ['C#', '.NET', 'Native AOT', 'PostgreSQL']

export function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section className="phero" id="hero">
      <div className="phero-glow" aria-hidden />
      <div className="phero-grid">
        <div className="phero-visual">
          <div className="phero-ring" />
          <img className="phero-photo" src={profile.photo} alt={profile.name} />
          {chips.map((c, i) => (
            <span key={c} className={`phero-chip c${i}`}>{c}</span>
          ))}
        </div>

        <div className="phero-copy">
          <div className="phero-status">
            <span className="pulse" />
            {profile.role} · {profile.company}
          </div>
          <h1 className="phero-name">
            Khalid <em>Oyekunle</em>
          </h1>
          <p className="phero-eyebrow">{profile.eyebrow}</p>
          <p className="phero-desc">{profile.intro}</p>
          <div className="phero-btns">
            <button className="pbtn pbtn-primary" onClick={() => onNavigate('projects')}>View projects ↗</button>
            <button className="pbtn pbtn-ghost" onClick={() => onNavigate('contact')}>Get in touch</button>
            <a className="pbtn pbtn-ghost" href={profile.cvPath} target="_blank" rel="noreferrer">Download CV</a>
          </div>
        </div>
      </div>
    </section>
  )
}
