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
    tags: ["HTML", "CSS", "JavaScript", "Python", "Flask", "Firebase"],
    link: "https://aksara-ai.vercel.app",
    className: "lg:col-span-2 lg:row-span-2",
    aiHint: "chatbot",
  },
  {
    title: "Waste Classifier",
    description: "A waste classifier that can classify waste into different categories.",
    image: "/images/waste-classifier.png",
    tags: ["Python", "Flask", "TensorFlow", "Keras", "React", "Tailwind CSS"],
    link: "https://waste-classifier-v1.vercel.app",
    className: "lg:col-span-2",
    aiHint: "waste classifier",
  },

   {
    title: "NutriSuggest",
    description: "A food recommendation system that suggests healthy and nutritious foods based on user preferences and health goals.",
    image: "/images/nutrisuggest.png",
    tags: ["React", "Tailwind CSS", "TypeScript", "Python", "Flask"],
    link: "https://nutrisuggest.vercel.app/",
    className: "lg:col-span-2 lg:row-span-2",
    aiHint: "nutri suggest",
  },
  {
    title: "Thrift Haven",
    description: "A thrift store website that allows users to buy and sell second-hand items.",
    image: "/images/thrift-haven.png",
    tags: ["React", "Tailwind CSS", "TypeScript", "Next.js", "Firebase", "Protgress SQL"],
    link: "#",
    className: "lg:col-span-2",
    aiHint: "thrift haven",
  },
  {
    title:"Talent Path",
    description: "A career guidance website that provides resources and advice for students and professionals in the tech industry.",
    image: "/images/talent-path.png",
    tags: ["React","CSS", "TypeScript", "Vite"],
    link: "https://talent-path.vercel.app",
    className: "lg:col-span-2",
    aiHint: "guide career tech",
  },
  {
    title: "Smart Attendance",
    description: "A smart attendance system that uses face recognition to mark attendance.",
    image: "/images/smartattedance.png",
    tags: ["Python", "OpenCV", "Flask", "React", "Tailwind CSS"],
    link: "#",
    className: "lg:col-span-2",
    aiHint: "drowsiness guard",
  },
  {
    title: "Hoax Detector",
    description: "A hoax detector that can detect fake news and misinformation using natural language processing.",
    image: "/images/hoaxdetector.png",
    tags: ["Python", "Flask","IndoBERT", "Transformers", "React", "Tailwind CSS"],
    link: "https://hoax-detection-v1.vercel.app/",
    className: "lg:col-span-2",
    aiHint: "hoax detector",
  },
  {
    title: "Simpan Cepat",
    description: "A note taking app that can help you save your notes and ideas.",
    image: "/images/simpancepat.png",
    tags: ["Next.js","React","Tailwind CSS", "TypeScript", "Firebase","Genkit"],
    link: "#",
    className: "lg:col-span-2",
    aiHint: "simpan cepat",
  },
  {
    title: "Portfolio Website",
    description: "A personal portfolio to showcase my skills and projects, built with a focus on performance and aesthetics.",
    image: "/images/portofolio.png",
    tags: ["React", "Tailwind CSS", "TypeScript", "Next.js"],
    link: "https://fahrezi-portofolio.vercel.app",
    className: "lg:col-span-2",
    aiHint: "portfolio website",
  },
];
