import { useState } from 'react'
import { Icon } from './icons'
import { usePostMeta } from './hooks'

type Filter = 'all' | 'live' | 'draft'

export function PostsPage({ onEdit }: { onEdit: (slug: string) => void }) {
  const { posts, error } = usePostMeta()
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const shown = (posts ?? []).filter(
    (p) =>
      (filter === 'all' || (filter === 'draft') === p.draft) &&
      `${p.title} ${p.slug}`.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div className="ad-stack">
      <div className="ad-toolbar">
        <label className="ad-search">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search posts" />
        </label>
        <div className="ad-chips">
          {(['all', 'live', 'draft'] as Filter[]).map((f) => (
            <button key={f} className={filter === f ? 'on' : ''} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f === 'live' ? 'Published' : 'Drafts'}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="ad-alert"><b>Could not load posts.</b> {error}</div>}
      {!posts && !error && <div className="ad-skel" />}

      <section className="ad-card ad-list">
        {shown.map((p) => (
          <div className="ad-post" key={p.slug}>
            <button className="ad-post-main" onClick={() => onEdit(p.slug)}>
              <b>{p.title}</b>
              <small>{p.date ? new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No date'} · /blog/{p.slug}</small>
            </button>
            <span className={`ad-pill ${p.draft ? 'draft' : 'live'}`}>{p.draft ? 'Draft' : 'Published'}</span>
            {!p.draft && <a className="ad-icon-btn" href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" aria-label="View post"><Icon name="external" size={16} /></a>}
          </div>
        ))}
        {posts && shown.length === 0 && <p className="ad-muted">No posts match.</p>}
      </section>
    </div>
  )
}
