import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop/mouse)
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      target.current = { x: e.clientX, y: e.clientY };

      // Instant position for central dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth Lerp loop for outer magnetic ring
    let animationFrameId;
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const render = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.18);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Event delegation for interactive magnetic hover targets
    const handleElementHover = (e) => {
      const targetEl = e.target.closest(
        'a, button, .btn, .glass-card, .project-card, .skill-card, .social-3d-card, input, textarea'
      );

      if (targetEl) {
        setIsHovered(true);
        if (targetEl.classList.contains('project-card')) {
          setHoverText('VIEW');
        } else if (targetEl.classList.contains('social-3d-card')) {
          setHoverText('OPEN');
        } else if (targetEl.tagName === 'BUTTON' || targetEl.classList.contains('btn')) {
          setHoverText('CLICK');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovered(false);
        setHoverText('');
      }
    };

    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central Cyan Glow Dot with nested inner element */}
      <div ref={dotRef} className="cyber-cursor-dot">
        <div className={`cyber-cursor-dot-inner ${isMouseDown ? 'cyber-cursor-dot-inner--active' : ''}`} />
      </div>

      {/* Trailing Outer Ring with Magnetic Scaling */}
      <div
        ref={ringRef}
        className={`cyber-cursor-ring ${isHovered ? 'cyber-cursor-ring--hover' : ''} ${
          isMouseDown ? 'cyber-cursor-ring--click' : ''
        }`}
      >
        {hoverText && <span className="cyber-cursor-text">{hoverText}</span>}
      </div>
    </>
  );
};

export default CustomCursor;
