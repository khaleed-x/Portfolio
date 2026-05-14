// App.jsx
import { useState, useEffect } from 'react';
import './styles/globals.css';
import './styles/components/nav.css';
import './styles/components/hero.css';
import './styles/components/sections.css';
import './styles/components/cards.css';
import './styles/components/buttons.css';
import './styles/components/timeline.css';
import './styles/components/contact.css';
import './styles/components/marquee.css';
import './styles/components/skills.css';
import './styles/components/footer.css';
import './styles/animations.css';

// Import components
import Home from './components/Sections/Hero';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Marquee from './components/Layout/Marquee';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Services from './components/Sections/Services';
import Projects from './components/Sections/Projects';
import Skills from './components/Sections/Skills';
import Experience from './components/Sections/Experience';
import Contact from './components/Sections/Contact';

export default function Portfolio() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="root" data-theme={theme}>
      <div className="grain" />
      
      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
        theme={theme}
        setTheme={setTheme}
      />
      
      <Hero scrollToSection={scrollToSection}/>
      <Marquee />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}