"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function MinimalistFooter() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the footer container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Smooth out the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  // Subtle parallax transforms specifically for "ezi"
  // Subtle parallax transforms specifically for "ezi"
  // "fahr" stays static, while "ezi" starts lower and moves up past the baseline.
  const yStatic = useTransform(smoothProgress, [0, 1], [0, 0]);
  const yE = useTransform(smoothProgress, [0, 1], [20, -10]);
  const yZ = useTransform(smoothProgress, [0, 1], [35, -20]);
  const yI = useTransform(smoothProgress, [0, 1], [50, -30]);

  const text = "fahrezi";

  return (
    <footer ref={containerRef} id="contact" className="relative pt-32 pb-12 px-6 md:px-12 bg-[#f2f0e4] overflow-hidden border-t border-[#3a4f32]/10 flex flex-col items-center">
      {/* Background Gradient for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3a4f32]/[0.05] to-[#3a4f32]/[0.40] pointer-events-none"></div>

      {/* Subtle decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#3a4f32]/20 to-transparent"></div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center relative z-10 mb-32 md:mb-40"
      >
        <span className="text-[#d48a6a] mb-6 block">✦</span>
        <span className="font-space text-[10px] uppercase tracking-[0.3em] font-medium text-[#d48a6a] mb-12 block opacity-80">
          LET'S COLLABORATE
        </span>
        <h2 className="font-bricolage text-4xl sm:text-5xl md:text-8xl font-medium tracking-tight text-[#3a4f32] leading-[1] md:leading-[0.9] mb-12 md:mb-16 text-center">
          Let's build something <br className="hidden sm:block" />
          <span className="text-[#3a4f32]/40 italic hover:text-[#d48a6a]/80 transition-colors duration-700">extraordinary.</span>
        </h2>

        <a
          href="mailto:hello@fahrezi.tech"
          className="group flex items-center justify-center gap-4 px-8 py-4 md:px-12 md:py-5 rounded-full border border-[#3a4f32]/20 hover:border-[#d48a6a] hover:bg-[#d48a6a] hover:text-[#f2f0e4] transition-all duration-500 text-[#3a4f32]"
        >
          <span className="font-space text-[12px] md:text-[14px] tracking-[0.1em] font-medium">hello@fahrezi.tech</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
      </motion.div>

      {/* Footer Links */}
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 relative z-10 border-t border-[#3a4f32]/10 pt-8 mb-[30vw] md:mb-[15vw]">
        <p className="font-space text-[9px] md:text-[10px] text-[#1a1a1a]/50 uppercase tracking-[0.2em] text-center md:text-left">
          © {new Date().getFullYear()} Mohammad Fahrezi. All rights reserved.
        </p>
        <div className="flex gap-6 md:gap-8 font-space text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium text-[#1a1a1a]/60">
          <a href="https://github.com/fahrezi93" target="_blank" rel="noopener noreferrer" className="hover:text-[#d48a6a] transition-colors duration-300">GitHub</a>
          <a href="https://linkedin.com/in/mohammad-fahrezi" target="_blank" rel="noopener noreferrer" className="hover:text-[#d48a6a] transition-colors duration-300">LinkedIn</a>
          <a href="https://instagram.com/moh.fahrezi/" target="_blank" rel="noopener noreferrer" className="hover:text-[#d48a6a] transition-colors duration-300">Instagram</a>
        </div>
      </div>

      {/* Giant Cut-off Typography */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex justify-center items-end pointer-events-none select-none translate-y-[20%] md:translate-y-[35%]">
        <div className="flex justify-center items-baseline w-full overflow-hidden leading-none text-[#3a4f32]/[0.08]">
          {text.split('').map((char, i) => {
            // "fahr" (indices 0, 1, 2, 3) uses yStatic
            // "e" (index 4) uses yE, "z" (index 5) uses yZ, "i" (index 6) uses yI
            let y = yStatic;
            if (i === 4) y = yE;
            else if (i === 5) y = yZ;
            else if (i === 6) y = yI;

            return (
              <motion.span
                key={i}
                style={{ y }}
                className="inline-block font-bricolage font-bold text-[45vw] md:text-[28vw] tracking-tighter transform-gpu"
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
