import { useEffect, useState } from 'react'
import { getMe, logout } from './api'
import { AnalyticsHub } from './AnalyticsHub'
import { Icon } from './icons'
import { LinkBuilder } from './LinkBuilder'
import { Overview } from './Overview'
import { PostEditor } from './PostEditor'
import { PostsPage } from './PostsPage'
import { QuickLinks } from './QuickLinks'
import { Shell, type Tab } from './Shell'
import { SystemPage } from './SystemPage'

const titles: Record<Tab, [string, string]> = {
  overview: ['Overview', 'How your site is doing'],
  posts: ['Posts', 'Write, edit and publish'],
  analytics: ['Analytics', 'Who is reading what'],
  links: ['Links', 'Share and track'],
  system: ['System', 'Connections and health'],
}

const fromHash = (): Tab => {
  const h = window.location.hash.slice(1) as Tab
  return h in titles ? h : 'overview'
}

type Editing = { slug: string | null } | null

export function AdminPage() {
  const [user, setUser] = useState<string | null | undefined>(undefined)
  const [tab, setTab] = useState<Tab>(fromHash)
  const [editing, setEditing] = useState<Editing>(null)

  // Keep this page out of search results
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      meta.remove()
    }
  }, [])

  useEffect(() => {
    getMe().then((me) => setUser(me?.login ?? null)).catch(() => setUser(null))
  }, [])

  const go = (t: Tab) => {
    setEditing(null)
    setTab(t)
    window.history.replaceState(null, '', `#${t}`)
  }

  if (user === undefined) return <div className="ad-gate"><p className="ad-muted">Checking sign-in…</p></div>

  if (!user) {
    return (
      <div className="ad-gate">
        <div className="ad-login">
          <div className="ad-brand"><span className="ad-dot" />khaleed.x<em>Admin</em></div>
          <h1>Welcome back</h1>
          <p className="ad-muted">Sign in with the GitHub account that owns this site.</p>
          <a className="pbtn pbtn-primary" href="/api/auth/login">Continue with GitHub</a>
        </div>
      </div>
    )
  }

  const newPost = (
    <button className="pbtn pbtn-primary ad-new" onClick={() => setEditing({ slug: null })}>
      <Icon name="plus" size={18} /><span>New post</span>
    </button>
  )

  const [title, subtitle] = editing ? [editing.slug ? 'Edit post' : 'New post', 'Changes go live after a short deploy'] : titles[tab]

  return (
    <Shell
      tab={editing ? 'posts' : tab}
      onTab={go}
      user={user}
      onLogout={async () => {
        await logout()
        setUser(null)
      }}
      title={title}
      subtitle={subtitle}
      actions={!editing && (tab === 'overview' || tab === 'posts') ? newPost : undefined}
    >
      {editing ? (
        <PostEditor key={editing.slug ?? 'new'} editSlug={editing.slug} onDone={() => setEditing(null)} />
      ) : tab === 'overview' ? (
        <Overview user={user} onTab={go} onEdit={(slug) => setEditing({ slug })} />
      ) : tab === 'posts' ? (
        <PostsPage onEdit={(slug) => setEditing({ slug })} />
      ) : tab === 'analytics' ? (
        <AnalyticsHub />
      ) : tab === 'links' ? (
        <div className="ad-stack">
          <LinkBuilder />
          <QuickLinks />
        </div>
      ) : (
        <SystemPage />
      )}
    </Shell>
  )
}
