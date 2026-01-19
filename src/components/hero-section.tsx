"use client";

import { ArrowDown } from "lucide-react";
import StarBorder from "./StarBorder";
import RotatingText from "./rotating-text";
import { useLanguage } from "@/context/language-context";
import { ParallaxBackground } from "./parallax-background";
import dynamic from "next/dynamic";

import { motion, LayoutGroup } from "motion/react";

export function HeroSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 2.2 // Delay matches app loading screen
      }
    }
  };

  // Use consistent transform values that won't cause hydration mismatch
  // Note: Using transform3d for GPU acceleration, but suppress hydration warnings
  // as framer-motion may add translateZ(0) on client but not server
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <ParallaxBackground className="relative grid w-full min-h-[calc(100vh-8rem)] place-items-center">
      <section id="home" className="relative w-full">
        <div className="container relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center md:px-6 min-h-[calc(100vh-8rem)]">
          <LayoutGroup>
            <motion.div
              className="flex flex-col items-center space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              suppressHydrationWarning
            >
              <div className="space-y-4">
                <motion.p
                  className="font-headline text-lg text-primary md:text-xl"
                  variants={itemVariants}
                  suppressHydrationWarning
                >
                  {t.hero_subtitle}
                </motion.p>
                <motion.div
                  className="font-headline text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl flex flex-col items-center justify-center gap-2 sm:gap-4"
                  variants={itemVariants}
                >
                  <motion.div
                    className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4"
                    layout
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                  >
                    <motion.span
                      className=""
                      layout
                      transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    >
                      {t.hero_rotating_1}
                    </motion.span>
                    <RotatingText
                      texts={[t.hero_rotating_2, t.hero_rotating_3, t.hero_rotating_4]}
                      mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white overflow-hidden py-1 sm:py-2 md:py-3 justify-center rounded-xl"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{ type: "spring", damping: 30, stiffness: 200 }}
                      rotationInterval={3000}
                    />
                  </motion.div>
                  <div className="text-center">digital products.</div>
                </motion.div>
                <motion.p
                  className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl"
                  variants={itemVariants}
                >
                  {t.hero_tagline}
                </motion.p>
              </div>
              <motion.div className="pt-4" variants={itemVariants}>
                <StarBorder as="a" href="#portfolio-content">
                  {t.hero_cta}
                  <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
                </StarBorder>
              </motion.div>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>
    </ParallaxBackground>
  );
}