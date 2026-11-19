import { cookie, getCookie, sign, verify } from '../_lib/session.js'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const saved = await verify<{ state: string }>(getCookie(req, 'oauth_state'))
  if (!code || !state || !saved || saved.state !== state) return new Response('Invalid login state', { status: 400 })

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code }),
  })
  const { access_token } = (await tokenRes.json()) as { access_token?: string }
  if (!access_token) return new Response('GitHub login failed', { status: 401 })

  const user = (await (
    await fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${access_token}`, 'User-Agent': 'portfolio-admin' } })
  ).json()) as { id?: number; login?: string }
  if (!user.id || user.id !== Number(process.env.ADMIN_GITHUB_ID)) return new Response('Not authorised', { status: 403 })

  const week = 7 * 24 * 3600
  const headers = new Headers({ Location: '/khalid/admin' })
  headers.append('Set-Cookie', cookie('admin', await sign({ id: user.id, login: user.login }, week), week))
  headers.append('Set-Cookie', cookie('oauth_state', '', 0))
  return new Response(null, { status: 302, headers })
}
