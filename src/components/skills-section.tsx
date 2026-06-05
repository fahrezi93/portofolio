"use client";

import { motion } from "framer-motion";
import { programmingSkills, creativeSkills } from "@/data/skills";
import { useLanguage } from "@/context/language-context";

export function SkillsSection() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="w-full py-24 md:py-32 relative overflow-hidden bg-[#0B1121]">
      {/* Background Atmosphere */}
      {/* External noise URL dihapus — network request ke domain asing untuk efek 2% opacity */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-blue-500/[0.03] blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Section Header */}
          <div className="space-y-6 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-[1px] bg-blue-500/50" />
              <span className="text-[10px] font-medium tracking-[0.3em] text-blue-400 uppercase">{t.skills_label}</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight"
            >
              {t.skills_heading_1}<span className="italic font-serif">{t.skills_heading_2}</span> <br /> 
              {t.skills_heading_3}
            </motion.h2>
          </div>

          <div className="space-y-32">
            {/* Category: Programming */}
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <p className="text-[10px] font-medium tracking-[0.2em] text-white/20 uppercase">{t.skills_dev_label}</p>
                  <h3 className="text-2xl text-white font-light max-w-[200px]">{t.skills_dev_heading}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-light max-w-xs">
                  {t.skills_dev_desc}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {programmingSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 flex flex-col gap-4 items-center justify-center text-center"
                  >
                    <skill.icon className="w-8 h-8 text-white/20 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500" />
                    <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Category: Design */}
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <p className="text-[10px] font-medium tracking-[0.2em] text-white/20 uppercase">{t.skills_creative_label}</p>
                  <h3 className="text-2xl text-white font-light max-w-[200px]">{t.skills_creative_heading}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-light max-w-xs">
                  {t.skills_creative_desc}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {creativeSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 flex flex-col gap-4 items-center justify-center text-center"
                  >
                    <skill.icon className="w-8 h-8 text-white/20 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-500" />
                    <span className="text-[10px] font-medium tracking-widest text-white/40 uppercase group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}
