"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Music2, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";

interface TopTrack {
    artist: string;
    songUrl: string;
    title: string;
    albumArt: string;
    playcount: string;
}

export function TopTracksLastfm() {
    const { t } = useLanguage();
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

    if (loading || topTracks.length === 0) return null;

    return (
        <section className="w-full py-16 md:py-24 relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="max-w-3xl mx-auto">
                    {/* Header - Editorial Style */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8">
                        <div className="flex items-start gap-4">
                            <span className="text-blue-500 mt-1.5 opacity-50">✦</span>
                            <div>
                                <span className="text-[10px] font-body font-bold tracking-[0.3em] text-blue-500 uppercase mb-3 block">
                                    {t.music_heavy_rotation}
                                </span>
                                <h2 className="font-body text-4xl md:text-5xl font-bold text-white tracking-tight">
                                    {t.music_top_tracks} <span className="text-white/30 italic">this month.</span>
                                </h2>
                            </div>
                        </div>
                        <p className="font-body text-xs md:text-sm text-white/30 max-w-[240px] leading-relaxed">
                            {t.music_curated_sounds}
                        </p>
                    </div>

                    {/* Tracks List - Clean Minimalist Rows */}
                    <div className="flex flex-col">
                        {topTracks.map((track, index) => (
                            <motion.a
                                key={index}
                                href={track.songUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group flex items-center gap-6 py-6 border-b border-white/5 last:border-none transition-all duration-500 hover:px-2"
                            >
                                {/* Rank */}
                                <div className="w-6 shrink-0">
                                    <span className="font-body text-xs font-bold text-white/10 group-hover:text-blue-500 transition-colors duration-500">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Album Art - Minimal Square */}
                                <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-lg overflow-hidden bg-white/5 ring-1 ring-white/10 transition-all duration-500 group-hover:ring-blue-500/30">
                                    {track.albumArt ? (
                                        <Image
                                            src={track.albumArt}
                                            alt={track.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Music2 className="w-5 h-5 text-neutral-700" />
                                        </div>
                                    )}

                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 transform scale-0 group-hover:scale-100 transition-transform duration-500">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Track Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-body text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate mb-1">
                                        {track.title}
                                    </h3>
                                    <p className="font-body text-sm text-white/40 font-light truncate">
                                        {track.artist}
                                    </p>
                                </div>

                                {/* Playcount / Action */}
                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] transition-colors group-hover:border-blue-500/20 group-hover:bg-blue-500/5">
                                        <span className="font-body text-[10px] font-bold text-white/40 group-hover:text-blue-400 transition-colors">
                                            {track.playcount} PLAYS
                                        </span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-white/10 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
