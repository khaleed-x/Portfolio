/** Minimal frontmatter parser (browser-safe, no Buffer). Supports strings, booleans and [a, b] lists. */
export function parseFrontmatter(raw: string): { data: Record<string, string | boolean | string[]>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, body: raw }

  const data: Record<string, string | boolean | string[]> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean)
    } else if (value === 'true' || value === 'false') {
      data[key] = value === 'true'
    } else {
      data[key] = value.replace(/^["']|["']$/g, '')
    }
  }
  return { data, body: match[2] }
}
