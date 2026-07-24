import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">Karan Gupta<span className="logo-dot">.</span></span>
            <p className="footer-tagline">Software Developer &amp; Entrepreneur</p>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright-text">&copy; 2026 Karan Gupta. Building logic. Producing rhythm.</p>
          <p className="footer-label">DuskyMoon Productions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
