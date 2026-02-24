"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, TrendingUp, Music2 } from "lucide-react";

interface TopTrack {
    artist: string;
    songUrl: string;
    title: string;
    albumArt: string;
    playcount: string;
}

export function TopTracksLastfm() {
    const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopTracks = async () => {
            try {
                const res = await fetch("/api/top-tracks?limit=5");
                const data = await res.json();
                if (data.topTracks) {
                    setTopTracks(data.topTracks);
                }
            } catch (error) {
                console.error("Error fetching top tracks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopTracks();
    }, []);

    if (loading) {
        return (
            <div className="w-full flex justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500/50"></div>
            </div>
        );
    }

    if (topTracks.length === 0) return null;

    return (
        <section className="w-full py-6 md:py-8 relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="max-w-2xl mx-auto">
                    {/* Header: Smaller, minimalist */}
                    <div className="flex items-center gap-2 mb-4 px-2">
                        <TrendingUp className="w-4 h-4 text-green-500/70" />
                        <div>
                            <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Top Tracks This Month</h2>
                        </div>
                    </div>

                    {/* Tracks List: Clean, borderless rows */}
                    <div className="flex flex-col gap-1">
                        {topTracks.map((track, index) => (
                            <motion.a
                                key={index}
                                href={track.songUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                className="group relative flex items-center justify-between p-2 sm:p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                            >
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                    {/* Rank Number */}
                                    <div className="w-4 sm:w-6 text-left shrink-0">
                                        <span className="text-xs sm:text-sm font-medium text-neutral-600 group-hover:text-green-500/70 transition-colors">
                                            {index + 1}
                                        </span>
                                    </div>

                                    {/* Small Album Art */}
                                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-md overflow-hidden bg-white/5 flex items-center justify-center border border-white/5">
                                        {track.albumArt ? (
                                            <Image
                                                src={track.albumArt}
                                                alt={track.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <Music2 className="w-4 h-4 text-neutral-500/50" />
                                        )}

                                        {/* Play Icon on Hover */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                                            <div className="text-green-500 scale-75 group-hover:scale-100 transition-transform">
                                                <Play className="w-4 h-4 ml-0.5 fill-current" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Track Info */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h3 className="text-sm sm:text-base font-medium text-white/90 truncate group-hover:text-green-400 transition-colors leading-tight mb-0.5">
                                            {track.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-neutral-400/80 truncate leading-tight">
                                            {track.artist}
                                        </p>
                                    </div>
                                </div>

                                {/* Minimal Playcount */}
                                <div className="hidden sm:flex items-center gap-1.5 shrink-0 pl-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-3 h-3 text-neutral-500" />
                                    <span className="text-xs font-medium text-neutral-400">{track.playcount}</span>
                                </div>
                                <div className="sm:hidden shrink-0 pl-2 opacity-70">
                                    <span className="text-[10px] text-neutral-500">{track.playcount} plays</span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
