// components/Layout/Marquee.jsx
const tickerItems = [
  "ASP.NET Core MVC", "Web API", "PostgreSQL", "React",
  "Entity Framework", "C#", "Paystack", "TypeScript",
  "Bespoke Menswear", "khaleed.x", "Systems Architecture",
  "Distributed Systems", "Background Workers", "REST APIs",
];

export default function Marquee() {
  const items = [...tickerItems, ...tickerItems];
  
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
  );
}