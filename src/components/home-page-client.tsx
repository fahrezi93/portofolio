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
import ModernBackground from "@/components/modern-background";
import { useLenis } from "@/hooks/use-lenis";
import { useEffect, useState, lazy, Suspense } from "react";

const GitHubStats = lazy(() =>
  import("@/components/github-stats").then((module) => ({ default: module.GitHubStats }))
);
const SpotifyTopTracks = lazy(() =>
  import("@/components/spotify-top-tracks").then((module) => ({ default: module.SpotifyTopTracks }))
);
const TopTracksLastfm = lazy(() =>
  import("@/components/top-tracks-lastfm").then((module) => ({ default: module.TopTracksLastfm }))
);

function AnimatedSection({
  children,
  sectionId,
  className = "",
}: {
  children: React.ReactNode;
  sectionId: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === sectionId || hash.startsWith(sectionId)) {
      setTimeout(() => setIsVisible(true), 100);
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
        setIsVisible(true);
      }
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace("#", "");
      if (newHash === sectionId || newHash.startsWith(sectionId)) {
        setIsVisible(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05, rootMargin: "100px 0px 0px 0px" }
    );

    if (element) {
      observer.observe(element);
    }

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
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

export default function HomePageClient() {
  useLenis();

  return (
    <>
      <ModernBackground />
      <ScrollProgress />

      <div className="flex min-h-screen w-full flex-col relative" style={{ position: "relative" }}>
        <div className="relative z-10">
          <Header />
          <main className="flex-1 relative">
            <HeroSection />

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

            <div className="relative z-10 w-full">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                }
              >
                <GitHubStats />
              </Suspense>
            </div>
            <div className="relative z-10 w-full">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                }
              >
                <SpotifyTopTracks />
              </Suspense>
            </div>

            <div className="relative z-10 w-full">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  </div>
                }
              >
                <TopTracksLastfm />
              </Suspense>
            </div>

            <AnimatedSection sectionId="contact">
              <ContactSection />
            </AnimatedSection>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
