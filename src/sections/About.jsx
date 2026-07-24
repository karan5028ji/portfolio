import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

const About = () => {
  return (
    <section id="about" className="section about">
      <div className="container">
        <motion.div
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
        >
          <span className="section-label">About</span>
          <h2>Bridging <span className="gradient-text">Code &amp; Sound</span></h2>
        </motion.div>
        <div className="about-grid">
          <motion.div
            className="about-bio"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
            variants={fadeInUp}
          >
            <p className="about-lead">
              I am an independent <strong>Front-End Developer</strong> and <strong>UI Designer</strong> based in <strong>New Delhi</strong>, specializing in building modern, high-converting web applications with React and SaaS aesthetics.
            </p>
            <p>
              My passion lies in building logical, efficient software solutions while producing rhythm and melody that resonates with listeners. I thrive at the intersection of technology and creativity — writing code by day and crafting beats by night.
            </p>
            <p>
              From AI assistants to music production hubs, every project I undertake reflects my belief that great engineering and great art share the same DNA: precision, passion, and purpose.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">React</span>
                <span className="stat-label">Specialization</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">SaaS</span>
                <span className="stat-label">Design Aesthetics</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2</span>
                <span className="stat-label">Creative Domains</span>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="music-persona-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.3}
            variants={fadeInUp}
          >
            <div className="persona-dissolve-overlay" />
            <div className="persona-glow" />
            <div className="persona-content">
              <div className="persona-icon">🎧</div>
              <div className="persona-badge">Creative &amp; Leadership Persona</div>
              <h3 className="persona-name">
                Stage Name: <span className="gradient-text">Kxrn</span>
              </h3>
              <p className="persona-desc">
                Under the alias <strong>Kxrn</strong>, I produce music &amp; sound design while leading <strong>DuskyMoon Productions</strong> as a digital solutions and production hub.
              </p>
              <div className="persona-divider" />
              <div className="persona-role">
                <span className="role-icon">🚀</span>
                <div>
                  <strong>CEO &amp; Founder</strong>
                  <span>DuskyMoon Productions</span>
                </div>
              </div>
              <p className="persona-label-text">
                An independent production house and digital hub dedicated to nurturing innovative sounds and delivering high-end digital experiences.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
