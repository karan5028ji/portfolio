import React from 'react';
import { motion } from 'framer-motion';
import {
  ReactIcon,
  PythonIcon,
  CppIcon,
  ThreejsIcon,
  TailwindIcon,
  JavaScriptIcon,
  AudioEngineeringIcon,
  TerminalSystemsIcon,
} from '../components/TechIcons';
import './Skills.css';

const primarySkills = [
  {
    name: 'Autonomous AI & Swarms',
    Icon: PythonIcon,
    tag: 'SwarmForge Core',
    desc: 'Multi-agent orchestration, autonomous subagent delegation, local LLM tooling, and prompt hierarchies.',
    accent: '#38bdf8',
  },
  {
    name: 'Performance & Systems',
    Icon: CppIcon,
    tag: 'winget Published',
    desc: 'High-performance C++ utilities, memory optimization, and Microsoft Windows Package Manager deployment.',
    accent: '#34d399',
  },
  {
    name: '3D WebGL & Shaders',
    Icon: ThreejsIcon,
    tag: 'Spatial Experience',
    desc: 'Custom GLSL shaders, Three.js spatial viewports, particle physics, and hardware-accelerated canvas.',
    accent: '#818cf8',
  },
  {
    name: 'Modern Web Architecture',
    Icon: ReactIcon,
    tag: 'Production Core',
    desc: 'Scalable React applications, decoupled state management, SPA routing, and Framer Motion micro-physics.',
    accent: '#38bdf8',
  },
  {
    name: 'Audio Engineering & DSP',
    Icon: AudioEngineeringIcon,
    tag: 'DuskyMoon Studio',
    desc: 'FL Studio audio pipeline, multi-band dynamics, spectral mixing, mastering, and spatial soundscapes.',
    accent: '#ec4899',
  },
  {
    name: 'Terminal & CLI Tooling',
    Icon: TerminalSystemsIcon,
    tag: 'Systems Logic',
    desc: 'Windows Terminal, PowerShell scripting, Git automation, and reproducible environment builds.',
    accent: '#fbbf24',
  },
  {
    name: 'Tailwind & Design Systems',
    Icon: TailwindIcon,
    tag: 'UI Aesthetics',
    desc: 'Utility-first CSS architecture, dark-mode design systems, glassmorphism, and fluid responsive layouts.',
    accent: '#38bdf8',
  },
  {
    name: 'JavaScript / ESNext',
    Icon: JavaScriptIcon,
    tag: 'Async Engines',
    desc: 'Modern asynchronous JavaScript, Web APIs, DOM performance optimization, and event pipelines.',
    accent: '#facc15',
  },
];

const secondarySkills = [
  'FL Studio 21', 'Acoustic Balancing', 'Sound Mastering',
  'Multi-Agent Decomposition', 'O.D.I.N. Assistant', 'winget Registry',
  'Three.js Fiber', 'Framer Motion', 'Git Worktrees', 'Vercel Deployment', 'Low-Latency Audio'
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const handleTilt = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 8;
  const rotateY = ((centerX - x) / centerX) * 8;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
};

const handleTiltReset = (e) => {
  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
};

const Skills = () => {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <motion.div
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
        >
          <span className="section-label">Engineering Stack</span>
          <h2>Technical &amp; <span className="gradient-text">Sonic Craft</span></h2>
        </motion.div>
        
        <motion.div
          className="skills-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {primarySkills.map((skill, index) => {
            const IconComponent = skill.Icon;
            return (
              <motion.div
                key={skill.name}
                className="skill-card glass-card"
                custom={index * 0.08}
                variants={fadeInUp}
                onMouseMove={handleTilt}
                onMouseLeave={handleTiltReset}
                style={{ '--skill-accent': skill.accent }}
              >
                <div className="skill-card-glow" />
                <div className="skill-card-top">
                  <div className="skill-icon-plate">
                    <IconComponent size={24} className="skill-svg-icon" />
                  </div>
                  <span className="skill-status-tag">{skill.tag}</span>
                </div>
                <h3 className="skill-name">{skill.name}</h3>
                <p className="skill-desc">{skill.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="skills-marquee-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="marquee-label">✦ Production Tooling, Audio Engines &amp; Workflows</div>
          <div className="marquee-container">
            <div className="marquee-track">
              {[...secondarySkills, ...secondarySkills].map((skill, i) => (
                <span key={i} className="marquee-item">
                  {skill}
                  <span className="marquee-dot">◆</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
