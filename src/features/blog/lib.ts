import { parseFrontmatter } from '@/shared/lib/frontmatter'

export interface Post {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  draft: boolean
  image?: string
  body: string
  readingMinutes: number
}

const files = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function toPost(path: string, raw: string): Post {
  const { data, body } = parseFrontmatter(raw)
  const slug = path.split('/').pop()!.replace(/\.md$/, '')
  const words = body.trim().split(/\s+/).length
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    summary: String(data.summary ?? ''),
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true,
    image: typeof data.image === 'string' ? data.image : undefined,
    body,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  }
}

/** Drafts are visible in dev only. Newest first. */
export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((p) => !p.draft || import.meta.env.DEV)
 .sort((a, b) => time(b.date) - time(a.date) || b.slug.localeCompare(a.slug))


export const getPost = (slug: string) => posts.find((p) => p.slug === slug)

export const formatDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
