import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

let firstView = true

/** Sends one anonymous page-view per route change to /api/track. Respects Do Not Track. */
export function useTrackVisit() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (import.meta.env.DEV || pathname.startsWith('/khalid') || navigator.doNotTrack === '1') return
    const src = new URLSearchParams(window.location.search).get('utm_source') ?? ''
    const payload = JSON.stringify({ path: pathname, ref: firstView ? document.referrer : '', src })
    firstView = false
    const sent = navigator.sendBeacon?.('/api/track', new Blob([payload], { type: 'application/json' }))
    if (!sent) {
      void fetch('/api/track', { method: 'POST', body: payload, keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => {})
    }
  }, [pathname])
}
