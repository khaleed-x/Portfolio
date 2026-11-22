import { repoReachable } from './_lib/github.js'
import { redis } from './_lib/redis.js'
import { json, requireAdmin } from './_lib/session.js'

const has = (k: string) => Boolean(process.env[k])

export async function GET(req: Request) {
  if (!(await requireAdmin(req))) return json({ error: 'Unauthorised' }, 401)

  const loginOk = has('GITHUB_CLIENT_ID') && has('GITHUB_CLIENT_SECRET') && has('ADMIN_GITHUB_ID') && (process.env.SESSION_SECRET ?? '').length >= 16
  const githubEnv = has('GITHUB_TOKEN') && has('GITHUB_REPO')
  const githubOk = githubEnv && (await repoReachable())

  const redisEnv = Boolean((process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL) && (process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN))
  let redisOk = false
  let redisHint = 'In Vercel open Storage, create an Upstash Redis database, connect it to this project, then redeploy.'
  if (redisEnv) {
    try {
      redisOk = (await redis<string>('PING')) === 'PONG'
      if (!redisOk) redisHint = 'Redis answered, but not as expected. Check the database in Upstash.'
    } catch (e) {
      redisHint = `Redis is connected in settings but the check failed: ${(e as Error).message}`
    }
  }

  return json({
    checks: [
      { key: 'login', label: 'GitHub login', ok: loginOk, hint: 'Set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, ADMIN_GITHUB_ID and a SESSION_SECRET of 16+ characters in Vercel.' },
      { key: 'github', label: 'Post publishing (GitHub token)', ok: githubOk, hint: githubEnv ? 'The token cannot reach the repository. Check GITHUB_REPO and that the token has Contents: read and write.' : 'Set GITHUB_TOKEN and GITHUB_REPO in Vercel.' },
      { key: 'redis', label: 'Visit log database (Redis)', ok: redisOk, hint: redisHint },
    ],
  })
}
