
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useLanguage } from "@/context/language-context";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { href: "#projects", label: t.nav_work },
    { href: "#about", label: t.nav_about },
    { href: "#contact", label: t.nav_contact },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full p-4">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border border-border/30 bg-background/20 px-6 backdrop-blur-lg">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/images/fahrezi_white_logo.png" 
            alt="Fahrezi Logo" 
            className="h-8 w-8"
          />
          <span className="font-headline text-xl font-bold text-foreground">
            Fahrezi
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
                               <div className="flex h-full flex-col">
                   <div className="flex items-center justify-between border-b border-border/30 pb-6">
                  <Link href="/" className="flex items-center gap-3" onClick={handleLinkClick}>
                     <img 
                       src="/images/fahrezi_white_logo.png" 
                       alt="Fahrezi Logo" 
                       className="h-8 w-8"
                     />
                     <span className="font-headline text-xl font-bold text-foreground">
                       Fahrezi
                     </span>
                  </Link>
                  <SheetTrigger asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-7 w-7" />
                        <span className="sr-only">Close menu</span>
                     </Button>
                  </SheetTrigger>
                </div>
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={handleLinkClick}
                      className="text-2xl font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex justify-center pb-8">
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
