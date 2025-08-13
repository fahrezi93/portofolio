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
    name: "Figma",
    icon: SiFigma,
  },
  {
    name: "Firebase",
    icon: SiFirebase,
  },
  {
    name: "Git",
    icon: SiGit,
  },
  {
    name: "React Native",
    icon: SiReact,
  },
  {
    name: "Google Cloud",
    icon: SiGooglecloud,
  },
  {
    name: "Python",
    icon: SiPython,
  },
];
