"use client";

import React from "react";
import AuroraSimple from "./aurora-simple";

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 w-full h-screen">
      <AuroraSimple 
        colorStops={["#3B82F6", "#9333EA", "#EC4899"]} 
        blend={0.5} 
        amplitude={1.0} 
        speed={0.2} 
      />
      {/* Fade effect di bawah untuk nyatu dengan hero section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}