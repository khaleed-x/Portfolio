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
      <h2 className="section-title">The story <em>so far</em></h2>
      <div className="section-rule" />
      
      <div className="about-grid">
        <div className="about-body">
          <p>
            I started with <strong>basic Java</strong> during my ND1 java Lectures, Fastforward to SIWES at SoftcodTechNG in 2024. 
            The programme covered C#, PHP, and graphic design — I made a deliberate choice 
            to go deep on <strong>C# WinForms</strong>, leaving as a confident desktop developer.
          </p>
          <p>
            A year later, on the advice of my instructor, I took on my biggest challenge: 
            transitioning from Windows Forms to <strong>ASP.NET Core</strong> with no guided curriculum. 
            Just consistency, the right mental models, and a stubbornness to ship.
          </p>
          <p>
            The result: a <strong>fully production-ready e-commerce platform</strong> with background workers, 
            image compression, Paystack payments, and a complete admin dashboard. Now building a fintech 
            product and co-building a distributed job processing platform.
          </p>
          <p>
            Outside software, I'm a <strong>professional fashion designer</strong> — I make bespoke men's clothing 
            from scratch. Both crafts share the same obsession: precision, clean architecture, and things 
            that actually work.
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