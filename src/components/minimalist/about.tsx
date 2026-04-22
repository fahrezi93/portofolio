"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function MinimalistAbout() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 md:px-12 bg-[#f2f0e4]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-start">
        {/* Left Column / Image */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", x: -20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col w-full max-w-md mx-auto lg:max-w-none"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#3a4f32]/5 rounded-2xl grayscale-[0.8] hover:grayscale-0 transition-all duration-700 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/profile.webp"
              alt="Mohammad Fahrezi"
              fill
              className="object-cover object-[center_80%] scale-105 hover:scale-100 transition-transform duration-700 ease-out"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 border border-white/20 rounded-2xl mix-blend-overlay"></div>
          </div>

          <div className="mt-6 w-full flex justify-between items-center border-t border-[#3a4f32]/10 pt-4 font-space text-[10px] uppercase tracking-[0.2em] text-[#3a4f32]/60">
            <span>Based in</span>
            <span className="text-[#d48a6a] font-medium">Indonesia</span>
          </div>
        </motion.div>

        {/* Right Column / Text */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-start"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#d48a6a]">✦</span>
            <span className="font-space text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium text-[#d48a6a]">
              ABOUT ME
            </span>
          </div>

          <h2 className="font-bricolage text-3xl sm:text-4xl md:text-[2.75rem] font-medium tracking-tight text-[#3a4f32] leading-[1.25] mb-10 max-w-2xl">
            I believe <span className="italic text-[#3a4f32]/70 font-serif">meaningful design</span> is the bridge between complex ideas and human connection.
          </h2>

          <div className="space-y-7 font-space text-[14px] md:text-[15px] text-[#1a1a1a]/70 leading-[1.8] max-w-xl">
            <p>
              Hello! I'm Mohammad Fahrezi, a passionate Computer Science student at Sriwijaya University with a deep fascination for Graphic Design and UI/UX. I believe technology has the extraordinary power to transform creative ideas into meaningful digital experiences that make a real difference.
            </p>
            <p>
              My approach focuses on clean typography, structured hierarchy, and striking visual identities. Whether I'm creating branding materials or designing user interfaces, I aim to craft solutions that are not only aesthetically pleasing but also highly functional.
            </p>
            <p>
              When I'm not designing, you'll find me exploring new layout techniques, producing motion graphics, or researching the latest shifts in digital branding and interface design.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <a
              href="/Resume Fahrezi Graph.pdf"
              target="_blank"
              className="group flex items-center gap-3 border-b border-[#3a4f32]/20 pb-1 hover:border-[#d48a6a] transition-colors duration-300"
            >
              <span className="font-space text-xs uppercase tracking-widest text-[#3a4f32] group-hover:text-[#d48a6a] transition-colors duration-300">
                Download Resume
              </span>
              <span className="text-[#3a4f32]/40 group-hover:text-[#d48a6a] transition-colors duration-300">↓</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}