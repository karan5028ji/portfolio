import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import { navigate } from '../utils/navigate';
import './ProjectDetailPage.css';

const ProjectDetailPage = ({ projectId }) => {
  const [copied, setCopied] = useState(false);

  const project = projectsData.find((p) => p.id === projectId);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const prevTitle = document.title;
    if (project) {
      document.title = `${project.title} | Technical Architecture & Specs | Kxrn`;
    }

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical ? canonical.getAttribute('href') : null;
    if (canonical && project) {
      canonical.setAttribute('href', `https://kxrn.is-a.dev/projects/${project.id}`);
    }

    return () => {
      document.title = prevTitle;
      if (canonical && prevCanonical) {
        canonical.setAttribute('href', prevCanonical);
      }
    };
  }, [projectId, project]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!project) {
    return (
      <div className="project-detail-page">
        <main className="project-detail-main not-found-view">
          <h2>Project Not Found</h2>
          <p>The requested architecture or project repository could not be located.</p>
          <button className="btn btn-primary" onClick={() => navigate('/projects')}>
            ← Back to All Projects
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Architectural Lighting */}
      <div className="project-detail-spotlight" />
      <div className="project-detail-beam" />

      <main className="project-detail-main">
        {/* Navigation & Breadcrumb */}
        <div className="project-detail-nav">
          <button
            className="back-btn"
            onClick={() => navigate('/projects')}
            aria-label="Back to projects catalogue"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>All Projects</span>
          </button>

          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <span className="crumb-sep">/</span>
            <a href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects'); }}>Projects</a>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{project.title}</span>
          </nav>
        </div>

        {/* Header Hero */}
        <motion.header
          className="project-detail-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="header-badge-row">
            <span className="project-category-badge">{project.category}</span>
            {project.statusBadge && (
              <span className="project-status-pill">
                <span className="status-dot" />
                {project.statusBadge}
              </span>
            )}
          </div>

          <div className="project-title-cluster">
            <span className="project-main-icon">{project.icon}</span>
            <h1 className="project-main-title">{project.title}</h1>
          </div>

          <p className="project-main-subtitle">{project.subtitle}</p>

          {project.role && (
            <div className="project-role-badge">
              <span className="role-label">Role:</span>
              <strong className="role-val">{project.role}</strong>
            </div>
          )}
        </motion.header>

        {/* Install Block (CLI) */}
        {project.command && (
          <motion.section
            className="project-terminal-section glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            aria-label="Installation Command"
          >
            <div className="terminal-header">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title-text">Windows Terminal / PowerShell</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-code">
                <span className="terminal-prompt">$</span>
                <code>{project.command}</code>
              </div>
              <button
                className="btn-terminal-copy"
                onClick={() => handleCopy(project.command)}
                title="Copy install command"
              >
                {copied ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    <span style={{ color: '#22c55e' }}>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </motion.section>
        )}

        {/* Main Content Grid: Overview & Specs */}
        <div className="project-content-grid">
          {/* Left Column: Deep Overview & Highlights */}
          <div className="project-column-primary">
            <motion.section
              className="detail-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="detail-section-title">Architecture &amp; Overview</h2>
              <p className="detail-paragraph">{project.overview || project.longDescription}</p>
            </motion.section>

            {project.highlights && (
              <motion.section
                className="detail-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                <h2 className="detail-section-title">Engineering Highlights</h2>
                <ul className="highlights-list">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="highlight-item">
                      <span className="highlight-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {project.timeline && (
              <motion.section
                className="detail-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h2 className="detail-section-title">Development Milestones</h2>
                <div className="timeline-flow">
                  {project.timeline.map((t, idx) => (
                    <div key={idx} className="timeline-node">
                      <div className="timeline-pin" />
                      <div className="timeline-info">
                        <div className="timeline-version-row">
                          <strong className="timeline-version">{t.version}</strong>
                          <span className="timeline-date">{t.date}</span>
                        </div>
                        <p className="timeline-desc">{t.milestone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Right Column: Quick Specs & Meta */}
          <motion.aside
            className="project-column-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {project.image && (
              <div className="cover-art-card glass-card" style={{ padding: '12px', marginBottom: '24px', overflow: 'hidden', textAlign: 'center' }}>
                <img
                  src={project.image}
                  alt={`${project.title} artwork`}
                  style={{ width: '100%', borderRadius: '12px', display: 'block', aspectRatio: '1/1', objectFit: 'cover' }}
                />
              </div>
            )}

            {project.specs && (
              <div className="specs-card glass-card">
                <h3 className="specs-title">Technical Specifications</h3>
                <dl className="specs-dl">
                  {Object.entries(project.specs).map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <dt className="spec-label">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</dt>
                      <dd className="spec-value">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="tags-card glass-card">
              <h3 className="specs-title">Keywords &amp; Domain</h3>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>

            {project.externalUrl && (
              <div className="action-card glass-card">
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-external-action"
                >
                  <span>{project.ctaText || 'Open External Resource'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            )}
          </motion.aside>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetailPage;
