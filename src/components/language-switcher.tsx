
"use client";

import { useLanguage } from "@/context/language-context";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full">
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-5 py-2 rounded-full text-[10px] font-space font-bold tracking-[0.05em] transition-all duration-500",
          language === "en"
            ? "bg-white text-black shadow-lg"
            : "text-white/40 hover:text-white"
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("id")}
        className={cn(
          "px-5 py-2 rounded-full text-[10px] font-space font-bold tracking-[0.05em] transition-all duration-500",
          language === "id"
            ? "bg-white text-black shadow-lg"
            : "text-white/40 hover:text-white"
        )}
      >
        ID
      </button>
    </div>

  );
}

