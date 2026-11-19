import { redis } from './_lib/redis.js'
import { getCookie, verify } from './_lib/session.js'

const RETENTION_DAYS = 90
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse|curl|wget|python-requests/i
const enc = new TextEncoder()
const done = () => new Response(null, { status: 204 })

function parseUA(ua: string) {
  const device = /ipad|tablet/i.test(ua) ? 'tablet' : /mobi|iphone|android/i.test(ua) ? 'mobile' : 'desktop'
  const os = /windows/i.test(ua) ? 'Windows' : /iphone|ipad/i.test(ua) ? 'iOS' : /android/i.test(ua) ? 'Android' : /mac os/i.test(ua) ? 'macOS' : /linux/i.test(ua) ? 'Linux' : 'Other'
  const browser = /edg\//i.test(ua) ? 'Edge' : /opr\/|opera/i.test(ua) ? 'Opera' : /chrome|crios/i.test(ua) ? 'Chrome' : /firefox|fxios/i.test(ua) ? 'Firefox' : /safari/i.test(ua) ? 'Safari' : 'Other'
  return { device, os, browser }
}

/** One-way, daily-rotating visitor id. The raw IP is never stored. */
async function scramble(ip: string, ua: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(process.env.SESSION_SECRET ?? ''), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const day = new Date().toISOString().slice(0, 10)
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(`${day}|${ip}|${ua}`))
  return Buffer.from(new Uint8Array(sig)).toString('hex').slice(0, 12)
}

const safeDecode = (s: string | null) => {
  try {
    return s ? decodeURIComponent(s).slice(0, 60) : ''
  } catch {
    return ''
  }
}

const hostOf = (ref: unknown) => {
  try {
    return typeof ref === 'string' && ref ? new URL(ref).hostname.slice(0, 80) : ''
  } catch {
    return ''
  }
}

export async function POST(req: Request) {
  try {
    const ua = req.headers.get('user-agent') ?? ''
    if (!ua || BOT.test(ua)) return done()
    if (await verify(getCookie(req, 'admin'))) return done() // don't count my own visits

    const body = (await req.json()) as { path?: string; ref?: string; src?: string }
    const path = String(body.path ?? '')
    if (!/^\/[A-Za-z0-9/_\-.]{0,200}$/.test(path) || path.startsWith('/khalid') || path.startsWith('/api')) return done()

    const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
    const v = await scramble(ip, ua)

    // Same visitor + same page within 30 minutes counts once (stops refresh spam, saves quota)
    const fresh = await redis<string | null>('SET', `seen:${v}:${path}`, '1', 'NX', 'EX', 1800)
    if (fresh !== 'OK') return done()

    const ownHost = new URL(req.url).hostname
    const ref = hostOf(body.ref)
    const src = typeof body.src === 'string' && /^[a-z0-9_-]{1,30}$/i.test(body.src) ? body.src.toLowerCase() : ''
    const t = Date.now()
    const entry = {
      t,
      p: path,
      v,
      c: req.headers.get('x-vercel-ip-country') ?? '',
      rg: req.headers.get('x-vercel-ip-country-region') ?? '',
      ci: safeDecode(req.headers.get('x-vercel-ip-city')),
      ...parseUA(ua),
      ref: ref === ownHost ? '' : ref,
      src,
    }
    await redis('ZADD', 'visits', t, JSON.stringify(entry))
    // Auto-delete old entries (run on ~5% of visits to save commands)
    if (Math.random() < 0.05) await redis('ZREMRANGEBYSCORE', 'visits', '-inf', t - RETENTION_DAYS * 86_400_000)
  } catch {
    /* logging must never break the site */
  }
  return done()
}
