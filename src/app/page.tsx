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
import { useEffect, useState, lazy, Suspense, useCallback } from "react";

// Lazy load komponen berat
const GitHubStats = lazy(() => import("@/components/github-stats").then(module => ({ default: module.GitHubStats })));
const CommentsSection = lazy(() => import("@/components/comments-section").then(module => ({ default: module.CommentsSection })));
import { FloatingDock } from "@/components/floating-dock";

// Animated section wrapper that handles both scroll and hash navigation
function AnimatedSection({ 
  children, 
  sectionId,
  className = ""
}: { 
  children: React.ReactNode; 
  sectionId: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check initial hash
    const hash = window.location.hash.replace('#', '');
    if (hash === sectionId || hash.startsWith(sectionId)) {
      // Small delay to ensure DOM is ready
      setTimeout(() => setIsVisible(true), 100);
    }

    // Check if already in viewport
    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
        setIsVisible(true);
      }
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash === sectionId || newHash.startsWith(sectionId)) {
        setIsVisible(true);
      }
    };

    // Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: '100px 0px 0px 0px' }
    );

    if (element) {
      observer.observe(element);
    }

    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      observer.disconnect();
    };
  }, [sectionId]);

  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

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
      <div className="flex min-h-screen w-full flex-col relative" style={{ position: 'relative' }}>
        <div className="relative z-10">
          <Header />
          <main className="flex-1 pt-24 relative" style={{ position: 'relative' }}>
            <motion.div initial="hidden" animate="visible" variants={sectionVariants} suppressHydrationWarning>
              <HeroSection />
            </motion.div>
            <AnimatedSection sectionId="portfolio" className="z-10 relative">
              <PortfolioTabs />
            </AnimatedSection>
            <AnimatedSection sectionId="about">
              <AboutSection />
            </AnimatedSection>
            <AnimatedSection sectionId="experience">
              <ExperienceSection />
            </AnimatedSection>
            <AnimatedSection sectionId="skills">
              <SkillsSection />
            </AnimatedSection>
            <AnimatedSection sectionId="github">
              <Suspense fallback={
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              }>
                <GitHubStats />
              </Suspense>
            </AnimatedSection>
            <AnimatedSection sectionId="comments">
              <Suspense fallback={
                <div className="flex items-center justify-center py-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                </div>
              }>
                <CommentsSection />
              </Suspense>
            </AnimatedSection>
            <AnimatedSection sectionId="contact">
              <ContactSection />
            </AnimatedSection>
          </main>
          <Footer />

        </div>
      </div>
    </LanguageProvider>
  );
}