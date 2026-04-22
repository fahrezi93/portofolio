// src/components/experience-section.tsx

"use client";

import { useLanguage } from "@/context/language-context";
import { experiences } from "@/data/experience";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

export function ExperienceSection() {
  const { language, t } = useLanguage();
  const currentExperiences = experiences[language] || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: isMobile ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0 : 0.15,
        delayChildren: isMobile ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section id="experience" className="w-full py-24 md:py-32 relative bg-[#0B1121] overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="mb-32 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-[1px] bg-blue-500/50" />
              <span className="text-[10px] font-medium tracking-[0.3em] text-blue-400 uppercase">Chronicle / Experience</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-tight"
            >
              Professional <span className="italic font-serif text-white/90">Pathways</span>.
            </motion.h2>
          </div>

          {/* Timeline List */}
          <div className="space-y-0">
            {currentExperiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative border-t border-white/5 py-12 md:py-16 grid md:grid-cols-[1fr_2fr_1fr] lg:grid-cols-[0.8fr_2fr_0.5fr] gap-8 items-start hover:bg-white/[0.01] transition-colors duration-500 px-4 -mx-4 rounded-xl"
              >
                {/* Column 1: Duration */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors" />
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-blue-400 uppercase">
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Column 2: Job Title & Company */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                      {exp.jobTitle}
                    </h3>
                    <p className="text-lg italic font-serif text-white/50 group-hover:text-white/80 transition-colors">
                      {exp.company}
                    </p>
                  </div>
                  
                  {/* Description List */}
                  <div className="space-y-4 max-w-xl">
                    {exp.description.map((desc, i) => (
                      <p 
                        key={i} 
                        className="text-sm text-gray-500 font-light leading-relaxed group-hover:text-gray-400 transition-colors"
                      >
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Column 3: Optional Meta / Index */}
                <div className="hidden lg:flex justify-end">
                  <span className="text-[40px] font-serif italic text-white/[0.03] group-hover:text-white/[0.07] transition-colors select-none">
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
            {/* Bottom Border */}
            <div className="border-t border-white/5 w-full" />
          </div>
        </div>
      </div>
    </section>


  );
}