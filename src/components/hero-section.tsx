"use client";

import { ArrowDown } from "lucide-react";
import StarBorder from "./StarBorder";
import RotatingText from "./rotating-text";
import { useLanguage } from "@/context/language-context";
import { motion, LayoutGroup } from "motion/react";
import { useLoading } from "@/context/loading-context";
import AuroraBackground from "./aurora-background";

export function HeroSection() {
  const { t } = useLanguage();
  const { isLoading } = useLoading();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen bg-[#0B1121] overflow-hidden flex flex-col items-center justify-center pt-40 pb-8">
      {/* Background Atmosphere - Grainy noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-10" />

      {/* Aurora Background - Centered within hero */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <AuroraBackground />
      </div>

      <div className="container relative z-20 mx-auto px-6">
        <motion.div
          className="flex flex-col items-center text-center space-y-10 md:space-y-14"
          variants={containerVariants}
          initial="hidden"
          animate={isLoading ? "hidden" : "visible"}
        >
          {/* Top Label - Editorial Style */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <span className="w-12 h-[1px] bg-blue-500/40" />
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.5em] text-blue-400 uppercase">
              {t.hero_subtitle}
            </span>
            <span className="w-12 h-[1px] bg-blue-500/40" />
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-6">
            <LayoutGroup>
              <motion.h1
                className="font-headline text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.3] text-center"
                variants={itemVariants}
              >
                <motion.span layout className="inline-block whitespace-pre">Crafting immersive </motion.span>
                <RotatingText
                  texts={[t.hero_rotating_2, t.hero_rotating_3, t.hero_rotating_4]}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-blue-400/20 border border-blue-400/30 text-blue-300 font-serif italic overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg backdrop-blur-sm inline-flex align-middle mx-1"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
                <span className="block mt-2 opacity-90">digital experiences.</span>
              </motion.h1>
            </LayoutGroup>

            <motion.p
              className="mx-auto max-w-2xl text-base md:text-lg text-gray-500 font-light leading-relaxed pt-4 px-4"
              variants={itemVariants}
            >
              {t.hero_tagline}
            </motion.p>
          </div>

          {/* CTA Section */}
          <motion.div className="flex flex-col items-center gap-8 md:gap-12" variants={itemVariants}>
            <StarBorder as="a" href="#portfolio-content" className="bg-white/[0.02] backdrop-blur-sm border-white/10 hover:bg-white/[0.08] transition-all duration-500">
              <span className="flex items-center gap-3 px-8 py-1.5 text-sm uppercase tracking-widest font-medium text-white">
                {t.hero_cta}
                <ArrowDown className="h-4 w-4 text-blue-400 animate-bounce" />
              </span>
            </StarBorder>

            {/* Vertical Decorative Line */}
            <div className="h-24 w-[1px] bg-gradient-to-b from-blue-500/40 via-blue-500/10 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}