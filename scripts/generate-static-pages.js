import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projectsData } from '../src/data/projectsData.js';
import { musicReleases } from '../src/data/musicData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

// --- Helper Functions to Generate Rich Semantic HTML for Pre-Rendering ---

function generateProjectDetailHtml(project) {
  const relatedProjects = projectsData
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const highlightsHtml = project.highlights && project.highlights.length > 0
    ? `<section class="detail-card">
        <h2>Engineering Highlights</h2>
        <ul>
          ${project.highlights.map((h) => `<li>${h}</li>`).join('\n          ')}
        </ul>
      </section>`
    : '';

  const timelineHtml = project.timeline && project.timeline.length > 0
    ? `<section class="detail-card">
        <h2>Development Milestones</h2>
        <div>
          ${project.timeline.map((t) => `
            <div>
              <strong>${t.version} (${t.date})</strong>: ${t.milestone}
            </div>
          `).join('\n          ')}
        </div>
      </section>`
    : '';

  const specsHtml = project.specs
    ? `<aside class="specs-card">
        <h3>Technical Specifications</h3>
        <dl>
          ${Object.entries(project.specs).map(([k, v]) => `
            <div>
              <dt><strong>${k.replace(/([A-Z])/g, ' $1').toUpperCase()}</strong></dt>
              <dd>${v}</dd>
            </div>
          `).join('\n          ')}
        </dl>
      </aside>`
    : '';

  const commandHtml = project.command
    ? `<section class="project-terminal-section">
        <p><strong>Installation via Terminal:</strong></p>
        <pre><code>$ ${project.command}</code></pre>
      </section>`
    : '';

  const tagsHtml = project.tags && project.tags.length > 0
    ? `<div class="tags-card">
        <h3>Keywords &amp; Domain</h3>
        <div>
          ${project.tags.map((t) => `<span class="project-tag" style="display:inline-block; margin:2px 4px; padding:3px 8px; border:1px solid #333; border-radius:12px;">${t}</span>`).join('\n          ')}
        </div>
      </div>`
    : '';

  const externalCtaHtml = project.externalUrl
    ? `<div class="action-card" style="margin-top:16px;">
        <a href="${project.externalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          ${project.ctaText || 'Open External Resource'} &rarr;
        </a>
      </div>`
    : '';

  const relatedHtml = `
    <section class="related-projects-section" style="margin-top:40px; padding:24px; border-top:1px solid rgba(255,255,255,0.1);">
      <h2>Explore Related Architectures &amp; Works</h2>
      <p>Discover other systems, frameworks, and creative productions engineered by Kxrn.</p>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:16px; margin-top:16px;">
        ${relatedProjects.map((rel) => `
          <div style="padding:16px; border:1px solid rgba(255,255,255,0.1); border-radius:8px;">
            <span style="font-size:0.75rem; text-transform:uppercase; color:#38bdf8;">${rel.category}</span>
            <h3 style="margin:4px 0 8px;"><a href="/projects/${rel.id}" style="color:#ffffff; text-decoration:none;">${rel.title}</a></h3>
            <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:12px;">${rel.subtitle}</p>
            <a href="/projects/${rel.id}" style="color:#38bdf8; font-size:0.85rem; font-weight:600;">Inspect Specs &rarr;</a>
          </div>
        `).join('\n        ')}
      </div>
      <div style="margin-top:24px; padding-top:16px; border-top:1px solid rgba(255,255,255,0.06); font-size:0.85rem;">
        <strong>Global Navigation Hub:</strong>
        <a href="/" style="margin: 0 8px; color:#94a3b8;">Portfolio Home</a> &bull;
        <a href="/projects" style="margin: 0 8px; color:#94a3b8;">All Projects (${projectsData.length})</a> &bull;
        <a href="/music" style="margin: 0 8px; color:#94a3b8;">Music Discography</a> &bull;
        <a href="/links" style="margin: 0 8px; color:#94a3b8;">Links &amp; Official Identifiers</a>
      </div>
    </section>
  `;

  return `
    <article class="project-detail-page" style="max-width:1200px; margin:0 auto; padding:100px 24px 80px;">
      <nav aria-label="Breadcrumb" style="margin-bottom:24px; font-size:0.85rem;">
        <a href="/" style="color:#94a3b8;">Home</a> /
        <a href="/projects" style="color:#94a3b8;">Projects</a> /
        <span style="color:#f8fafc; font-weight:600;">${project.title}</span>
      </nav>

      <header style="margin-bottom:32px;">
        <div style="display:flex; gap:10px; align-items:center; margin-bottom:12px;">
          <span style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); color:#38bdf8; padding:3px 10px; border-radius:12px; font-size:0.8rem; font-weight:600;">${project.category}</span>
          ${project.statusBadge ? `<span style="background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22c55e; padding:3px 10px; border-radius:12px; font-size:0.8rem; font-weight:600;">${project.statusBadge}</span>` : ''}
        </div>
        <h1 style="font-size:2.5rem; font-weight:800; margin:0 0 8px; color:#ffffff;">${project.title}</h1>
        <p style="font-size:1.2rem; color:#38bdf8; margin:0 0 16px;">${project.subtitle}</p>
        ${project.role ? `<p style="font-size:0.9rem; color:#94a3b8;"><strong>Role:</strong> ${project.role}</p>` : ''}
      </header>

      ${commandHtml}

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:32px; margin-top:24px;">
        <div>
          <section class="detail-card" style="margin-bottom:24px;">
            <h2>Architecture &amp; Overview</h2>
            <p style="line-height:1.8; color:#cbd5e1;">${project.overview || project.longDescription}</p>
          </section>
          ${highlightsHtml}
          ${timelineHtml}
        </div>
        <div>
          ${specsHtml}
          ${tagsHtml}
          ${externalCtaHtml}
        </div>
      </div>

      ${relatedHtml}
    </article>
  `;
}

