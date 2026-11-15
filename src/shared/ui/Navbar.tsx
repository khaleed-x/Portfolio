import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '@/app/theme-context'
import { useActiveSection } from '@/shared/hooks/useActiveSection'
import { useScrollState } from '@/shared/hooks/useScrollState'
import { profile } from '@/content/profile'

const sections = ['about', 'services', 'projects', 'skills', 'experience',  'education', 'contact']
const label = (s: string) => s[0].toUpperCase() + s.slice(1)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onHome = pathname === '/'
  const activeSection = useActiveSection(sections, onHome)
  const activeKey = onHome ? activeSection : pathname.startsWith('/blog') ? 'blog' : ''
  const { scrolled, progress } = useScrollState()

  const listRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Record<string, HTMLElement | null>>({})

  // Sliding highlight under the active link
  useLayoutEffect(() => {
    const place = () => {
      const list = listRef.current
      const el = itemRefs.current[activeKey]
      if (!list) return
      if (!el) return void list.style.setProperty('--o', '0')
      list.style.setProperty('--x', `${el.offsetLeft}px`)
      list.style.setProperty('--w', `${el.offsetWidth}px`)
      list.style.setProperty('--o', '1')
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [activeKey])

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (id: string) => {
    setOpen(false)
    if (onHome) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    else navigate({ pathname: '/', hash: id })
  }

  const items = [...sections, 'blog']

  return (
    <>
      <header className={`pnav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="pnav-bar">
          <Link to="/" className="pnav-logo" onClick={() => setOpen(false)}>
            <span className="pnav-dot" />
            {profile.handle}
          </Link>

          <div className="pnav-links" ref={listRef}>
            <span className="pnav-ind" />
            {items.map((id) =>
              id === 'blog' ? (
                <Link key={id} to="/blog" ref={(el) => void (itemRefs.current[id] = el)} className={`pnav-link ${activeKey === id ? 'active' : ''}`}>
                  Blog
                </Link>
              ) : (
                <button key={id} ref={(el) => void (itemRefs.current[id] = el)} className={`pnav-link ${activeKey === id ? 'active' : ''}`} onClick={() => goTo(id)}>
                  {label(id)}
                </button>
              ),
            )}
          </div>

          <div className="pnav-actions">
            <button className="pnav-icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '☾' : '☀'}
            </button>
            <button className={`pnav-burger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
              <span /><span />
            </button>
          </div>
        </div>
        <div className="pnav-progress" style={{ transform: `scaleX(${progress})` }} />
      </header>

      <div className={`pmenu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav className="pmenu-inner">
          {items.map((id, i) => {
            const style = { '--i': i } as CSSProperties
            return id === 'blog' ? (
              <Link key={id} to="/blog" className="pmenu-link" style={style} onClick={() => setOpen(false)}>
                <small>0{i + 1}</small>Blog
              </Link>
            ) : (
              <button key={id} className={`pmenu-link ${activeKey === id ? 'active' : ''}`} style={style} onClick={() => goTo(id)}>
                <small>0{i + 1}</small>{label(id)}
              </button>
            )
          })}
        </nav>
        <a className="pmenu-cta" href={profile.links.email}>Say hello →</a>
      </div>
    </>
  )
}
