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
              <strong>Kxrn Gupta (Karan Gupta; born Chitresh Gupta)</strong> is an Indian independent music producer, software developer, and founder of <strong>DuskyMoon Productions</strong> based in <strong>New Delhi, India</strong>.
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

        {/* Verified Harvard University Credentials Grid */}
        <div className="credentials-grid">
          <motion.div
            className="harvard-credential-card glass-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.2}
            variants={fadeInUp}
          >
            <div className="credential-left">
              <div className="credential-icon-badge">🎓</div>
              <div className="credential-details">
                <div className="credential-title-row">
                  <span className="credential-inst">Harvard University</span>
                  <span className="credential-bullet">·</span>
                  <span className="credential-verified-pill">
                    <span className="status-dot" />
                    Verified
                  </span>
                </div>
                <h3 className="credential-title">CS50&apos;s Introduction to Artificial Intelligence with Python</h3>
                <p className="credential-subtext">
                  Instructor: David J. Malan · Machine Learning, Neural Networks &amp; NLP
                </p>
              </div>
            </div>

            <a
              href="https://cs50.harvard.edu/certificates/ab707528-9255-4c2f-afa0-9fe5e7d4e45e"
              target="_blank"
              rel="noopener noreferrer"
              className="credential-verify-btn"
            >
              <span>Verify</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            className="harvard-credential-card glass-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.3}
            variants={fadeInUp}
          >
            <div className="credential-left">
              <div className="credential-icon-badge">🎓</div>
              <div className="credential-details">
                <div className="credential-title-row">
                  <span className="credential-inst">Harvard University</span>
                  <span className="credential-bullet">·</span>
                  <span className="credential-verified-pill">
                    <span className="status-dot" />
                    Verified
                  </span>
                </div>
                <h3 className="credential-title">CS50P: Programming with Python</h3>
                <p className="credential-subtext">
                  Instructor: David J. Malan · Algorithmic Architecture, Unit Testing &amp; OOP
                </p>
              </div>
            </div>

            <a
              href="https://cs50.harvard.edu/certificates/27e93e59-72dd-4da4-ba83-b8a487f5efd1"
              target="_blank"
              rel="noopener noreferrer"
              className="credential-verify-btn"
            >
              <span>Verify</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            className="harvard-credential-card glass-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.4}
            variants={fadeInUp}
          >
            <div className="credential-left">
              <div className="credential-icon-badge">🤖</div>
              <div className="credential-details">
                <div className="credential-title-row">
                  <span className="credential-inst">Microsoft</span>
                  <span className="credential-bullet">·</span>
                  <span className="credential-verified-pill">
                    <span className="status-dot" />
                    Verified
                  </span>
                </div>
                <h3 className="credential-title">Build an agent in Microsoft Copilot Studio</h3>
                <p className="credential-subtext">
                  Signed by Satya Nadella · Autonomous Agents, Enterprise RAG &amp; Power Automate · ID: E33784E386894D86
                </p>
              </div>
            </div>

            <a
              href="https://learn.microsoft.com/credentials/applied-skills/build-an-agent-in-microsoft-copilot-studio/?wt.mc_id=studentamb_664130"
              target="_blank"
              rel="noopener noreferrer"
              className="credential-verify-btn"
            >
              <span>Verify</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
