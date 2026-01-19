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
    <section id="experience" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            {t.experience_title}
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Professional Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.experience_subtitle}
          </p>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {currentExperiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              {/* Modern Card Design - optimized for mobile */}
              <div className={`relative p-6 md:p-8 rounded-2xl bg-background border border-border/50 shadow-sm ${!isMobile ? 'md:bg-background/80 md:backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:border-primary/30 hover:-translate-y-1' : ''}`}>
                {/* Gradient Accent - only on desktop */}
                {!isMobile && <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {exp.jobTitle}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-semibold mb-2">
                        <MapPin className="w-4 h-4" />
                        {exp.company}
                      </div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 text-muted-foreground text-sm font-medium border border-border/30">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    {exp.description.map((desc, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2.5 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle Corner Accent - only on desktop */}
                {!isMobile && <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}