import { Link } from 'react-router-dom'
import { SectionHeader } from '@/shared/ui/SectionHeader'
import { projects } from '@/content/projects'
import { ProjectGrid } from './components/ProjectGrid'

export function ProjectsSection() {
  return (
    <section className="section section-alt" id="projects">
      <SectionHeader eyebrow="// 03 — Projects" title="Systems I've" emphasis="Designed" />
      <ProjectGrid items={projects} />
      <p className="section-more"><Link to="/projects" className="project-link">See all projects →</Link></p>
    </section>
  )
}
