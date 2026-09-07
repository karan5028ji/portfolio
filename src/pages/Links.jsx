import React from 'react';
import { motion } from 'framer-motion';
import './Links.css';

const linkGroups = [
  {
    groupTitle: 'LISTEN & CONNECT',
    items: [
      {
        title: 'Spotify Artist Profile',
        desc: 'Official Discography & Releases',
        url: 'https://open.spotify.com/artist/57sDiEfeHnIZX2g7gvPBR2',
        icon: '🎧',
      },
      {
        title: 'Apple Music Profile',
        desc: 'Stream High-Res Audio',
        url: 'https://music.apple.com/artist/1816229675',
        icon: '🍎',
      },
      {
        title: 'YouTube Channel',
        desc: '@Kxrn_Gupta · Videos & Beats',
        url: 'https://www.youtube.com/@Kxrn_Gupta',
        icon: '📺',
      },
      {
        title: 'Instagram Profile',
        desc: '@kxrn_gupta · Behind the Scenes',
        url: 'https://www.instagram.com/kxrn_gupta/',
        icon: '📸',
      },
    ],
  },
  {
    groupTitle: 'ENTERPRISE',
    items: [
      {
        title: 'DuskyMoon Productions',
        desc: 'Independent Music Label & Hub',
        url: 'https://duskymoon.vercel.app',
        icon: '🌙',
      },
      {
        title: 'Gupta Ventures (Crunchbase)',
        desc: 'Parent Business Entity Profile',
        url: 'https://www.crunchbase.com/organization/gupta-ventures',
        icon: '💼',
      },
      {
        title: 'GitHub Repositories',
        desc: '@karan5028ji · SwarmForge & AI',
        url: 'https://github.com/karan5028ji',
        icon: '💻',
      },
    ],
  },
  {
    groupTitle: 'DATABASE & PRESS',
    items: [
      {
        title: 'Crunchbase Person Profile',
        desc: 'Chitresh Gupta Executive Profile',
        url: 'https://www.crunchbase.com/person/chitresh-gupta-1cce',
        icon: '👤',
      },
      {
        title: 'Wikidata Entity',
        desc: 'Q141046426 Official Record',
        url: 'https://www.wikidata.org/wiki/Q141046426',
        icon: '🌐',
      },
      {
        title: 'EverybodyWiki Biography',
        desc: 'Kxrn Gupta Article',
        url: 'https://en.everybodywiki.com/Kxrn_Gupta',
        icon: '📖',
      },
      {
        title: 'MusicBrainz Entry',
        desc: 'Artist & Producer Identifier',
        url: 'https://musicbrainz.org/artist/efbc6b4f-363b-4bbd-a5db-f4d4e8817607',
        icon: '🎵',
      },
      {
        title: 'Zenodo Research Record',
        desc: 'Open-Access Publication & Archival',
        url: 'https://zenodo.org/records/22647525',
        icon: '🔬',
      },
      {
        title: 'IssueWire Press Release',
        desc: '19-Year-Old Prodigy Article',
        url: 'https://www.issuewire.com/19-year-old-new-delhi-prodigy-kxrn-gupta-bridges-the-gap-between-indie-music-and-software-development-1875549335316491',
        icon: '📰',
      },
      {
        title: 'Medium Publication',
        desc: 'Building Zero-Cost AI Orchestrators',
        url: 'https://medium.com/@karan5028ji/building-zero-cost-multi-agent-ai-orchestrators-local-assistants-my-journey-with-swarmforge-and-578caafb2707',
        icon: '✍️',
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const Links = () => {
  return (
    <div className="links-page">
      {/* Subtle VisionOS background glow */}
      <div className="links-glow links-glow--ambient" />

      <div className="links-container">
        {/* Profile Card Header */}
        <motion.header
          className="links-header"
          initial={{ opacity: 0, y: -16 }}
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
            <div className="verified-badge" title="Verified Artist & Developer">
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </a>
        </motion.header>

        {/* Links Stack Grouped (Apple iOS Settings Inset Box Style) */}
        <motion.main
          className="links-stack"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {linkGroups.map((group) => (
            <div key={group.groupTitle} className="links-group">
              <div className="group-title">
                <span>{group.groupTitle}</span>
              </div>
              <div className="apple-group-box">
                {group.items.map((item, idx) => (
                  <React.Fragment key={item.title}>
                    <motion.a
                      href={item.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="apple-link-row"
                      variants={itemVariants}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="apple-row-icon">{item.icon}</div>
                      <div className="apple-row-content">
                        <span className="apple-row-title">{item.title}</span>
                        <span className="apple-row-desc">{item.desc}</span>
                      </div>
                      <div className="apple-row-chevron">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </motion.a>
                    {idx < group.items.length - 1 && <div className="apple-row-divider" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
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