function generateAllProjectsHtml() {
  return `
    <main class="projects-page" style="max-width:1200px; margin:0 auto; padding:100px 24px 80px;">
      <header style="margin-bottom:40px; text-align:center;">
        <h1 style="font-size:2.8rem; font-weight:800; color:#ffffff; margin-bottom:12px;">
          All Projects &amp; <span style="background:linear-gradient(135deg,#38bdf8,#818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Architecture</span>
        </h1>
        <p style="font-size:1.1rem; color:#94a3b8; max-width:680px; margin:0 auto;">
          A comprehensive repository of system utilities, autonomous AI frameworks, 3D web experiences, and sonic engineering by Kxrn (Karan Gupta / Chitresh Gupta).
        </p>
      </header>

      <section style="display:grid; grid-template-columns:repeat(auto-fill, minmax(340px, 1fr)); gap:24px;">
        ${projectsData.map((project) => `
          <article style="padding:28px; border:1px solid rgba(255,255,255,0.1); border-radius:14px; background:rgba(15,15,25,0.8);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-size:1.5rem;">${project.icon}</span>
              <span style="font-size:0.75rem; text-transform:uppercase; color:#38bdf8; background:rgba(56,189,248,0.1); padding:2px 8px; border-radius:8px;">${project.category}</span>
            </div>
            <h2 style="font-size:1.4rem; font-weight:700; margin:0 0 6px; color:#ffffff;">
              <a href="/projects/${project.id}" style="color:#ffffff; text-decoration:none;">${project.title}</a>
            </h2>
            <p style="font-size:0.85rem; color:#38bdf8; margin:0 0 12px; font-weight:500;">${project.subtitle}</p>
            <p style="font-size:0.9rem; color:#94a3b8; line-height:1.6; margin-bottom:16px;">${project.description}</p>
            ${project.command ? `<pre style="padding:8px 12px; background:rgba(0,0,0,0.5); border:1px solid rgba(255,255,255,0.08); border-radius:6px; font-size:0.8rem; color:#4ade80; margin-bottom:16px; overflow-x:auto;"><code>$ ${project.command}</code></pre>` : ''}
            <div style="margin-bottom:20px;">
              ${project.tags.map((t) => `<span style="display:inline-block; margin:2px; padding:2px 8px; font-size:0.75rem; border:1px solid rgba(255,255,255,0.08); border-radius:12px; color:#64748b;">${t}</span>`).join('')}
            </div>
            <div style="display:flex; gap:12px; align-items:center;">
              <a href="/projects/${project.id}" style="color:#38bdf8; font-size:0.9rem; font-weight:600; text-decoration:none;">View Architecture &amp; Specs &rarr;</a>
              ${project.externalUrl ? `<a href="${project.externalUrl}" target="_blank" rel="noopener noreferrer" style="color:#94a3b8; font-size:0.85rem; margin-left:auto;">${project.ctaText || 'External Link'} &nearr;</a>` : ''}
            </div>
          </article>
        `).join('\n        ')}
      </section>

      <footer style="margin-top:60px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.1); text-align:center; font-size:0.9rem; color:#94a3b8;">
        <nav aria-label="Catalogue Footer Navigation">
          <a href="/" style="color:#38bdf8; margin:0 10px;">Portfolio Home</a> &bull;
          <a href="/music" style="color:#38bdf8; margin:0 10px;">Music Discography</a> &bull;
          <a href="/links" style="color:#38bdf8; margin:0 10px;">Links &amp; Official Identifiers</a>
        </nav>
      </footer>
    </main>
  `;
}

