"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function MinimalistNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none px-4 sm:px-6 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex justify-center relative z-50"
      >
        <nav 
          className={`pointer-events-auto relative flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-top ${
            isScrolled 
              ? "w-[92%] max-w-[800px] px-5 py-3 md:px-8 md:py-3.5 mt-4 md:mt-6" 
              : "w-full max-w-[1440px] px-8 md:px-[72px] lg:px-[80px] pt-10 md:pt-[72px] lg:pt-[80px] pb-4 mt-0"
          }`}
        >
          {/* Pill Background - Separated to prevent CSS 'box' glitch during radius transition */}
          <div 
            className={`absolute inset-0 rounded-full saturate-150 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none -z-10 ${
              isScrolled 
                ? "opacity-100 scale-100 bg-white/20 backdrop-blur-xl border border-white/10 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.8),inset_0_-1.5px_1px_rgba(0,0,0,0.1),0_4px_24px_rgba(0,0,0,0.1)]" 
                : "opacity-0 scale-95 bg-transparent backdrop-blur-none border border-transparent shadow-none"
            }`}
          />

          <motion.div 
            initial={false}
            animate={isScrolled ? "scrolled" : "top"}
            variants={{
              top: { scale: 1 },
              scrolled: { scale: 0.95 }
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-between items-center"
          >
            <div className="flex-1 flex justify-start">
              <Link href="/minimalist" className="flex items-center justify-center hover:opacity-70 transition-opacity">
                <img src="/fahrezi_orange_logo.png" alt="Fahrezi Logo" className="h-6 md:h-7 w-auto object-contain" />
              </Link>
            </div>
            
            <div className="hidden md:flex flex-none gap-10 font-space text-[10px] uppercase tracking-[0.2em] text-[#3a4f32]/70">
              <Link href="#about" className="hover:text-[#d48a6a] transition-colors duration-300">About</Link>
              <Link href="#projects" className="hover:text-[#d48a6a] transition-colors duration-300">Work</Link>
              <Link href="#experience" className="hover:text-[#d48a6a] transition-colors duration-300">Experience</Link>
              <Link href="#contact" className="hover:text-[#d48a6a] transition-colors duration-300">Contact</Link>
            </div>

            <div className="flex-1 flex justify-end items-center">
              {/* Mobile Hamburger Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 text-[#3a4f32]"
                aria-label="Toggle Menu"
              >
                <span className={`h-px w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                <span className={`h-px w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-px w-5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
              </button>
              
              <div className="hidden md:block">
                <a 
                  href="mailto:hello@fahrezi.tech" 
                  className={`font-space text-[10px] uppercase tracking-[0.2em] rounded-full px-5 py-2.5 transition-all duration-500 ease-out ${
                    isScrolled 
                      ? "bg-[#3a4f32]/10 border border-transparent text-[#3a4f32] hover:bg-[#3a4f32] hover:text-[#f2f0e4]" 
                      : "border border-[#3a4f32]/30 text-[#3a4f32] hover:bg-[#3a4f32] hover:text-[#f2f0e4]"
                  }`}
                >
                  Let's Talk
                </a>
              </div>
            </div>
          </motion.div>
        </nav>
      </motion.div>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#f2f0e4] z-40 md:hidden flex flex-col justify-center items-center pointer-events-auto"
          >
            
            <div className="relative z-10 flex flex-col items-center gap-8 font-bricolage text-3xl font-medium tracking-tight text-[#3a4f32]">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
                <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d48a6a] transition-colors relative group">
                  About
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#d48a6a] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
              
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <Link href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d48a6a] transition-colors relative group">
                  Work
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#d48a6a] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
              
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
                <Link href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d48a6a] transition-colors relative group">
                  Experience
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#d48a6a] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
              
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d48a6a] transition-colors relative group">
                  Contact
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#d48a6a] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
              
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-8">
                <a 
                  href="mailto:hello@fahrezi.tech" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="font-space text-xs uppercase tracking-[0.2em] border border-[#3a4f32]/30 text-[#3a4f32] rounded-full px-8 py-4 hover:bg-[#3a4f32] hover:text-[#f2f0e4] transition-all duration-500 ease-out"
                >
                  Let's Talk
                </a>
              </motion.div>
            </div>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8 font-space text-[10px] uppercase tracking-[0.2em] font-medium text-[#1a1a1a]/40 z-10">
              <a href="https://github.com/fahrezi93" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/mohammad-fahrezi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
