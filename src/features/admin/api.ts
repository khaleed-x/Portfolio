export type DeployState = 'building' | 'live' | 'failed'

async function fail(res: Response): Promise<never> {
  const data = (await res.json().catch(() => null)) as { error?: string } | null
  throw new Error(data?.error ?? `Request failed (${res.status})`)
}

export async function getMe(): Promise<{ login: string } | null> {
  const res = await fetch('/api/auth/me')
  return res.ok ? res.json() : null
}

export const logout = () => fetch('/api/auth/logout', { method: 'POST' })

export async function listPosts(): Promise<string[]> {
  const res = await fetch('/api/posts')
  if (!res.ok) return fail(res)
  return ((await res.json()) as { slugs: string[] }).slugs
}

export async function loadPost(slug: string): Promise<string> {
  const res = await fetch(`/api/posts?slug=${encodeURIComponent(slug)}`)
  if (!res.ok) return fail(res)
  return ((await res.json()) as { markdown: string }).markdown
}

export interface PublishInput {
  slug: string
  markdown: string
  update: boolean
  images: { path: string; base64: string }[]
}

export async function publishPost(input: PublishInput): Promise<{ sha: string }> {
  const res = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) return fail(res)
  return res.json()
}

export async function getDeployState(sha: string): Promise<DeployState> {
  const res = await fetch(`/api/deploy-status?sha=${sha}`)
  if (!res.ok) return fail(res)
  return ((await res.json()) as { state: DeployState }).state
}
