const tickerItems = [
  'ASP.NET Core', 'Modular Monolith', 'Web API', 'PostgreSQL', 'React',
  'Entity Framework', 'C#', 'TypeScript', 'Python', 'PHP',
  'Native AOT', 'Systems Architecture', 'Distributed Systems', 'Bespoke Menswear', 'khaleed.x',
]

export function Marquee() {
  const items = [...tickerItems, ...tickerItems]
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