function generateMusicHtml() {
  return `
    <main class="music-page" style="max-width:1200px; margin:0 auto; padding:100px 24px 80px;">
      <nav aria-label="Breadcrumb" style="margin-bottom:24px; font-size:0.85rem;">
        <a href="/" style="color:#94a3b8;">Home</a> /
        <span style="color:#f8fafc; font-weight:600;">Music Discography</span>
      </nav>

      <header style="margin-bottom:40px;">
        <div style="display:flex; gap:10px; margin-bottom:12px;">
          <span style="background:rgba(236,72,153,0.1); border:1px solid rgba(236,72,153,0.3); color:#ec4899; padding:3px 10px; border-radius:12px; font-size:0.8rem; font-weight:600;">Alias: Kxrn</span>
          <span style="background:rgba(59,130,246,0.1); border:1px solid rgba(59,130,246,0.3); color:#3b82f6; padding:3px 10px; border-radius:12px; font-size:0.8rem; font-weight:600;">DuskyMoon Productions</span>
        </div>
        <h1 style="font-size:2.8rem; font-weight:800; color:#ffffff; margin:0 0 8px;">
          Discography &amp; <span style="background:linear-gradient(135deg,#ec4899,#8b5cf6); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Sonic Landscapes</span>
        </h1>
        <p style="font-size:1.15rem; color:#cbd5e1; max-width:760px; line-height:1.7;">
          Original compositions, atmospheric sound design, and precision audio engineering produced by <strong>Kxrn Gupta</strong> under <strong>DuskyMoon Productions</strong>.
        </p>
      </header>

      <section style="padding:28px; background:rgba(20,20,32,0.8); border:1px solid rgba(255,255,255,0.08); border-radius:14px; margin-bottom:40px;">
        <h2 style="font-size:1.4rem; color:#ffffff; margin-bottom:10px;">Studio Production &amp; Mastering DNA</h2>
        <p style="line-height:1.8; color:#94a3b8;">
          Every production is engineered in-house inside FL Studio 21 with custom DSP dynamics chains. From multi-band sidechain compression and vocal formant tuning to analog tape saturation and precision LUFS loudness normalization, each release balances acoustic warmth with modern club-ready low-end clarity.
        </p>
      </section>

      <section>
        <h2 style="font-size:1.8rem; color:#ffffff; margin-bottom:24px;">Official Releases</h2>
        ${musicReleases.map((release) => `
          <article style="padding:32px; border:1px solid rgba(255,255,255,0.1); border-radius:16px; background:rgba(15,15,25,0.85); margin-bottom:28px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:16px;">
              <div>
                <h3 style="font-size:1.8rem; font-weight:700; color:#ffffff; margin:0 0 6px;">${release.title}</h3>
                <p style="font-size:1rem; color:#ec4899; margin:0;">${release.subtitle}</p>
              </div>
              <span style="background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.3); color:#22c55e; padding:4px 12px; border-radius:12px; font-size:0.8rem; font-weight:600;">${release.statusBadge}</span>
            </div>

            <p style="line-height:1.7; color:#cbd5e1; margin-bottom:16px;">${release.description}</p>
            <p style="line-height:1.7; color:#94a3b8; font-size:0.9rem; margin-bottom:20px;"><strong>Audio Engineering Notes:</strong> ${release.audioEngineeringNotes}</p>

            <div style="margin-bottom:24px;">
              <h4 style="font-size:0.95rem; text-transform:uppercase; color:#64748b; letter-spacing:1px; margin-bottom:8px;">Production Credits</h4>
              <ul style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:8px; list-style:none; padding:0; margin:0; font-size:0.85rem; color:#cbd5e1;">
                ${release.credits.map((c) => `<li><strong>${c.role}:</strong> ${c.name}</li>`).join('')}
              </ul>
            </div>

            <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:24px;">
              ${release.streamingLinks.map((s) => `
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border:1px solid rgba(255,255,255,0.12); border-radius:8px; color:#ffffff; text-decoration:none; font-size:0.85rem; background:rgba(255,255,255,0.04);">
                  <span>${s.icon}</span>
                  <span>${s.ctaText}</span>
                  &nearr;
                </a>
              `).join('')}
            </div>

            <div style="padding-top:16px; border-top:1px solid rgba(255,255,255,0.08); display:flex; gap:16px; flex-wrap:wrap;">
              <a href="/projects/sapne" style="color:#38bdf8; font-size:0.9rem; font-weight:600;">Sapne Production Specs &amp; Master &rarr;</a>
              <a href="/projects/duskymoon-productions" style="color:#38bdf8; font-size:0.9rem; font-weight:600;">DuskyMoon Productions Studio &rarr;</a>
              <a href="/projects" style="color:#94a3b8; font-size:0.9rem;">All Engineered Projects &rarr;</a>
            </div>
          </article>
        `).join('\n        ')}
      </section>

      <footer style="margin-top:60px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.1); text-align:center; font-size:0.9rem; color:#94a3b8;">
        <nav aria-label="Music Footer Navigation">
          <a href="/" style="color:#38bdf8; margin:0 10px;">Portfolio Home</a> &bull;
          <a href="/projects" style="color:#38bdf8; margin:0 10px;">All Projects</a> &bull;
          <a href="/links" style="color:#38bdf8; margin:0 10px;">Links &amp; Official Identifiers</a>
        </nav>
      </footer>
    </main>
  `;
}

