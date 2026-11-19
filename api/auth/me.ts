import { json, requireAdmin } from '../_lib/session.js'

export async function GET(req: Request) {
  const login = await requireAdmin(req)
  return login ? json({ login }) : json({ error: 'Unauthorised' }, 401)
}
