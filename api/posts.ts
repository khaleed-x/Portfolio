import { commitFiles, listDir, readFile, type CommitFile } from './_lib/github.js'
import { json, requireAdmin } from './_lib/session.js'

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const POSTS_DIR = 'src/content/posts'

interface PublishBody {
  slug: string
  markdown: string
  update: boolean
  images: { path: string; base64: string }[]
}

export async function GET(req: Request) {
  if (!(await requireAdmin(req))) return json({ error: 'Unauthorised' }, 401)
  const params = new URL(req.url).searchParams
  if (params.get('list')) {
    const names = (await listDir(POSTS_DIR)).filter((n) => n.endsWith('.md'))
    const posts = await Promise.all(
      names.map(async (n) => {
        const slug = n.replace(/\.md$/, '')
        const md = (await readFile(`${POSTS_DIR}/${slug}.md`)) ?? ''
        const fm = md.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
        const get = (k: string) => fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '') ?? ''
        return { slug, title: get('title') || slug, date: get('date'), draft: get('draft') === 'true', summary: get('summary') }
      }),
    )
    posts.sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0))
    return json({ posts })
  }
  const slug = params.get('slug')
  if (slug) {
    if (!SLUG.test(slug)) return json({ error: 'Bad slug' }, 400)
    const markdown = await readFile(`${POSTS_DIR}/${slug}.md`)
    return markdown === null ? json({ error: 'Not found' }, 404) : json({ markdown })
  }
  const names = await listDir(POSTS_DIR)
  return json({ slugs: names.filter((n) => n.endsWith('.md')).map((n) => n.replace(/\.md$/, '')) })
}

export async function POST(req: Request) {
  if (!(await requireAdmin(req))) return json({ error: 'Unauthorised' }, 401)

  let body: PublishBody
  try {
    body = (await req.json()) as PublishBody
  } catch {
    return json({ error: 'Invalid request' }, 400)
  }
  const { slug, markdown, update, images = [] } = body

  // Server-side guard rails: only these paths may ever be written.
  if (!SLUG.test(slug) || slug.length > 80) return json({ error: 'Invalid slug' }, 400)
  if (typeof markdown !== 'string' || markdown.length < 20 || markdown.length > 200_000) return json({ error: 'Invalid post body' }, 400)
  if (images.length > 8) return json({ error: 'Too many images (max 8)' }, 400)
  const imageRe = new RegExp(`^public/posts/${slug}/[a-z0-9-]+\\.jpg$`)
  for (const img of images) {
    if (!imageRe.test(img.path)) return json({ error: 'Invalid image path' }, 400)
    if (typeof img.base64 !== 'string' || img.base64.length > 700_000) return json({ error: 'Image too large' }, 400)
  }

  const path = `${POSTS_DIR}/${slug}.md`
  const exists = (await readFile(path)) !== null
  if (exists && !update) return json({ error: 'A post with this slug already exists' }, 409)

  const files: CommitFile[] = [
    { path, content: markdown, encoding: 'utf-8' },
    ...images.map((i) => ({ path: i.path, content: i.base64, encoding: 'base64' as const })),
  ]
  try {
    const sha = await commitFiles(files, `${exists ? 'Update' : 'Add'} post: ${slug}`)
    return json({ sha, slug })
  } catch (e) {
    return json({ error: (e as Error).message }, 502)
  }
}
