"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Music2 } from "lucide-react";

interface Track {
    artist: string;
    songUrl: string;
    title: string;
    albumArt: string;
    playcount?: string;
}

interface NowPlaying {
    isPlaying: boolean;
    artist: string;
    songUrl: string;
    title: string;
    albumArt: string;
}

export function SpotifyTopTracks() {
    const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (document.hidden) return; // Tab visibility check

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

        // Check immediately when user comes back to the tab
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchData();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const interval = setInterval(fetchData, 10000); // Poll every 10s for faster updates

        return () => {
            clearInterval(interval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    if (loading || !nowPlaying?.isPlaying) return null;

    return (
        <section className="w-full py-8 md:py-12 relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">

                <div className="max-w-2xl mx-auto">
                    {/* Now Playing Card - Compact Pill Shape */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        viewport={{ once: true }}
                        className="relative group w-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/10 to-green-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />

                        <div className="relative w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-2 pr-6 flex items-center gap-4 overflow-hidden transition-all hover:border-green-500/20">

                            {/* Album Art - Small Circle with Spin */}
                            <div className="relative shrink-0 w-12 h-12 md:w-16 md:h-16">
                                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md animate-pulse" />
                                <div className="relative w-full h-full rounded-full shadow-lg overflow-hidden ring-1 ring-white/10">
                                    {nowPlaying?.albumArt ? (
                                        <Image
                                            src={nowPlaying.albumArt}
                                            alt={nowPlaying.title}
                                            fill
                                            className="object-cover animate-[spin_6s_linear_infinite]"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                                            <Music2 className="w-6 h-6 text-neutral-600 opacity-50" />
                                        </div>
                                    )}
                                    {/* Middle Hole */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-black rounded-full border border-white/10 z-10" />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex flex-col flex-1 min-w-0 justify-center">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="flex h-2 w-2 relative shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-green-500 text-[10px] font-bold tracking-widest uppercase truncate">Now Playing</span>
                                </div>
                                <div className="flex items-center gap-2 min-w-0">
                                    <a href={nowPlaying?.songUrl || '#'} target="_blank" rel="noopener noreferrer" className="group/link truncate max-w-[60%]">
                                        <span className="text-sm md:text-base font-bold text-white group-hover/link:text-green-400 transition-colors truncate">
                                            {nowPlaying?.title || "Track Title"}
                                        </span>
                                    </a>
                                    <span className="text-white/40 text-xs md:text-sm truncate">
                                        - {nowPlaying?.artist || "Artist Name"}
                                    </span>
                                </div>
                            </div>

                            {/* Compact Visualizer */}
                            <div className="hidden sm:flex items-end gap-1 h-6 shrink-0">
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 rounded-full bg-green-500/80"
                                        animate={{
                                            height: ["20%", "100%", "50%", "90%", "30%"],
                                        }}
                                        transition={{
                                            duration: 0.5 + Math.random() * 0.5,
                                            repeat: Infinity,
                                            repeatType: "mirror",
                                            ease: "easeInOut",
                                            delay: i * 0.05
                                        }}
                                    />
                                ))}
                            </div>

                            <a href={nowPlaying?.songUrl || '#'} target="_blank" rel="noopener noreferrer" className="sm:hidden text-white/50 hover:text-white transition-colors">
                                <Music2 className="w-4 h-4" />
                            </a>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
