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
import dynamic from "next/dynamic";
import AuroraBackground from "@/components/aurora-background";


export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <LanguageProvider>
      <div className="flex min-h-screen w-full flex-col relative">
        <AuroraBackground />
        <div className="relative z-10">
            <Header />
            <main className="flex-1">
              <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
                <HeroSection />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}>
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
