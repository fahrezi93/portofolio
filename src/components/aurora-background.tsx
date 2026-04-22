"use client";

import React, { useState, useEffect } from "react";
import AuroraSimple from "./aurora-simple";

export default function AuroraBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isAuroraReady, setIsAuroraReady] = useState(false);
  const [isAuroraVisible, setIsAuroraVisible] = useState(false);

  useEffect(() => {
    let startupTimer: ReturnType<typeof setTimeout> | null = null;
    let fadeFrame = 0;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkReducedMotion = () => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkReducedMotion();

    const startDelay = window.innerWidth < 768 ? 900 : 450;
    startupTimer = setTimeout(() => {
      setIsAuroraReady(true);
      fadeFrame = requestAnimationFrame(() => {
        setIsAuroraVisible(true);
      });
    }, startDelay);
    
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (startupTimer) {
        clearTimeout(startupTimer);
      }
      cancelAnimationFrame(fadeFrame);
    };
  }, []);

  // Disable aurora hanya jika user prefer reduced motion
  if (reducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 w-full h-full">
        {/* Static gradient fallback untuk reduced motion */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-purple-950/5 to-transparent" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 w-full h-full">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-blue-900/5 to-transparent" />

      {isAuroraReady && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-out will-change-opacity ${
            isAuroraVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <AuroraSimple 
            colorStops={["#1E3A8A", "#3B82F6", "#60A5FA"]} 
            blend={isMobile ? 0.12 : 0.2} 
            amplitude={isMobile ? 0.25 : 0.6} 
            speed={isMobile ? 0.02 : 0.05} 
          />
        </div>
      )}
    </div>
  );
}