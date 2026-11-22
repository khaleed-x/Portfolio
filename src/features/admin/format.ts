export const nf = new Intl.NumberFormat('en')

export const flag = (code: string) =>
  code.length === 2 ? String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0))) : '🌐'

const names = typeof Intl.DisplayNames === 'function' ? new Intl.DisplayNames(['en'], { type: 'region' }) : null
export const countryName = (code: string) => {
  if (!code) return 'Unknown'
  try {
    return names?.of(code.toUpperCase()) ?? code
  } catch {
    return code
  }
}

export function timeAgo(t: number) {
  const s = Math.max(1, Math.round((Date.now() - t) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.round(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.round(h / 24)}d ago`
}

export function change(cur: number, prev: number): { text: string; dir: 'up' | 'down' | 'flat' } {
  if (prev === 0) return cur === 0 ? { text: '—', dir: 'flat' } : { text: 'new', dir: 'up' }
  const pct = Math.round(((cur - prev) / prev) * 100)
  return { text: `${Math.abs(pct)}%`, dir: pct > 0 ? 'up' : pct < 0 ? 'down' : 'flat' }
}

export const greeting = () => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
}
