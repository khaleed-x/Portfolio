import { useEffect, useRef } from 'react'
import { useTheme } from '@/app/theme-context'

const env = import.meta.env
const configured = Boolean(env.GISCUS_REPO && env.GISCUS_REPO_ID && env.GISCUS_CATEGORY && env.GISCUS_CATEGORY_ID)

/** Giscus comments backed by GitHub Discussions. Renders nothing until configured via env vars. */
export function Comments({ term }: { term: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const themeRef = useRef<string>('dark')
  const { theme } = useTheme()

  // Keep the giscus iframe in sync with the site theme
  useEffect(() => {
    themeRef.current = theme
    hostRef.current
      ?.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
      ?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
  }, [theme])

  // Load the widget when the section nears the viewport (saves data on mobile)
  useEffect(() => {
    const host = hostRef.current
    if (!configured || !host) return

    const load = () => {
      const s = document.createElement('script')
      s.src = 'https://giscus.app/client.js'
      s.async = true
      s.crossOrigin = 'anonymous'
      const attrs: Record<string, string> = {
        repo: env.GISCUS_REPO!,
        'repo-id': env.GISCUS_REPO_ID!,
        category: env.GISCUS_CATEGORY!,
        'category-id': env.GISCUS_CATEGORY_ID!,
        mapping: 'specific',
        term,
        strict: '0',
        'reactions-enabled': '1',
        'emit-metadata': '0',
        'input-position': 'top',
        theme: themeRef.current,
        lang: 'en',
        loading: 'lazy',
      }
      for (const [k, v] of Object.entries(attrs)) s.setAttribute(`data-${k}`, v)
      host.appendChild(s)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load()
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(host)
    return () => {
      io.disconnect()
      host.replaceChildren()
    }
  }, [term])

  if (!configured) {
    return import.meta.env.DEV ? (
      <p className="comments-note">Comments are off. Set the VITE_GISCUS_* variables (see docs/comments.md).</p>
    ) : null
  }

  return (
    <section className="comments" aria-label="Comments">
      <h2 className="more-title">Discussion</h2>
      <div ref={hostRef} />
    </section>
  )
}
