"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/context/language-context";
import AuroraBackground from "@/components/aurora-background";
import { useEffect } from "react";
export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };
  
  // Scroll ke atas saat halaman dimuat
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LanguageProvider>
      {/* Aurora Background - Fixed layer at top with fade effect */}
      <AuroraBackground />
      <div className="flex min-h-screen w-full flex-col relative overflow-hidden">
        <div className="relative z-10">
            <Header />
            <main className="flex-1 pt-24">
              <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
                <HeroSection />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants} className="z-10 relative">
                <ProjectsSection />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
                <AboutSection />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
                <SkillsSection />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
                <ContactSection />
              </motion.div>
            </main>
            <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}
