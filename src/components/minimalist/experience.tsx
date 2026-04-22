"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

export function MinimalistExperience() {
  // Use english experiences for default minimalist view
  const xpList = experiences.en;

  return (
    <section id="experience" className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto bg-[#f2f0e4]">
      {/* Header Area */}
      <motion.div 
        initial={{ opacity: 0, filter: "blur(5px)", y: 15 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-[#3a4f32]/20 pb-12"
      >
        <div className="flex gap-4 items-start">
          <span className="mt-2 text-[#d48a6a]">✦</span>
          <div>
            <span className="font-space text-[10px] uppercase tracking-[0.2em] text-[#d48a6a] mb-3 block opacity-80">
              EXPERIENCE
            </span>
            <h2 className="font-bricolage text-4xl md:text-6xl font-medium tracking-tight text-[#3a4f32] max-w-lg leading-[1.1]">
              Professional <br /> journey.
            </h2>
          </div>
        </div>
        <p className="font-space text-[13px] text-[#1a1a1a]/60 max-w-xs leading-relaxed md:text-right">
          A summary of my roles in creative direction, multimedia, and development across various organizations.
        </p>
      </motion.div>

      {/* Experience List */}
      <div className="flex flex-col">
        {xpList.map((xp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: "blur(5px)", y: 15 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 py-10 md:py-12 border-b border-[#3a4f32]/10 hover:border-[#d48a6a]/40 transition-colors duration-500"
          >
            {/* Left: Role & Company - Col span 4 */}
            <div className="col-span-12 md:col-span-4 flex flex-col justify-start">
              <span className="font-space text-[10px] uppercase tracking-widest text-[#d48a6a] mb-4">
                {xp.duration}
              </span>
              <h3 className="font-bricolage text-2xl md:text-3xl font-medium text-[#3a4f32] mb-2 group-hover:text-[#d48a6a] transition-colors duration-300">
                {xp.jobTitle}
              </h3>
              <span className="font-space text-sm text-[#1a1a1a]/60">
                {xp.company}
              </span>
            </div>

            {/* Right: Descriptions - Col span 8 */}
            <div className="col-span-12 md:col-span-8 flex flex-col justify-start">
              <ul className="space-y-4 font-space text-[13px] leading-relaxed text-[#1a1a1a]/70">
                {xp.description.map((desc, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-[#3a4f32]/30 mt-1 select-none group-hover:text-[#d48a6a]/50 transition-colors duration-300">
                      —
                    </span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}