import { useEffect, useState } from 'react'
import { listPosts } from './api'

const sources = ['whatsapp', 'linkedin', 'x', 'tiktok', 'facebook', 'telegram', 'instagram', 'email']
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '')

export function LinkBuilder() {
  const [slugs, setSlugs] = useState<string[]>([])
  const [path, setPath] = useState('/')
  const [source, setSource] = useState('whatsapp')
  const [campaign, setCampaign] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    listPosts().then(setSlugs).catch(() => {})
  }, [])

  const params = new URLSearchParams({ utm_source: slugify(source) || 'other', utm_medium: 'social' })
  if (campaign.trim()) params.set('utm_campaign', slugify(campaign))
  const link = `${window.location.origin}${path}?${params.toString()}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt('Copy this link', link)
    }
  }

  return (
    <div className="admin-card">
      <h3>Tagged link builder</h3>
      <p className="admin-hint">Tagged links show up in your stats under the name you choose, instead of "direct".</p>
      <label className="admin-field">Page
        <select value={path} onChange={(e) => setPath(e.target.value)}>
          <option value="/">Home page</option>
          <option value="/blog">Blog</option>
          {slugs.map((s) => <option key={s} value={`/blog/${s}`}>{s}</option>)}
        </select>
      </label>
      <label className="admin-field">Where will you share it?
        <input list="utm-sources" value={source} onChange={(e) => setSource(e.target.value)} />
        <datalist id="utm-sources">{sources.map((s) => <option key={s} value={s} />)}</datalist>
      </label>
      <label className="admin-field">Campaign (optional)
        <input value={campaign} onChange={(e) => setCampaign(e.target.value)} placeholder="e.g. hnd-post" />
      </label>
      <code className="link-out">{link}</code>
      <button className="pbtn pbtn-primary" onClick={copy}>{copied ? 'Copied ✓' : 'Copy link'}</button>
    </div>
  )
}
