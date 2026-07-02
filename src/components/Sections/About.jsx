// components/Sections/About.jsx
export default function About() {
  const stats = [
    { number: "5+", label: "Projects shipped" },
    { number: "2", label: "Years building" },
    { number: "∞", label: "Problems to solve" },
  ];

  return (
    <section className="section section-alt" id="about">
      <div className="section-pre">// 01 — About</div>
      <h2 className="section-title">Engineering <em>Philosophy</em></h2>
      <div className="section-rule" />
      
      <div className="about-grid">
        <div className="about-body">
          <p>
            I'm a backend software engineer who designs reliable, maintainable, and scalable systems with <strong>ASP.NET Core</strong>.I enjoy solving problems beyond feature implementation—thinking through architecture, service boundaries, data flow, and the trade-offs that shape production-ready software.
          </p>
          <p>
             I believe good software isn't measured by the number of features it contains, but by how well it evolves over time. That belief naturally draws me toward clean architecture, domain-driven design, asynchronous processing, and distributed systems. I'm fascinated not only by how software works, but why certain architectural decisions lead to systems that remain reliable and maintainable as they grow.
          </p>
          <p>
             My engineering foundation was built through <strong>C#</strong> during my industrial training, before independently transitioning into ASP.NET Core. That journey taught me how to approach unfamiliar technologies through documentation, experimentation, and hands-on problem solving rather than relying on guided tutorials. It also shaped the way I learn today—by understanding principles first and applying them through real-world systems.
        
          </p>
          <p>
             Outside software, I design bespoke menswear. Although the disciplines are different, both demand the same mindset: precision, thoughtful design, and attention to detail. Whether I'm designing an application or a garment, I enjoy creating systems that are intentional, functional, and built to last.
          </p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}