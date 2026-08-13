import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './Contact.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
};

const socialPlatforms = [
  {
    name: 'Spotify',
    desc: 'Official Artist Profile (Alias: Kxrn)',
    icon: '🎧',
    url: 'https://open.spotify.com/artist/57sDiEfeHnlZX2g7gvPBR2',
    color: '#1db954',
  },
  {
    name: 'Instagram',
    desc: '@kxrn_gupta · DuskyMoon & Aesthetics',
    icon: '📸',
    url: 'https://www.instagram.com/kxrn_gupta/',
    color: '#e1306c',
  },
  {
    name: 'GitHub',
    desc: 'Software Engineering & Dev Projects',
    icon: '💻',
    url: 'https://github.com/karan5028ji',
    color: '#00c2ff',
  },
  {
    name: 'MusicBrainz',
    desc: 'Official Music Producer Entry',
    icon: '🎵',
    url: 'https://musicbrainz.org/artist/efbc6b4f-363b-4bbd-a5db-f4d4e8817607',
    color: '#ba478f',
  },
  {
    name: 'Wikidata',
    desc: 'Official Entity Page (Q141046426)',
    icon: '🌐',
    url: 'https://www.wikidata.org/wiki/Q141046426',
    color: '#006699',
  },
];

// XSS Input Sanitizer Helper
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', text: '' }
  const [cooldown, setCooldown] = useState(0);

  const validateField = (name, value) => {
    const sanitized = sanitizeInput(value);
    let errorMsg = '';

    if (name === 'name') {
      if (!sanitized) errorMsg = 'Name is required.';
      else if (sanitized.length < 2) errorMsg = 'Name must be at least 2 characters.';
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!sanitized) errorMsg = 'Email address is required.';
      else if (!emailRegex.test(sanitized)) errorMsg = 'Please enter a valid email address.';
    }

    if (name === 'message') {
      if (!sanitized) errorMsg = 'Message is required.';
      else if (sanitized.length < 10) errorMsg = 'Message must be at least 10 characters.';
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation clearance
    if (errors[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cooldown > 0 || isSubmitting) return;

    // Validate all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    if (newErrors.name || newErrors.email || newErrors.message) {
      setErrors(newErrors);
      setToast({ type: 'error', text: 'Please resolve the highlighted form errors before submitting.' });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const templateParams = {
      from_name: sanitizeInput(formData.name),
      from_email: sanitizeInput(formData.email),
      user_name: sanitizeInput(formData.name),
      user_email: sanitizeInput(formData.email),
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message),
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_yrljtwj';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_yu5uwxr';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '0VwA1aeQA2YXTrSxW';

    try {
      console.log('Sending via EmailJS...', { serviceId, templateId, publicKey });
      
      // Initialize SDK
      try {
        emailjs.init(publicKey);
      } catch (initErr) {
        console.warn('SDK init warning:', initErr);
      }

      let success = false;

      // Strategy 1: @emailjs/browser SDK
      try {
        const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        if (res.status === 200 || res.text === 'OK') {
          success = true;
        }
      } catch (sdkErr) {
        console.warn('SDK send failed, attempting direct EmailJS REST API fallback...', sdkErr);
      }

      // Strategy 2: Direct EmailJS REST API (Bulletproof Fallback)
      if (!success) {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: templateParams,
          }),
        });

        if (response.ok) {
          success = true;
        } else {
          const resText = await response.text();
          throw new Error(resText || `HTTP ${response.status}`);
        }
      }

      setToast({ type: 'success', text: '✓ Message sent successfully! I will get back to you shortly.' });
      setFormData({ name: '', email: '', message: '' });

      // Start 15-second rate limiting cooldown
      setCooldown(15);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err) {
      console.error('EmailJS Error Detail:', err);
      const errMsg = err?.text || err?.message || 'Failed to send message.';
      setToast({ type: 'error', text: `${errMsg} Please try again or email directly.` });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 6000);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeInUp}
        >
          <span className="section-label">Get In Touch</span>
          <h2>Let's <span className="gradient-text">Connect</span></h2>
        </motion.div>
        <div className="contact-grid">
          <motion.form
            className="contact-form glass-card"
            onSubmit={handleSubmit}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.1}
            variants={fadeInUp}
            noValidate
          >
            {/* Animated Toast Notification Banner */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.95 }}
                  className={`toast-banner toast-banner--${toast.type}`}
                >
                  {toast.text}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <input
                type="text"
                name="name"
                id="contact-name"
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="contact-name">Your Name</label>
              <div className="form-line" />
              {errors.name && <span className="field-error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                id="contact-email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="contact-email">Email Address</label>
              <div className="form-line" />
              {errors.email && <span className="field-error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                id="contact-message"
                rows="5"
                placeholder=" "
                value={formData.message}
                onChange={handleChange}
                required
              />
              <label htmlFor="contact-message">Your Message</label>
              <div className="form-line" />
              {errors.message && <span className="field-error-text">{errors.message}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary contact-submit"
              disabled={isSubmitting || cooldown > 0}
            >
              {isSubmitting
                ? 'Sending...'
                : cooldown > 0
                ? `Wait ${cooldown}s`
                : 'Send Message'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </motion.form>

          <motion.div
            className="contact-info-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            custom={0.3}
            variants={fadeInUp}
          >
            <div className="direct-meta-box glass-card">
              <div className="meta-item">
                <span className="meta-icon">✉️</span>
                <div>
                  <span className="meta-label">Email</span>
                  <a href="mailto:Karan5028ji@gmail.com" className="meta-val">Karan5028ji@gmail.com</a>
                </div>
              </div>
              <div className="meta-item">
                <span className="meta-icon">📍</span>
                <div>
                  <span className="meta-label">Location</span>
                  <span className="meta-val">New Delhi, India</span>
                </div>
              </div>
            </div>

            <h3 className="social-heading">Platforms &amp; Socials</h3>
            <p className="social-subtext">Connect across development, music releases, and creative media.</p>
            <div className="social-3d-grid">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="social-3d-card glass-card"
                  style={{ '--platform-accent': platform.color }}
                >
                  <div className="social-3d-icon">{platform.icon}</div>
                  <div className="social-3d-info">
                    <span className="social-3d-name">{platform.name}</span>
                    <span className="social-3d-desc">{platform.desc}</span>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
