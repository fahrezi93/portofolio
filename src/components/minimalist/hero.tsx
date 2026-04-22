"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

export function MinimalistHero() {
  const [time, setTime] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect mobile — runs once after mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IDT"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // On mobile: pause video to free up CPU/GPU
  useEffect(() => {
    if (isMobile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = ""; // release the resource completely
    }
  }, [isMobile]);

  // Mobile uses simpler opacity-only animation (no filter blur — too heavy on mobile CPU)
  const heroVariants = isMobile
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, y: 15, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
      };

  const textVariants = (blurPx: number, yPx: number) =>
    isMobile
      ? { initial: { opacity: 0, y: yPx }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: yPx, filter: `blur(${blurPx}px)` },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        };

  return (
    <section className="relative w-full h-[95vh] md:h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f2f0e4] px-4 md:px-6">
      {/* Decorative window frame effect */}
      <div className="absolute inset-0 pointer-events-none p-4 md:p-6 lg:p-8 flex">
        <div className="flex-1 border-[1px] border-[#1a1a1a]/5 rounded-[3rem] md:rounded-[4rem] relative shadow-[inset_0_0_150px_rgba(0,0,0,0.05)] overflow-hidden bg-[#f2f0e4]">

          {/* Background:
              - Mobile: pure CSS gradient only (no video, no heavy blur)
              - Desktop: video plays over gradient */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-gradient-to-br from-[#d4e1eb] via-[#e8edea] to-[#f2dfd3]">
            {/* Video — hidden on mobile via CSS, src released via JS */}
            {!isMobile && (
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover scale-[1.07] blur-[3px]"
              >
                <source src="/videoplayback(1).webm" type="video/webm" />
              </video>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-[#f2f0e4]/60 z-10" />

            {/* Grain Texture — reduced opacity on mobile for perf */}
            <div
              className="absolute inset-0 opacity-[0.10] md:opacity-[0.17] mix-blend-multiply z-20 pointer-events-none"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
            />
          </div>

          <div className="absolute bottom-5 left-5 md:bottom-12 md:left-12 flex flex-col gap-1 z-30">
            <span className="font-space text-[8px] md:text-[10px] text-[#1a1a1a]/60 tracking-[0.2em] uppercase">Current Location</span>
            <span className="font-bricolage text-[10px] md:text-xs text-[#1a1a1a]/90 font-medium tracking-tight">Palembang, Indonesia</span>
          </div>

          <div className="absolute bottom-5 right-5 md:bottom-12 md:right-12 flex flex-col items-end gap-1 z-30 text-right">
            <span className="font-space text-[8px] md:text-[10px] text-[#1a1a1a]/60 tracking-[0.2em] uppercase">Local Time</span>
            <span className="font-bricolage text-[10px] md:text-xs text-[#1a1a1a]/90 font-medium tracking-tight tabular-nums">{time ? time : "00:00:00"}</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={heroVariants.initial}
        animate={heroVariants.animate}
        transition={{ duration: isMobile ? 0.6 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        {/* Badge pill — mobile: no backdrop-blur (expensive), desktop: full glass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`rounded-full px-5 py-2 md:px-6 md:py-2.5 mb-6 md:mb-8 border border-white/10 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.8),inset_0_-1.5px_1px_rgba(0,0,0,0.1),0_4px_24px_rgba(0,0,0,0.1)] ${
            isMobile
              ? "bg-white/40"                                          // mobile: solid-ish, no backdrop-blur
              : "bg-white/20 backdrop-blur-xl saturate-150"           // desktop: full glassmorphism
          }`}
        >
          <span className="font-space text-[9px] sm:text-[10px] md:text-xs text-[#3a4f32] font-semibold tracking-wide whitespace-nowrap">
            Transforming ideas into compelling visual identities.
          </span>
        </motion.div>

        <motion.h1
          initial={textVariants(8, 20).initial}
          animate={textVariants(8, 20).animate}
          transition={{ duration: isMobile ? 0.5 : 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-bricolage text-[2.25rem] sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[#1a1a1a] mb-5 md:mb-6 whitespace-nowrap"
        >
          Hi! I am{" "}
          <span className="text-[#3a4f32] relative inline-block">
            Fahrezi
            <svg
              className="absolute -bottom-1 md:-bottom-3 -left-[2%] w-[104%] h-[10px] md:h-[14px] text-[#d48a6a]/70 pointer-events-none"
              viewBox="0 0 200 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: isMobile ? 0.6 : 1, ease: [0.16, 1, 0.3, 1] }}
                d="M 2 10 Q 90 -2 198 11"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          initial={textVariants(6, 15).initial}
          animate={textVariants(6, 15).animate}
          transition={{ duration: isMobile ? 0.5 : 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-space text-[12px] md:text-[15px] text-[#1a1a1a]/70 leading-relaxed max-w-2xl mx-auto mb-10 px-4 md:px-0"
        >
          A Graphic Designer &amp; UI/UX Specialist crafting meaningful digital experiences. Focused on clean layouts, brand consistency, and visually engaging designs that connect with audiences.
        </motion.p>

        <motion.div
          initial={textVariants(5, 15).initial}
          animate={textVariants(5, 15).animate}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full px-6 sm:px-0"
        >
          {/* CTA buttons — mobile: no backdrop-blur */}
          <a
            href="mailto:hello@fahrezi.tech"
            className={`w-full sm:w-auto max-w-[280px] sm:max-w-none group flex items-center justify-center gap-3 px-6 py-3.5 md:px-9 md:py-4 rounded-full border border-white/10 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.8),inset_0_-1.5px_1px_rgba(0,0,0,0.1),0_4px_24px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all duration-300 ${
              isMobile
                ? "bg-white/40 hover:bg-white/60"
                : "bg-white/20 backdrop-blur-xl saturate-150 hover:bg-white/30"
            }`}
          >
            <span className="font-bricolage text-[13px] md:text-[15px] font-medium text-[#1a1a1a] transition-colors duration-300">Let's Collaborate</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1a1a]/80 group-hover:text-[#1a1a1a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg>
          </a>

          <a
            href="/Resume%20Fahrezi%20Graph.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto max-w-[280px] sm:max-w-none group flex items-center justify-center gap-3 px-6 py-3.5 md:px-9 md:py-4 rounded-full border border-white/10 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.8),inset_0_-1.5px_1px_rgba(0,0,0,0.1),0_4px_24px_rgba(0,0,0,0.1)] hover:scale-[1.02] transition-all duration-300 ${
              isMobile
                ? "bg-white/40 hover:bg-white/60"
                : "bg-white/20 backdrop-blur-xl saturate-150 hover:bg-white/30"
            }`}
          >
            <span className="font-bricolage text-[13px] md:text-[15px] font-medium text-[#1a1a1a] transition-colors duration-300">Download Resume</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1a1a]/80 group-hover:text-[#1a1a1a] group-hover:translate-y-0.5 transition-all duration-300"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
