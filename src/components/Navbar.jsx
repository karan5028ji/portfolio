import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigate } from '../utils/navigate';
import './Navbar.css';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Press', href: '#press' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    const handleLocationChange = () => setPathname(window.location.pathname);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const isStandalonePage = pathname.toLowerCase().includes('/projects') || pathname.toLowerCase().includes('/links');
  const isScrolled = scrolled || isStandalonePage;

  const handleNavClick = (link, e) => {
    setMenuOpen(false);
    if (link.name === 'Projects') {
      e.preventDefault();
      navigate('/projects');
    } else if (window.location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + link.href);
    } else {
      e.preventDefault();
      window.history.pushState(null, '', link.href);
      const target = document.querySelector(link.href);
      if (target) {
        if (window.lenis) {
          window.lenis.scrollTo(target, { offset: -60, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
    } else {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Mobile backdrop overlay — closes menu when tapped outside */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <div className="navbar-inner">
        <a href="#hero" onClick={handleLogoClick} className="nav-logo">
          <span className="logo-text">Kxrn</span>
          <span className="logo-dot">.</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleNavClick(link, e)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary nav-cta"
            onClick={(e) => handleNavClick({ name: 'Contact', href: '#contact' }, e)}
          >
            Hire Me
          </a>
        </div>
        <button
          className={`nav-hamburger ${menuOpen ? 'nav-hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
