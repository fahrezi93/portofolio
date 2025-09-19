import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFigma,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGooglecloud,
  SiPython,
  SiGithub,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
} from "react-icons/si";

export type Skill = {
  name: string;
  icon: IconType;
};

export const skills: Skill[] = [
  {
    name: "React",
    icon: SiReact,
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
  },
   {
    name: "HTML5",
    icon: SiHtml5,
  },
  {
    name: "CSS3",
    icon: SiCss3,
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
  },
  {
    name: "Express.js",
    icon: SiExpress,
  },
  {
    name: "Python",
    icon: SiPython,
  },
  {
    name: "Figma",
    icon: SiFigma,
  },
  {
    name: "Firebase",
    icon: SiFirebase,
  },
  {
    name: "Supabase",
    icon: SiSupabase,
  },
  {
    name: "Git",
    icon: SiGit,
  },
  {
    name: "GitHub",
    icon: SiGithub,
  },
  {
    name: "React Native",
    icon: SiReact,
  },
  {
    name: "Google Cloud",
    icon: SiGooglecloud,
  },

];
