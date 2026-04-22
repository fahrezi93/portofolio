"use client";

import { useLanguage } from "@/context/language-context";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const { t } = useLanguage();
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

  // Parallax transforms for each letter
  // Even letters go up, odd letters go down (or diff speeds)
  // Individual parallax transforms for each letter to create a wavy/staggered effect
  const yF = useTransform(smoothProgress, [0, 1], [100, 0]);
  const yA = useTransform(smoothProgress, [0, 1], [160, 0]);
  const yH = useTransform(smoothProgress, [0, 1], [110, 0]);
  const yR = useTransform(smoothProgress, [0, 1], [180, 0]);
  const yE = useTransform(smoothProgress, [0, 1], [130, 0]);
  const yZ = useTransform(smoothProgress, [0, 1], [150, 0]);
  const yI = useTransform(smoothProgress, [0, 1], [120, 0]);

  const letters = [
    { char: 'f', y: yF },
    { char: 'a', y: yA },
    { char: 'h', y: yH },
    { char: 'r', y: yR },
    { char: 'e', y: yE },
    { char: 'z', y: yZ },
    { char: 'i', y: yI },
  ];

  return (
    <footer ref={containerRef} className="relative w-full bg-[#0B1121] pt-32 pb-20 overflow-hidden">
      {/* Soft Blue Gradient Bloom */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-32">
          {/* Left Side: Socials & Contact */}
          <div className="space-y-12">
            <div className="flex gap-6">
              <a href="https://instagram.com/moh.fahrezi/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://github.com/fahrezi93" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/in/mohammad-fahrezi" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>

            <div className="space-y-6">
              <a href="mailto:hello@fahrezi.tech" className="text-2xl md:text-3xl font-medium text-white hover:text-blue-400 transition-colors duration-300 block">
                hello@fahrezi.tech
              </a>
              <div className="text-gray-500 text-sm space-y-1 leading-relaxed">
                <p>Based in Indonesia</p>
                <p>Available for freelance</p>
              </div>
            </div>
          </div>

          {/* Right Side: Navigation */}
          <div className="flex flex-col gap-6 items-start md:items-end">
            <a href="#work" className="text-xl text-white/60 hover:text-white transition-colors duration-300 font-medium tracking-tight">Work</a>
            <a href="#about" className="text-xl text-white/60 hover:text-white transition-colors duration-300 font-medium tracking-tight">About</a>
            <a href="#experience" className="text-xl text-white/60 hover:text-white transition-colors duration-300 font-medium tracking-tight">Experience</a>
            <a href="#contact" className="text-xl text-white/60 hover:text-white transition-colors duration-300 font-medium tracking-tight">Contact</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 relative z-30">
          <p className="text-center">© {new Date().getFullYear()} Mohammad Fahrezi. All Rights Reserved</p>
        </div>
      </div>

      {/* Massive Background Text - "fahrezi" with per-letter parallax */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none z-10 select-none flex items-end justify-center h-[30vw]">
        <div className="flex justify-center w-full leading-none translate-y-[25%] select-none">
          <div className="flex text-[33vw] font-bold text-white/[0.05] tracking-tighter whitespace-nowrap">
            {letters.map((item, idx) => (
              <motion.span
                key={idx}
                style={{ y: item.y }}
                className="inline-block"
              >
                {item.char}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
