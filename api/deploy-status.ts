import { deployState } from './_lib/github.js'
import { json, requireAdmin } from './_lib/session.js'

export async function GET(req: Request) {
  if (!(await requireAdmin(req))) return json({ error: 'Unauthorised' }, 401)
  const sha = new URL(req.url).searchParams.get('sha') ?? ''
  if (!/^[0-9a-f]{40}$/.test(sha)) return json({ error: 'Bad sha' }, 400)
  try {
    return json({ state: await deployState(sha) })
  } catch (e) {
    return json({ error: (e as Error).message }, 502)
  }
}
