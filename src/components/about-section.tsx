"use client";

import { useLanguage } from "@/context/language-context";
import StarBorder from "./StarBorder";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download, Code2, Palette, Terminal, Globe, Pen, Video, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function AboutSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    { label: "Front-End Developer", icon: Code2 },
    { label: "Graphic Designer", icon: Palette },
    { label: "Full-Stack Developer", icon: Terminal },
    { label: "Motion Graphics", icon: Video },
    { label: "ML Engineer", icon: Brain },
    { label: "Creative Coder", icon: Globe },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  // roles.length stabil (6 item static), tidak perlu masuk dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useScroll + useTransform dihapus — y tidak dipakai di JSX tapi tetap attach scroll listener

  return (
    <section id="about" ref={containerRef} className="w-full py-24 md:py-32 relative overflow-hidden bg-[#0B1121]">
      {/* Background Atmosphere */}
      {/* External noise URL dihapus — fetch ke domain asing di setiap render */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/[0.02] blur-[120px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">

          {/* Image & Roles Column */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/5 group shadow-2xl"
            >
              <Image
                src="/images/profile.webp"
                alt="Mohammad Fahrezi"
                fill
                // transition-all diganti spesifik — menghindari animasi tiap properti CSS saat hover
                className="object-cover object-bottom grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1121] via-transparent to-transparent opacity-60" />

              {/* Gallery-style metadata label */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl space-y-1">
                  <p className="text-[8px] font-bold tracking-[0.2em] text-white/40 uppercase">Digital Persona</p>
                  <p className="text-sm font-light text-white">Mohammad Fahrezi</p>
                </div>
              </div>
            </motion.div>

            {/* Expertise List - Deconstructed */}
            <div className="space-y-6">
              <p className="text-[10px] font-medium tracking-[0.3em] text-blue-400 uppercase">Focus Areas</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roles.slice(0, 4).map((role, i) => (
                  <motion.div
                    key={role.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 py-3 border-b border-white/5 group hover:border-white/20 transition-colors"
                  >
                    <role.icon className="w-4 h-4 text-white/20 group-hover:text-blue-400 transition-colors" />
                    <span className="text-xs font-light text-white/60 group-hover:text-white transition-colors">
                      {role.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="space-y-12">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <span className="w-8 h-[1px] bg-blue-500/50" />
                <span className="text-[10px] font-medium tracking-[0.3em] text-blue-400 uppercase">Narrative / Bio</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-white leading-[1.1]"
              >
                Designing <br />
                <span className="italic font-serif text-white/90">digital</span> stories.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 max-w-xl"
              >
                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                  {t.about_p1.split("meaningful digital experiences").map((part, i) => (
                    <span key={i}>
                      {part}
                      {i === 0 && <span className="italic font-serif text-white">meaningful digital experiences</span>}
                    </span>
                  ))}
                </p>
                <p className="text-base text-gray-500 font-light leading-relaxed">
                  {t.about_p2}
                </p>
              </motion.div>
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 pt-12 border-t border-white/5"
            >
              <Button
                asChild
                className="group relative h-14 px-8 bg-white text-black hover:bg-white/90 rounded-full font-medium transition-all overflow-hidden"
              >
                <a href="#contact" className="flex items-center gap-2">
                  <span className="relative z-10">{t.about_cta}</span>
                  <div className="w-2 h-2 rounded-full bg-black group-hover:w-4 transition-all duration-300" />
                </a>
              </Button>

              <Button
                variant="outline"
                asChild
                className="h-14 px-8 bg-transparent hover:bg-white/5 border-white/10 text-white rounded-full font-medium transition-colors backdrop-blur-md"
              >
                <a
                  href="/CV-Fahrezi-new.pdf"
                  download
                  className="flex items-center gap-3"
                >
                  <Download className="h-4 w-4 text-gray-400 group-hover:translate-y-1 transition-transform" />
                  <span>{t.download_cv}</span>
                </a>
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>

  );
}