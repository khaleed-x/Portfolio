import { useEffect, useState } from 'react'

/** Tracks which section id is currently in view (home page only). */
export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState('')
  const key = ids.join('|')

  useEffect(() => {
    if (!enabled) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    key.split('|').forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [key, enabled])

  return enabled ? active : ''
}
