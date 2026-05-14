// components/Sections/Experience.jsx
const timeline = [
  {
    period: "2024/2025",
    role: "Software Director II",
    org: "NACOS TPi Chapter — Nigerian Association of Computing Students",
    points: [
      "Held a technical leadership position within the student chapter",
      "Contributed to software-focused initiatives and community programmes",
      "Awarded Certificate of Office upon completion",
    ],
  },
  {
    period: "2024",
    role: "Software Development Intern (SIWES)",
    org: "SoftcodTechNG, Ibadan",
    points: [
      "Completed industrial training in C# WinForms, PHP web development, and graphic design",
      "Focused intensively on C# — exited the programme as a Windows Forms developer",
      "Later transitioned independently into ASP.NET Core MVC web development",
      "Awarded SIWES Industrial Training Certificate",
    ],
  },
  {
    period: "In Progress",
    role: "Higher National Diploma — Computer Science",
    org: "The Polytechnic Ibadan",
    points: [],
    muted: true,
  },
];

export default function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="section-pre">// 05 — Experience</div>
      <h2 className="section-title">Technical <em>Journey</em></h2>
      <div className="section-rule" />
      
      <div className="timeline">
        {timeline.map((item) => (
          <div className="timeline-item" key={item.role}>
            <div className={`timeline-dot ${item.muted ? 'muted' : ''}`} />
            <div className="timeline-period" style={item.muted ? { color: 'var(--text-muted)' } : {}}>
              {item.period}
            </div>
            <div className="timeline-role">{item.role}</div>
            <div className="timeline-org">{item.org}</div>
            {item.points.length > 0 && (
              <ul className="timeline-points">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}