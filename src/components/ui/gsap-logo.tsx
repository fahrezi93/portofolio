"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useLoading } from "@/context/loading-context";

interface GsapLogoProps {
    className?: string;
    onClick?: () => void;
    delay?: number;
}

export function GsapLogo({ className, onClick, delay = 0 }: GsapLogoProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const { isLoading } = useLoading();

    // We use a ref to track if animation has already played to prevent re-playing on re-renders unrelated to loading
    const hasPlayedRef = useRef(false);

    useEffect(() => {
        // Only run animation if loading is done
        if (isLoading) return;

        // Optional: If you only want it to play ONCE per session, check hasPlayedRef
        // But for now we just play it when isLoading becomes false.

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: delay });

            // Initial state
            gsap.set(".logo-char", { yPercent: 100, opacity: 0 });
            gsap.set(imageRef.current, { scale: 0, opacity: 0, rotation: -45 });

            // Animation sequence
            tl.to(imageRef.current, {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1.2,
                ease: "back.out(1.7)",
            })
                .to(".logo-char", {
                    yPercent: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.8,
                }, "-=0.8");

        }, containerRef);

        return () => ctx.revert();
    }, [isLoading, delay]);

    // Split text manually for animation
    const text = "Fahrezi";

    return (
        <div ref={containerRef} className={`flex items-center gap-3 ${className} overflow-hidden`}>
            <Link href="/" className="flex items-center gap-3 group" onClick={onClick}>
                <div className="relative overflow-visible">
                    <Image
                        ref={imageRef} // Fix: Assign ref to Image component correctly requires standard element or wrapper
                        id="logo-image"
                        src="/images/logo-64.webp"
                        alt="Fahrezi Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                        priority
                    />
                </div>
                <span ref={textRef} className="font-headline text-xl font-bold text-foreground flex overflow-hidden">
                    {text.split("").map((char, index) => (
                        <span key={index} className="logo-char inline-block origin-bottom">
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </span>
            </Link>
        </div>
    );
}
