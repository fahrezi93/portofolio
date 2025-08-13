export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  className: string;
  aiHint: string;
};

export const projects: Project[] = [
  {
    title: "Chatbot AI",
    description: "A chatbot AI that can answer questions and help with tasks.",
    image: "/images/aksara-ai.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Flask"],
    link: "https://aksara-ai.vercel.app",
    className: "lg:col-span-2 lg:row-span-2",
    aiHint: "chatbot",
  },
  {
    title: "Waste Classifier",
    description: "A waste classifier that can classify waste into different categories.",
    image: "/images/waste-classifier.png",
    tags: ["Python", "Flask", "TensorFlow", "Keras", "React", "Tailwind CSS"],
    link: "#",
    className: "lg:col-span-2",
    aiHint: "waste classifier",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio to showcase my skills and projects, built with a focus on performance and aesthetics.",
    image: "/images/portofolio.png",
    tags: ["React", "Tailwind CSS", "TypeScript", "Next.js"],
    link: "#",
    className: "lg:col-span-2",
    aiHint: "portfolio website",
  },
   {
    title: "NutriSuggest",
    description: "A food recommendation system that suggests healthy and nutritious foods based on user preferences and health goals.",
    image: "https://placehold.co/800x800.png",
    tags: ["React", "Tailwind CSS", "TypeScript", "Python", "Flask"],
    link: "#",
    className: "lg:col-span-2 lg:row-span-2",
    aiHint: "nutri suggest",
  },
  {
    title: "Drowsiness Guard",
    description: "A drowsiness detection system that uses computer vision to detect drowsiness in drivers and alert them when they are falling asleep.",
    image: "https://placehold.co/800x400.png",
    tags: ["Python", "OpenCV", "Flask", "React", "Tailwind CSS"],
    link: "#",
    className: "lg:col-span-2",
    aiHint: "drowsiness guard",
  },
];
