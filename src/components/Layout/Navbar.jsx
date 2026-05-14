// components/Layout/Navbar.jsx
import { useState } from 'react';

export default function Navbar({ activeSection, scrollToSection, theme, setTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = ['About', 'Services', 'Projects', 'Skills', 'Experience', 'Contact'];
  
  const handleNavClick = (item) => {
    scrollToSection(item.toLowerCase());
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <nav className="nav">
        <div className="nav-logo">khaleed.x</div>
        <div className="nav-center">
          {navItems.map(item => (
            <button
              key={item}
              className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="nav-r">
          <button className="theme-toggle" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            <div className="toggle-thumb">{theme === 'dark' ? '🌙' : '☀️'}</div>
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          className="close-menu-btn" 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        {navItems.map(item => (
          <button
            key={item}
            className={`mobile-nav-link ${activeSection === item.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleNavClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}