"use client";

import { ArrowDown } from "lucide-react";
import StarBorder from "./StarBorder";
import RotatingText from "./rotating-text";
import { useLanguage } from "@/context/language-context";
import { ParallaxBackground } from "./parallax-background";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function HeroSection() {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Tunggu loading screen selesai (2 detik + sedikit buffer)
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <ParallaxBackground className="relative grid w-full min-h-[calc(100vh-8rem)] place-items-center">
      <section id="home" className="relative w-full">
        <div className="container relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center md:px-6 min-h-[calc(100vh-8rem)]">
          <motion.div
            className="flex flex-col items-center space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div className="space-y-4">
              <motion.p
                className="font-headline text-lg text-primary md:text-xl"
                variants={itemVariants}
              >
                {t.hero_subtitle}
              </motion.p>
              <motion.div
                className="font-headline text-5xl font-bold leading-relaxed tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ lineHeight: '1.3' }}
                variants={itemVariants}
              >
                <motion.div
                  className="inline-flex items-center justify-center"
                  layout
                  transition={{ type: "spring", damping: 30, stiffness: 200 }}
                >
                  <motion.span
                    className="mr-1 sm:mr-2"
                    layout
                    transition={{ type: "spring", damping: 30, stiffness: 200 }}
                  >
                    {t.hero_rotating_1}
                  </motion.span>
                  <RotatingText
                    texts={[t.hero_rotating_2, t.hero_rotating_3, t.hero_rotating_4]}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-xl"
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
        </div>
      </section>
    </ParallaxBackground>
  );
}