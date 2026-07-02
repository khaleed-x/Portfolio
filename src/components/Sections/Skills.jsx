// components/Sections/Skills.jsx
const skills = [
  { label: "Backend Engineering", items: ["ASP.NET Core", "Entity Framework Core", "REST APIs", "Background Services"] },

  { label: "Languages", items: ["C# (Primary)", "JavaScript / TypeScript "] },

  { label: "Database", items: ["PostgreSQL", "SQL Server"] },
  
  { label: "Frontend", items: ["React", "HTML / CSS, JS"] },

  { label: "Architecture & Design", items: ["Layered Architecture"," Repository / Service Pattern", "Dependency Injection",  "REST API Design"] },

  { label: "Authentication", items: ["JWT"," Cookie Authentication","Session Management"] },

  { label: "Developer Tools", items: ["VS Code", ".NET SDK", "Git ", "GitHub"] },
  
  { label: "Integrations", items: ["Paystack API", "MailKit", "Termii SMS"] },

  { label: "Currently Exploring", items: ["Distributed Systems", "Queue-Based Architecture","System Design"] },
];

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-pre">// 04 — Engineering Toolkit</div>
      <h2 className="section-title"> Tools &  <em>Technologies</em></h2>
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