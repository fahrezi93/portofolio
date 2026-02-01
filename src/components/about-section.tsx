"use client";

import { useLanguage } from "@/context/language-context";
import StarBorder from "./StarBorder";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download, Code2, Palette, Terminal, Globe, Pen, Video, Brain } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function AboutSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    { label: "Front-End Developer", icon: Code2 },
    { label: "UI/UX Enthusiast", icon: Palette },
    { label: "Full-Stack Developer", icon: Terminal },
    { label: "Graphic Designer", icon: Pen },
    { label: "Video Editor", icon: Video },
    { label: "ML Engineer", icon: Brain },
    { label: "Creative Coder", icon: Globe },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden bg-background/50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] translate-y-1/2" />

        {/* Giant Background Text */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none"
        >
          <span className="text-[20vw] font-bold font-headline uppercase tracking-tighter text-foreground">
            About
          </span>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-12 items-center max-w-6xl mx-auto">

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 relative group"
          >
            <div className="relative w-full aspect-[3/4] max-w-[280px] sm:max-w-xs mx-auto lg:max-w-sm">
              {/* Decorative Frames */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl transform rotate-6 transition-transform duration-500 group-hover:rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-emerald-500/10 rounded-3xl transform -rotate-6 transition-transform duration-500 group-hover:-rotate-3 backdrop-blur-sm" />

              {/* Main Image Container */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Mohammad Fahrezi"
                  fill
                  className="object-cover object-[center_100%] scale-125 transition-transform duration-700 group-hover:scale-[1.35]"
                  priority
                />

                {/* Floating Badge with Auto-Swipe */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-background/80 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden">
                  <div className="flex justify-between items-center">
                    <div className="h-10 flex flex-col justify-center w-full">
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">Experience</p>
                      <div className="relative h-6 w-full overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={currentRoleIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="text-sm font-bold text-foreground absolute w-full truncate"
                          >
                            {roles[currentRoleIndex].label}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary ml-3">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentRoleIndex}
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.5 }}
                        >
                          {(() => {
                            const Icon = roles[currentRoleIndex].icon;
                            return <Icon className="w-5 h-5" />;
                          })()}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-3 md:mb-4">
                <span className="h-px w-8 bg-primary" />
                <span className="text-primary font-medium tracking-wider text-xs md:text-sm uppercase">Who I Am</span>
              </div>

              <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                {t.about_title}
              </h2>

              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>{t.about_p1}</p>
                <p>{t.about_p2}</p>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-stretch sm:items-center"
            >
              <StarBorder as="a" href="#contact" className="w-full sm:w-auto text-center">
                {t.about_cta}
              </StarBorder>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto group relative overflow-hidden border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 h-[50px]"
              >
                <a
                  href="/images/CV-Fahrezi.pdf"
                  download
                  className="flex items-center justify-center gap-2 px-6 md:px-8"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  <span className="font-medium">{t.download_cv}</span>
                </a>
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}