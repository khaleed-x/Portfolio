import { SectionHeader } from '@/shared/ui/SectionHeader'
import { PostCard, posts } from '@/features/blog'

export function BlogPage() {
  return (
    <section className="section page-top">
      <SectionHeader eyebrow="// Blog" title="Notes &" emphasis="Writing" />
      {posts.length === 0 ? (
        <p className="detail-body">No posts yet. Check back soon.</p>
      ) : (
        <div className="projects-grid">
          {posts.map((p) => <PostCard key={p.slug} post={p} />)}
        </div>
      )}
    </section>
  )
}