function generateLinksHtml() {
  return `
    <main class="links-page" style="max-width:800px; margin:0 auto; padding:80px 24px 60px; text-align:center;">
      <header style="margin-bottom:32px;">
        <h1 style="font-size:2.4rem; font-weight:800; color:#ffffff; margin-bottom:8px;">Kxrn (Karan Gupta)</h1>
        <p style="font-size:1.1rem; color:#38bdf8; margin-bottom:12px;">Software Developer &amp; Music Producer</p>
        <p style="font-size:0.95rem; color:#94a3b8; max-width:480px; margin:0 auto 20px; line-height:1.6;">
          Building logic. Producing rhythm. Founder of <strong>DuskyMoon Productions</strong> &bull; New Delhi, India
        </p>

        <nav aria-label="Primary Navigation Pills" style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-bottom:24px;">
          <a href="/" style="padding:8px 16px; border:1px solid #38bdf8; border-radius:20px; color:#38bdf8; text-decoration:none; font-size:0.85rem; font-weight:600;">Portfolio Home &rarr;</a>
          <a href="/projects" style="padding:8px 16px; border:1px solid rgba(255,255,255,0.2); border-radius:20px; color:#ffffff; text-decoration:none; font-size:0.85rem;">All Projects &rarr;</a>
          <a href="/music" style="padding:8px 16px; border:1px solid rgba(255,255,255,0.2); border-radius:20px; color:#ffffff; text-decoration:none; font-size:0.85rem;">Music Discography &rarr;</a>
        </nav>
      </header>

      <section style="text-align:left; margin-bottom:32px;">
        <h2 style="font-size:1rem; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:12px;">Featured Architectures &amp; Systems</h2>
        <div style="background:rgba(15,15,25,0.8); border:1px solid rgba(255,255,255,0.1); border-radius:12px; overflow:hidden;">
          ${projectsData.map((p) => `
            <div style="padding:14px 20px; border-bottom:1px solid rgba(255,255,255,0.06); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="color:#ffffff; font-size:0.95rem;"><a href="/projects/${p.id}" style="color:#ffffff; text-decoration:none;">${p.title}</a></strong>
                <p style="color:#94a3b8; font-size:0.8rem; margin:2px 0 0;">${p.subtitle}</p>
              </div>
              <a href="/projects/${p.id}" style="color:#38bdf8; font-size:0.85rem; font-weight:600; text-decoration:none;">Specs &rarr;</a>
            </div>
          `).join('')}
        </div>
      </section>

      <section style="text-align:left; margin-bottom:32px;">
        <h2 style="font-size:1rem; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:12px;">Official Knowledge Graph &amp; Profiles</h2>
        <ul style="list-style:none; padding:0; margin:0; display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px;">
          <li><a href="https://open.spotify.com/artist/57sDiEfeHnIZX2g7gvPBR2" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">Spotify Verified Artist &nearr;</a></li>
          <li><a href="https://music.apple.com/artist/1816229675" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">Apple Music Artist &nearr;</a></li>
          <li><a href="https://github.com/karan5028ji" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">GitHub Profile (@karan5028ji) &nearr;</a></li>
          <li><a href="https://www.linkedin.com/in/karanguptadev" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">LinkedIn Profile &nearr;</a></li>
          <li><a href="https://share.google/5AfjCZgxu7EtcNFup" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">Google Knowledge Panel &nearr;</a></li>
          <li><a href="https://www.wikidata.org/wiki/Q141046426" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">Wikidata Entity (Q141046426) &nearr;</a></li>
          <li><a href="https://musicbrainz.org/artist/efbc6b4f-363b-4bbd-a5db-f4d4e8817607" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">MusicBrainz Identifier &nearr;</a></li>
          <li><a href="https://orcid.org/0009-0005-5460-2941" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">ORCID Record &nearr;</a></li>
          <li><a href="https://en.everybodywiki.com/Kxrn_Gupta" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">EverybodyWiki Biography &nearr;</a></li>
          <li><a href="https://techyorker.com/karan-gupta-what-to-know-about-the-music-producer-building-local-ai/" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">TechYorker Feature &nearr;</a></li>
          <li><a href="https://www.itechguides.com/kxrn-local-ai-work/" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">iTechGuides Analysis &nearr;</a></li>
          <li><a href="https://github.com/tauri-apps/plugins-workspace/graphs/contributors" target="_blank" rel="noopener noreferrer" style="color:#38bdf8; font-size:0.9rem;">Tauri Plugins Leaderboard (#6 Worldwide) &nearr;</a></li>
        </ul>
      </section>

      <footer style="margin-top:40px; font-size:0.8rem; color:#64748b;">
        <p>&copy; 2026 DuskyMoon Productions. All rights reserved.</p>
      </footer>
    </main>
  `;
}

