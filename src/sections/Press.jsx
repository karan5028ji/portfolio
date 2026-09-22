import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pressData } from '../data/pressData';
import './Press.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
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

const Press = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelected(null);
    };
    if (selected) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  return (
    <section id="press" className="section press">
      <div className="container">
        <motion.div
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
        >
          <span className="section-label">Media &amp; Publications</span>
          <h2>Featured <span className="gradient-text">In</span></h2>
        </motion.div>
        
        <div className="press-grid">
          {pressData.map((item, index) => (
            <motion.div
              key={item.id}
              className="press-card glass-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={index * 0.1}
              variants={fadeInUp}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltReset}
              onClick={() => setSelected(item)}
              style={{ '--press-accent': item.accent }}
            >
              <div className="press-card-accent" />
              
              <div className="press-header">
                <div className="press-brand">
                  <span className="press-icon">{item.icon}</span>
                  <div>
                    <span className="press-source">{item.source}</span>
                    <span className="press-index">0{index + 1}</span>
                  </div>
                </div>
                <span className="press-badge">{item.badge}</span>
              </div>

              <h3 className="press-title">{item.title}</h3>
              <p className="press-subtitle">{item.subtitle}</p>
              <p className="press-desc">{item.description}</p>
              
              <div className="press-tags">
                {item.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="press-tag">{tag}</span>
                ))}
              </div>

              <div className="press-footer">
                <div className="press-cta-detail">
                  <span>View Overview</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-link btn btn-secondary"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>{item.ctaText}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glassmorphic Synopsis Modal */}
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
              aria-labelledby={`press-modal-title-${selected.id}`}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ '--press-accent': selected.accent }}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close publication details modal"
              >
                ✕
              </button>
              
              <div className="modal-header-row">
                <div className="modal-icon">{selected.icon}</div>
                <div className="modal-badge-group">
                  <span className="press-source-label">{selected.source}</span>
                  <span className="press-badge">{selected.badge}</span>
                </div>
              </div>

              <h3 id={`press-modal-title-${selected.id}`} className="modal-title">{selected.title}</h3>
              <p className="modal-subtitle">{selected.subtitle}</p>
              <p className="modal-desc">{selected.longDescription}</p>

              <div className="modal-tags" style={{ marginBottom: '28px' }}>
                {selected.tags.map((tag) => (
                  <span key={tag} className="press-tag">{tag}</span>
                ))}
              </div>

              <div className="modal-actions">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary modal-action-btn"
                >
                  <span>Open {selected.source} Feature</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Press;
