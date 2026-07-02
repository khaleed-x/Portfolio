// components/Sections/Projects.jsx
const projects = [

  {
    name: "Velora",
    type: "Collaborative project: Distributed System",
    badge: "badge-progress",
    badgeLabel: "In Development",
    desc: "Velora is an open-source distributed background job processing platform exploring how asynchronous workloads can be executed reliably across services written in different programming languages. Velora focuses on queue-based communication, worker orchestration, and scalable task execution through a shared broker and unified API.",
    tags: ["Distributed Systems", "Queue Architecture", "Worker Orchestration", "Open Source"],
    link: null,
  },

  {
    name: "VaultNG",
    type: "Full-stack : Financial Platform",
    badge: "badge-progress",
    badgeLabel: "In Development",
    desc: "A financial platform designed to unify digital financial services through a single backend. The system integrates wallet management, instant transfers, goal-based savings, fixed-return investments, and business payment collection while emphasizing modular architecture and secure financial workflows.",
    tags: ["ASP.NET Core Web API", "React", "PostgreSQL", "Paystack"],
    link: null,
  },

  {
    name: "AurHER",
    type: "Full-Stack E-commerce Platform",
    badge: "badge-live",
    badgeLabel: "Live",
    desc: "A production-ready e-commerce platform built with a layered ASP.NET Core architecture. Designed to support secure payment processing, asynchronous email and SMS notifications, optimized media handling, and a comprehensive administration system for managing products, orders, and business operations.",
    tags: ["ASP.NET Core MVC", ".NET 10", "PostgreSQL", "EF Core", "Paystack", "MailKit"],
    link: "https://aurher.onrender.com",
    linkLabel: "aurher.onrender.com",
  },

  {
    name: "Synclirix Backend",
    type: "Collaborative project: Multi-user workspace platform",
    badge: "badge-progress",
    badgeLabel: "Almost live",
    desc: "A collaborative workspace platform designed for teams to manage projects, tasks, and workflows in real time. The backend emphasizes role-based authorization, activity auditing, and scalable APIs that keep team collaboration synchronized across the application.",
    tags: ["ASP.NET Core Web Api", "React" , "PostgreSQL"],
    link: null,
    linkLabel: "almost live",
  },

  {
    name: "Portfolio",
    type: "Personal Portfolio",
    badge: "badge-live",
    badgeLabel: "Live",
    desc: "A developer portfolio designed to present my engineering journey through project case studies, software architecture, and technical experience. Built with React and Vite to provide a fast, responsive, and maintainable user experience.",
    tags: [ "React", "Vite"],
    link: "https://khaleed-portfolio.vercel.app",
    linkLabel: "khaleed-portfolio.vercel.app",
  },
  
  {
    name: "Desktop Applications",
    type: "Desktop · C# WinForms",
    badge: "badge-live",
    badgeLabel: "Completed",
    desc: "A collection of desktop applications built during my early software engineering journey, covering Student Grade Point Caculator, Car Rental Management, Final Year Clearance Administration, Course Management, and Attendance Tracking with Barcode Verification. These projects established my foundation in object-oriented programming, database design, and desktop application development with C#.",
    tags: ["C#", "WinForms", ".NET", "SQL Server"],
    link: null,
  },


  {
    name: "Airtel USSD Simulator",
    type: "Console Application",
    badge: "badge-live",
    badgeLabel: "Completed",
    desc: "A console-based simulation of the Airtel USSD experience, created to strengthen my understanding of control flow, state management, and interactive command-line application design in C#. — an early practical C# project.",
    tags: ["C#", "Console", "USSD"],
    link: null,
  },
];

export default function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="section-pre">// 03 — Projects</div>
      <h2 className="section-title">Systems i've<em> Designed</em></h2>
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