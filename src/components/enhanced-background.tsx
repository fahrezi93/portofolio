"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EnhancedBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Large animated gradient blobs */}
      <div className="absolute inset-0">
        {/* Primary blue blob */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary purple blob */}
        <motion.div
          className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, rgba(147, 51, 234, 0.04) 40%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: [50, -50, 50],
            y: [0, 80, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Tertiary cyan blob */}
        <motion.div
          className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.03) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Pink accent blob */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, rgba(236, 72, 153, 0.02) 40%, transparent 70%)",
            filter: "blur(50px)",
          }}
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Geometric shapes */}
      <div className="absolute inset-0">
        {/* Large rotating square */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 border border-blue-500/5"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Medium hexagon */}
        <motion.div
          className="absolute bottom-1/3 left-1/5 w-20 h-20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "rgba(147, 51, 234, 0.03)",
          }}
          animate={{
            rotate: [0, -360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Small triangles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`triangle-${i}`}
            className="absolute w-4 h-4"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${30 + (i * 8)}%`,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              background: `rgba(${i % 2 === 0 ? '59, 130, 246' : '236, 72, 153'}, 0.05)`,
            }}
            animate={{
              rotate: [0, 180, 360],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/20 to-slate-950/40" />
      
      {/* Noise texture for organic feel */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Top gradient for header integration */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent" />
      
      {/* Bottom gradient for footer integration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950/80 to-transparent" />
    </div>
  );
}
