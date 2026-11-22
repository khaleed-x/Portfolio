import { useState } from 'react'
import { AreaChart, BarList, Donut } from './charts'
import { change, countryName, flag, nf, timeAgo } from './format'
import { useStats } from './hooks'

export function AnalyticsHub() {
  const [days, setDays] = useState(30)
  const { stats, error, loading } = useStats(days)

  return (
    <div className="ad-stack">
      <div className="ad-chips big">
        {[7, 30, 90].map((d) => <button key={d} className={days === d ? 'on' : ''} onClick={() => setDays(d)}>Last {d} days</button>)}
      </div>

      {error && <div className="ad-alert"><b>Could not load analytics.</b> {error === 'Redis is not configured' ? 'The visit log database is not connected. Open the System page.' : error}</div>}

      {stats && (
        <>
          <div className="ad-kpis three">
            <div className="ad-card ad-kpi"><span className="ad-label">Page views</span><strong>{nf.format(stats.total)}</strong><span className={`ad-delta ${change(stats.total, stats.prev.total).dir}`}>{change(stats.total, stats.prev.total).text} <em>vs previous</em></span></div>
            <div className="ad-card ad-kpi"><span className="ad-label">Daily visitors</span><strong>{nf.format(stats.unique)}</strong><span className="ad-muted">Resets each day</span></div>
            <div className="ad-card ad-kpi"><span className="ad-label">Views per day</span><strong>{(stats.total / Math.max(1, days)).toFixed(1)}</strong><span className="ad-muted">average</span></div>
          </div>

          <section className={`ad-card ${loading ? 'ad-dim' : ''}`}>
            <div className="ad-card-head"><h3>Views over time</h3></div>
            <AreaChart points={stats.daily.map((d) => d.n)} labels={stats.daily.map((d) => d.d.slice(5))} />
          </section>

          <div className="ad-split even">
            <section className="ad-card"><div className="ad-card-head"><h3>Top pages</h3></div><BarList rows={stats.pages} /></section>
            <section className="ad-card"><div className="ad-card-head"><h3>Traffic sources</h3></div><BarList rows={stats.sources} /></section>
            <section className="ad-card"><div className="ad-card-head"><h3>Countries</h3></div><BarList rows={stats.countries} label={(c) => `${flag(c)} ${countryName(c)}`} /></section>
            <section className="ad-card"><div className="ad-card-head"><h3>Devices</h3></div><Donut rows={stats.devices} /></section>
            <section className="ad-card"><div className="ad-card-head"><h3>Browsers</h3></div><BarList rows={stats.browsers} /></section>
          </div>

          <section className="ad-card">
            <div className="ad-card-head"><h3>Recent visits</h3></div>
            {stats.recent.length === 0 && <p className="ad-muted">No visits recorded yet.</p>}
            <div className="ad-table">
              {stats.recent.map((v, i) => (
                <div className="ad-tr" key={`${v.t}-${i}`}>
                  <span className="ad-td page"><b>{v.p}</b></span>
                  <span className="ad-td">{flag(v.c)} {[v.ci, countryName(v.c)].filter(Boolean).join(', ')}</span>
                  <span className="ad-td">{v.device} · {v.os} · {v.browser}</span>
                  <span className="ad-td">{v.src || v.ref || 'direct'}</span>
                  <time className="ad-td">{timeAgo(v.t)}</time>
                </div>
              ))}
            </div>
            {stats.truncated && <p className="ad-muted">Showing the latest 5,000 visits only.</p>}
          </section>
        </>
      )}
    </div>
  )
}
