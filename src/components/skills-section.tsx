
import { skills } from "@/data/skills";
import { useLanguage } from "@/context/language-context";

export function SkillsSection() {
  const { t } = useLanguage();
  // Duplikasi skills untuk infinite scroll yang mulus
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <section id="skills" className="w-full py-16 md:py-24 lg:py-32 skills-section-mobile">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {t.skills_title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            {t.skills_subtitle}
          </p>
        </div>
        <div
          className="relative mt-12 w-full overflow-hidden skills-container"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
          }}
        >
          <div className="flex min-w-[400%] shrink-0 animate-scroll gap-12">
            {duplicatedSkills.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="flex flex-col items-center justify-center gap-4 flex-shrink-0 skill-item"
                style={{ width: "100px" }}
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
    </section>
  );
}
