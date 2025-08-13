
"use client";

import { useLanguage } from "@/context/language-context";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border/50 bg-background/50 p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={cn(
          "rounded-full w-12 text-base transition-colors",
          language === "en" ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "hover:bg-accent"
        )}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("id")}
        className={cn(
          "rounded-full w-12 text-base transition-colors",
          language === "id" ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "hover:bg-accent"
        )}
      >
        ID
      </Button>
    </div>
  );
}
