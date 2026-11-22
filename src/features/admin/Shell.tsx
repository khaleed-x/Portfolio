import type { ReactNode } from 'react'
import { Icon } from './icons'
import { useTheme } from '@/app/theme-context'

export type Tab = 'overview' | 'posts' | 'analytics' | 'links' | 'system'

export const nav: { tab: Tab; label: string; icon: string }[] = [
  
  { tab: 'overview', label: 'Overview', icon: 'home' },
  { tab: 'posts', label: 'Posts', icon: 'file' },
  { tab: 'analytics', label: 'Analytics', icon: 'chart' },
  { tab: 'links', label: 'Links', icon: 'link' },
  { tab: 'system', label: 'System', icon: 'pulse' },
]

interface Props {
  tab: Tab
  onTab: (t: Tab) => void
  user: string
  onLogout: () => void
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}

export function Shell({ tab, onTab, user, onLogout, title, subtitle, actions, children }: Props) {
  const { theme, toggleTheme } = useTheme()
  return (
    
    <div className="ad">
      <aside className="ad-side">
        <div className="ad-brand"><span className="ad-dot" />khaleed.x<em>Admin</em></div>
        <nav className="ad-nav">
          {nav.map((n) => (
            <button key={n.tab} className={tab === n.tab ? 'on' : ''} onClick={() => onTab(n.tab)}>
              <Icon name={n.icon} />{n.label}
            </button>
          ))}
        </nav>
        <a className="ad-ext" href="/" target="_blank" rel="noreferrer"><Icon name="external" size={16} />View site</a>
        <div className="ad-user">
          <img src={`https://github.com/${user}.png?size=64`} alt="" width={36} height={36} />
          <div><b>{user}</b><span>Owner</span></div>
          <button onClick={onLogout} aria-label="Sign out" title="Sign out"><Icon name="logout" size={18} /></button>
        </div>
      </aside>

      <main className="ad-main">
        <header className="ad-top">
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="ad-actions">
          <button className="ad-icon-btn" onClick={toggleTheme} aria-label="Toggle light or dark mode" title="Toggle light or dark mode">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>
          {actions}
      </div>
        </header>
        <div className="ad-body">{children}</div>
      </main>

      <nav className="ad-bottom">
        {nav.map((n) => (
          <button key={n.tab} className={tab === n.tab ? 'on' : ''} onClick={() => onTab(n.tab)}>
            <Icon name={n.icon} size={22} /><span>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
