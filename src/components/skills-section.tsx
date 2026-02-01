"use client";

import { programmingSkills, creativeSkills } from "@/data/skills";
import { useLanguage } from "@/context/language-context";

export function SkillsSection() {
  const { t } = useLanguage();
  // Duplikasi skills untuk infinite scroll yang mulus - lebih banyak duplikasi untuk seamless loop
  const duplicatedProgrammingSkills = [
    ...programmingSkills,
    ...programmingSkills,
    ...programmingSkills,
    ...programmingSkills,
    ...programmingSkills,
    ...programmingSkills,
    ...programmingSkills,
    ...programmingSkills
  ];
  const duplicatedCreativeSkills = [
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills,
    ...creativeSkills
  ];

  return (
    <section id="skills" className="w-full py-16 md:py-24 lg:py-32 skills-section-mobile">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            {t.skills_title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {t.skills_subtitle}
          </p>
        </div>

        {/* Programming & Development Skills */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-center mb-8 text-foreground">
            Programming & Development
          </h3>
          <div
            className="relative w-full overflow-hidden skills-container"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
            }}
          >
            <div className="flex min-w-[800%] shrink-0 animate-scroll gap-8">
              {duplicatedProgrammingSkills.map((skill, index) => (
                <div
                  key={`prog-${skill.name}-${index}`}
                  className="flex flex-col items-center justify-center gap-3 flex-shrink-0 skill-item"
                  style={{ width: "120px", minWidth: "120px" }}
                >
                  <skill.icon className="w-16 h-16 skill-icon" />
                  <p className="text-lg font-medium text-foreground text-center skill-name">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Design & Creative Skills */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-center mb-8 text-foreground">
            Design & Creative Tools
          </h3>
          <div
            className="relative w-full overflow-hidden skills-container"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
            }}
          >
            <div className="flex min-w-[1200%] shrink-0 animate-scroll-reverse gap-8">
              {duplicatedCreativeSkills.map((skill, index) => (
                <div
                  key={`creative-${skill.name}-${index}`}
                  className="flex flex-col items-center justify-center gap-3 flex-shrink-0 skill-item"
                  style={{ width: "120px", minWidth: "120px" }}
                >
                  <skill.icon className="w-16 h-16 skill-icon" />
                  <p className="text-lg font-medium text-foreground text-center skill-name">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
