import { cookie, sign } from '../_lib/session.js'

export async function GET() {
  const state = crypto.randomUUID()
  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('client_id', process.env.GITHUB_CLIENT_ID ?? '')
  url.searchParams.set('state', state)
  return new Response(null, {
    status: 302,
    headers: { Location: url.toString(), 'Set-Cookie': cookie('oauth_state', await sign({ state }, 600), 600) },
  })
}
