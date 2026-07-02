// components/Sections/Hero.jsx
export default function Hero({scrollToSection}) {
  return (
    <section className="hero" id="hero">
      <div className="hero-left">
        <div className="hero-eyebrow">
          <span className="pulse" />
          ASP.NET Core · Backend Systems
        </div>
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">
          Khalid<em>Oyekunle.</em>
        </h1>
        <p className="hero-role">Backend Software Engineer · ASP.NET Core</p>
        <p className="hero-desc">
        I build backend systems with a strong focus on software architecture, scalability, and clean engineering principles. My work spans production web platforms, financial systems, and distributed applications, with an emphasis on designing software that remains reliable and maintainable as it grows.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={()=>scrollToSection('projects')}>
          
            ↗ View Projects
            
          </button>

          <button className="btn-outline" onClick={()=>scrollToSection('contact')}>
          
          Get in touch
          
        </button>

          <a className="btn-outline" href="https://github.com/khaleed-x" target="_blank" rel="noreferrer">
            GitHub
          </a>


          <a className="btn-outline" href="/Khalid Oyekunle CV.pdf" target="_blank" rel="noreferre"> 
          Download CV
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="photo-wrap">
          <div className="photo-line" />
          <div className="photo-frame">
          <img src="/khalid1.PNG" alt="khalid.x" style={{width:'100%', height:'100%', objectFit: 'cover', objectPosition: 'center top'}}/>
              <div className="photo-initials">khaleed.x</div>
              <div className="photo-hint"></div>
              
          </div>
          <div className="photo-badge">.Net Engineer</div>
        </div>
      </div>
    </section>
  );
}