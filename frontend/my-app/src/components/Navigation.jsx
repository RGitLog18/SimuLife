import React, { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-icon">⚕️</span>
          <span className="logo-text">SimuLife</span>
        </div>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <a href="#features" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>
            Features
          </a>
          <a href="#how-it-works" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>
            How It Works
          </a>
          <a href="#testimonials" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>
            Testimonials
          </a>
          <a href="#cta" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('cta'); }}>
            Contact
          </a>
        </div>

        <button className="nav-cta-btn" onClick={() => scrollToSection('cta')}>
          Get Started
        </button>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}