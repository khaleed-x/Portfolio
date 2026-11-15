import { Link } from 'react-router-dom'
import type { Project } from '@/content/projects'
import { StatusBadge } from './StatusBadge'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card project-card-link">
      <div className="project-header">
        <div className="project-name">{project.name}</div>
        <StatusBadge status={project.status} />
      </div>
      <div className="project-type">{project.type}</div>
      <p className="project-desc">{project.summary}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span className="project-tag" key={tag}>{tag}</span>
        ))}
      </div>
      <span className="project-link">View details →</span>
    </Link>
  )
}
