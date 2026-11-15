import { statusLabel, type ProjectStatus } from '@/content/projects'

const badgeClass: Record<ProjectStatus, string> = {
  live: 'badge-live',
  completed: 'badge-completed',
  'almost-live': 'badge-progress',
  'in-development': 'badge-progress',
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <span className={`project-badge ${badgeClass[status]}`}>{statusLabel[status]}</span>
}