// --- Page Definitions ---

const pages = [
  {
    route: 'music',
    title: 'Music Discography & Audio Engineering | Kxrn',
    description: 'Official music discography and sound engineering catalogue of Kxrn (DuskyMoon Productions). Features Sapne ft. Ankit, DSP production notes, and full engineering credits.',
    canonical: 'https://kxrn.is-a.dev/music',
    image: 'https://kxrn.is-a.dev/sapne-cover.jpg',
    getContent: () => generateMusicHtml()
  },
  {
    route: 'projects',
    title: 'All Projects & Architecture | Kxrn',
    description: 'Comprehensive repository of system utilities, autonomous AI frameworks, 3D web experiences, and sonic engineering by Kxrn Gupta.',
    canonical: 'https://kxrn.is-a.dev/projects',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg',
    getContent: () => generateAllProjectsHtml()
  },
  {
    route: 'links',
    title: 'Links & Official Identifiers | Kxrn',
    description: 'Direct access to official music platforms, developer repositories, academic credentials, and enterprise channels for Kxrn.',
    canonical: 'https://kxrn.is-a.dev/links',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg',
    getContent: () => generateLinksHtml()
  },
  {
    route: 'projects/win-optimizer-pro',
    title: 'Win-Optimizer-Pro | Technical Architecture & System Specs | Kxrn',
    description: 'High-performance C++ Windows system optimization utility. Published in the official Microsoft Windows Package Manager (winget) registry.',
    canonical: 'https://kxrn.is-a.dev/projects/win-optimizer-pro',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg',
    getContent: () => generateProjectDetailHtml(projectsData.find((p) => p.id === 'win-optimizer-pro'))
  },
  {
    route: 'projects/tauri-plugin-sync',
    title: 'tauri-plugin-sync | Enterprise SQLite Sync Engine for Tauri v2 | Kxrn',
    description: 'A high-performance, local-first SQLite synchronization engine for Tauri v2 desktop apps with Change Data Capture (CDC) and Rust Builder API.',
    canonical: 'https://kxrn.is-a.dev/projects/tauri-plugin-sync',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg',
    getContent: () => generateProjectDetailHtml(projectsData.find((p) => p.id === 'tauri-plugin-sync'))
  },
  {
    route: 'projects/swarmforge',
    title: 'SwarmForge | Autonomous AI Multi-Agent Framework | Kxrn',
    description: 'Enterprise-grade multi-agent orchestration framework for autonomous task decomposition and local LLM execution. CoderLegion Staff Pick.',
    canonical: 'https://kxrn.is-a.dev/projects/swarmforge',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg',
    getContent: () => generateProjectDetailHtml(projectsData.find((p) => p.id === 'swarmforge'))
  },
  {
    route: 'projects/duskymoon-productions',
    title: 'DuskyMoon Productions | Creative Hub & Music Label | Kxrn',
    description: 'Independent creative music production house, sound design studio, and digital solutions hub founded by Kxrn Gupta in New Delhi, India.',
    canonical: 'https://kxrn.is-a.dev/projects/duskymoon-productions',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg',
    getContent: () => generateProjectDetailHtml(projectsData.find((p) => p.id === 'duskymoon-productions'))
  },
  {
    route: 'projects/noir-studio',
    title: 'Noir Studio (NoirWear) | Luxury Clothing Brand & Child Enterprise | Kxrn',
    description: 'Upcoming luxury clothing and streetwear brand (noirwear.in) founded by Kxrn Gupta as a child enterprise under DuskyMoon Productions.',
    canonical: 'https://kxrn.is-a.dev/projects/noir-studio',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg',
    getContent: () => generateProjectDetailHtml(projectsData.find((p) => p.id === 'noir-studio'))
  },
  {
    route: 'projects/sapne',
    title: 'Sapne | Music Track Release · Alias Kxrn | Kxrn',
    description: 'Official single release Sapne by kxrn gupta ft. Ankit under DuskyMoon Productions. Released April 19, 2025 across Spotify and Apple Music.',
    canonical: 'https://kxrn.is-a.dev/projects/sapne',
    image: 'https://kxrn.is-a.dev/sapne-cover.jpg',
    getContent: () => generateProjectDetailHtml(projectsData.find((p) => p.id === 'sapne'))
  }
];

