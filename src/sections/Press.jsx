import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pressData } from '../data/pressData';
import {
  GlobeNetworkIcon,
  NewspaperIcon,
  DeviceMobileIcon,
  CodeBracketIcon,
  LightningIcon,
  PenEditorialIcon
} from '../components/TechIcons';
import './Press.css';

const renderPressIcon = (item, size = 20) => {
  if (!item) return null;
  switch (item.id) {
    case 'techyorker-feature':
      return <GlobeNetworkIcon size={size} />;
    case 'issuewire-prodigy':
      return <NewspaperIcon size={size} />;
    case 'mobilestalk-feature':
      return <DeviceMobileIcon size={size} />;
    case 'hackernoon-interview-spotlight':
    case 'geekchamp-feature':
      return <CodeBracketIcon size={size} />;
    case 'coderlegion-staff-pick':
    case 'itechguides-feature':
      return <LightningIcon size={size} />;
    case 'medium-zero-cost-ai':
    default:
      return <PenEditorialIcon size={size} />;
  }
};

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

const Press = () => {
  const [selected, setSelected] = useState(null);
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
  const displayedItems = showAll ? pressData : pressData.slice(0, 4);

  const toggleShowAll = () => {
    setShowAll((prev) => {
      const next = !prev;
      if (!next) {
        // Smoothly return focus back to Press section when collapsing
        const pressSection = document.getElementById('press');
        if (pressSection) {
          pressSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return next;
    });
  };

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
          <h2>Featured <span className="gradient-text">In</span></h2>
        </motion.div>
        
        {/* Bento Grid v2.0 */}
        <div className="press-bento-grid">
          <AnimatePresence>
            {displayedItems.map((item, index) => {
              // Assign special bento classes to the first 4 cards
              const bentoClass = index < 4 ? `press-bento-tile press-bento-tile--${index + 1}` : 'press-bento-tile press-bento-tile--standard';
              return (
                <motion.div
                  key={item.id}
                  className={`press-card glass-card ${bentoClass}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onMouseMove={handleTilt}
                  onMouseLeave={handleTiltReset}
                  onClick={() => setSelected(item)}
                  style={{ '--press-accent': item.accent }}
                >
                  <div className="press-card-accent" />
                  
                  <div className="press-header">
                    <div className="press-brand">
                      <span className="press-icon">{renderPressIcon(item, 20)}</span>
                      <div>
                        <span className="press-source">{item.source}</span>
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
                      className="press-cta-direct"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>{item.ctaText || 'Read Article'}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Expand / View All CTA Button */}
        {pressData.length > 4 && (
          <motion.div
            className="press-more-container"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <button
              onClick={toggleShowAll}
              className="btn-show-more glass-card"
              aria-expanded={showAll}
            >
              <span>{showAll ? 'Show Featured' : `View All Publications (${pressData.length})`}</span>
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
          </motion.div>
        )}

        {/* Modal Viewer */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="press-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="press-modal glass-card"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{ '--modal-accent': selected.accent }}
              >
                <div className="modal-accent-bar" />
                <button
                  className="modal-close-btn"
                  onClick={() => setSelected(null)}
                  aria-label="Close modal"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
                <div className="modal-header">
                  <div className="modal-brand">
                    <span className="modal-icon">{renderPressIcon(selected, 26)}</span>
                    <div>
                      <span className="modal-source">{selected.source}</span>
                      <span className="modal-category">{selected.category}</span>
                    </div>
                  </div>
                  <span className="modal-badge">{selected.badge}</span>
                </div>
                <h3 className="modal-title">{selected.title}</h3>
                <p className="modal-subtitle">{selected.subtitle}</p>
                <div className="modal-body">
                  <p>{selected.longDescription || selected.description}</p>
                </div>
                <div className="modal-tags">
                  {selected.tags.map((tag) => (
                    <span key={tag} className="modal-tag">{tag}</span>
                  ))}
                </div>
                <div className="modal-actions">
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-cta-primary"
                  >
                    <span>Read on {selected.source}</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                  <button
                    className="modal-cta-secondary"
                    onClick={() => setSelected(null)}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Press;
