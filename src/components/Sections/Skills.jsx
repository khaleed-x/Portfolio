// components/Sections/Skills.jsx
const skills = [
  { label: "Language", items: ["C# (Primary)", "TypeScript / JavaScript"] },
  { label: "Backend", items: ["ASP.NET Core MVC", "ASP.NET Core Web API", "Entity Framework Core", "Background Services"] },
  { label: "Frontend", items: ["React", "HTML / CSS, JS", "Responsive Design"] },
  { label: "Database", items: ["PostgreSQL", "SQL Server"] },
  { label: "Architecture", items: ["Repository / Service Pattern", "MVC", "REST API Design", "Cookie Auth", "Session Management"] },
  { label: "Tools", items: ["Git & GitHub", "VS Code", "Paystack API", "MailKit", "Termii SMS"] },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-pre">// 04 — Skills</div>
      <h2 className="section-title">Technical <em>arsenal</em></h2>
      <div className="section-rule" />
      
      <div className="skills-grid">
        {skills.map((skillGroup) => (
          <div className="skill-card" key={skillGroup.label}>
            <div className="skill-label">{skillGroup.label}</div>
            {skillGroup.items.map((item) => (
              <div className="skill-item" key={item}>{item}</div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}