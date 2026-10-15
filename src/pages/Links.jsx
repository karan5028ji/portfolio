import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigate } from '../utils/navigate';
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
    groupTitle: 'FEATURED ARCHITECTURES & SYSTEMS',
    items: [
      {
        title: 'tauri-plugin-sync',
        desc: 'Enterprise Local-First SQLite Sync Engine for Tauri v2',
        url: '/projects/tauri-plugin-sync',
        icon: '🔄',
        internal: true,
      },
      {
        title: 'Win-Optimizer-Pro',
        desc: 'Published in Microsoft winget Registry (C++ Win32)',
        url: '/projects/win-optimizer-pro',
        icon: '⚡',
        internal: true,
      },
      {
        title: 'SwarmForge',
        desc: 'Autonomous Multi-Agent AI Framework · CoderLegion Pick',
        url: '/projects/swarmforge',
        icon: '🐝',
        internal: true,
      },
      {
        title: 'DuskyMoon Productions',
        desc: 'Creative Solutions Hub & Independent Music Label',
        url: '/projects/duskymoon-productions',
        icon: '🌙',
        internal: true,
      },
      {
        title: 'Noir Studio (NoirWear)',
        desc: 'Luxury Clothing Atelier & Child Enterprise',
        url: '/projects/noir-studio',
        icon: '🧥',
        internal: true,
      },
      {
        title: 'Sapne ft. Ankit',
        desc: 'Official Single Release & DSP Engineering Master',
        url: '/projects/sapne',
        icon: '🎵',
        internal: true,
      },
    ],
  },
  {
    groupTitle: 'ENTERPRISE & HUBS',
    items: [
      {
        title: 'DuskyMoon Productions Hub',
        desc: 'Official Creative Studio Portal',
        url: 'https://duskymoon.vercel.app',
        icon: '🌙',
      },
      {
        title: 'Noir Studio (NoirWear)',
        desc: 'Child Enterprise · Visit Pre-Launch ↗',
        url: 'https://www.noirwear.in',
        icon: '✨',
      },
      {
        title: 'Gupta Ventures (Crunchbase)',
        desc: 'Parent Business Entity Profile',
        url: 'https://www.crunchbase.com/organization/gupta-ventures',
        icon: '💼',
      },
      {
        title: 'GitHub Repositories',
        desc: '@karan5028ji · SwarmForge & Open Source',
        url: 'https://github.com/karan5028ji',
        icon: '💻',
      },
    ],
  },
  {
    groupTitle: 'DEVELOPER & STUDENT LABS',
    items: [
      {
        title: 'Free $100 Azure Cloud',
        desc: 'Claim Annual Student Cloud Compute (No CC)',
        url: 'https://azure.microsoft.com/free/students?wt.mc_id=studentamb_664130',
        icon: '🚀',
      },
      {
        title: 'Microsoft Copilot Studio Sandbox',
        desc: 'Interactive Lab to Build & Certify AI Agents',
        url: 'https://learn.microsoft.com/credentials/applied-skills/build-an-agent-in-microsoft-copilot-studio/?wt.mc_id=studentamb_664130',
        icon: '🤖',
      },
      {
        title: 'Visual Studio Code & Cloud Tools',
        desc: 'Modern Remote Containers & Extensions',
        url: 'https://code.visualstudio.com/?wt.mc_id=studentamb_664130',
        icon: '💻',
      },
    ],
  },
  {
    groupTitle: 'DATABASE & PRESS',
    items: [
      {
        title: 'Google Knowledge Panel',
        desc: 'Official Google Entity Panel',
        url: 'https://share.google/5AfjCZgxu7EtcNFup',
        icon: '🌐',
      },
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
        title: 'Discogs Artist Profile',
        desc: 'Official Discography (ID: 18300963)',
        url: 'https://www.discogs.com/artist/18300963-kxrn-gupta',
        icon: '💿',
      },
      {
        title: 'Musixmatch Verified Artist',
        desc: 'Official Lyrics & Distribution Hub',
        url: 'https://www.musixmatch.com/artist/kxrn-gupta',
        icon: '✍️',
      },
      {
        title: 'ORCID Verified Researcher',
        desc: '0009-0005-5460-2941 · Academic Record',
        url: 'https://orcid.org/0009-0005-5460-2941',
        icon: '🔬',
      },
      {
        title: 'Zenodo Research Record',
        desc: 'Open-Access Publication & Archival',
        url: 'https://zenodo.org/records/22647525',
        icon: '📄',
      },
      {
        title: 'HackerNoon Writers Spotlight',
        desc: 'Behind the Code · Official Editorial Feature',
        url: 'https://hackernoon.com/behind-the-code-how-a-19-year-old-music-producer-builds-zero-cost-ai-systems',
        icon: '💚',
      },
      {
        title: 'IBM Bob 2.0 Hackathon Project',
        desc: 'Official Lablab.ai Submission & Architecture',
        url: 'https://lablab.ai/ai-hackathons/ibm-bob-2-hackathon/swarmforge/swarmforge-agentic-ai-orchestration-with-bob',
        icon: '🏆',
      },
      {
        title: 'CoderLegion Technical Article',
        desc: 'Staff Pick · SwarmForge & Multi-Agent AI',
        url: 'https://coderlegion.com/27523/building-zero-cost-multi-agent-orchestrators-local-assistants-journey-with-swarmforge',
        icon: '⚡',
      },
      {
        title: 'Medium Publication',
        desc: 'Building Zero-Cost AI Orchestrators',
        url: 'https://medium.com/@karan5028ji/building-zero-cost-multi-agent-ai-orchestrators-local-assistants-my-journey-with-swarmforge-and-578caafb2707',
        icon: '✍️',
      },
      {
        title: 'IssueWire Press Release',
        desc: '19-Year-Old Prodigy Article',
        url: 'https://www.issuewire.com/19-year-old-new-delhi-prodigy-kxrn-gupta-bridges-the-gap-between-indie-music-and-software-development-1875549335316491',
        icon: '📰',
      },
      {
        title: 'TechYorker Editorial Feature',
        desc: 'What to Know About the Music Producer Building Local AI',
        url: 'https://techyorker.com/karan-gupta-what-to-know-about-the-music-producer-building-local-ai/',
        icon: '🌐',
      },
      {
        title: 'iTechGuides Tech Analysis',
        desc: 'Kxrn’s Local AI Work: Music, Software & Zero-Cost',
        url: 'https://www.itechguides.com/kxrn-local-ai-work/',
        icon: '⚡',
      },
      {
        title: 'GeekChamp Featured Story',
        desc: 'Local AI on Limited Resources: Connecting Code & Sound',
        url: 'https://www.geekchamp.com/local-ai-on-limited-resources-how-music-producer-kxrn-connects-code-and-sound/',
        icon: '💻',
      },
      {
        title: 'MobilesTalk Tech Profile',
        desc: 'Building Local AI on a Budget Retrospective',
        url: 'https://mobilestalk.net/tech/kxrn-profile-building-local-ai/',
        icon: '📱',
      },
      {
        title: 'Tauri Plugins Global Leaderboard',
        desc: 'Rank #6 Worldwide / #4 Human Worldwide Contributor',
        url: 'https://github.com/tauri-apps/plugins-workspace/graphs/contributors',
        icon: '🦀',
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
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Links & Identifiers | Kxrn';

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical ? canonical.getAttribute('href') : null;
    if (canonical) {
      canonical.setAttribute('href', 'https://kxrn.is-a.dev/links');
    }

    return () => {
      document.title = prevTitle;
      if (canonical && prevCanonical) {
        canonical.setAttribute('href', prevCanonical);
      }
    };
  }, []);

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
            <div className="verified-badge" title="Official Artist & Developer">
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

          <div className="links-nav-row" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="portfolio-pill">
              <span>Portfolio Home</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
            <a href="/projects" onClick={(e) => { e.preventDefault(); navigate('/projects'); }} className="portfolio-pill">
              <span>All Projects</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
            <a href="/music" onClick={(e) => { e.preventDefault(); navigate('/music'); }} className="portfolio-pill">
              <span>Music Discography</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
          </div>
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
                      target={item.internal ? undefined : '_blank'}
                      rel={item.internal ? undefined : 'me noopener noreferrer'}
                      onClick={(e) => {
                        if (item.internal) {
                          e.preventDefault();
                          navigate(item.url);
                        }
                      }}
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
