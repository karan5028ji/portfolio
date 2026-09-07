import React from 'react';
import { motion } from 'framer-motion';
import './Press.css';

const pressItems = [
  {
    id: 1,
    source: 'IssueWire',
    title: '19-Year-Old Prodigy Bridges Gap Between Music & Code',
    description: 'Featured press coverage detailing Kxrn (Chitresh Gupta / Karan Gupta)\'s vision across independent music production and software architecture.',
    url: 'https://www.issuewire.com/19-year-old-new-delhi-prodigy-kxrn-gupta-bridges-the-gap-between-indie-music-and-software-development-1875549335316491',
    icon: '📰',
    badge: 'Official Press Release',
  },
  {
    id: 2,
    source: 'Medium',
    title: 'Building Zero-Cost Multi-Agent AI Orchestrators',
    description: 'In-depth engineering article on building zero-cost multi-agent AI orchestrators, local assistants, SwarmForge, and system automation.',
    url: 'https://medium.com/@karan5028ji/building-zero-cost-multi-agent-ai-orchestrators-local-assistants-my-journey-with-swarmforge-and-578caafb2707',
    icon: '✍️',
    badge: 'Technical Article',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Press = () => {
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
          <span className="section-label">Media &amp; Press</span>
          <h2>Featured <span className="gradient-text">In</span></h2>
        </motion.div>
        
        <div className="press-grid">
          {pressItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="press-card glass-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={index * 0.15}
              variants={fadeInUp}
            >
              <div className="press-header">
                <span className="press-icon">{item.icon}</span>
                <span className="press-badge">{item.badge}</span>
              </div>
              <span className="press-source">{item.source}</span>
              <h3 className="press-title">{item.title}</h3>
              <p className="press-desc">{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="press-link btn btn-secondary"
              >
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Press;
