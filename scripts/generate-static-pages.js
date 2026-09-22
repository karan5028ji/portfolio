import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

const pages = [
  {
    route: 'music',
    title: 'Music Discography & Audio Engineering | Kxrn',
    description: 'Official music discography and sound engineering catalogue of Kxrn (DuskyMoon Productions). Features Sapne ft. Ankit, DSP production notes, and full engineering credits.',
    canonical: 'https://kxrn.is-a.dev/music',
    image: 'https://kxrn.is-a.dev/sapne-cover.jpg'
  },
  {
    route: 'projects',
    title: 'All Projects & Architecture | Kxrn',
    description: 'Comprehensive repository of system utilities, autonomous AI frameworks, 3D web experiences, and sonic engineering by Kxrn Gupta.',
    canonical: 'https://kxrn.is-a.dev/projects',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg'
  },
  {
    route: 'links',
    title: 'Links & Official Identifiers | Kxrn',
    description: 'Direct access to official music platforms, developer repositories, academic credentials, and enterprise channels for Kxrn.',
    canonical: 'https://kxrn.is-a.dev/links',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg'
  },
  {
    route: 'projects/win-optimizer-pro',
    title: 'Win-Optimizer-Pro | Technical Architecture & System Specs | Kxrn',
    description: 'High-performance C++ Windows system optimization utility. Published in the official Microsoft Windows Package Manager (winget) registry.',
    canonical: 'https://kxrn.is-a.dev/projects/win-optimizer-pro',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg'
  },
  {
    route: 'projects/swarmforge',
    title: 'SwarmForge | Autonomous AI Multi-Agent Framework | Kxrn',
    description: 'Enterprise-grade multi-agent orchestration framework for autonomous task decomposition and local LLM execution. CoderLegion Staff Pick.',
    canonical: 'https://kxrn.is-a.dev/projects/swarmforge',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg'
  },
  {
    route: 'projects/duskymoon-productions',
    title: 'DuskyMoon Productions | Creative Hub & Music Label | Kxrn',
    description: 'Independent creative music production house, sound design studio, and digital solutions hub founded by Kxrn Gupta in New Delhi, India.',
    canonical: 'https://kxrn.is-a.dev/projects/duskymoon-productions',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg'
  },
  {
    route: 'projects/noir-studio',
    title: 'Noir Studio | 3D WebGL Design Studio | Kxrn',
    description: 'Upcoming premium digital design and web architecture studio delivering immersive 3D WebGL interactions and modern aesthetics.',
    canonical: 'https://kxrn.is-a.dev/projects/noir-studio',
    image: 'https://kxrn.is-a.dev/kxrn-karan-gupta-music-producer.jpeg'
  },
  {
    route: 'projects/sapne',
    title: 'Sapne | Music Track Release · Alias Kxrn | Kxrn',
    description: 'Official single release Sapne by kxrn gupta ft. Ankit under DuskyMoon Productions. Released April 19, 2025 across Spotify and Apple Music.',
    canonical: 'https://kxrn.is-a.dev/projects/sapne',
    image: 'https://kxrn.is-a.dev/sapne-cover.jpg'
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

  const targetDir = path.join(distDir, page.route);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(targetFile, html, 'utf-8');
  console.log(`✓ Generated static route: ${page.route} -> ${targetFile}`);
}

console.log('All static route HTML files successfully pre-rendered for search bots and crawlers.');
