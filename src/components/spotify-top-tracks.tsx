"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Music2 } from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface NowPlaying {
    isPlaying: boolean;
    artist: string;
    songUrl: string;
    title: string;
    albumArt: string;
}

function SpotifyLoadingSkeleton() {
    return (
        <section className="w-full py-12 md:py-16 relative overflow-hidden">
            <div className="w-full max-w-2xl mx-auto px-6">
                <div className="relative group overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {/* Artwork Placeholder */}
                        <div className="relative w-40 h-40 md:w-48 md:h-48 shrink-0">
                            <motion.div 
                                animate={{ opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="w-full h-full bg-white/10 rounded-xl"
                            />
                        </div>

                        {/* Content Placeholder */}
                        <div className="flex-1 space-y-4 w-full">
                            <div className="flex items-center gap-3">
                                <motion.div 
                                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-8 h-8 rounded-full bg-blue-500/20" 
                                />
                                <motion.div 
                                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="h-3 w-32 bg-white/10 rounded" 
                                />
                            </div>
                            
                            <div className="space-y-3">
                                <motion.div 
                                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                                    className="h-8 w-3/4 bg-white/10 rounded-lg" 
                                />
                                <motion.div 
                                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                    className="h-5 w-1/2 bg-white/10 rounded-lg" 
                                />
                            </div>

                            {/* Audio Visualizer Placeholder */}
                            <div className="flex items-end gap-1 h-8 pt-4">
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: ["20%", "60%", "20%"] }}
                                        transition={{ 
                                            duration: 1.5, 
                                            repeat: Infinity, 
                                            delay: i * 0.1,
                                            ease: "easeInOut"
                                        }}
                                        className="w-1 bg-blue-500/20 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function SpotifyTopTracks() {
    const { t } = useLanguage();
    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (document.hidden) return;

            try {
                const res = await fetch("/api/music");
                const data = await res.json();
                if (data.nowPlaying) {
                    setNowPlaying({
                        ...data.nowPlaying,
                        isPlaying: data.nowPlaying.isPlaying
                    });
                }
            } catch (error) {
                console.error("Error fetching music data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchData();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const interval = setInterval(fetchData, 10000);

        return () => {
            clearInterval(interval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    if (loading) return <SpotifyLoadingSkeleton />;
    if (!nowPlaying?.isPlaying) return null;

    return (
        <section className="w-full py-12 md:py-16 relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={nowPlaying.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="relative group w-full"
                        >
                            {/* Subtle Glassmorphic Card */}
                            <div className="relative w-full bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-2xl p-4 md:p-5 flex items-center gap-6 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10 shadow-2xl">
                                
                                {/* Album Art - Refined Square with soft shadow */}
                                <div className="relative shrink-0 w-16 h-16 md:w-20 md:h-20">
                                    <div className="relative w-full h-full rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-blue-500/30 transition-all duration-500 shadow-lg">
                                        {nowPlaying?.albumArt ? (
                                            <Image
                                                src={nowPlaying.albumArt}
                                                alt={nowPlaying.title}
                                                fill
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                                                <Music2 className="w-8 h-8 text-neutral-700" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Small floating indicator */}
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-black/50 scale-0 group-hover:scale-100 transition-transform duration-300">
                                        <div className="flex gap-[2px] items-end h-2.5">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-[2px] bg-white rounded-full"
                                                    animate={{ height: ["30%", "100%", "60%"] }}
                                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15, repeatType: "mirror" }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Track Information - Editorial Hierarchy */}
                                <div className="flex flex-col flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                        <span className="text-blue-500 text-[10px] font-body font-bold tracking-[0.25em] uppercase opacity-80">
                                            {t.music_now_playing}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-col min-w-0">
                                        <a 
                                            href={nowPlaying.songUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="group/link"
                                        >
                                            <h3 className="font-body text-xl md:text-2xl font-bold text-white leading-tight truncate group-hover/link:text-blue-400 transition-colors">
                                                {nowPlaying.title}
                                            </h3>
                                        </a>
                                        <p className="font-body text-sm md:text-base text-white/40 font-light truncate mt-0.5">
                                            {nowPlaying.artist}
                                        </p>
                                    </div>
                                </div>

                                {/* External Link Icon - Minimalist */}
                                <a 
                                    href={nowPlaying.songUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hidden md:flex shrink-0 w-12 h-12 rounded-full border border-white/5 items-center justify-center hover:bg-white/5 transition-colors group-hover:border-white/10"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-white transition-colors">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