for (const page of pages) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${page.title}</title>`);
  html = html.replace(/<meta name="title" content=".*?"\s*\/?>/i, `<meta name="title" content="${page.title}">`);
  html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${page.title}">`);
  html = html.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${page.title}" />`);

  // Replace Description
  html = html.replace(/<meta name="description" content=".*?"\s*\/?>/i, `<meta name="description" content="${page.description}">`);
  html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${page.description}">`);
  html = html.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${page.description}" />`);

  // Replace Canonical & URL
  html = html.replace(/<link rel="canonical" href=".*?"\s*\/?>/i, `<link rel="canonical" href="${page.canonical}" />`);
  html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/i, `<meta property="og:url" content="${page.canonical}">`);
  html = html.replace(/<meta name="twitter:url" content=".*?"\s*\/?>/i, `<meta name="twitter:url" content="${page.canonical}" />`);

  // Replace Image if specified
  if (page.image) {
    html = html.replace(/<meta property="og:image" content=".*?"\s*\/?>/i, `<meta property="og:image" content="${page.image}">`);
    html = html.replace(/<meta name="twitter:image" content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${page.image}" />`);
  }

  // Pre-render rich semantic HTML inside <div id="root">
  if (page.getContent) {
    const renderedBody = page.getContent();
    html = html.replace('<div id="root"></div>', `<div id="root">${renderedBody}</div>`);
  }

  const targetDir = path.join(distDir, page.route);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, html, 'utf-8');
  console.log(`✓ True static prerendered route: ${page.route} -> ${targetFile}`);
}

console.log('All static route HTML files successfully pre-rendered with full semantic content for search bots and crawlers.');
