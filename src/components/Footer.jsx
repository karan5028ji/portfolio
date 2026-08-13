import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">Kxrn<span className="logo-dot">.</span></span>
            <p className="footer-tagline">Software Developer &amp; Music Producer · Founder of DuskyMoon Productions</p>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">&copy; 2026 DuskyMoon Productions. All rights reserved. Founded by Kxrn (Karan Gupta / Chitresh Gupta).</p>
          <p className="footer-label">🌙 DuskyMoon Productions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
