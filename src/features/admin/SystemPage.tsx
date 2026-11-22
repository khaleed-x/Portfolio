import { useHealth } from './hooks'

export function SystemPage() {
  const { checks, error } = useHealth()
  return (
    <div className="ad-stack">
      <p className="ad-muted">Everything the admin depends on. Green means it works right now.</p>
      {error && <div className="ad-alert"><b>Could not run checks.</b> {error}</div>}
      {!checks && !error && <div className="ad-skel" />}
      {checks?.map((c) => (
        <section key={c.key} className="ad-card ad-check">
          <span className={`ad-status ${c.ok ? 'ok' : 'bad'}`}>{c.ok ? '✓' : '!'}</span>
          <div>
            <h3>{c.label}</h3>
            <p className="ad-muted">{c.ok ? 'Working.' : c.hint}</p>
          </div>
        </section>
      ))}
    </div>
  )
}
