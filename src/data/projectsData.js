export const projectsData = [
  {
    id: 'win-optimizer-pro',
    title: 'Win-Optimizer-Pro',
    subtitle: 'Microsoft Windows Package Manager (winget)',
    category: 'System & Utility',
    role: 'Author & System Architect (Karan Gupta)',
    statusBadge: 'Published in Microsoft winget Registry',
    description: 'A high-performance Windows system optimization utility. Now officially accepted into the Microsoft Windows Package Manager registry.',
    longDescription: 'Win-Optimizer-Pro is a high-performance Windows system optimization utility designed to clean temporary junk, optimize system settings, and enhance overall PC performance. Officially accepted and published into the Microsoft Windows Package Manager (winget) repository for instant terminal deployment.',
    overview: 'Win-Optimizer-Pro is a native, lightweight system utility engineered to aggressively reclaim Windows memory, purge deep system cache, disable non-essential background telemetry services, and accelerate response times on resource-constrained PCs. Developed in C++ without heavy runtime dependencies, it executes instantly and leaves zero lingering background processes.',
    command: 'winget install karan5028ji.WinOptimizerPro',
    externalUrl: 'https://github.com/karan5028ji/Win-Optimizer-Pro',
    ctaText: 'View on GitHub & Registry',
    tags: ['C++', 'Windows CLI', 'winget', 'System Utility', 'Win32 API'],
    icon: '⚡',
    accent: '#22c55e',
    featured: true,
    highlights: [
      'Officially accepted and published into Microsoft\'s microsoft/winget-pkgs central repository for instant CLI deployment.',
      'Native C++ static compilation delivering near-instant startup latency (<15ms) and ultra-low RAM footprint.',
      'Automated memory working-set trimming algorithm yielding up to 35% instantaneous memory recovery.',
      'Technical architecture and system engineering breakdown published on DEV Community.',
      'Clean CLI pipeline with granular rollback protection and dry-run safety modes.'
    ],
    specs: {
      language: 'C++ (MSVC / Win32 API)',
      platform: 'Windows 10 / Windows 11 (x64 / ARM64)',
      distribution: 'Microsoft winget / GitHub Releases',
      license: 'MIT Open Source',
      author: 'Karan Gupta (karan5028ji)'
    },
    timeline: [
      {
        version: 'v1.0.0',
        date: '2026',
        milestone: 'Initial release with system junk purge and working-set RAM optimization.'
      },
      {
        version: 'winget-pkgs',
        date: '2026',
        milestone: 'Manifest formally reviewed, approved, and merged into the official Microsoft Windows Package Manager registry.'
      }
    ]
  },
  {
    id: 'swarmforge',
    title: 'SwarmForge',
    subtitle: 'Autonomous AI Multi-Agent Orchestration Framework',
    category: 'AI & Systems',
    role: 'Lead Architect & Framework Author (Kxrn)',
    statusBadge: 'CoderLegion Staff Pick & Editorial Feature',
    description: 'An advanced multi-agent AI orchestration platform enabling autonomous subagent delegation, distributed workflows, and parallel execution.',
    longDescription: 'SwarmForge is an enterprise-grade multi-agent orchestration framework built for autonomous task decomposition, subagent delegation, and parallel LLM execution. It enables developers to coordinate specialized AI agents for complex coding, research, and data processing workflows.',
    overview: 'SwarmForge was conceived to solve the problem of coordinating autonomous AI agents on aging, resource-constrained developer hardware without recurring commercial API expenses. Built on an asynchronous event-driven architecture, SwarmForge decomposes monolithic engineering tasks into discrete roles (planners, researchers, coders, verifiers) and routes execution deterministically across local LLM runtimes.',
    externalUrl: 'https://coderlegion.com/27523/building-zero-cost-multi-agent-orchestrators-local-assistants-journey-with-swarmforge',
    ctaText: 'Read Architecture Paper',
    tags: ['Python', 'AI Agents', 'Multi-Agent', 'Orchestration', 'LLM', 'Event Bus'],
    icon: '🐝',
    accent: '#f59e0b',
    featured: true,
    highlights: [
      'Selected as an official Staff Pick by the CoderLegion editorial board for pioneering zero-cost local multi-agent orchestration.',
      'Asynchronous event bus supporting parallel execution across isolated subagent workspace branches.',
      'Deterministic hierarchical prompt router ensuring high-precision context decomposition.',
      'Ephemeral context pruning mechanism preventing token exhaustion during multi-step long-horizon missions.'
    ],
    specs: {
      language: 'Python 3.11+ / Asyncio',
      architecture: 'Event-Driven Multi-Agent Bus',
      runtime: 'Local LLMs (Ollama / GGUF) & REST APIs',
      documentation: 'CoderLegion Paper / Zenodo Archival DOI',
      author: 'Kxrn Gupta (Karan Gupta)'
    },
    timeline: [
      {
        version: 'v0.9-alpha',
        date: '2026',
        milestone: 'Proof of concept for zero-cost subagent delegation on consumer hardware.'
      },
      {
        version: 'Staff Pick',
        date: '2026',
        milestone: 'Editorial feature published on CoderLegion; syndicated to HackerNoon Tech Brief podcast.'
      }
    ]
  },
  {
    id: 'duskymoon-productions',
    title: 'DuskyMoon Productions',
    subtitle: 'Digital Solutions Hub · CEO & Founder',
    category: 'Enterprise & Media',
    role: 'CEO & Founder (Kxrn / Chitresh Gupta)',
    statusBadge: 'Active Creative Hub & Label',
    description: 'Established a creative digital solutions hub managing end-to-end project lifecycles, cinematic web aesthetics, and color grading.',
    longDescription: 'Established a creative digital solutions hub. Managed end-to-end project lifecycles, focusing on cinematic web aesthetics, modern color grading, premium UI design, and delivering top-tier digital assets to clients.',
    overview: 'DuskyMoon Productions is an independent creative studio and digital hub founded by Kxrn (Chitresh Gupta / Karan Gupta) based in New Delhi, India. It operates at the convergence of sound engineering, music catalogue distribution, and cinematic digital web development, serving as the official parent vehicle for Kxrn\'s creative releases and digital services.',
    externalUrl: 'https://duskymoon.vercel.app',
    ctaText: 'Visit DuskyMoon Hub',
    tags: ['CEO & Founder', 'Web Architecture', 'Sound Engineering', 'Music Label', 'Digital Hub'],
    icon: '🌙',
    accent: '#3b82f6',
    featured: true,
    highlights: [
      'Official independent production house managing the music release catalog for artist alias Kxrn across Spotify, Apple Music, and Shazam.',
      'Engineers modern dark-aesthetic digital web experiences with high-end typography and interactive physics.',
      'Documented as an entity in Wikidata (Q141046426) and Crunchbase business directory.',
      'Full in-house audio mastering, spectral balance, and DSP mixing pipeline.'
    ],
    specs: {
      organization: 'DuskyMoon Productions',
      founder: 'Kxrn (Karan Gupta / Chitresh Gupta)',
      location: 'New Delhi, India',
      status: 'Active Independent Enterprise',
      website: 'duskymoon.vercel.app'
    },
    timeline: [
      {
        version: 'Founding',
        date: '2024',
        milestone: 'Establishment of DuskyMoon Productions as an independent music and media brand.'
      },
      {
        version: 'Expansion',
        date: '2026',
        milestone: 'Integration of digital solutions, web architecture, and full DSP discography distribution.'
      }
    ]
  },
  {
    id: 'noir-studio',
    title: 'Noir Studio',
    subtitle: 'Upcoming Premium Web Studio',
    category: 'Web & Design',
    role: 'Creative Director & WebGL Architect',
    statusBadge: 'Design Framework & Vision',
    description: 'An upcoming premium digital design and web architecture studio delivering immersive, high-end digital experiences and sleek aesthetics.',
    longDescription: 'An upcoming premium digital design and web architecture studio. Focused on delivering immersive, high-end digital experiences, sleek animations, 3D WebGL interactions, and ultra-modern dark-themed aesthetics for future clients.',
    overview: 'Noir Studio is an upcoming digital architecture studio focused on spatial web experiences, bespoke WebGL shaders, fluid micro-interactions, and dark tech-noir aesthetics. Built for modern brands that require visually memorable, high-performance web presences.',
    externalUrl: 'https://github.com/karan5028ji',
    ctaText: 'Explore Studio Vision',
    tags: ['React', 'Three.js', 'UI/UX Design', 'Framer Motion', 'GLSL'],
    icon: '✨',
    accent: '#a855f7',
    featured: true,
    highlights: [
      'Hardware-accelerated 3D viewports utilizing Three.js and custom GLSL vertex/fragment shaders.',
      'VisionOS-inspired glassmorphism with dynamic ambient lighting cones and zero CSS layout shifts.',
      'Smooth inertial scrolling synchronization paired with Framer Motion exit/enter physics.'
    ],
    specs: {
      framework: 'React 18 / Three.js / Fiber',
      styling: 'Custom CSS Design System & Shaders',
      focus: 'Interactive 3D Web Architecture',
      creator: 'Kxrn Gupta'
    },
    timeline: [
      {
        version: 'Design Lab',
        date: '2026',
        milestone: 'Architecture blueprints, GLSL shader prototypes, and component library developed.'
      }
    ]
  },
  {
    id: 'sapne',
    title: 'Sapne',
    subtitle: 'Music Track Release · Alias Kxrn',
    category: 'Music & Sound',
    role: 'Music Producer, Composer & Mixing Engineer (Alias: Kxrn)',
    statusBadge: 'Official Single Release',
    description: 'An independent music track release featuring Ankit, highlighting creative direction, technical audio production, and sound engineering.',
    longDescription: 'Released under my musical alias, Kxrn. An independent music track release featuring Ankit. This project highlights my creative direction, technical audio production, mixing, mastering, and sound engineering skills.',
    overview: 'Sapne is an independent Indian music release composed, produced, and mixed by Kxrn featuring Ankit. Released under the DuskyMoon Productions banner, the track combines ambient soundscapes, modern hip-hop rhythm structures, and warm spectral balancing.',
    externalUrl: 'https://open.spotify.com/artist/57sDiEfeHnIZX2g7gvPBR2',
    ctaText: 'Stream on Spotify',
    tags: ['Alias: Kxrn', 'Music Production', 'Sound Engineering', 'Mixing & Mastering', 'Hip-Hop'],
    icon: '🎵',
    accent: '#ec4899',
    image: '/sapne-cover.jpg',
    featured: false,
    highlights: [
      'Composed, arranged, and sound-designed from ground up in FL Studio 21.',
      'In-house multi-band compression, dynamic EQ carving, and spatial stereo imaging.',
      'Distributed globally across Spotify, Apple Music, YouTube Music, and Shazam.',
      'Published under independent label ℗ 2025 DuskyMoon Productions.'
    ],
    specs: {
      artist: 'kxrn gupta ft. Ankit',
      producer: 'Kxrn',
      composer: 'Kxrn Gupta',
      mixingMastering: 'Kxrn (DuskyMoon Studio)',
      label: '℗ 2025 DuskyMoon Productions',
      releaseDate: 'April 19, 2025'
    },
    timeline: [
      {
        version: 'Single Release',
        date: 'April 19, 2025',
        milestone: 'Track published globally across Apple Music, Spotify, and major streaming platforms under ℗ 2025 DuskyMoon Productions.'
      }
    ]
  }
];
