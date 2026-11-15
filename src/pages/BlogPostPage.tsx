import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { formatDate, getPost, posts, PostCard } from '@/features/blog'
import { ShareButton } from '@/shared/ui/ShareButton'
import { usePageTitle } from '@/shared/hooks/usePageTitle'
import { NotFoundPage } from './NotFoundPage'

export function BlogPostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  usePageTitle(post ? `${post.title} · Khalid Oyekunle` : 'Khalid Oyekunle')
  if (!post) return <NotFoundPage />

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <article className="section page-top detail">
      <Link to="/blog" className="back-link">← All posts</Link>
      <div className="project-type">
        {formatDate(post.date)} · {post.readingMinutes} min read
      </div>
      <h1 className="detail-title">{post.title}</h1>
      {post.image && <img className="post-cover" src={post.image} alt="" />}
      <div className="detail-body prose">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
      <ShareButton title={post.title} text={post.summary} />

      {more.length > 0 && (
        <>
          <h2 className="more-title">Keep reading</h2>
          <div className="projects-grid">
            {more.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </>
      )}
    </article>
  )
}
