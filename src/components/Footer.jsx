import React from 'react';
import { navigate } from '../utils/navigate';
import './Footer.css';

const Footer = () => {
  const handleNav = (href, e) => {
    e.preventDefault();
    if (href === '/projects') {
      navigate('/projects');
    } else if (window.location.pathname !== '/') {
      navigate('/' + href);
    } else {
      window.history.pushState(null, '', href);
      const target = document.querySelector(href);
      if (target) {
        if (window.lenis) {
          window.lenis.scrollTo(target, { offset: -60, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo">Kxrn<span className="logo-dot">.</span></span>
            <p className="footer-tagline">Software Developer &amp; Music Producer · Founder of DuskyMoon Productions</p>
          </div>
          <div className="footer-links">
            <a href="#about" onClick={(e) => handleNav('#about', e)}>About</a>
            <a href="#skills" onClick={(e) => handleNav('#skills', e)}>Skills</a>
            <a href="/projects" onClick={(e) => handleNav('/projects', e)}>Projects</a>
            <a href="#press" onClick={(e) => handleNav('#press', e)}>Press</a>
            <a href="#contact" onClick={(e) => handleNav('#contact', e)}>Contact</a>
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
