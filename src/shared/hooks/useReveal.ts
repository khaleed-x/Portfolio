import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SELECTOR = [
  '.section-pre', '.section-title', '.about-body p', '.stat-card', '.service-card',
  '.project-card', '.skill-card', '.timeline-item', '.contact-card', '.detail > *', '.gallery',
].join(',')

/** Fades/slides elements in as they enter the viewport. Re-runs on route change. */
export function useReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
     { threshold: 0, rootMargin: '0px 0px -6% 0px' },

    )
    els.forEach((el, i) => {
      el.classList.add('reveal')
      el.style.setProperty('--d', `${(i % 4) * 70}ms`)
      io.observe(el)
    })
    return () => io.disconnect()
  }, [pathname])
}
