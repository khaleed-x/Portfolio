// components/Sections/Services.jsx
const services = [
  {
    number: "01",
    title: "Web Platforms",
    desc: "I design and build production-ready web platforms that solve real world problems. My experience spans e-commerce, financial systems, administrative systems, and internal business tools, with an emphasis on maintainable architecture, secure APIs, and long-term scalability.",
    tags: ["ASP.NET Core", "Web API", "Entity Framework", "PostgreSQL", "SQL Server", "React"],
  },
  {
    number: "02",
    title: "Backend Systems",
    desc: "I enjoy building the backend infrastructure that powers modern applications. My focus is on designing reliable APIs, managing asynchronous workloads, and creating architectures that support growth without sacrificing maintainability.",
    tags: ["Distributed Systems", "Background Services", "REST APIs", "Queue Architecture"],
  },
  {
    number: "03",
    title: "Beyond Engineering",
    desc: "Software engineering isn't my only craft. I also design bespoke menswear, where the same principles—precision, structure, and thoughtful design—guide every piece. Both disciplines reinforce my belief that great work is intentional, functional, and built to last.",
    tags: ["Bespoke Tailoring",  "Garment Construction", "khaleed.x Apparel"],
  },
];

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="section-pre">// 02 — Focus Areas</div>
      <h2 className="section-title">Areas of <em>Expertise</em></h2>
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