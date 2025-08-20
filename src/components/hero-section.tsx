"use client";

import { ArrowDown } from "lucide-react";
import StarBorder from "./StarBorder";
import RotatingText from "./rotating-text";
import { useLanguage } from "@/context/language-context";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative grid w-full min-h-[calc(100vh-8rem)] place-items-center overflow-hidden">
      <div className="container relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center md:px-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="space-y-4">
             <p className="font-headline text-lg text-primary md:text-xl">
              {t.hero_subtitle}
            </p>
            <div
              className="flex flex-wrap items-center justify-center gap-x-4 font-headline text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            >
              <span>{t.hero_rotating_1}</span>
              <RotatingText
                texts={[t.hero_rotating_2, t.hero_rotating_3, t.hero_rotating_4]}
                mainClassName="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-primary-foreground rounded-2xl overflow-hidden"
                staggerFrom={"last"}
                splitBy="characters"
                staggerDuration={0.025}
                rotationInterval={2000}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
              />
              <span>digital products.</span>
            </div>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              {t.hero_tagline}
            </p>
          </div>
          <div className="pt-4">
            <StarBorder as="a" href="#projects">
                {t.hero_cta}
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce"/>
            </StarBorder>
          </div>
        </div>
      </div>
    </section>
  );
}