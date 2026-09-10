import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Background3D from './components/Background3D';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Press from './sections/Press';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Links from './pages/Links';
import ProjectsPage from './pages/ProjectsPage';

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    // popstate = our navigate() SPA calls → scroll to top on route change (unless navigating with a hash)
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    // hashchange = same-page anchor clicks (#about, #contact) → only update state, NO scroll reset
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      setTimeout(() => {
        const el = document.querySelector(window.location.hash);
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, { offset: -60, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  }, [currentPath]);

  const isLinksPage =
    currentPath.toLowerCase().includes('/links') ||
    currentHash.toLowerCase().includes('#links');

  const isProjectsPage =
    currentPath.toLowerCase().includes('/projects') ||
    currentHash.toLowerCase().includes('#projects-all');

  const isStandalonePage = isLinksPage || isProjectsPage;

  useEffect(() => {
    if (isStandalonePage) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, [isStandalonePage]);

  if (isLinksPage) {
    return (
      <>
        <CustomCursor />
        <Links />
      </>
    );
  }

  // Navbar lives here — same React instance for both '/' and '/projects'
  // This prevents Framer Motion from re-animating and scroll state from resetting on navigation
  return (
    <>
      <CustomCursor />
      <Navbar />
      {isProjectsPage ? (
        <>
          <ProjectsPage />
          <Footer />
        </>
      ) : (
        <>
          <Background3D />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Press />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
