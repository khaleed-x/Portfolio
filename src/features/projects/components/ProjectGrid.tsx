import type { Project } from '@/content/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="projects-grid">
      {items.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  )
}
