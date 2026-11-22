import { useState, type PointerEvent } from 'react'
import type { Row } from './api'
import { nf } from './format'

export function AreaChart({ points, labels }: { points: number[]; labels: string[] }) {
  const [hover, setHover] = useState<number | null>(null)
  const W = 600
  const H = 180
  const max = Math.max(1, ...points)
  const n = points.length
  const x = (i: number) => (n > 1 ? (i * W) / (n - 1) : W / 2)
  const y = (v: number) => H - 6 - (v / max) * (H - 24)
  const line = points.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(n - 1)},${H} L${x(0)},${H} Z`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const i = Math.round(((e.clientX - r.left) / r.width) * (n - 1))
    setHover(Math.min(n - 1, Math.max(0, i)))
  }

  return (
    <div className="ad-chart" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="adFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 5" />
        ))}
        <path d={area} fill="url(#adFill)" />
        <path d={line} fill="none" stroke="var(--primary)" strokeWidth="2.2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
      {hover !== null && (
        <>
          <span className="ad-chart-line" style={{ left: `${n > 1 ? (hover / (n - 1)) * 100 : 50}%` }} />
          <span className="ad-chart-tip" style={{ left: `${n > 1 ? (hover / (n - 1)) * 100 : 50}%` }}>
            <b>{nf.format(points[hover])}</b> {labels[hover]}
          </span>
        </>
      )}
      <div className="ad-chart-axis">
        <span>{labels[0]}</span>
        <span>{labels[n - 1]}</span>
      </div>
    </div>
  )
}

const palette = ['var(--primary)', 'var(--gold)', '#6aa3ff', '#4cc9a4', '#a78bfa', '#94a3b8']

export function Donut({ rows }: { rows: Row[] }) {
  const total = rows.reduce((s, r) => s + r[1], 0)
  const C = 2 * Math.PI * 40
  let acc = 0
  return (
    <div className="ad-donut">
      <svg viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border)" strokeWidth="14" />
        {total > 0 &&
          rows.map(([k, v], i) => {
            const len = (v / total) * C
            const el = (
              <circle key={k} cx="50" cy="50" r="40" fill="none" stroke={palette[i % palette.length]} strokeWidth="14" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-acc} transform="rotate(-90 50 50)" />
            )
            acc += len
            return el
          })}
        <text x="50" y="54" textAnchor="middle" className="ad-donut-n">{nf.format(total)}</text>
      </svg>
      <ul className="ad-legend">
        {rows.map(([k, v], i) => (
          <li key={k}>
            <i style={{ background: palette[i % palette.length] }} />
            <span>{k}</span>
            <b>{total ? Math.round((v / total) * 100) : 0}%</b>
          </li>
        ))}
        {rows.length === 0 && <li className="ad-muted">No data yet</li>}
      </ul>
    </div>
  )
}

export function BarList({ rows, label }: { rows: Row[]; label?: (k: string) => string }) {
  const max = Math.max(1, ...rows.map((r) => r[1]))
  if (rows.length === 0) return <p className="ad-muted">No data yet</p>
  return (
    <ul className="ad-bars">
      {rows.map(([k, n]) => (
        <li key={k}>
          <span className="ad-bar-fill" style={{ width: `${(n / max) * 100}%` }} />
          <span className="ad-bar-k">{label ? label(k) : k}</span>
          <b>{nf.format(n)}</b>
        </li>
      ))}
    </ul>
  )
}
