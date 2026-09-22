import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import './ProjectsPage.css';

const categories = ['All', 'System & Utility', 'AI & Systems', 'Web & Design', 'Enterprise & Media', 'Music & Sound'];

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
};

const handleTiltReset = (e) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
};

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    if (selected) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const handleCopy = (text, id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="projects-page">
      {/* Refined De-AI Architectural Lighting */}
      <div className="projects-page-spotlight" />
      <div className="projects-page-horizon-beam" />

      {/* Main Content */}
      <main className="projects-page-main">
        <motion.div
          className="projects-page-title"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <h1 className="projects-page-h1">
            All Projects &amp; <span className="gradient-text">Architecture</span>
          </h1>
          <p className="projects-page-subtitle">
            A comprehensive repository of system utilities, autonomous AI frameworks, 3D web experiences, and sonic engineering.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="category-filters"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="all-projects-grid"
          initial="hidden"
          animate="visible"
          key={activeCategory}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="all-project-card glass-card"
              custom={index * 0.1}
              variants={cardVariants}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltReset}
              onClick={() => setSelected(project)}
              style={{ '--project-accent': project.accent }}
            >
              <div className="project-card-accent" />
              <div className="project-header">
                <span className="project-icon">{project.icon}</span>
                <span className="project-category-badge">{project.category}</span>
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
                <span>View Full Details</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Detail Modal with Direct Action Button */}
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
              role="dialog"
              aria-modal="true"
              aria-labelledby={`all-project-modal-${selected.id}`}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ '--project-accent': selected.accent }}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close project details modal"
              >
                ✕
              </button>
              <div className="modal-icon">{selected.icon}</div>
              <h3 id={`all-project-modal-${selected.id}`} className="modal-title">{selected.title}</h3>
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

              <div className="modal-tags" style={{ marginBottom: selected.externalUrl ? '24px' : '0' }}>
                {selected.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>

              {/* Live Project CTA Button */}
              {selected.externalUrl && (
                <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                  <a
                    href={selected.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary modal-action-btn"
                  >
                    <span>{selected.ctaText || 'Visit Project'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
