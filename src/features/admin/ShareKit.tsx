import { useState } from 'react'

const channels = [
  { name: 'WhatsApp', source: 'whatsapp' },
  { name: 'LinkedIn', source: 'linkedin' },
  { name: 'X', source: 'x' },
  { name: 'TikTok bio', source: 'tiktok' },
]

export function ShareKit({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState('')
  const base = `${window.location.origin}/blog/${slug}`

  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 1800)
    } catch {
      window.prompt('Copy this', text)
    }
  }

  return (
    <div className="admin-card">
      <h3>Share kit</h3>
      <p className="admin-hint">Each link carries a tag, so Vercel Analytics shows where the visit came from.</p>
      {channels.map((c) => {
        const url = `${base}?utm_source=${c.source}&utm_medium=social&utm_campaign=blog`
        return (
          <div className="share-item" key={c.source}>
            <strong>{c.name}</strong>
            <code>{url}</code>
            <div className="share-actions">
              <button className="pbtn pbtn-ghost" onClick={() => copy(c.source, url)}>
                {copied === c.source ? 'Copied ✓' : 'Copy link'}
              </button>
              <button className="pbtn pbtn-ghost" onClick={() => copy(`${c.source}-cap`, `${title}\n${url}`)}>
                {copied === `${c.source}-cap` ? 'Copied ✓' : 'Copy with title'}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
