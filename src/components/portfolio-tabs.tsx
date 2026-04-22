"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { Badge } from "./ui/badge";
import { DesignSection } from "@/components/portfolio/design-section";
import { EditingSection } from "@/components/portfolio/editing-section";
import { DevelopmentSection } from "@/components/portfolio/development-section";
import { Palette, Video, Code2, Sparkles, Play, Terminal } from "lucide-react";

type TabType = "design" | "editing" | "development";

export function PortfolioTabs() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>("development");
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

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

  const tabs = [
    {
      id: "development" as TabType,
      label: t.portfolio_tab_development,
      description: t.portfolio_tab_development_desc,
      icon: Code2,
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20",
      iconColor: "text-blue-500",
    },
    {
      id: "design" as TabType,
      label: t.portfolio_tab_design,
      description: t.portfolio_tab_design_desc,
      icon: Palette,
      gradient: "from-pink-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-violet-50 dark:from-pink-950/20 dark:to-violet-950/20",
      iconColor: "text-pink-500",
    },
    {
      id: "editing" as TabType,
      label: t.portfolio_tab_editing,
      description: t.portfolio_tab_editing_desc,
      icon: Play,
      gradient: "from-red-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20",
      iconColor: "text-red-500",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "design":
        return <DesignSection />;
      case "editing":
        return <EditingSection />;
      case "development":
        return <DevelopmentSection />;
      default:
        return <DesignSection />;
    }
  };

  // Mobile-friendly animations - tetap ada animasi tapi lebih ringan
  const containerVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0 : (isMobile ? 0.4 : 0.6),
        ease: "easeOut",
        staggerChildren: reducedMotion ? 0 : (isMobile ? 0.15 : 0.3),
        delayChildren: reducedMotion ? 0 : (isMobile ? 0.1 : 0.2)
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : (isMobile ? 15 : 30) },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : (isMobile ? 0.4 : 0.6),
        ease: "easeOut"
      }
    }
  };

  const tabsVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : (isMobile ? 10 : 20) },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : (isMobile ? 0.3 : 0.5),
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : (isMobile ? 10 : 20) },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : (isMobile ? 0.3 : 0.5),
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="portfolio" className="w-full pt-12 md:pt-16 pb-24 md:pb-32 relative overflow-hidden bg-[#0B1121]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={headerVariants} className="space-y-6 mb-20">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-blue-500/50" />
              <span className="text-[10px] font-medium tracking-[0.3em] text-blue-400 uppercase">Selected Works</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white leading-tight">
              A collection of <br />
              <span className="italic font-serif text-white/90">digital craft</span> & design.
            </h2>
          </motion.div>

          {/* Tab Navigation - Minimalist Architectural */}
          <motion.div variants={tabsVariants} className="mb-20">
            <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/5 pb-8 gap-8">
              <div className="flex flex-wrap items-center gap-2 md:gap-8">
                {tabs.map((tab, i) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <div key={tab.id} className="flex items-center gap-2 md:gap-8">
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`group relative py-2 text-sm transition-all duration-500 ${
                          isActive ? "text-white" : "text-white/40 hover:text-white/60"
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span className="text-[10px] font-serif italic text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}</span>
                          {tab.label}
                        </span>
                        {isActive && (
                          <motion.div 
                            layoutId="activeTab"
                            className="absolute -bottom-[33px] left-0 right-0 h-[2px] bg-blue-500 z-20"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </button>
                      {i < tabs.length - 1 && (
                        <div className="hidden md:block w-[1px] h-3 bg-white/10" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Stats/Counter */}
              <div className="hidden lg:block text-[10px] font-medium tracking-[0.2em] text-white/20 uppercase">
                Active Archive / 2024 — 2025
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            id="portfolio-content"
            variants={contentVariants}
            className="min-h-[600px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>

  );
}
