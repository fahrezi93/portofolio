"use client";

import { motion } from "framer-motion";

const projectModules = [
  {
    title: "UI/UX & Web Design",
    id: "01",
    desc: "Designing intuitive interfaces with a strong focus on hierarchy, accessibility, and high-fidelity prototyping.",
    tools: ["Figma", "Wireframing", "Prototyping", "User Research", "Design Systems"]
  },
  {
    title: "Brand Identity",
    id: "02",
    desc: "Crafting distinctive visual languages and cohesive brand guidelines that stand out in the market.",
    tools: ["Adobe Illustrator", "Typography", "Logo Design", "Color Theory"]
  },
  {
    title: "Visual & Social Media",
    id: "03",
    desc: "Engaging graphic materials and content strategies tailored for digital marketing and social engagement.",
    tools: ["Adobe Photoshop", "Canva", "Layouting", "Creative Direction"]
  },
  {
    title: "Motion & Editing",
    id: "04",
    desc: "Dynamic visual storytelling through video editing and subtle motion graphics for digital presence.",
    tools: ["Premiere Pro", "After Effects", "CapCut", "Video Editing"]
  }
];

export function MinimalistSkills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto bg-[#f2f0e4]">
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
              WORKSHOP / TOOLS
            </span>
            <h2 className="font-bricolage text-4xl md:text-6xl font-medium tracking-tight text-[#3a4f32] max-w-lg leading-[1.1]">
              The stack behind <br /> the visuals.
            </h2>
          </div>
        </div>
        <p className="font-space text-[13px] text-[#1a1a1a]/60 max-w-xs leading-relaxed md:text-right">
          My creative toolset is structured around outcomes: building striking brand identities, designing intuitive interfaces, and ensuring every visual connects.
        </p>
      </motion.div>
      
      {/* Tools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {projectModules.map((module, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col p-8 md:p-10 border border-[#3a4f32]/10 bg-[#eef1e6]/30 backdrop-blur-md rounded-xl hover:bg-[#eef1e6]/80 hover:border-[#d48a6a]/30 transition-colors duration-500 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="font-space text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 group-hover:text-[#d48a6a] transition-colors duration-500 mb-3 block">
                  MODULE {module.id}
                </span>
                <h3 className="font-bricolage text-3xl font-medium text-[#3a4f32]">{module.title}</h3>
              </div>
              <div className="w-8 h-8 rounded-md bg-[#3a4f32]/5 flex items-center justify-center border border-[#3a4f32]/10 group-hover:bg-[#d48a6a]/10 group-hover:border-[#d48a6a]/20 transition-colors duration-500">
                <span className="text-[#3a4f32]/60 group-hover:text-[#d48a6a] text-xs transition-colors duration-500">⊞</span>
              </div>
            </div>

            <p className="font-space text-[13px] text-[#1a1a1a]/60 max-w-sm mb-12 leading-relaxed flex-grow">
              {module.desc}
            </p>

            <div className="flex flex-wrap gap-2 content-start border-t border-[#3a4f32]/10 pt-6">
              {module.tools.map((tool, tIdx) => (
                <div key={tIdx} className="flex items-center gap-1.5 font-space text-[10px] uppercase tracking-wider text-[#1a1a1a]/70 bg-white/40 px-2.5 py-1 rounded shadow-sm border border-[#3a4f32]/10 hover:border-[#d48a6a]/40 hover:text-[#d48a6a] group-hover:bg-white/70 transition-all duration-300">
                  <span className="w-1 h-1 rounded-full bg-[#d48a6a]/50"></span>
                  {tool}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
