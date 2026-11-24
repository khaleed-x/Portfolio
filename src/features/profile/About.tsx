import { SectionHeader } from '@/shared/ui/SectionHeader'
import { Link } from 'react-router-dom'
// import { projects } from '@/content/projects'
// import { skills } from '@/content/skills'

export function About() {
  // const languages = skills.find((s) => s.label === 'Languages')?.items.length ?? 0
  // const stats = [
  //   { number: `${projects.length}`, label: 'Projects built' },
  //   { number: `${languages}`, label: 'Languages used' },
  //   { number: 'Lead', label: 'Backend at Hosté' },
  // ]

  return (
    <section className="section section-alt" id="philosophy">
      <SectionHeader eyebrow="// 01 — How I work" title="Engineering" emphasis="Philosophy" />
      <div className="about-grid">
      
<div className="about-body">
  <p>
    I approach software engineering with an emphasis on clear architecture,
    separation of concerns, and maintainability. I value understanding
    system requirements and making deliberate design decisions before
    introducing complexity.
  </p>

  <p>
    I favour modular architectures that establish clear boundaries while
    keeping systems practical to develop, test, deploy, and maintain.
    I believe good engineering is not just about making software work,
    but making it understandable and adaptable as it evolves.
  </p>
  <Link to="/about" className="project-link">Read more about me →</Link>
</div>

        <div className="stats-grid">
          {/* {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  )
}
