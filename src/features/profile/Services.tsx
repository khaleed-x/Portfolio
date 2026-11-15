import { SectionHeader } from '@/shared/ui/SectionHeader'
import { services } from '@/content/services'

export function Services() {
  return (
    <section className="section" id="services">
      <SectionHeader eyebrow="// 02 — Focus Areas" title="Areas of" emphasis="Expertise" />
      <div className="services-grid">
        {services.map((s) => (
          <div className="service-card" key={s.number}>
            <div className="service-number">{s.number}</div>
            <div className="service-title">{s.title}</div>
            <p className="service-desc">{s.desc}</p>
            <div className="service-tags">
              {s.tags.map((tag) => (
                <span className="service-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
