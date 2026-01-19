"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
    priority?: boolean;
    sizes?: string;
    onError?: () => void;
}

// Simple gray placeholder - minimal size for instant load
const blurPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYyOTM3Ii8+PC9zdmc+";

export function OptimizedImage({
    src,
    alt,
    className = "",
    fill = false,
    width,
    height,
    priority = false,
    sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px",
    onError,
}: OptimizedImageProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(priority);
    const imgRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for lazy loading - aggressive preloading
    useEffect(() => {
        if (priority || shouldLoad) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: "800px", // Start loading 800px before viewport
                threshold: 0,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [priority, shouldLoad]);

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
        onError?.();
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    // Error fallback
    if (hasError) {
        return (
            <div className={`relative ${fill ? "w-full h-full" : ""} bg-gray-800 flex items-center justify-center`}>
                <span className="text-gray-500 text-sm">Image not available</span>
            </div>
        );
    }

    // Common image props
    const imageProps = {
        src,
        alt,
        className: `${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-150`,
        sizes,
        priority,
        onLoad: handleLoad,
        onError: handleError,
        placeholder: "blur" as const,
        blurDataURL: blurPlaceholder,
        quality: 75,
        loading: priority ? ("eager" as const) : ("lazy" as const),
    };

    return (
        <div ref={imgRef} className={`relative ${fill ? "w-full h-full" : ""}`}>
            {/* Skeleton loader while loading */}
            {isLoading && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}

            {shouldLoad && (
                <>
                    {fill ? (
                        <Image
                            {...imageProps}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    ) : (
                        <Image
                            {...imageProps}
                            width={width || 700}
                            height={height || 475}
                        />
                    )}
                </>
            )}
        </div>
    );
}
