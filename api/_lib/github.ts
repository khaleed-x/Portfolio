// Minimal GitHub helpers. The token is a fine-grained PAT limited to one repo (Contents: read/write).
const API = 'https://api.github.com'
const repo = () => process.env.GITHUB_REPO ?? ''
const branch = () => process.env.GITHUB_BRANCH || 'main'

const gh = (path: string, init: RequestInit = {}) =>
  fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-admin',
      ...(init.headers ?? {}),
    },
  })

async function ok<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${(await res.text()).slice(0, 200)}`)
  return res.json() as Promise<T>
}

export interface CommitFile {
  path: string
  content: string
  encoding: 'utf-8' | 'base64'
}

/** Writes several files in ONE commit, so only one deployment is triggered. */
export async function commitFiles(files: CommitFile[], message: string): Promise<string> {
  const ref = await ok<{ object: { sha: string } }>(await gh(`/repos/${repo()}/git/ref/heads/${branch()}`))
  const base = await ok<{ tree: { sha: string } }>(await gh(`/repos/${repo()}/git/commits/${ref.object.sha}`))
  const entries: { path: string; mode: string; type: string; sha: string }[] = []
  for (const f of files) {
    const blob = await ok<{ sha: string }>(
      await gh(`/repos/${repo()}/git/blobs`, { method: 'POST', body: JSON.stringify({ content: f.content, encoding: f.encoding }) }),
    )
    entries.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha })
  }
  const tree = await ok<{ sha: string }>(
    await gh(`/repos/${repo()}/git/trees`, { method: 'POST', body: JSON.stringify({ base_tree: base.tree.sha, tree: entries }) }),
  )
  const commit = await ok<{ sha: string }>(
    await gh(`/repos/${repo()}/git/commits`, { method: 'POST', body: JSON.stringify({ message, tree: tree.sha, parents: [ref.object.sha] }) }),
  )
  await ok(await gh(`/repos/${repo()}/git/refs/heads/${branch()}`, { method: 'PATCH', body: JSON.stringify({ sha: commit.sha }) }))
  return commit.sha
}

export async function readFile(path: string): Promise<string | null> {
  const res = await gh(`/repos/${repo()}/contents/${path}?ref=${branch()}`)
  if (res.status === 404) return null
  const data = await ok<{ content: string }>(res)
  return Buffer.from(data.content, 'base64').toString('utf-8')
}

export async function listDir(path: string): Promise<string[]> {
  const res = await gh(`/repos/${repo()}/contents/${path}?ref=${branch()}`)
  if (res.status === 404) return []
  return (await ok<{ name: string }[]>(res)).map((f) => f.name)
}

/** Maps the latest GitHub deployment status (created by Vercel's GitHub integration) for a commit. */
export async function deployState(sha: string): Promise<'building' | 'live' | 'failed'> {
  const deployments = await ok<{ id: number }[]>(await gh(`/repos/${repo()}/deployments?sha=${sha}`))
  if (deployments.length === 0) return 'building'
  const statuses = await ok<{ state: string }[]>(await gh(`/repos/${repo()}/deployments/${deployments[0].id}/statuses`))
  const state = statuses[0]?.state
  if (state === 'success') return 'live'
  if (state === 'failure' || state === 'error') return 'failed'
  return 'building'
}

/** True if the token can see the configured repository. */
export async function repoReachable(): Promise<boolean> {
  try {
    return (await gh(`/repos/${repo()}`)).ok
  } catch {
    return false
  }
}
