"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;
    let ticking = false;

    const updateScrollProgress = () => {
      if (ticking) return;
      ticking = true;

      frameId = window.requestAnimationFrame(() => {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = winHeightPx > 0 ? scrollPx / winHeightPx : 0;
        setScrollProgress(scrolled);
        ticking = false;
      });
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      {/* Progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 z-50 origin-left"
        style={{
          scaleX: scrollProgress,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}
