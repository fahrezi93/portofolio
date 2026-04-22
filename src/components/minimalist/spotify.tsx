"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function MinimalistSpotify() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await fetch('/api/top-tracks?limit=5');
        const data = await res.json();
        setTracks(data.topTracks || []);
      } catch (err) {
        console.error(err);
        setTracks([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTracks();
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 px-6 md:px-12 max-w-screen-2xl mx-auto bg-[#f2f0e4] border-t border-[#3a4f32]/10 mt-12">
      {/* Header Area */}
      <motion.div 
        initial={{ opacity: 0, filter: "blur(5px)", y: 15 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-[#3a4f32]/20 pb-12"
      >
        <div className="flex gap-4 items-start">
          <span className="mt-2 text-[#d48a6a]">✦</span>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-space text-[10px] uppercase tracking-[0.2em] text-[#d48a6a] block opacity-80">
                HEAVY ROTATION
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500 blur-[2px] animate-pulse"></div>
              </div>
            </div>
            <h2 className="font-bricolage text-4xl md:text-6xl font-medium tracking-tight text-[#3a4f32] max-w-lg leading-[1.1]">
              Currently <br /> vibing to.
            </h2>
          </div>
        </div>
        <p className="font-space text-[13px] text-[#1a1a1a]/60 max-w-xs leading-relaxed md:text-right">
          Music fuels the delivery. These are my top tracks over the last month that played while pushing code to production.
        </p>
      </motion.div>

      {/* Tracks List */}
      <div className="flex flex-col">
        {tracks.map((track: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: "blur(5px)", y: 15 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 py-6 md:py-8 border-b border-[#3a4f32]/10 hover:border-[#d48a6a]/40 transition-colors duration-500 items-center cursor-pointer"
          >
            {/* Number - Col 1 */}
            <div className="hidden md:flex col-span-1 justify-start">
              <span className="font-space text-sm text-[#1a1a1a]/30 font-medium tabular-nums tracking-wider group-hover:text-[#d48a6a]/50 transition-colors">
                0{index + 1}
              </span>
            </div>

            {/* Album Art & Title - Col 11 */}
            <div className="col-span-12 md:col-span-10 flex items-center gap-4 md:gap-6">
              <span className="md:hidden font-space text-[10px] text-[#1a1a1a]/30 font-medium tabular-nums tracking-wider w-4 flex-shrink-0">
                0{index + 1}
              </span>
              <div className="relative w-12 h-12 md:w-14 md:h-14 shadow-sm flex-shrink-0 overflow-hidden rounded-md bg-[#1a1a1a]/5">
                <Image 
                  src={track.albumArt || '/images/thumbnail-porto.png'} 
                  alt={track.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-bricolage text-[15px] md:text-xl font-medium text-[#3a4f32] group-hover:text-[#d48a6a] transition-colors tracking-tight line-clamp-1 mb-0.5 md:mb-1">
                  {track.title}
                </h4>
                <p className="font-space text-[11px] md:text-[13px] text-[#1a1a1a]/50 line-clamp-1">
                  {track.artist}
                </p>
              </div>
            </div>

            {/* Icon - Col 1 */}
            <div className="hidden md:flex col-span-1 justify-end items-center">
              <div className="w-10 h-10 rounded-full border border-transparent group-hover:border-[#d48a6a]/20 flex items-center justify-center transition-all bg-white/0 group-hover:bg-[#d48a6a]/5">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3a4f32]/40 group-hover:text-[#d48a6a] transition-colors"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default MinimalistSpotify;
