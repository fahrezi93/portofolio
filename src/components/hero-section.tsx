"use client";

import { ArrowDown } from "lucide-react";
import StarBorder from "./StarBorder";
import RotatingText from "./rotating-text";
import { useLanguage } from "@/context/language-context";
import { motion, LayoutGroup } from "framer-motion";
import AuroraBackground from "./aurora-background";

export function HeroSection() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // filter: blur() dihapus — sangat berat karena memaksa GPU repaint di tiap frame
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section id="home" className="relative w-full min-h-screen bg-[#0B1121] overflow-hidden flex flex-col items-center justify-center pt-40 pb-8">
      {/* Background Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(59,130,246,0.12), transparent 42%), radial-gradient(circle at 82% 10%, rgba(167,139,250,0.1), transparent 36%)",
        }}
      />

      {/* Aurora Background - Centered within hero */}
      {/* mix-blend-mode dihapus — compositing layer berat, apalagi di atas WebGL canvas */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <AuroraBackground />
      </div>

      <div className="container relative z-20 mx-auto px-6">
        <motion.div
          className="flex flex-col items-center text-center space-y-10 md:space-y-14"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
          {/* LayoutGroup di-scope ketat hanya ke inline content h1 — lightweight, hanya tracking 2 motion.span */}
          <div className="space-y-6">
            <LayoutGroup id="hero-heading">
              <motion.h1
                className="font-headline text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-white leading-[1.3] text-center"
                variants={itemVariants}
              >
                {/* layout="position" — hanya animasikan posisi x/y, lebih ringan dari layout penuh */}
                <motion.span layout="position" className="inline-block whitespace-pre">Crafting immersive </motion.span>
                <RotatingText
                  texts={[t.hero_rotating_2, t.hero_rotating_3, t.hero_rotating_4]}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-blue-400/20 border border-blue-400/30 text-blue-300 font-serif italic overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg backdrop-blur-sm inline-flex align-middle mx-1"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.012}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  rotationInterval={4200}
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