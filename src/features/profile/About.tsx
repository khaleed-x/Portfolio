import { SectionHeader } from '@/shared/ui/SectionHeader'
import { projects } from '@/content/projects'
import { skills } from '@/content/skills'

export function About() {
  const languages = skills.find((s) => s.label === 'Languages')?.items.length ?? 0
  const stats = [
    { number: `${projects.length}`, label: 'Projects built' },
    { number: `${languages}`, label: 'Languages used' },
    { number: 'Lead', label: 'Backend at Hosté' },
  ]

  return (
    <section className="section section-alt" id="about">
      <SectionHeader eyebrow="// 01 — About" title="Engineering" emphasis="Philosophy" />
      <div className="about-grid">
        <div className="about-body">
          <p>
            I'm a backend engineer who designs reliable, maintainable, and scalable systems with <strong>C#</strong> and{' '}
            <strong>ASP.NET Core</strong>. Today I lead the backend at <strong>Hosté</strong>, where I direct how the system is
            structured and built. I care about architecture, module boundaries, data flow, and the trade-offs behind
            production-ready software.
          </p>
          <p>
            Building Hosté turned modular monoliths into my default approach: strong boundaries and clear ownership
            without the operational cost of distributed services too early. My next C# project will follow the same
            approach, compiled with <strong>Native AOT</strong> instead of JIT.
          </p>
          <p>
            My foundation was built in C# during industrial training, before I moved into ASP.NET Core on my own. That
            taught me to learn through documentation, experimentation, and real systems. C# remains my primary
            language, alongside TypeScript, Python, and PHP.
          </p>
          <p>
            Outside software, I design bespoke menswear. The disciplines differ, but both demand precision, thoughtful
            design, and attention to detail.
          </p>
        </div>
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
