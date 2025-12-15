"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PortfolioTabs } from "@/components/portfolio-tabs";
import { AboutSection } from "@/components/about-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { LanguageProvider } from "@/context/language-context";
import ModernBackground from "@/components/modern-background";
import AuroraBackground from "@/components/aurora-background";
import { useLenis } from "@/hooks/use-lenis";
import { useEffect, useState, lazy, Suspense } from "react";

// Lazy load komponen berat
const GitHubStats = lazy(() => import("@/components/github-stats").then(module => ({ default: module.GitHubStats })));
const CommentsSection = lazy(() => import("@/components/comments-section").then(module => ({ default: module.CommentsSection })));
import { FloatingDock } from "@/components/floating-dock";
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Initialize Lenis for smooth scrolling
  useLenis();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkReducedMotion = () => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkReducedMotion();
    window.scrollTo(0, 0);

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile-friendly animations - tetap ada animasi tapi lebih ringan
  const sectionVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : (isMobile ? 10 : 20) },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0 : (isMobile ? 0.4 : 0.6), ease: "easeOut" }
    },
  };

  return (
    <LanguageProvider>
      {/* Modern Background - Fixed layer with animated elements */}
      <ModernBackground />
      {/* Aurora Background - Overlay with matching colors */}
      <AuroraBackground />
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      <div className="flex min-h-screen w-full flex-col relative">
        <div className="relative z-10">
          <Header />
          <main className="flex-1 pt-24">
            <motion.div initial="hidden" animate="visible" variants={sectionVariants}>
              <HeroSection />
            </motion.div>
            <div className="z-10 relative">
              <PortfolioTabs />
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05, margin: "0px 0px -100px 0px" }} variants={sectionVariants}>
              <AboutSection />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05, margin: "0px 0px -100px 0px" }} variants={sectionVariants}>
              <ExperienceSection />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05, margin: "0px 0px -100px 0px" }} variants={sectionVariants}>
              <SkillsSection />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05, margin: "0px 0px -100px 0px" }} variants={sectionVariants}>
              <Suspense fallback={
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              }>
                <GitHubStats />
              </Suspense>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05, margin: "0px 0px -100px 0px" }} variants={sectionVariants}>
              <Suspense fallback={
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              }>
                <CommentsSection />
              </Suspense>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05, margin: "0px 0px -100px 0px" }} variants={sectionVariants}>
              <ContactSection />
            </motion.div>
          </main>
          <Footer />
          <FloatingDock />
        </div>
      </div>
    </LanguageProvider>
  );
}