import { redis } from './_lib/redis.js'
import { json, requireAdmin } from './_lib/session.js'

interface Visit {
  t: number
  p: string
  v: string
  c: string
  ci: string
  device: string
  os: string
  browser: string
  ref: string
  src: string
}

const tally = (items: string[], limit = 8): [string, number][] => {
  const map = new Map<string, number>()
  for (const i of items) if (i) map.set(i, (map.get(i) ?? 0) + 1)
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit)
}

export async function GET(req: Request) {
  if (!(await requireAdmin(req))) return json({ error: 'Unauthorised' }, 401)
  const days = Math.min(90, Math.max(1, Number(new URL(req.url).searchParams.get('days')) || 30))
  try {
    const since = Date.now() - days * 86_400_000
    const raw = await redis<string[]>('ZRANGEBYSCORE', 'visits', since, '+inf', 'LIMIT', 0, 5000)
    const visits = raw.map((s) => JSON.parse(s) as Visit)

    const perDay = new Map<string, number>()
    for (let i = days - 1; i >= 0; i--) perDay.set(new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10), 0)
    for (const v of visits) {
      const d = new Date(v.t).toISOString().slice(0, 10)
      if (perDay.has(d)) perDay.set(d, (perDay.get(d) ?? 0) + 1)
    }

    return json({
      days,
      total: visits.length,
      unique: new Set(visits.map((v) => v.v)).size,
      truncated: raw.length >= 5000,
      pages: tally(visits.map((v) => v.p)),
      countries: tally(visits.map((v) => v.c)),
      sources: tally(visits.map((v) => v.src || v.ref || 'direct')),
      devices: tally(visits.map((v) => v.device)),
      browsers: tally(visits.map((v) => v.browser)),
      daily: [...perDay.entries()].map(([d, n]) => ({ d, n })),
      recent: visits.slice(-50).reverse(),
    })
  } catch (e) {
    return json({ error: (e as Error).message }, 500)
  }
}
