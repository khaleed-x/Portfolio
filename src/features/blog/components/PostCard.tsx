import { Link } from 'react-router-dom'
import { formatDate, type Post } from '../lib'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="project-card project-card-link">
      <div className="project-type">
        {formatDate(post.date)} · {post.readingMinutes} min read{post.draft ? ' · DRAFT' : ''}
      </div>
      <div className="project-name">{post.title}</div>
      <p className="project-desc">{post.summary}</p>
      <div className="project-tags">
        {post.tags.map((t) => (
          <span className="project-tag" key={t}>{t}</span>
        ))}
      </div>
    </Link>
  )
}
