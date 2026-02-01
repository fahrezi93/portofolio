"use client";

import { useLanguage } from "@/context/language-context";
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the footer container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Smooth out the scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  // Parallax transforms for each letter
  // Even letters go up, odd letters go down (or diff speeds)
  const y1 = useTransform(smoothProgress, [0, 1], [100, 0]);
  const y2 = useTransform(smoothProgress, [0, 1], [150, 0]);
  const y3 = useTransform(smoothProgress, [0, 1], [80, 0]);
  const y4 = useTransform(smoothProgress, [0, 1], [120, 0]);

  const text = "FAHREZI";

  return (
    <footer ref={containerRef} className="relative w-full bg-gradient-to-b from-background via-background to-[#0B1121] min-h-[40vh] flex flex-col justify-between overflow-hidden pt-12 pb-6">

      {/* Social Links & Info - Centered Top Section */}
      <div className="container mx-auto px-4 md:px-6 z-20 relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
        <div>
          <h3 className="text-foreground text-2xl font-bold">Let's Connect</h3>
          <p className="text-muted-foreground text-sm">{t.footer_text}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <SocialLink href="https://instagram.com/moh.fahrezi/" icon={<Instagram />} label="Instagram" />
          <SocialLink href="https://github.com/fahrezi93" icon={<Github />} label="GitHub" />
          <SocialLink href="https://linkedin.com/in/mohammad-fahrezi" icon={<Linkedin />} label="LinkedIn" />
          <SocialLink href="mailto:hello@fahrezi.tech" icon={<Mail />} label="Email" />
        </div>
      </div>

      {/* Massive Parallax Text */}
      <div className="relative w-full flex justify-center items-end mt-2 z-10 select-none pointer-events-none">
        {/* Radiant Gradient Overlay - Adjusted height for visibility */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/80 to-transparent z-20"></div>
        <div className="flex justify-center items-baseline w-full px-4 overflow-hidden leading-none">
          {text.split('').map((char, i) => {
            const y = i % 3 === 0 ? y2 : (i % 2 === 0 ? y1 : y4);

            return (
              <motion.span
                key={i}
                style={{ y }}
                className="text-[18vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground/40 to-foreground/10 tracking-tighter transform-gpu opacity-80"
              >
                {char}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="container mx-auto px-4 md:px-6 z-20 relative mt-4 border-t border-white/5 pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/60">
          <p>© {new Date().getFullYear()} Mohammad Fahrezi. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300"
    >
      <span className="p-3 border border-border rounded-full bg-background/50 group-hover:bg-primary/10 group-hover:border-primary/50 group-hover:scale-110 transition-all shadow-sm">
        {icon}
      </span>
      <span className="text-xs font-medium opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        {label}
      </span>
    </a>
  );
}
