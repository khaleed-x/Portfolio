// Signed-cookie sessions using WebCrypto. Fails closed if SESSION_SECRET is missing.
const enc = new TextEncoder()
const b64u = (bytes: Uint8Array) => Buffer.from(bytes).toString('base64url')

async function hmac(data: string): Promise<string> {
  const secret = process.env.SESSION_SECRET ?? ''
  if (secret.length < 16) throw new Error('SESSION_SECRET is missing or too short')
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return b64u(new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data))))
}

export async function sign(payload: object, ttlSec: number): Promise<string> {
  const body = b64u(enc.encode(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + ttlSec })))
  return `${body}.${await hmac(body)}`
}

export async function verify<T>(token: string | null): Promise<(T & { exp: number }) | null> {
  try {
    if (!token) return null
    const [body, sig] = token.split('.')
    if (!body || !sig) return null
    const expected = await hmac(body)
    if (sig.length !== expected.length) return null
    let diff = 0
    for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i)
    if (diff !== 0) return null
    const data = JSON.parse(Buffer.from(body, 'base64url').toString())
    return data.exp > Date.now() / 1000 ? data : null
  } catch {
    return null
  }
}

export function getCookie(req: Request, name: string): string | null {
  const match = (req.headers.get('cookie') ?? '').split(/;\s*/).find((c) => c.startsWith(`${name}=`))
  return match ? match.slice(name.length + 1) : null
}

export const cookie = (name: string, value: string, maxAge: number) =>
  `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

/** Returns the admin's GitHub login, or null. Only the configured numeric GitHub id is accepted. */
export async function requireAdmin(req: Request): Promise<string | null> {
  const adminId = Number(process.env.ADMIN_GITHUB_ID)
  if (!adminId) return null
  if (req.method !== 'GET') {
    const origin = req.headers.get('origin')
    if (!origin || new URL(origin).host !== new URL(req.url).host) return null // basic CSRF guard
  }
  const session = await verify<{ id: number; login: string }>(getCookie(req, 'admin'))
  return session && session.id === adminId ? session.login : null
}
