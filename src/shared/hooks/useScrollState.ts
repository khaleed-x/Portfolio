import { useEffect, useState } from 'react'

/** Returns whether the page is scrolled, and 0–1 scroll progress (rAF-throttled). */
export function useScrollState() {
  const [state, setState] = useState({ scrolled: false, progress: 0 })

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setState({ scrolled: window.scrollY > 24, progress: max > 0 ? Math.min(1, window.scrollY / max) : 0 })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return state
}
