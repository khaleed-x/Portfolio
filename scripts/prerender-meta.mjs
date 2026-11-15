// Post-build step: writes per-page HTML with Open Graph / Twitter tags so link
// previews (WhatsApp, X, LinkedIn, Slack...) work. Crawlers do not run JavaScript,
// so these tags must exist in the static HTML. The SPA still boots normally.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const SITE_URL = (process.env.SITE_URL || 'https://khalid-oyekunle.vercel.app').replace(/\/$/, '')
const SITE_NAME = 'Khalid Oyekunle'
const DEFAULT_IMAGE = '/og-default.png'
const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const abs = (p) => (/^https?:\/\//.test(p) ? p : `${SITE_URL}${p.startsWith('/') ? '' : '/'}${p}`)

function frontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const data = {}
  if (!m) return data
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i === -1) continue
    const v = line.slice(i + 1).trim()
    data[line.slice(0, i).trim()] = v.replace(/^["']|["']$/g, '')
  }
  return data
}

function page({ title, description, path, image, type = 'website', published }) {
  const url = abs(path)
  const img = abs(image || DEFAULT_IMAGE)
  const tags = [
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    published ? `<meta property="article:published_time" content="${esc(published)}" />` : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ].filter(Boolean).join('\n    ')

  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description"[^>]*>\s*/, '')
    .replace('</head>', `    ${tags}\n  </head>`)
}

function write(path, html) {
  const dir = join(dist, path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

const siteDescription = 'Lead Backend Engineer at Hosté. C#, .NET, modular monoliths and distributed systems.'
const urls = ['/']

// Home (overwrites dist/index.html with default tags)
writeFileSync(join(dist, 'index.html'), page({ title: SITE_NAME, description: siteDescription, path: '/' }))

// Blog index
write('blog', page({ title: `Blog · ${SITE_NAME}`, description: 'Notes and writing on backend engineering, architecture and .NET.', path: '/blog' }))
urls.push('/blog')

// Posts
const dir = 'src/content/posts'
for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const data = frontmatter(readFileSync(join(dir, file), 'utf8'))
  if (data.draft === 'true') continue
  const slug = file.replace(/\.md$/, '')
  write(`blog/${slug}`, page({
    title: `${data.title || slug} · ${SITE_NAME}`,
    description: data.summary || siteDescription,
    path: `/blog/${slug}`,
    image: data.image,
    type: 'article',
    published: data.date,
  }))
  urls.push(`/blog/${slug}`)
}

writeFileSync(join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${abs(u)}</loc></url>`).join('\n')}\n</urlset>\n`)
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`)
console.log(`prerender-meta: ${urls.length} pages, site ${SITE_URL}`)
