"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ModernBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base gradient background with darker blue tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-purple-950/15" />
      
      {/* Large animated gradient orbs with improved positioning */}
      <div className="absolute inset-0">
        {/* Primary blue orb - top left */}
        <motion.div
          className="absolute -top-40 -left-60 w-[800px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(ellipse 120% 80% at 40% 60%, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 20%, rgba(59, 130, 246, 0.02) 40%, rgba(59, 130, 246, 0.005) 60%, transparent 80%)",
            filter: "blur(100px)",
            transform: "rotate(-15deg)",
          }}
          animate={{
            x: [0, 80, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary purple orb - top right */}
        <motion.div
          className="absolute -top-30 -right-50 w-[700px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse 90% 110% at 60% 40%, rgba(147, 51, 234, 0.06) 0%, rgba(147, 51, 234, 0.03) 20%, rgba(147, 51, 234, 0.015) 40%, rgba(147, 51, 234, 0.005) 60%, transparent 80%)",
            filter: "blur(130px)",
            transform: "rotate(25deg)",
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, 70, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Tertiary pink orb - middle left */}
        <motion.div
          className="absolute top-1/3 -left-50 w-[650px] h-[550px] rounded-full"
          style={{
            background: "radial-gradient(ellipse 110% 90% at 30% 50%, rgba(236, 72, 153, 0.05) 0%, rgba(236, 72, 153, 0.025) 20%, rgba(236, 72, 153, 0.01) 40%, rgba(236, 72, 153, 0.005) 60%, transparent 80%)",
            filter: "blur(120px)",
            transform: "rotate(-30deg)",
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
        
        {/* Quaternary cyan orb - bottom right */}
        <motion.div
          className="absolute bottom-20 -right-60 w-[600px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(ellipse 100% 120% at 70% 30%, rgba(6, 182, 212, 0.04) 0%, rgba(6, 182, 212, 0.02) 20%, rgba(6, 182, 212, 0.01) 40%, rgba(6, 182, 212, 0.005) 60%, transparent 80%)",
            filter: "blur(110px)",
            transform: "rotate(40deg)",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Accent green orb - bottom center */}
        <motion.div
          className="absolute bottom-40 left-1/4 w-[550px] h-[450px] rounded-full"
          style={{
            background: "radial-gradient(ellipse 130% 80% at 50% 70%, rgba(34, 197, 94, 0.03) 0%, rgba(34, 197, 94, 0.015) 20%, rgba(34, 197, 94, 0.008) 40%, rgba(34, 197, 94, 0.003) 60%, transparent 80%)",
            filter: "blur(100px)",
            transform: "rotate(-20deg)",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {/* Enhanced floating particles - Reduced for mobile performance */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => {
          // Generate unique random values for each particle
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomSize = Math.random() * 4 + 1;
          const randomOpacity = 0.15 + Math.random() * 0.25;
          const randomMoveX = Math.random() * 60 - 30; // -30 to 30
          const randomMoveY = -60 - Math.random() * 40; // -60 to -100
          const randomDuration = 3 + Math.random() * 5;
          const randomDelay = Math.random() * 4;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: randomSize,
                height: randomSize,
                left: `${randomX}%`,
                top: `${randomY}%`,
                background: `rgba(${i % 4 === 0 ? '59, 130, 246' : i % 4 === 1 ? '147, 51, 234' : i % 4 === 2 ? '236, 72, 153' : '6, 182, 212'}, ${randomOpacity})`,
              }}
              animate={{
                y: [0, randomMoveY, 0],
                x: [0, randomMoveX, 0],
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
      
      {/* Extra tiny particles - Reduced for performance */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => {
          const randomX = Math.random() * 100;
          const randomY = Math.random() * 100;
          const randomSize = Math.random() * 2 + 0.5; // Very small: 0.5-2.5px
          const randomOpacity = 0.1 + Math.random() * 0.15;
          const randomFloat = Math.random() * 20 - 10; // -10 to 10
          const randomDuration = 8 + Math.random() * 12;
          const randomDelay = Math.random() * 6;
          
          return (
            <motion.div
              key={`tiny-particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: randomSize,
                height: randomSize,
                left: `${randomX}%`,
                top: `${randomY}%`,
                background: `rgba(${i % 4 === 0 ? '59, 130, 246' : i % 4 === 1 ? '147, 51, 234' : i % 4 === 2 ? '236, 72, 153' : '6, 182, 212'}, ${randomOpacity})`,
              }}
              animate={{
                y: [0, randomFloat, 0],
                x: [0, randomFloat * 0.5, 0],
                opacity: [0.05, 0.3, 0.05],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
      
      {/* Falling comet lines - Reduced quantity */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => {
          const randomLeft = Math.random() * 100;
          const randomHeight = Math.random() * 120 + 60;
          const randomDuration = 2 + Math.random() * 3;
          const randomDelay = Math.random() * 8;
          const randomHorizontalDrift = Math.random() * 40 - 20; // -20 to 20
          
          return (
            <motion.div
              key={`comet-${i}`}
              className="absolute"
              style={{
                width: 2,
                height: randomHeight,
                left: `${randomLeft}%`,
                top: `-20%`,
                background: `linear-gradient(180deg, rgba(${i % 3 === 0 ? '59, 130, 246' : i % 3 === 1 ? '147, 51, 234' : '236, 72, 153'}, 0.8) 0%, rgba(${i % 3 === 0 ? '59, 130, 246' : i % 3 === 1 ? '147, 51, 234' : '236, 72, 153'}, 0.2) 50%, transparent 100%)`,
                borderRadius: '1px',
                filter: 'blur(0.5px)',
              }}
              animate={{
                y: ['-20vh', '120vh'],
                x: [0, randomHorizontalDrift], // Add slight horizontal drift
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeIn",
              }}
            />
          );
        })}
      </div>
      
      {/* Horizontal comet lines - Reduced quantity */}
      <div className="absolute inset-0">
        {Array.from({ length: 2 }).map((_, i) => {
          const randomWidth = Math.random() * 100 + 60;
          const randomTop = Math.random() * 100;
          const randomDuration = 3 + Math.random() * 4;
          const randomDelay = Math.random() * 10;
          const randomVerticalDrift = Math.random() * 30 - 15; // -15 to 15
          
          return (
            <motion.div
              key={`horizontal-comet-${i}`}
              className="absolute"
              style={{
                width: randomWidth,
                height: 2,
                left: `-30%`,
                top: `${randomTop}%`,
                background: `linear-gradient(90deg, transparent 0%, rgba(${i % 3 === 0 ? '59, 130, 246' : i % 3 === 1 ? '147, 51, 234' : '236, 72, 153'}, 0.7) 30%, rgba(${i % 3 === 0 ? '59, 130, 246' : i % 3 === 1 ? '147, 51, 234' : '236, 72, 153'}, 0.3) 70%, transparent 100%)`,
                borderRadius: '1px',
                filter: 'blur(0.5px)',
              }}
              animate={{
                x: ['-30vw', '130vw'],
                y: [0, randomVerticalDrift], // Add slight vertical drift
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
      
      {/* Advanced geometric shapes */}
      <div className="absolute inset-0">
        {/* Small rotating hexagon */}
        <motion.div
          className="absolute w-12 h-12 border border-blue-500/6"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            top: `${15 + Math.random() * 20}%`, // Random between 15-35%
            right: `${20 + Math.random() * 15}%`, // Random between 20-35%
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
        
        {/* Small diamond */}
        <motion.div
          className="absolute w-8 h-8 bg-purple-500/4 rotate-45"
          style={{
            bottom: `${25 + Math.random() * 15}%`, // Random between 25-40%
            left: `${15 + Math.random() * 10}%`, // Random between 15-25%
          }}
          animate={{
            rotate: [45, 405],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Additional small geometric shapes - Reduced for performance */}
        {Array.from({ length: 4 }).map((_, i) => {
          const randomLeft = Math.random() * 90 + 5;
          const randomTop = Math.random() * 90 + 5;
          const randomSize = Math.random() * 6 + 4; // 4-10px
          const shapeType = i % 4; // 0: circle, 1: square, 2: triangle, 3: hexagon
          
          return (
            <motion.div
              key={`extra-shape-${i}`}
              className="absolute"
              style={{
                left: `${randomLeft}%`,
                top: `${randomTop}%`,
                width: randomSize,
                height: randomSize,
                background: shapeType === 1 ? `rgba(${i % 4 === 0 ? '59, 130, 246' : i % 4 === 1 ? '147, 51, 234' : i % 4 === 2 ? '236, 72, 153' : '6, 182, 212'}, 0.08)` : 'transparent',
                border: shapeType !== 1 ? `1px solid rgba(${i % 4 === 0 ? '59, 130, 246' : i % 4 === 1 ? '147, 51, 234' : i % 4 === 2 ? '236, 72, 153' : '6, 182, 212'}, 0.1)` : 'none',
                borderRadius: shapeType === 0 ? '50%' : '0%',
                clipPath: shapeType === 2 ? "polygon(50% 0%, 0% 100%, 100% 100%)" : 
                          shapeType === 3 ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" : 
                          "none",
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          );
        })}
        
        {/* Small floating shapes - Reduced for performance */}
        {Array.from({ length: 6 }).map((_, i) => {
          // Generate random positions for each shape
          const randomLeft = Math.random() * 90 + 5; // 5% to 95%
          const randomTop = Math.random() * 90 + 5;  // 5% to 95%
          
          return (
            <motion.div
              key={`shape-${i}`}
              className="absolute"
              style={{
                left: `${randomLeft}%`,
                top: `${randomTop}%`,
                width: 8 + Math.random() * 8,
                height: 8 + Math.random() * 8,
                background: `rgba(${i % 4 === 0 ? '59, 130, 246' : i % 4 === 1 ? '147, 51, 234' : i % 4 === 2 ? '236, 72, 153' : '6, 182, 212'}, 0.06)`,
                borderRadius: i % 2 === 0 ? '50%' : '0%',
                clipPath: i % 3 === 0 ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
                }}
              animate={{
                rotate: [0, 360],
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
      
      {/* Enhanced grid pattern - Extra thick lines */}
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.35) 3px, transparent 3px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.35) 3px, transparent 3px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Secondary grid pattern - Thick */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 2px, transparent 2px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Diagonal grid overlay - Extra thick */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(147, 51, 234, 0.25) 2px, transparent 2px),
            linear-gradient(-45deg, rgba(236, 72, 153, 0.25) 2px, transparent 2px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Improved noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
    </div>
  );
}
