
import { useLanguage } from "@/context/language-context";
import StarBorder from "./StarBorder";
import Image from "next/image";
import { Button } from "./ui/button";
import { Download } from "lucide-react";


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
          {/* Container untuk tombol */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8">
            <StarBorder as="a" href="#contact">
              {t.about_cta}
            </StarBorder>
            {/* Tombol Download CV dengan styling yang seragam */}
            <Button 
              variant="outline" 
              size="lg"
              asChild
              className="group relative overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <a 
                href="/images/CV-Fahrezi.pdf" 
                download
                className="flex items-center gap-2 px-6 py-3"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                <span className="font-medium">{t.download_cv}</span>
              </a>
            </Button>
          </div>
        </div>

        <div className="order-1 md:order-2 flex items-center justify-center">
          <div className="relative w-40 h-40 md:w-56 md:h-56">
            <div className="absolute -inset-4 rounded-[1.5rem] bg-gradient-to-tr from-primary/40 via-accent/40 to-primary/40 blur-2xl opacity-50" />
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-primary to-accent shadow-2xl">
              <div className="rounded-2xl overflow-hidden bg-background">
                <div className="relative w-40 h-40 md:w-56 md:h-56">
                  <Image
                    src="/images/profile.jpg"
                    alt="Mohammad Fahrezi Profile"
                    fill
                    className="object-cover object-[center_70%] scale-125"
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