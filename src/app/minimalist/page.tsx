import { MinimalistNav } from "../../components/minimalist/nav";
import { MinimalistHero } from "../../components/minimalist/hero";
import { MinimalistAbout } from "../../components/minimalist/about";
import { MinimalistProjects } from "../../components/minimalist/projects";
import { MinimalistExperience } from "../../components/minimalist/experience";
import { MinimalistSpotify } from "../../components/minimalist/spotify";
import { MinimalistSkills } from "../../components/minimalist/skills";
import { MinimalistFooter } from "../../components/minimalist/footer";
import { SmoothScroll } from "../../components/minimalist/smooth-scroll";
import { Suspense } from "react";

export default function MinimalistPage() {
  return (
    <main className="relative selection:bg-[#1a1a1a] selection:text-[#f2f0e4]">
      <SmoothScroll />
      <MinimalistNav />
      <div className="relative">
        <MinimalistHero />
        <MinimalistAbout />
        <MinimalistProjects />
        <MinimalistSkills />
        <MinimalistExperience />
        
        <Suspense fallback={<div className="h-40 flex items-center justify-center font-space text-xs">Loading tunes...</div>}>
          <MinimalistSpotify />
        </Suspense>

        <MinimalistFooter />
      </div>
    </main>
  );
}
