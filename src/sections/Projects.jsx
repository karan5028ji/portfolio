import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'Win-Optimizer-Pro',
    subtitle: 'Microsoft Windows Package Manager (winget)',
    description: 'A high-performance Windows system optimization utility. Now officially accepted into the Microsoft Windows Package Manager registry.',
    longDescription: 'Win-Optimizer-Pro is a high-performance Windows system optimization utility designed to clean temporary junk, optimize system settings, and enhance overall PC performance. Officially accepted and published into the Microsoft Windows Package Manager (winget) repository for instant terminal deployment.',
    command: 'winget install karan5028ji.WinOptimizerPro',
    tags: ['C++', 'Windows CLI', 'winget', 'System Utility'],
    icon: '⚡',
    accent: '#22c55e',
  },
  {
    id: 2,
    title: 'SHIVA AI',
    subtitle: 'Modular AI Platform Interface',
    description: 'Developed a high-converting, dark-themed landing page featuring a modern "Bento Grid" layout for a personalized local AI assistant.',
    longDescription: 'Developed a high-converting, dark-themed landing page featuring a modern "Bento Grid" layout for a personalized local AI assistant. Optimized the UI for a trustworthy, enterprise-grade SaaS look with zero-latency load times, smooth micro-interactions, and fluid responsiveness.',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Python', 'Bento Grid'],
    icon: '🤖',
    accent: '#00c2ff',
  },
  {
    id: 3,
    title: 'Noir Studio',
    subtitle: 'Upcoming Premium Web Studio',
    description: 'An upcoming premium digital design and web architecture studio delivering immersive, high-end digital experiences and sleek aesthetics.',
    longDescription: 'An upcoming premium digital design and web architecture studio. Focused on delivering immersive, high-end digital experiences, sleek animations, 3D WebGL interactions, and ultra-modern dark-themed aesthetics for future clients.',
    tags: ['React', 'Three.js', 'UI/UX Design', 'Framer Motion'],
    icon: '✨',
    accent: '#a855f7',
  },
  {
    id: 4,
    title: 'DuskyMoon Productions',
    subtitle: 'Digital Solutions Hub · CEO & Founder',
    description: 'Established a creative digital solutions hub managing end-to-end project lifecycles, cinematic web aesthetics, and color grading.',
    longDescription: 'Established a creative digital solutions hub. Managed end-to-end project lifecycles, focusing on cinematic web aesthetics, modern color grading, premium UI design, and delivering top-tier digital assets to clients.',
    tags: ['CEO & Founder', 'Web Architecture', 'Color Grading', 'Digital Assets'],
    icon: '🌙',
    accent: '#3b82f6',
  },
  {
    id: 5,
    title: 'Sapne',
    subtitle: 'Music Track Release · Alias Kxrn',
    description: 'An independent music track release featuring Ankit, highlighting creative direction, technical audio production, and sound engineering.',
    longDescription: 'Released under my musical alias, Kxrn. An independent music track release featuring Ankit. This project highlights my creative direction, technical audio production, mixing, mastering, and sound engineering skills.',
    tags: ['Alias: Kxrn', 'Music Production', 'Sound Engineering', 'Mixing & Mastering'],
    icon: '🎵',
    accent: '#ec4899',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

const handleTilt = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 8;
  const rotateY = ((centerX - x) / centerX) * 8;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
};

const handleTiltReset = (e) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
};

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <motion.div
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
        >
          <span className="section-label">Work</span>
          <h2>Featured <span className="gradient-text">Projects</span></h2>
        </motion.div>
        <motion.div
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card glass-card"
              custom={index * 0.12}
              variants={fadeInUp}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltReset}
              onClick={() => setSelected(project)}
              style={{ '--project-accent': project.accent }}
            >
              <div className="project-card-accent" />
              <div className="project-header">
                <span className="project-icon">{project.icon}</span>
                <span className="project-number">0{index + 1}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-desc">{project.description}</p>
              
              {project.command && (
                <div className="terminal-install-block" onClick={(e) => e.stopPropagation()}>
                  <p className="terminal-label">Install via Windows Terminal:</p>
                  <div className="terminal-box">
                    <span className="terminal-cmd"><span>$</span> {project.command}</span>
                    <button 
                      className="terminal-copy-btn"
                      onClick={(e) => handleCopy(project.command, project.id, e)}
                      title="Copy to clipboard"
                    >
                      {copiedId === project.id ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          <span style={{ color: '#22c55e' }}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
              <div className="project-cta">
                <span>View Details</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="modal-content glass-card"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
              <div className="modal-icon">{selected.icon}</div>
              <h3 className="modal-title">{selected.title}</h3>
              <p className="modal-subtitle">{selected.subtitle}</p>
              <p className="modal-desc">{selected.longDescription}</p>
              
              {selected.command && (
                <div className="terminal-install-block" style={{ marginBottom: '24px' }}>
                  <p className="terminal-label">Install via Windows Terminal:</p>
                  <div className="terminal-box">
                    <span className="terminal-cmd"><span>$</span> {selected.command}</span>
                    <button 
                      className="terminal-copy-btn"
                      onClick={(e) => handleCopy(selected.command, `modal-${selected.id}`, e)}
                      title="Copy to clipboard"
                    >
                      {copiedId === `modal-${selected.id}` ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          <span style={{ color: '#22c55e' }}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="modal-tags">
                {selected.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
