import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Terms', href: '#terms' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>SimuLife</h3>
          <p>Transforming precision medicine through digital twin simulation.</p>
        </div>

        <div className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.name} href={link.href}>
              {link.name}
            </a>
          ))}
        </div>

        <div className="footer-social">
          <a href="#twitter" aria-label="Twitter">𝕏</a>
          <a href="#linkedin" aria-label="LinkedIn">in</a>
          <a href="#github" aria-label="GitHub">⚙️</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} SimuLife. All rights reserved.</p>
      </div>
    </footer>
  );
}