import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { musicReleases } from '../data/musicData';
import { navigate } from '../utils/navigate';
import './MusicPage.css';

const MusicPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const prevTitle = document.title;
    document.title = 'Music Discography & Audio Engineering | Kxrn';

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical ? canonical.getAttribute('href') : null;
    if (canonical) {
      canonical.setAttribute('href', 'https://kxrn.is-a.dev/music');
    }

    return () => {
      document.title = prevTitle;
      if (canonical && prevCanonical) {
        canonical.setAttribute('href', prevCanonical);
      }
    };
  }, []);

  return (
    <div className="music-page">
      {/* Visionary Architectural Spotlight */}
      <div className="music-page-spotlight" />
      <div className="music-page-beam" />

      <main className="music-page-main">
        {/* Navigation & Breadcrumb */}
        <div className="music-nav-row">
          <button
            className="back-btn"
            onClick={() => navigate('/')}
            aria-label="Back to home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Home</span>
          </button>

          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Music Discography</span>
          </nav>
        </div>

        {/* Header Hero */}
        <motion.header
          className="music-page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="music-badge-row">
            <span className="music-alias-badge">Alias: Kxrn</span>
            <span className="music-label-badge">🌙 DuskyMoon Productions</span>
          </div>

          <h1 className="music-main-title">
            Discography &amp; <span className="gradient-text">Sonic Landscapes</span>
          </h1>

          <p className="music-main-subtitle">
            Original compositions, atmospheric sound design, and precision audio engineering produced by <strong>Kxrn Gupta</strong> under <strong>DuskyMoon Productions</strong>.
          </p>
        </motion.header>

        {/* Audio Engineering Philosophy Card */}
        <motion.section
          className="engineering-philosophy-card glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <div className="philosophy-icon">🎛️</div>
          <div className="philosophy-content">
            <h2 className="philosophy-title">Studio Production &amp; Mastering DNA</h2>
            <p className="philosophy-desc">
              Every production is engineered in-house inside FL Studio 21 with custom DSP dynamics chains. From multi-band sidechain compression and vocal formant tuning to analog tape saturation and precision LUFS loudness normalization, each release balances acoustic warmth with modern club-ready low-end clarity.
            </p>
          </div>
        </motion.section>

        {/* Releases Section */}
        <section className="music-releases-section">
          <h2 className="releases-heading">Official Releases</h2>

          <div className="releases-list">
            {musicReleases.map((release) => (
              <motion.article
                key={release.id}
                className="release-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
              >
                <div className="release-layout">
                  {/* Left: Art & Quick Facts */}
                  <div className="release-art-column">
                    <div className="art-frame">
                      <img
                        src={release.coverArt}
                        alt={`${release.title} cover art by Kxrn`}
                        className="release-art-img"
                        loading="lazy"
                      />
                      <span className="art-pill">{release.statusBadge}</span>
                    </div>

                    <div className="release-meta-box">
                      <div className="meta-row">
                        <span className="meta-k">Released:</span>
                        <span className="meta-v">{release.releaseDate || release.releaseYear}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-k">Genre:</span>
                        <span className="meta-v">{release.genre}</span>
                      </div>
                      <div className="meta-row">
                        <span className="meta-k">Label:</span>
                        <span className="meta-v">{release.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Detailed Credits & Streaming Links */}
                  <div className="release-info-column">
                    <div className="release-title-row">
                      <h3 className="release-title">{release.title}</h3>
                      <span className="release-badge-pill">{release.subtitle}</span>
                    </div>

                    <p className="release-desc">{release.description}</p>
                    
                    {release.audioEngineeringNotes && (
                      <div className="release-dsp-note">
                        <strong>DSP &amp; Mix Engineering:</strong> {release.audioEngineeringNotes}
                      </div>
                    )}

                    {/* Official Credits Matrix */}
                    <div className="credits-section">
                      <h4 className="credits-title">Production &amp; Creative Credits</h4>
                      <dl className="credits-grid">
                        {release.credits.map((c) => (
                          <div key={c.role} className="credit-item">
                            <dt className="credit-role">{c.role}</dt>
                            <dd className="credit-name">{c.name}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    {/* Streaming Platforms Grid */}
                    <div className="streaming-actions">
                      <h4 className="streaming-title">Stream &amp; Verify Across Platforms</h4>
                      <div className="streaming-grid">
                        {release.streamingLinks.map((link) => (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="streaming-btn glass-card"
                            style={{ '--stream-accent': link.accent }}
                          >
                            <span className="streaming-icon">{link.icon}</span>
                            <span className="streaming-name">{link.ctaText}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="7" y1="17" x2="17" y2="7" />
                              <polyline points="7 7 17 7 17 17" />
                            </svg>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Label & Future Releases Teaser */}
        <motion.section
          className="upcoming-sessions-card glass-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="upcoming-tag">Studio Roadmap</span>
          <h3 className="upcoming-title">Upcoming Releases &amp; Beat Tapes</h3>
          <p className="upcoming-desc">
            Currently in pre-production on multiple instrumentals, Indian lo-fi chillhop beats, and cinematic background scores under DuskyMoon Productions. Collaborations with independent vocalists and instrumentalists are ongoing.
          </p>
          <a href="/#contact" onClick={(e) => { e.preventDefault(); navigate('/#contact'); }} className="btn btn-secondary">
            Inquire for Studio Collaboration
          </a>
        </motion.section>
      </main>
    </div>
  );
};

export default MusicPage;
