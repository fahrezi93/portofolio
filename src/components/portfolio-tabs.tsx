"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    <section id="portfolio" className="w-full py-16 md:py-24 lg:py-32 bg-transparent">
      <div id="portfolio-title" className="scroll-mt-32"></div>
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={headerVariants} className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              {t.portfolio_title}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              {t.portfolio_subtitle}
            </p>
          </motion.div>

          {/* Tab Navigation - Mobile Optimized */}
          <motion.div variants={tabsVariants} className="mb-16 max-w-4xl mx-auto">
            {/* Mobile: Compact segmented control */}
            <div className="md:hidden">
              <div className="bg-muted p-1 rounded-lg mx-4">
                <div className="flex">
                  {tabs.map((tab) => {
                    const IconComponent = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex flex-col items-center gap-1 py-2 px-2 rounded-md transition-all duration-200 ${isActive
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                          }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="text-xs font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop: Full cards */}
            <div className="hidden md:flex flex-wrap justify-center gap-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative rounded-full transition-all duration-300 transform hover:scale-105 min-w-[280px] ${isActive
                        ? "scale-105 shadow-lg"
                        : "hover:shadow-md"
                      }`}
                  >
                    <div className={`relative px-6 py-4 rounded-full border transition-all duration-300 ${isActive
                        ? "bg-slate-700 dark:bg-slate-600 border-slate-600 dark:border-slate-500 text-white"
                        : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}>
                      <div className="flex items-center gap-3">
                        {/* Icon */}
                        <IconComponent className="w-5 h-5 flex-shrink-0" />

                        {/* Content */}
                        <div className="text-left flex-1">
                          <h3 className="font-semibold text-base mb-0.5">
                            {tab.label}
                          </h3>
                          <p className="text-xs opacity-80">
                            {tab.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            id="portfolio-content"
            variants={contentVariants}
            className="min-h-[600px] scroll-mt-28"
          >
            {renderTabContent()}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
