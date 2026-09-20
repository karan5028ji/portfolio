import React from 'react';
import { motion } from 'framer-motion';
import { navigate } from '../utils/navigate';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero" aria-label="Karan Gupta (Kxrn) - Software Developer and Music Producer based in Delhi">
      {/* Refined Architectural Lighting (Replaces generic circular neon blobs) */}
      <div className="hero-spotlight" />
      <div className="hero-horizon-beam" />
      
      <div className="hero-inner">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Live Pulsing Beacon Status Pill */}
          <motion.div
            className="hero-status-pill"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="pulse-beacon">
              <span className="pulse-beacon-ping" />
              <span className="pulse-beacon-dot" />
            </span>
            <span className="status-text">Available for Collaboration · New Delhi, IN</span>
          </motion.div>

          <h1 className="hero-title">
            Software Developer<br />
            <span className="gradient-text">&amp; Entrepreneur</span>
          </h1>

          <p className="hero-subtitle">
            Engineering zero-cost multi-agent AI orchestrators, high-performance Windows utilities, and independent sonic landscapes. Founder of <strong>DuskyMoon Productions</strong>.
          </p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <a
              href="/projects"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); navigate('/projects'); }}
            >
              <span>Explore Architecture</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
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
              <span>Get In Touch</span>
            </a>
          </motion.div>

          {/* Social Proof & Real Credibility Micro-Strip */}
          <motion.div
            className="hero-proof-strip"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            <div className="proof-pill">
              <span className="proof-check">✓</span>
              <span>winget Package Author</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-pill">
              <span className="proof-icon">⚡</span>
              <span>Staff Pick (CoderLegion)</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-pill">
              <span className="proof-icon">🎙️</span>
              <span>HackerNoon Tech Brief</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-pill">
              <span className="proof-icon">🎧</span>
              <span>Spotify Verified</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <div className="scroll-line" />
        <span>Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
