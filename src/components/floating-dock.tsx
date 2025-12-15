"use client";

import React, { useRef } from "react";
import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, Briefcase, Mail, Code2, Monitor, Star } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";

export function FloatingDock() {
    const { t } = useLanguage();
    const mouseX = useMotionValue(Infinity);

    const links = [
        {
            title: "Home",
            icon: <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "#home",
        },
        {
            title: t?.nav_about || "About",
            icon: <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "#about",
        },
        {
            title: t?.nav_work || "Work",
            icon: <Monitor className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "#portfolio",
        },
        {
            title: t?.nav_experience || "Experience",
            icon: <Briefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "#experience",
        },
        {
            title: "Skills",
            icon: <Code2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "#skills",
        },
        {
            title: t?.nav_contact || "Contact",
            icon: <Mail className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
            href: "#contact",
        },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:flex items-end gap-4 pb-3 px-4 h-16 rounded-2xl bg-neutral-50/10 dark:bg-neutral-900/10 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-2xl dock-container">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex h-full items-end gap-4"
            >
                {links.map((link) => (
                    <DockIcon key={link.title} mouseX={mouseX} {...link} />
                ))}
            </motion.div>
        </div>
    );
}

function DockIcon({
    mouseX,
    title,
    icon,
    href,
}: {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link href={href}
            onClick={(e) => {
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.getElementById(href.replace('#', ''));
                    element?.scrollIntoView({ behavior: 'smooth' });
                }
            }}
        >
            <motion.div
                ref={ref}
                style={{ width, height: width }}
                className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative group backdrop-blur-sm border border-white/20 shadow-inner"
            >
                <motion.div
                    className="flex items-center justify-center w-full h-full p-2.5 transition-colors duration-200 group-hover:text-primary"
                >
                    {icon}
                </motion.div>

                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {title}
                </div>
            </motion.div>
        </Link>
    );
}
