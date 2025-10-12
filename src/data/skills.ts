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
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiCanva,
} from "react-icons/si";
import { CapCutIcon } from "@/components/icons/capcut-icon";

export type Skill = {
  name: string;
  icon: IconType;
};

// Programming & Development Skills
export const programmingSkills: Skill[] = [
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

// Design & Creative Skills
export const creativeSkills: Skill[] = [
  {
    name: "Figma",
    icon: SiFigma,
  },
  {
    name: "Photoshop",
    icon: SiAdobephotoshop,
  },
  {
    name: "Illustrator",
    icon: SiAdobeillustrator,
  },
  {
    name: "Premiere Pro",
    icon: SiAdobepremierepro,
  },
  {
    name: "After Effects",
    icon: SiAdobeaftereffects,
  },
  {
    name: "Canva",
    icon: SiCanva,
  },
  {
    name: "CapCut",
    icon: CapCutIcon,
  },
];

// Backward compatibility - gabungkan semua skills
export const skills: Skill[] = [...programmingSkills, ...creativeSkills];
