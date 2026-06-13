// components/Sections/Services.jsx
const services = [
  {
    number: "01",
    title: "Web Platforms",
    desc: "Production-grade ASP.NET Core applications, — e-commerce, fintech systems, dashboard, APIs, and business platforms built for real world use.",
    tags: ["ASP.NET Core", "Web API", "Entity Framework", "PostgreSQL", "SQL Server", "React"],
  },
  {
    number: "02",
    title: "Backend Systems",
    desc: "Backend architecture, background processing, REST APIs, system design, and scalable application patterns for maintainable software.",
    tags: ["Distributed Systems", "Background Services", "REST APIs", "Queue Architecture"],
  },
  {
    number: "03",
    title: "Beyond Engineering",
    desc: "  Outside software, I design bespoke menswear through khaleed.x Apparel - briging the same precision, structure, and craftmanship into fashion",
    tags: ["Bespoke Tailoring",  "Garment Construction", "khaleed.x Apparel"],
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="section-pre">// 02 — Focus Areas</div>
      <h2 className="section-title">What I <em>build</em></h2>
      <div className="section-rule" />
      
      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.number}>
            <div className="service-number">{service.number}</div>
            <div className="service-title">{service.title}</div>
            <p className="service-desc">{service.desc}</p>
            <div className="service-tags">
              {service.tags.map((tag) => (
                <span className="service-tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}