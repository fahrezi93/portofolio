"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { designProjects } from "@/data/design-projects";

export function MinimalistProjects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto bg-[#f2f0e4]">
      {/* Header Area */}
      <motion.div 
        initial={{ opacity: 0, filter: "blur(5px)", y: 15 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8"
      >
        <h2 className="font-bricolage text-4xl md:text-6xl font-medium tracking-tight text-[#3a4f32] max-w-2xl leading-[1.1]">
          Creative work <br /> with clarity.
        </h2>
        <p className="font-space text-xs md:text-sm text-[#1a1a1a]/60 max-w-sm leading-relaxed mb-1">
          Each design project is presented as a visual solution — focusing on typography, layout principles, and brand consistency.
        </p>
      </motion.div>

      {/* Ledger Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-8 border-b border-[#3a4f32]/20 pb-4 mb-6 font-space text-[10px] uppercase tracking-[0.2em] text-[#d48a6a]">
        <div className="col-span-12 md:col-span-4">Projects</div>
        <div className="col-span-12 md:col-span-4">Details</div>
        <div className="col-span-12 md:col-span-3">Tools</div>
        <div className="col-span-12 md:col-span-1 text-right">Year</div>
      </div>

      {/* Projects List */}
      <div className="flex flex-col">
        {designProjects.slice(0, 6).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, filter: "blur(5px)", y: 15 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 py-8 md:py-10 border-b border-[#3a4f32]/10 hover:border-[#d48a6a]/40 cursor-pointer transition-colors duration-500"
          >
            {/* Col 1: Visual / Project Display */}
            <div className="col-span-12 md:col-span-4 flex">
              <div className="hidden md:flex flex-col justify-end w-8 mr-4 pb-2 border-r border-[#3a4f32]/10">
                <span className="font-space text-[9px] uppercase tracking-[0.3em] text-[#d48a6a] -rotate-90 origin-bottom-left whitespace-nowrap opacity-80">
                  {project.category}
                </span>
              </div>
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#3a4f32]/5 rounded-sm">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-[#3a4f32]/5 group-hover:bg-transparent transition-colors duration-500 rounded-sm pointer-events-none"></div>
              </div>
            </div>

            {/* Col 2: Details */}
            <div className="col-span-12 md:col-span-4 flex flex-col justify-start pt-2">
              <h3 className="font-bricolage text-xl md:text-2xl font-medium text-[#3a4f32] mb-3 group-hover:text-[#d48a6a] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-space text-[13px] leading-relaxed text-[#1a1a1a]/60">
                {project.description}
              </p>
            </div>

            {/* Col 3: Stack Badges */}
            <div className="col-span-12 md:col-span-3 flex flex-wrap gap-2 content-start pt-2">
              {project.tools.map((tool, tIdx) => (
                <span key={tIdx} className="h-6 flex items-center px-2 font-space text-[10px] uppercase tracking-wider border border-[#3a4f32]/15 text-[#3a4f32]/80 rounded-[4px] bg-[#eef1e6]/50 backdrop-blur-sm shadow-sm group-hover:border-[#d48a6a]/40 group-hover:text-[#d48a6a] transition-colors duration-300">
                  {tool}
                </span>
              ))}
            </div>

            {/* Col 4: Year & Arrow */}
            <div className="col-span-12 md:col-span-1 flex flex-row md:flex-col justify-between items-center md:items-end pt-2">
              <span className="font-space text-xs text-[#1a1a1a]/40">{project.year}</span>
              <div className="w-8 h-8 rounded-full border border-[#3a4f32]/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-[#d48a6a] group-hover:border-[#d48a6a] group-hover:text-[#f2f0e4] text-[#3a4f32] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
