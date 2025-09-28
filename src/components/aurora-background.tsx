"use client";

import React, { useState, useEffect } from "react";
import AuroraSimple from "./aurora-simple";

export default function AuroraBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const checkReducedMotion = () => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkReducedMotion();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Disable aurora hanya jika user prefer reduced motion
  if (reducedMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 -z-10 w-full h-screen">
        {/* Static gradient fallback untuk reduced motion */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-purple-950/5 to-transparent" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 w-full h-screen">
      <AuroraSimple 
        colorStops={["#3B82F6", "#9333EA", "#EC4899"]} 
        blend={isMobile ? 0.15 : 0.2} 
        amplitude={isMobile ? 0.4 : 0.6} 
        speed={isMobile ? 0.03 : 0.05} 
      />
    </div>
  );
}