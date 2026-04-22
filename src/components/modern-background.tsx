"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Separate component for particles to avoid hydration mismatch
function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    size: number;
    opacity: number;
    color: string;
  }>>([]);

  useEffect(() => {
    // Generate particles only on client side
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: 0.1 + Math.random() * 0.15,
      color: i % 3 === 0 ? '59, 130, 246' : i % 3 === 1 ? '147, 51, 234' : '236, 72, 153',
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0">
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `rgba(${particle.color}, ${particle.opacity})`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function ModernBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Deteksi mobile dan preferensi reduced motion
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

  // Return nothing during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-purple-950/15" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base gradient background - static untuk performa */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-purple-950/15" />

      {/* Simplified gradient orbs - hanya 2 orb untuk mobile, 3 untuk desktop */}
      {!reducedMotion && (
        <div className="absolute inset-0">
          {/* Primary blue orb - selalu ada */}
          <motion.div
            className="absolute -top-40 -left-60 w-[600px] h-[500px] md:w-[800px] md:h-[700px] rounded-full"
            style={{
              background: "radial-gradient(ellipse 120% 80% at 40% 60%, rgba(59, 130, 246, 0.06) 0%, rgba(59, 130, 246, 0.03) 20%, rgba(59, 130, 246, 0.015) 40%, transparent 60%)",
              filter: isMobile ? "blur(60px)" : "blur(100px)",
              transform: "rotate(-15deg)",
            }}
            animate={isMobile ? {} : {
              x: [0, 60, 0],
              y: [0, 40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Secondary purple orb - selalu ada */}
          <motion.div
            className="absolute -top-30 -right-50 w-[500px] h-[400px] md:w-[700px] md:h-[600px] rounded-full"
            style={{
              background: "radial-gradient(ellipse 90% 110% at 60% 40%, rgba(147, 51, 234, 0.05) 0%, rgba(147, 51, 234, 0.025) 20%, rgba(147, 51, 234, 0.01) 40%, transparent 60%)",
              filter: isMobile ? "blur(60px)" : "blur(130px)",
              transform: "rotate(25deg)",
            }}
            animate={isMobile ? {} : {
              x: [0, -40, 0],
              y: [0, 50, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Third orb - hanya untuk desktop */}
          {!isMobile && (
            <motion.div
              className="absolute bottom-20 -right-60 w-[600px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(ellipse 100% 120% at 70% 30%, rgba(6, 182, 212, 0.03) 0%, rgba(6, 182, 212, 0.015) 20%, rgba(6, 182, 212, 0.008) 40%, transparent 60%)",
                filter: "blur(110px)",
                transform: "rotate(40deg)",
              }}
              animate={{
                x: [0, -30, 0],
                y: [0, -40, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </div>
      )}

      {/* Optimized floating particles - drastis dikurangi */}
      {!isMobile && !reducedMotion && (
        <FloatingParticles />
      )}

      {/* Subtle noise texture - sangat ringan */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          background: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                      radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)`,
        }}
      />

    </div>
  );
}
