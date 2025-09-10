"use client";

import { useState } from "react";
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

  return (
    <section id="portfolio" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t.portfolio_title}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            {t.portfolio_subtitle}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 md:gap-6 mb-16 max-w-4xl mx-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative rounded-full transition-all duration-300 transform hover:scale-105 w-full md:w-auto md:min-w-[280px] ${
                  isActive 
                    ? "scale-105 shadow-lg" 
                    : "hover:shadow-md"
                }`}
              >
                <div className={`relative px-6 py-4 rounded-full border transition-all duration-300 ${
                  isActive 
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

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>
    </section>
  );
}
