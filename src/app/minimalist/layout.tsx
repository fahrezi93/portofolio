import { Space_Grotesk, Bricolage_Grotesque } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Fahrezi - Portfolio",
  description: "A Graphic Designer & UI/UX Specialist crafting meaningful digital experiences.",
  icons: {
    icon: "/fahrezi_orange_logo.png",
  },
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export default function MinimalistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${spaceGrotesk.variable} ${bricolageGrotesque.variable} font-space bg-[#f2f0e4] text-[#1a1a1a] min-h-screen selection:bg-[#1a1a1a] selection:text-[#f2f0e4] relative`}>
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar-track {
          background: #f2f0e4;
        }
        ::-webkit-scrollbar-thumb {
          background-color: rgba(58, 79, 50, 0.3);
          border: 3px solid #f2f0e4;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: rgba(212, 138, 106, 0.8);
        }
      `}} />
      {/* Global Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] mix-blend-multiply" 
        style={{backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"}}
      />
      {children}
    </div>
  );
}
