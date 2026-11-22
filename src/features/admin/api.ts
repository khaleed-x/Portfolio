export type DeployState = 'building' | 'live' | 'failed'
export type Row = [string, number]

export interface Visit {
  t: number
  p: string
  c: string
  ci: string
  device: string
  os: string
  browser: string
  ref: string
  src: string
}

export interface Stats {
  days: number
  total: number
  unique: number
  truncated: boolean
  prev: { total: number; unique: number }
  pages: Row[]
  countries: Row[]
  sources: Row[]
  devices: Row[]
  browsers: Row[]
  daily: { d: string; n: number }[]
  recent: Visit[]
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  draft: boolean
  summary: string
}

export interface Check {
  key: string
  label: string
  ok: boolean
  hint: string
}

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

export async function listPostMeta(): Promise<PostMeta[]> {
  const res = await fetch('/api/posts?list=1')
  if (!res.ok) return fail(res)
  return ((await res.json()) as { posts: PostMeta[] }).posts
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

export async function getStats(days: number): Promise<Stats> {
  const res = await fetch(`/api/analytics?days=${days}`)
  if (!res.ok) return fail(res)
  return res.json()
}

export async function getHealth(): Promise<Check[]> {
  const res = await fetch('/api/health')
  if (!res.ok) return fail(res)
  return ((await res.json()) as { checks: Check[] }).checks
}
