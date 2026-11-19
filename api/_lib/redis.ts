// Tiny Upstash Redis REST client (no dependency). Works with the Vercel Marketplace integration.
export async function redis<T = unknown>(...cmd: (string | number)[]): Promise<T> {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) throw new Error('Redis is not configured')
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  })
  const data = (await res.json()) as { result?: T; error?: string }
  if (!res.ok || data.error) throw new Error(data.error ?? `Redis ${res.status}`)
  return data.result as T
}
