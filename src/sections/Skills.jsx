import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const primarySkills = [
  { name: 'React.js', icon: '⚛️', desc: 'Modern Web Apps & SaaS UI' },
  { name: 'Tailwind CSS', icon: '🎨', desc: 'Utility-First Styling & Layouts' },
  { name: 'HTML5 & CSS3', icon: '🌐', desc: 'Semantic Structure & Responsive Design' },
  { name: 'JavaScript', icon: '⚡', desc: 'ES6+ Logic & Dynamic Interactivity' },
  { name: 'Python', icon: '🐍', desc: 'AI Automation & Backend Scripting' },
  { name: 'Java', icon: '☕', desc: 'Object-Oriented Programming' },
  { name: 'C / C++', icon: '🔧', desc: 'Performance & Systems Logic' },
  { name: 'UI/UX Design', icon: '✨', desc: 'SaaS Aesthetics & User Experience' },
];

const secondarySkills = [
  'Music Production', 'Sound Engineering', 'Audio Mixing',
  'Cinematic Aesthetics', 'Modern Color Grading', 'Brand Identity Design',
  'Flutter', 'Git & GitHub', 'Vercel', 'SaaS Landing Pages', 'Fast-Loading Layouts'
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

const handleTilt = (e) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 12;
  const rotateY = ((centerX - x) / centerX) * 12;
  card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
};

const handleTiltReset = (e) => {
  e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
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
          <span className="section-label">Skills</span>
          <h2>Tech Stack &amp; <span className="gradient-text">Expertise</span></h2>
        </motion.div>
        <motion.div
          className="skills-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {primarySkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card glass-card"
              custom={index * 0.08}
              variants={fadeInUp}
              onMouseMove={handleTilt}
              onMouseLeave={handleTiltReset}
            >
              <div className="skill-card-glow" />
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-desc">{skill.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="skills-marquee-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <div className="marquee-label">✦ Creative Production, Tools &amp; Frameworks</div>
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
