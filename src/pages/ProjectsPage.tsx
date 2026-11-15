import { SectionHeader } from '@/shared/ui/SectionHeader'
import { ProjectGrid } from '@/features/projects'
import { projects } from '@/content/projects'

export function ProjectsPage() {
  return (
    <section className="section page-top">
      <SectionHeader eyebrow="// Projects" title="All" emphasis="Projects" />
      <ProjectGrid items={projects} />
    </section>
  )
}
