"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MinimalBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Subtle animated orbs - fewer for better performance */}
      <div className="absolute inset-0">
        {/* Main blue orb */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 100%)",
            filter: "blur(100px)",
          }}
          animate={{
            x: [-200, 200, -200],
            y: [-100, 100, -100],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary purple orb */}
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.06) 0%, rgba(147, 51, 234, 0.02) 50%, transparent 100%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [100, -100, 100],
            y: [50, -50, 50],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Accent pink orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.04) 0%, rgba(236, 72, 153, 0.01) 50%, transparent 100%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [-150, 150, -150],
            y: [-75, 75, -75],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Minimal grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Simple radial gradient for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/5 to-slate-950/20" />
      
      {/* Top fade */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950/90 to-transparent" />
    </div>
  );
}
