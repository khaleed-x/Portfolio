import { useEffect, useState } from 'react'
import { SectionHeader } from '@/shared/ui/SectionHeader'
import { getMe, listPosts, logout } from './api'
import { AnalyticsHub } from './AnalyticsHub'
import { LinkBuilder } from './LinkBuilder'
import { PostEditor } from './PostEditor'

type Tab = 'posts' | 'analytics' | 'links'
type View = { name: 'home' } | { name: 'editor'; slug: string | null }

export function AdminPage() {
  const [user, setUser] = useState<string | null | undefined>(undefined)
  const [tab, setTab] = useState<Tab>('posts')
  const [view, setView] = useState<View>({ name: 'home' })
  const [slugs, setSlugs] = useState<string[]>([])
  const [error, setError] = useState('')

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

  useEffect(() => {
    if (user && tab === 'posts' && view.name === 'home') {
      listPosts().then(setSlugs).catch((e: Error) => setError(e.message))
    }
  }, [user, tab, view])

  if (user === undefined) return <section className="section page-top"><p className="admin-hint">Checking sign-in…</p></section>

  if (!user) {
    return (
      <section className="section page-top admin">
        <SectionHeader eyebrow="// Admin" title="Private" emphasis="area" />
        <a className="pbtn pbtn-primary" href="/api/auth/login">Sign in with GitHub</a>
      </section>
    )
  }

  const tabs: [Tab, string][] = [['posts', 'Posts'], ['analytics', 'Analytics'], ['links', 'Links']]

  return (
    <section className="section page-top admin">
      <SectionHeader eyebrow={`// Signed in as ${user}`} title="Admin" emphasis="panel" />

      {view.name === 'editor' ? (
        <PostEditor editSlug={view.slug} onDone={() => setView({ name: 'home' })} />
      ) : (
        <>
          <div className="admin-tabs">
            {tabs.map(([key, name]) => (
              <button key={key} className={`admin-tab ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>{name}</button>
            ))}
            <button
              className="admin-tab"
              onClick={async () => {
                await logout()
                setUser(null)
              }}
            >
              Sign out
            </button>
          </div>

          {tab === 'posts' && (
            <>
              <button className="pbtn pbtn-primary" onClick={() => setView({ name: 'editor', slug: null })}>+ New post</button>
              <div className="admin-card">
                <h3>Posts</h3>
                {error && <p className="admin-error">{error}</p>}
                {slugs.map((s) => (
                  <button key={s} className="admin-post" onClick={() => setView({ name: 'editor', slug: s })}>{s}</button>
                ))}
              </div>
            </>
          )}
          {tab === 'analytics' && <AnalyticsHub />}
          {tab === 'links' && <LinkBuilder />}
        </>
      )}
    </section>
  )
}
