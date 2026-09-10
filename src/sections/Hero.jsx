import React from 'react';
import { motion } from 'framer-motion';
import { navigate } from '../utils/navigate';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero" aria-label="Karan Gupta (Kxrn) - Software Developer and Music Producer based in Delhi">
      <div className="hero-glow hero-glow--blue" />
      <div className="hero-glow hero-glow--purple" />
      <div className="hero-inner">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="hero-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ✦ Developer · Producer · Entrepreneur
          </motion.span>
          <h1 className="hero-title">
            Software Developer<br />
            <span className="gradient-text">&amp; Entrepreneur</span>
          </h1>
          <p className="hero-subtitle">
            Building logic. Producing rhythm.
          </p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="/projects"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); navigate('/projects'); }}
            >
              View Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </a>
            <a
              href="#contact"
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', '#contact');
                const target = document.querySelector('#contact');
                if (target) {
                  if (window.lenis) {
                    window.lenis.scrollTo(target, { offset: -60, duration: 1.2 });
                  } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
