"use client";

import React, { useState, useEffect } from "react";


// FloatingParticles dihapus — animasi infinite repeat dengan opacity change di 8 elemen sekaligus sangat memberatkan

export default function ModernBackground() {
  const [isMounted, setIsMounted] = useState(false);
  // isMobile & reducedMotion tidak lagi diperlukan setelah refactor ke CSS-only

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return nothing during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-purple-950/15" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base gradient — seluruhnya static CSS, zero JS overhead */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-purple-950/15" />

      {/* Orb-style ambience — pure CSS, tanpa filter blur JS, tanpa animasi */}
      <div
        className="absolute -top-40 -left-60 w-[700px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 40% 60%, rgba(59,130,246,0.07) 0%, rgba(59,130,246,0.03) 35%, transparent 65%)",
        }}
      />
      <div
        className="absolute -top-30 -right-50 w-[600px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 60% 40%, rgba(147,51,234,0.06) 0%, rgba(147,51,234,0.025) 35%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-20 -right-60 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 70% 30%, rgba(6,182,212,0.04) 0%, rgba(6,182,212,0.015) 35%, transparent 65%)",
        }}
      />
    </div>
  );
}
