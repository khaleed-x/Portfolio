import { SectionHeader } from '@/shared/ui/SectionHeader'
import { education } from '@/content/education'

export function Education() {
  return (
    <section className="section" id="education">
      <SectionHeader eyebrow="// Education" title="Academic" emphasis="Background" />

      <div className="timeline">
        {education.map((item) => (
          <div className="timeline-item" key={item.qualification}>
            <div className="timeline-dot" />
            <div className="timeline-period">{item.period}</div>
            <div className="timeline-role">{item.qualification}</div>
            <div className="timeline-org">{item.field}</div>
            <p>{item.institution}</p>
          </div>
        ))}
      </div>
    </section>
  )
}