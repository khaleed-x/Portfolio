import { useEffect, useState } from 'react'

interface Visit { t: number; p: string; c: string; ci: string; device: string; os: string; browser: string; ref: string; src: string }
type Row = [string, number]
interface Stats {
  days: number; total: number; unique: number; truncated: boolean
  pages: Row[]; countries: Row[]; sources: Row[]; devices: Row[]; browsers: Row[]
  daily: { d: string; n: number }[]; recent: Visit[]
}

const SITE = 'https://khalid-oyekunle.vercel.app'
const VERCEL = 'https://vercel.com/khaleed-x/khalid_oyekunle'
const links = [
  ['Vercel Analytics', `${VERCEL}/analytics`],
  ['Speed Insights', `${VERCEL}/speed-insights`],
  ['Server logs (incl. bots)', `${VERCEL}/logs`],
  ['Deployments', `${VERCEL}/deployments`],
  ['Google Search Console', `https://search.google.com/search-console?resource_id=${encodeURIComponent(`${SITE}/`)}`],
  ['What Google has indexed', `https://www.google.com/search?q=site:${SITE.replace('https://', '')}`],
]

function Bars({ title, rows }: { title: string; rows: Row[] }) {
  const max = Math.max(1, ...rows.map((r) => r[1]))
  return (
    <div className="admin-card">
      <h3>{title}</h3>
      {rows.length === 0 && <p className="admin-hint">No data yet</p>}
      {rows.map(([k, n]) => (
        <div className="bar-row" key={k}>
          <span className="bar-label">{k}</span>
          <span className="bar-track"><span className="bar-fill" style={{ width: `${(n / max) * 100}%` }} /></span>
          <span className="bar-n">{n}</span>
        </div>
      ))}
    </div>
  )
}

export function AnalyticsHub() {
  const [days, setDays] = useState(30)
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch(`/api/analytics?days=${days}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? 'Failed to load')
        if (!cancelled) {
          setStats(data as Stats)
          setError('')
        }
      })
      .catch((e: Error) => !cancelled && setError(e.message))
    return () => {
      cancelled = true
    }
  }, [days])

  const dailyMax = Math.max(1, ...(stats?.daily.map((d) => d.n) ?? [1]))

  return (
    <div>
      <div className="admin-row">
        {[7, 30, 90].map((d) => (
          <button key={d} className={`pbtn ${days === d ? 'pbtn-primary' : 'pbtn-ghost'}`} onClick={() => setDays(d)}>{d} days</button>
        ))}
      </div>

      {error && (
        <p className="admin-error">
          {error === 'Redis is not configured' ? 'The visit log database is not connected yet. See docs/analytics-setup.md.' : error}
        </p>
      )}

      {stats && (
        <>
          <div className="stat-row">
            <div className="admin-card"><div className="stat-big">{stats.total}</div><div className="admin-hint">Page views</div></div>
            <div className="admin-card"><div className="stat-big">{stats.unique}</div><div className="admin-hint">Daily visitors*</div></div>
          </div>
          <p className="admin-hint">*Visitor codes reset daily, so someone returning on another day counts again.{stats.truncated && ' Showing the latest 5,000 visits only.'}</p>

          <div className="admin-card">
            <h3>Views per day</h3>
            <div className="daily">
              {stats.daily.map((d) => (
                <span key={d.d} className="daily-bar" title={`${d.d}: ${d.n}`} style={{ height: `${Math.max(3, (d.n / dailyMax) * 100)}%` }} />
              ))}
            </div>
          </div>

          <Bars title="Top pages" rows={stats.pages} />
          <Bars title="Where visitors come from" rows={stats.sources} />
          <Bars title="Countries" rows={stats.countries} />
          <Bars title="Devices" rows={stats.devices} />
          <Bars title="Browsers" rows={stats.browsers} />

          <div className="admin-card">
            <h3>Recent visits</h3>
            {stats.recent.length === 0 && <p className="admin-hint">No visits recorded yet. Open the site in a private window to test.</p>}
            {stats.recent.map((v, i) => (
              <div className="visit" key={`${v.t}-${i}`}>
                <strong>{v.p}</strong>
                <span>{[v.ci, v.c].filter(Boolean).join(', ') || 'Unknown location'}</span>
                <span>{v.device} · {v.os} · {v.browser}</span>
                <span className="admin-hint">{new Date(v.t).toLocaleString()} · {v.src || v.ref || 'direct'}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="admin-card">
        <h3>Quick links</h3>
        {links.map(([name, href]) => (
          <a key={name} className="admin-post" href={href} target="_blank" rel="noreferrer">{name} ↗</a>
        ))}
      </div>
    </div>
  )
}
