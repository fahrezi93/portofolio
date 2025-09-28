"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ModernBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
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
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            const randomSize = Math.random() * 3 + 1;
            const randomOpacity = 0.1 + Math.random() * 0.15;
            
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: randomSize,
                  height: randomSize,
                  left: `${randomX}%`,
                  top: `${randomY}%`,
                  background: `rgba(${i % 3 === 0 ? '59, 130, 246' : i % 3 === 1 ? '147, 51, 234' : '236, 72, 153'}, ${randomOpacity})`,
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
            );
          })}
        </div>
      )}
      
      {/* Enhanced comet lines - 5 garis (3 vertikal + 2 horizontal) */}
      {!isMobile && !reducedMotion && (
        <div className="absolute inset-0">
          {/* 3 Garis vertikal dari atas */}
          <motion.div
            className="absolute w-[1px] h-[120px]"
            style={{
              left: '15%',
              top: '-10%',
              background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.7) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
            }}
            animate={{
              y: ['-15vh', '115vh'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1,
              ease: "easeIn",
            }}
          />
          
          <motion.div
            className="absolute w-[1px] h-[100px]"
            style={{
              left: '50%',
              top: '-10%',
              background: 'linear-gradient(180deg, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 100%)',
            }}
            animate={{
              y: ['-12vh', '112vh'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 6,
              ease: "easeIn",
            }}
          />
          
          <motion.div
            className="absolute w-[1px] h-[90px]"
            style={{
              left: '85%',
              top: '-10%',
              background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 100%)',
            }}
            animate={{
              y: ['-10vh', '110vh'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              delay: 11,
              ease: "easeIn",
            }}
          />
          
          {/* 2 Garis horizontal dari samping */}
          <motion.div
            className="absolute w-[150px] h-[1px]"
            style={{
              left: '-15%',
              top: '25%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.6) 30%, rgba(6, 182, 212, 0.2) 70%, transparent 100%)',
            }}
            animate={{
              x: ['-20vw', '120vw'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 3,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute w-[120px] h-[1px]"
            style={{
              left: '-15%',
              top: '70%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(34, 197, 94, 0.5) 30%, rgba(34, 197, 94, 0.2) 70%, transparent 100%)',
            }}
            animate={{
              x: ['-18vw', '118vw'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: 9,
              ease: "easeInOut",
            }}
          />
        </div>
      )}
      
      {/* Minimal geometric shapes - hanya untuk desktop */}
      {!isMobile && !reducedMotion && (
        <div className="absolute inset-0">
          {/* Single rotating shape */}
          <motion.div
            className="absolute w-8 h-8 border border-blue-500/8"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              top: '20%',
              right: '25%',
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Single diamond */}
          <motion.div
            className="absolute w-6 h-6 bg-purple-500/6 rotate-45"
            style={{
              bottom: '30%',
              left: '20%',
            }}
            animate={{
              rotate: [45, 405],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}
      
      {/* Subtle grid pattern - opacity yang pas */}
      {!isMobile && (
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
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
