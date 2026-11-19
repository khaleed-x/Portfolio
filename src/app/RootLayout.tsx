import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/shared/ui/Navbar'
import { Footer } from '@/shared/ui/Footer'
import { useReveal } from '@/shared/hooks/useReveal'
import { ChatWidget } from '@/features/ai-chat'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useTrackVisit } from '@/shared/hooks/useTrackVisit'

/** Scrolls to #hash targets, or to top on route change. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export function RootLayout() {
  useReveal()
  useTrackVisit()
  return (
    <div className="root">
      <div className="grain" />
      <ScrollManager />
      <Navbar />
      <Outlet />
      <Footer />
      <Analytics /> 
      <SpeedInsights />
      <ChatWidget />
    </div>
  )
}
