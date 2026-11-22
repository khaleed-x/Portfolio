import { useState } from 'react'
import { AreaChart, Donut } from './charts'
import { change, countryName, flag, greeting, nf, timeAgo } from './format'
import { useHealth, usePostMeta, useStats } from './hooks'
import type { Tab } from './Shell'

function Kpi({ label, value, delta, sub }: { label: string; value: string; delta?: { text: string; dir: string }; sub?: string }) {
  return (
    <div className="ad-card ad-kpi">
      <span className="ad-label">{label}</span>
      <strong>{value}</strong>
      {delta ? <span className={`ad-delta ${delta.dir}`}>{delta.dir === 'up' ? '▲' : delta.dir === 'down' ? '▼' : '•'} {delta.text} <em>vs previous</em></span> : <span className="ad-muted">{sub}</span>}
    </div>
  )
}

export function Overview({ user, onTab, onEdit }: { user: string; onTab: (t: Tab) => void; onEdit: (slug: string) => void }) {
  const [days, setDays] = useState(7)
  const { stats, error, loading } = useStats(days)
  const { posts } = usePostMeta()
  const { checks } = useHealth()
  const redisDown = checks?.find((c) => c.key === 'redis' && !c.ok)

  return (
    <div className="ad-stack">
      <div className="ad-hello">
        <h2>{greeting()}, {user} 👋</h2>
        <p>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
      </div>

      {(redisDown || error) && (
        <div className="ad-alert">
          <b>Visit log is offline.</b> {redisDown?.hint ?? error}
          <button onClick={() => onTab('system')}>Open System</button>
        </div>
      )}

      <div className="ad-kpis">
        <Kpi label="Page views" value={stats ? nf.format(stats.total) : '—'} delta={stats ? change(stats.total, stats.prev.total) : undefined} />
        <Kpi label="Visitors" value={stats ? nf.format(stats.unique) : '—'} delta={stats ? change(stats.unique, stats.prev.unique) : undefined} />
        <Kpi label="Top page" value={stats?.pages[0]?.[0] ?? '—'} sub={stats?.pages[0] ? `${nf.format(stats.pages[0][1])} views` : 'No data yet'} />
        <Kpi label="Top country" value={stats?.countries[0] ? `${flag(stats.countries[0][0])} ${countryName(stats.countries[0][0])}` : '—'} sub={stats?.countries[0] ? `${nf.format(stats.countries[0][1])} views` : 'No data yet'} />
      </div>

      <div className="ad-split">
        <section className="ad-card">
          <div className="ad-card-head">
            <h3>Views</h3>
            <div className="ad-chips">
              {[7, 30].map((d) => <button key={d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>{d}d</button>)}
            </div>
          </div>
          {stats ? <AreaChart points={stats.daily.map((d) => d.n)} labels={stats.daily.map((d) => d.d.slice(5))} /> : <div className={`ad-skel ${loading ? '' : 'still'}`} />}
        </section>
        <section className="ad-card">
          <div className="ad-card-head"><h3>Where from</h3></div>
          <Donut rows={stats?.sources.slice(0, 5) ?? []} />
        </section>
      </div>

      <div className="ad-split even">
        <section className="ad-card">
          <div className="ad-card-head">
            <h3>Latest posts</h3>
            <button className="ad-link" onClick={() => onTab('posts')}>All posts</button>
          </div>
          {!posts && <div className="ad-skel short" />}
          {posts?.slice(0, 4).map((p) => (
            <button key={p.slug} className="ad-row" onClick={() => onEdit(p.slug)}>
              <span><b>{p.title}</b><small>/blog/{p.slug}</small></span>
              <span className={`ad-pill ${p.draft ? 'draft' : 'live'}`}>{p.draft ? 'Draft' : 'Published'}</span>
            </button>
          ))}
        </section>
        <section className="ad-card">
          <div className="ad-card-head">
            <h3>Recent activity</h3>
            <button className="ad-link" onClick={() => onTab('analytics')}>Analytics</button>
          </div>
          {stats && stats.recent.length === 0 && <p className="ad-muted">No visits yet. Open the site in a private window to test.</p>}
          {stats?.recent.slice(0, 6).map((v, i) => (
            <div key={`${v.t}-${i}`} className="ad-feed">
              <span className="ad-flag">{flag(v.c)}</span>
              <span><b>{v.p}</b><small>{[v.ci, countryName(v.c)].filter(Boolean).join(', ')} · {v.device}</small></span>
              <time>{timeAgo(v.t)}</time>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
