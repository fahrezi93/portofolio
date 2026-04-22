import { MinimalistNav } from "../../components/minimalist/nav";
import { MinimalistHero } from "../../components/minimalist/hero";
import { SmoothScroll } from "../../components/minimalist/smooth-scroll";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// ─── Skeleton placeholder ─────────────────────────────────────────────────────
function SectionSkeleton({ height = "h-[40vh]" }: { height?: string }) {
  return <div className={`${height} w-full bg-[#f2f0e4]`} aria-hidden="true" />;
}

// ─── Lazy-loaded below-fold sections ─────────────────────────────────────────
// ssr:false means these bundles are NOT included in the initial JS payload.
// They load after the hero is interactive, freeing the main thread completely.
const MinimalistAbout = dynamic(
  () => import("../../components/minimalist/about").then((m) => ({ default: m.MinimalistAbout })),
  { ssr: false, loading: () => <SectionSkeleton height="h-[60vh]" /> }
);

const MinimalistProjects = dynamic(
  () => import("../../components/minimalist/projects").then((m) => ({ default: m.MinimalistProjects })),
  { ssr: false, loading: () => <SectionSkeleton height="h-[80vh]" /> }
);

const MinimalistSkills = dynamic(
  () => import("../../components/minimalist/skills").then((m) => ({ default: m.MinimalistSkills })),
  { ssr: false, loading: () => <SectionSkeleton height="h-[50vh]" /> }
);

const MinimalistExperience = dynamic(
  () => import("../../components/minimalist/experience").then((m) => ({ default: m.MinimalistExperience })),
  { ssr: false, loading: () => <SectionSkeleton height="h-[50vh]" /> }
);

const MinimalistSpotify = dynamic(
  () => import("../../components/minimalist/spotify").then((m) => ({ default: m.MinimalistSpotify })),
  { ssr: false, loading: () => <SectionSkeleton height="h-40" /> }
);

const MinimalistFooter = dynamic(
  () => import("../../components/minimalist/footer").then((m) => ({ default: m.MinimalistFooter })),
  { ssr: false, loading: () => <SectionSkeleton height="h-32" /> }
);

export default function MinimalistPage() {
  return (
    <main className="relative selection:bg-[#1a1a1a] selection:text-[#f2f0e4]">
      <SmoothScroll />
      <MinimalistNav />
      <div className="relative">
        {/* Hero is server-rendered & not lazy — it's the LCP element */}
        <MinimalistHero />

        {/* All sections below fold are lazy — JS loaded only when needed */}
        <Suspense fallback={<SectionSkeleton height="h-[60vh]" />}>
          <MinimalistAbout />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-[80vh]" />}>
          <MinimalistProjects />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-[50vh]" />}>
          <MinimalistSkills />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-[50vh]" />}>
          <MinimalistExperience />
        </Suspense>

        <Suspense fallback={<div className="h-40 flex items-center justify-center font-space text-xs text-[#1a1a1a]/40">Loading tunes...</div>}>
          <MinimalistSpotify />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="h-32" />}>
          <MinimalistFooter />
        </Suspense>
      </div>
    </main>
  );
}
