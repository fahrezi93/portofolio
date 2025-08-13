
import { useLanguage } from "@/context/language-context";
import { StarButton } from "./star-button";
import Image from "next/image";


export function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 grid items-center justify-center gap-12 text-center md:grid-cols-2 md:text-left">
        <div className="order-2 md:order-1 space-y-6">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            {t.about_title}
          </h2>
          <div className="space-y-4 text-muted-foreground text-lg max-w-3xl mx-auto md:mx-0">
            <p>
              {t.about_p1}
            </p>
            <p>
              {t.about_p2}
            </p>
          </div>
          <StarButton as="a" href="#contact">
            {t.about_cta}
          </StarButton>
        </div>

        <div className="order-1 md:order-2 flex items-center justify-center">
          <div className="relative w-40 h-40 md:w-56 md:h-56">
            <div className="absolute -inset-4 rounded-[1.5rem] bg-gradient-to-tr from-primary/40 via-accent/40 to-primary/40 blur-2xl opacity-50" />
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-primary to-accent shadow-2xl">
              <div className="rounded-2xl overflow-hidden bg-background">
                <div className="relative w-40 h-40 md:w-56 md:h-56">
                  <Image
                    src="/images/profile.jpg"
                    alt="Profile photo"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 160px, 224px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
