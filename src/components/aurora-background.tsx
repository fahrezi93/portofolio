"use client";

import React, { useEffect, useState } from "react";
import Aurora from "./aurora";

function hslTripletToHex(hsl: string): string {
  // Expecting input like: "220 90% 60%"
  const [hStr, sStr, lStr] = hsl.trim().split(/\s+/);
  const h = Math.max(0, Math.min(360, parseFloat(hStr)));
  const s = Math.max(0, Math.min(100, parseFloat(sStr)))/100;
  const l = Math.max(0, Math.min(100, parseFloat(lStr)))/100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  const toHex = (v: number) => {
    const n = Math.round((v + m) * 255);
    return n.toString(16).padStart(2, "0");
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function useThemeAuroraStops(): string[] {
  const [stops, setStops] = useState<string[]>(["#1d4ed8", "#34d399", "#9333ea"]);

  useEffect(() => {
    const doc = document.documentElement;
    const style = getComputedStyle(doc);
    const primary = style.getPropertyValue("--primary");
    const accent = style.getPropertyValue("--accent");

    if (primary && accent) {
      try {
        const p = hslTripletToHex(primary);
        const a = hslTripletToHex(accent);
        setStops([p, a, p]);
      } catch {
        // keep defaults
      }
    }
  }, []);

  return stops;
}

export default function AuroraBackground() {
  const colorStops = useThemeAuroraStops();

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-screen -z-20">
      <Aurora colorStops={colorStops} blend={0.8} amplitude={1.2} speed={0.8} />
      {/* Fade effect di bawah untuk nyatu dengan hero section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

