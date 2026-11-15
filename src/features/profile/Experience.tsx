import { SectionHeader } from '@/shared/ui/SectionHeader'
import { experience } from '@/content/experience'

export function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <SectionHeader eyebrow="// 05 — Experience" title="Technical" emphasis="Journey" />
      <div className="timeline">
        {experience.map((item) => (
          <div className="timeline-item" key={`${item.role}-${item.org}`}>
            <div className={`timeline-dot ${item.muted ? 'muted' : ''}`} />
            <div className="timeline-period" style={item.muted ? { color: 'var(--text-muted)' } : undefined}>
              {item.period}
            </div>
            <div className="timeline-role">{item.role}</div>
            <div className="timeline-org">{item.org}</div>
            {item.points.length > 0 && (
              <ul className="timeline-points">
                {item.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
