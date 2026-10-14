import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { navigate } from '../utils/navigate';
import './Projects.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
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
  const rotateX = ((y - centerY) / centerY) * 6;
  const rotateY = ((centerX - x) / centerX) * 6;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
};

const handleTiltReset = (e) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
};

const Projects = () => {
  const [selected, setSelected] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    if (selected) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  // Display top 4 in Bento Grid initially, or all items when expanded
  const displayedProjects = showAll ? projectsData : projectsData.slice(0, 4);

  const toggleShowAll = () => {
    setShowAll((prev) => {
      const next = !prev;
      if (!next) {
        // Smoothly return focus back to Projects section when collapsing
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return next;
    });
  };

  const handleCopy = (text, id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNavigateToAllProjects = (e) => {
    e.preventDefault();
    navigate('/projects');
  };

  const getBentoClass = (index) => {
    switch (index) {
      case 0:
        return 'project-bento-tile project-bento-tile--1';
      case 1:
        return 'project-bento-tile project-bento-tile--2';
      case 2:
        return 'project-bento-tile project-bento-tile--3';
      case 3:
        return 'project-bento-tile project-bento-tile--4';
      case 4:
        return 'project-bento-tile project-bento-tile--5';
      case 5:
        return 'project-bento-tile project-bento-tile--6';
      default:
        return 'project-bento-tile project-bento-tile--standard';
    }
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
        
        {/* Bento Grid v2.0 */}
        <div className="projects-bento-grid">
          <AnimatePresence>
            {displayedProjects.map((project, index) => {
              const bentoClass = getBentoClass(index);
              return (
                <motion.div
                  key={project.id}
                  className={`project-card glass-card ${bentoClass}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
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
                      <p className="terminal-label">Install via Terminal:</p>
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
                  
                  <div className="project-cta-group">
                    {project.preLaunchUrl && (
                      <a
                        href={project.preLaunchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-cta project-cta--prelaunch"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Visit Pre-Launch</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                    <a
                      href={`/projects/${project.id}`}
                      className="project-cta"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/projects/${project.id}`);
                      }}
                    >
                      <span>{project.preLaunchUrl ? 'Specs' : 'View Architecture & Specs'}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Expand / View All CTA Button */}
        {projectsData.length > 4 && (
          <motion.div
            className="projects-more-container"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="projects-actions-row">
              <button
                onClick={toggleShowAll}
                className="btn-show-more glass-card"
                aria-expanded={showAll}
              >
                <span>{showAll ? 'Show Featured' : `View All Projects (${projectsData.length})`}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`show-more-chevron ${showAll ? 'chevron-up' : 'chevron-down'}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <a
                href="/projects"
                onClick={handleNavigateToAllProjects}
                className="btn-catalog-link"
              >
                <span>Full Technical Catalogue</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
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
              role="dialog"
              aria-modal="true"
              aria-labelledby={`project-modal-title-${selected.id}`}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close project details modal"
              >
                ✕
              </button>
              <div className="modal-icon">{selected.icon}</div>
              <h3 id={`project-modal-title-${selected.id}`} className="modal-title">{selected.title}</h3>
              <p className="modal-subtitle">{selected.subtitle}</p>
              <p className="modal-desc">{selected.longDescription}</p>
              
              {selected.command && (
                <div className="terminal-install-block" style={{ marginBottom: '24px' }}>
                  <p className="terminal-label">Install via Terminal:</p>
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

              <div className="modal-actions" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px', flexWrap: 'wrap' }}>
                <a
                  href={`/projects/${selected.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(null);
                    navigate(`/projects/${selected.id}`);
                  }}
                  className="btn btn-secondary modal-action-btn"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Full Technical Page</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                {selected.externalUrl && (
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
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
