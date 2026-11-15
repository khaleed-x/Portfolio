import { useState } from 'react'

/** Native share sheet on phones (WhatsApp, Status, etc.); copies the link elsewhere. */
export function ShareButton({ title, text }: { title: string; text?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link', window.location.href)
    }
  }

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: window.location.href })
        return
      } catch (e) {
        if ((e as Error).name === 'AbortError') return
      }
    }
    await copy()
  }

  return (
    <div className="share-row">
      <button className="pbtn pbtn-primary" onClick={share}>Share ↗</button>
      <button className="pbtn pbtn-ghost" onClick={copy}>{copied ? 'Link copied ✓' : 'Copy link'}</button>
    </div>
  )
}
