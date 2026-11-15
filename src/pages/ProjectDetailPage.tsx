import { Link, useParams } from 'react-router-dom'
import { getProject } from '@/content/projects'
import { ProjectGallery, StatusBadge } from '@/features/projects'
import { NotFoundPage } from './NotFoundPage'

export function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFoundPage />

  return (
    <article className="section page-top detail">
      <Link to="/#projects" className="back-link">← Back to projects</Link>
      <div className="project-header">
        <h1 className="detail-title">{project.name}</h1>
        <StatusBadge status={project.status} />
      </div>
      <div className="project-type">{project.type}</div>

      <ProjectGallery images={project.images} />

      <div className="detail-body">
        {project.details.map((p) => <p key={p}>{p}</p>)}
        {project.highlights && (
          <ul>{project.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        )}
      </div>

      <div className="project-tags">
        {project.tags.map((t) => <span className="project-tag" key={t}>{t}</span>)}
      </div>

      <div className="hero-btns">
        {project.liveUrl && (
          <a className="btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer">↗ Live site</a>
        )}
        {project.repoUrl && (
          <a className="btn-outline" href={project.repoUrl} target="_blank" rel="noreferrer">Repository</a>
        )}
      </div>
    </article>
  )
}
