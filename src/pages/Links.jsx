import React from 'react';
import { motion } from 'framer-motion';
import './Links.css';

const linkItems = [
  {
    title: 'Spotify Artist Profile',
    category: 'Music',
    desc: 'Official Discography & Releases',
    url: 'https://open.spotify.com/artist/57sDiEfeHnIZX2g7gvPBR2',
    icon: '🎧',
    color: '#1db954',
  },
  {
    title: 'Apple Music Profile',
    category: 'Music',
    desc: 'Stream High-Res Audio',
    url: 'https://music.apple.com/artist/1816229675',
    icon: '🍎',
    color: '#fa243c',
  },
  {
    title: 'YouTube Channel',
    category: 'Media',
    desc: '@Kxrn_Gupta · Music Videos & Beat Tapes',
    url: 'https://www.youtube.com/@Kxrn_Gupta',
    icon: '📺',
    color: '#ff0000',
  },
  {
    title: 'Instagram',
    category: 'Social',
    desc: '@kxrn_gupta · Behind the Scenes & Updates',
    url: 'https://www.instagram.com/kxrn_gupta/',
    icon: '📸',
    color: '#e1306c',
  },
  {
    title: 'DuskyMoon Productions',
    category: 'Enterprise',
    desc: 'Official Independent Music Label & Hub',
    url: 'https://duskymoon.vercel.app',
    icon: '🌙',
    color: '#3b82f6',
  },
  {
    title: 'Wikidata Entity',
    category: 'Knowledge Graph',
    desc: 'Q141046426 Official Record',
    url: 'https://www.wikidata.org/wiki/Q141046426',
    icon: '🌐',
    color: '#006699',
  },
  {
    title: 'EverybodyWiki Biography',
    category: 'Knowledge Base',
    desc: 'Kxrn Gupta Article',
    url: 'https://en.everybodywiki.com/Kxrn_Gupta',
    icon: '📖',
    color: '#9333ea',
  },
  {
    title: 'MusicBrainz Entry',
    category: 'Music Database',
    desc: 'Artist & Producer Identifier',
    url: 'https://musicbrainz.org/artist/efbc6b4f-363b-4bbd-a5db-f4d4e8817607',
    icon: '🎵',
    color: '#ba478f',
  },
  {
    title: 'GitHub Repositories',
    category: 'Engineering',
    desc: '@karan5028ji · SwarmForge, SHIVA AI & Projects',
    url: 'https://github.com/karan5028ji',
    icon: '💻',
    color: '#00c2ff',
  },
  {
    title: 'IssueWire Press Release',
    category: 'Press',
    desc: '19-Year-Old Prodigy Bridges Music & Code',
    url: 'https://www.issuewire.com/19-year-old-new-delhi-prodigy-kxrn-gupta-bridges-the-gap-between-indie-music-and-software-development-1875549335316491',
    icon: '📰',
    color: '#eab308',
  },
  {
    title: 'Medium Article',
    category: 'Publication',
    desc: 'Building Zero-Cost AI Orchestrators',
    url: 'https://medium.com/@karan5028ji/building-zero-cost-multi-agent-ai-orchestrators-local-assistants-my-journey-with-swarmforge-and-578caafb2707',
    icon: '✍️',
    color: '#10b981',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Links = () => {
  return (
    <div className="links-page">
      {/* Ambient background glows */}
      <div className="links-glow links-glow--cyan" />
      <div className="links-glow links-glow--purple" />

      <div className="links-container">
        {/* Profile Card Header */}
        <motion.header
          className="links-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="avatar-wrapper">
            <img
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Chitresh_Gupta_Kxrn_Official_Press_Photo.jpg"
              onError={(e) => { e.target.src = '/kxrn-karan-gupta-music-producer.jpeg'; }}
              alt="Kxrn (Chitresh Gupta / Karan Gupta)"
              className="links-avatar"
            />
            <div className="avatar-ring" />
            <div className="verified-badge" title="Verified Artist & Software Developer">
              ✓
            </div>
          </div>

          <h1 className="links-name">
            Kxrn <span className="links-dot">.</span>
          </h1>

          <div className="links-tagline">
            Kxrn | Developer &amp; Producer
          </div>

          <p className="links-bio">
            Building logic. Producing rhythm.<br />
            Founder of <strong>DuskyMoon Productions</strong> · Delhi, India
          </p>

          <a href="/" className="portfolio-pill">
            <span>🌐 Main Portfolio Website</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </motion.header>

        {/* Links Stack */}
        <motion.main
          className="links-stack"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {linkItems.map((item) => (
            <motion.a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="me noopener noreferrer"
              className="link-card glass-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{ '--card-accent': item.color }}
            >
              <div className="link-card-icon">{item.icon}</div>
              <div className="link-card-content">
                <div className="link-card-header">
                  <span className="link-card-title">{item.title}</span>
                  <span className="link-card-category">{item.category}</span>
                </div>
                <span className="link-card-desc">{item.desc}</span>
              </div>
              <div className="link-card-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.main>

        {/* Footer */}
        <footer className="links-footer">
          <p>&copy; {new Date().getFullYear()} Kxrn. All rights reserved.</p>
          <span className="footer-subtext">DuskyMoon Productions · New Delhi</span>
        </footer>
      </div>
    </div>
  );
};

export default Links;
