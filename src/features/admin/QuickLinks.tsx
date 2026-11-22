const SITE = 'https://khalid-oyekunle.vercel.app'
const VERCEL = 'https://vercel.com/khaleed-x/khalid_oyekunle'
const links: [string, string, string][] = [
  ['Vercel Analytics', 'Visitors, pages and referrers', `${VERCEL}/analytics`],
  ['Speed Insights', 'How fast pages load', `${VERCEL}/speed-insights`],
  ['Server logs', 'Raw requests, including bots', `${VERCEL}/logs`],
  ['Deployments', 'Build and deploy history', `${VERCEL}/deployments`],
  ['Google Search Console', 'Searches, clicks and indexing', `https://search.google.com/search-console?resource_id=${encodeURIComponent(`${SITE}/`)}`],
  ['Indexed by Google', 'Pages Google has found', `https://www.google.com/search?q=site:${SITE.replace('https://', '')}`],
]

export function QuickLinks() {
  return (
    <section className="ad-card">
      <div className="ad-card-head"><h3>Quick links</h3></div>
      {links.map(([name, desc, href]) => (
        <a key={name} className="ad-row" href={href} target="_blank" rel="noreferrer">
          <span><b>{name}</b><small>{desc}</small></span>
          <span className="ad-muted">↗</span>
        </a>
      ))}
    </section>
  )
}
