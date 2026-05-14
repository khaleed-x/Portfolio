// components/Sections/Projects.jsx
const projects = [
  {
    name: "AurHER",
    type: "Web · E-Commerce",
    badge: "badge-live",
    badgeLabel: "Live",
    desc: "Production-grade women's fashion e-commerce for the Nigerian market. Full admin dashboard, background workers, image compression, automated email/SMS, Paystack payments.",
    tags: ["ASP.NET Core MVC", ".NET 10", "PostgreSQL", "EF Core", "Paystack", "MailKit", "Termii"],
    link: "https://aurher.onrender.com",
    linkLabel: "aurher.onrender.com",
  },
  {
    name: "VaultNG",
    type: "Web · Fintech",
    badge: "badge-progress",
    badgeLabel: "In Progress",
    desc: "Nigerian fintech consolidating wallet management, instant transfers, goal-based savings, fixed-return investments, and business payment collection into one platform.",
    tags: ["ASP.NET Core Web API", "React", "PostgreSQL", "Paystack"],
    link: null,
  },
  {
    name: "Velora",
    type: "Platform · Open Source",
    badge: "badge-progress",
    badgeLabel: "In Progress",
    desc: "Open-source, language-agnostic distributed background job processor — similar to Hangfire or Celery but designed for multi-language workers through a shared broker and unified API.",
    tags: ["Distributed Systems", "Queue Architecture", "Worker Orchestration", "Open Source"],
    link: null,
  },
  {
    name: "Desktop Applications",
    type: "Desktop · C# WinForms",
    badge: "badge-completed",
    badgeLabel: "Completed",
    desc: "Suite of Windows desktop apps — Car Rental Management, Final Year Clearance Administration, Course Management, and Attendance Tracking with Barcode Verification.",
    tags: ["C#", "WinForms", ".NET", "SQL Server"],
    link: null,
  },
  {
    name: "Airtel USSD Simulator",
    type: "Console Application",
    badge: "badge-completed",
    badgeLabel: "Completed",
    desc: "Console tool mimicking the Airtel USSD flow for airtime and data management — an early practical C# project.",
    tags: ["C#", "Console", "USSD"],
    link: null,
  },
];

export default function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="section-pre">// 03 — Projects</div>
      <h2 className="section-title">Things I've <em>built</em></h2>
      <div className="section-rule" />

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.name}>
            <div className="project-header">
              <div className="project-name">{project.name}</div>
              <span className={`project-badge ${project.badge}`}>{project.badgeLabel}</span>
            </div>
            <div className="project-type">{project.type}</div>
            <p className="project-desc">{project.desc}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span className="project-tag" key={tag}>{tag}</span>
              ))}
            </div>
            {project.link && (
              <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                {project.linkLabel} →
              </a>
            )}
          </div>
        ))}
      </div>
      
    </section>
  );
}