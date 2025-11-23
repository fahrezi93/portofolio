"use client";

import { ArrowDown } from "lucide-react";
import StarBorder from "./StarBorder";
import RotatingText from "./rotating-text";
import { useLanguage } from "@/context/language-context";
import { ParallaxBackground } from "./parallax-background";
import { useParallax } from "@/hooks/use-parallax";

export function HeroSection() {
  const { t } = useLanguage();
  const parallaxOffset = useParallax(0.2);

  return (
    <ParallaxBackground className="relative grid w-full min-h-[calc(100vh-8rem)] place-items-center">
      <section id="home" className="relative w-full">
        <div className="container relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 text-center md:px-6 min-h-[calc(100vh-8rem)]">
          <div
            className="flex flex-col items-center space-y-6"
            style={{
              transform: `translateY(${parallaxOffset * -0.5}px)`,
            }}
          >
            <div className="space-y-4">
              <p
                className="font-headline text-lg text-primary md:text-xl"
                style={{
                  transform: `translateY(${parallaxOffset * -0.3}px)`,
                }}
              >
                {t.hero_subtitle}
              </p>
              <div
                className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 font-headline text-5xl font-bold leading-relaxed tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
                style={{
                  lineHeight: '1.3',
                  transform: `translateY(${parallaxOffset * -0.2}px)`,
                }}
              >
                <span>{t.hero_rotating_1}</span>
                <RotatingText
                  texts={[t.hero_rotating_2, t.hero_rotating_3, t.hero_rotating_4]}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-xl"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
                <span>digital products.</span>
              </div>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                {t.hero_tagline}
              </p>
            </div>
            <div className="pt-4">
              <StarBorder as="a" href="#portfolio-content">
                {t.hero_cta}
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </StarBorder>
            </div>
          </div>
        </div>
      </section>
    </ParallaxBackground>
  );
}