import { SectionHeader } from '@/shared/ui/SectionHeader'
import { skills } from '@/content/skills'

export function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHeader eyebrow="// 04 — Engineering Toolkit" title="Tools &" emphasis="Technologies" />
      <div className="skills-grid">
        {skills.map((group) => (
          <div className="skill-card" key={group.label}>
            <div className="skill-label">{group.label}</div>
            {group.items.map((item) => (
              <div className="skill-item" key={item}>{item}</div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
