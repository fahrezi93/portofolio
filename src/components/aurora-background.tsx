"use client";

import React from "react";
import AuroraSimple from "./aurora-simple";

export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 w-full h-screen">
      <AuroraSimple 
        colorStops={["#3B82F6", "#9333EA", "#EC4899"]} 
        blend={0.3} 
        amplitude={0.8} 
        speed={0.1} 
      />
    </div>
  );
}