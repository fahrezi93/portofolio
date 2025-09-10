export type DevelopmentProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: "Web App" | "Mobile App" | "API" | "Full Stack" | "Desktop App";
  year: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "Completed" | "In Progress" | "Planned";
  category: string;
};

export const developmentProjects: DevelopmentProject[] = [
  {
    id: "dev-1",
    title: "Chatbot AI",
    description: "A chatbot AI that can answer questions and help with tasks using natural language processing",
    image: "/images/development/aksara-ai.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Flask", "Firebase"],
    type: "Full Stack",
    year: "2025",
    technologies: ["HTML", "CSS", "JavaScript", "Python", "Flask", "Firebase"],
    githubUrl: "https://github.com/fahrezi93/aksara-ai",
    liveUrl: "https://aksara-ai.vercel.app",
    status: "Completed",
    category: "Full Stack"
  },
  {
    id: "dev-2",
    title: "Waste Classifier",
    description: "A waste classifier that can classify waste into different categories using machine learning",
    image: "/images/development/waste-classifier.png",
    tags: ["Python", "Flask", "TensorFlow", "Keras", "React", "Tailwind CSS"],
    type: "Full Stack",
    year: "2025",
    technologies: ["Python", "Flask", "TensorFlow", "Keras", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/fahrezi93/waste-classifier",
    liveUrl: "https://waste-classifier-v1.vercel.app",
    status: "Completed",
    category: "Full Stack"
  },
  {
    id: "dev-3",
    title: "NutriSuggest",
    description: "A food recommendation system that suggests healthy and nutritious foods based on user preferences and health goals",
    image: "/images/development/nutrisuggest.png",
    tags: ["React", "Tailwind CSS", "TypeScript", "Python", "Flask"],
    type: "Full Stack",
    year: "2025",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Python", "Flask"],
    githubUrl: "https://github.com/fahrezi93/nutrisuggest",
    liveUrl: "https://nutrisuggest.vercel.app/",
    status: "Completed",
    category: "Full Stack"
  },
  {
    id: "dev-4",
    title: "Thrift Haven",
    description: "A thrift store website that allows users to buy and sell second-hand items with secure payment system",
    image: "/images/development/thrift-haven.png",
    tags: ["React", "Tailwind CSS", "TypeScript", "Next.js", "Firebase", "PostgreSQL"],
    type: "Full Stack",
    year: "2025",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Next.js", "Firebase", "PostgreSQL"],
    githubUrl: "https://github.com/fahrezi93/thrifting-ecommerce",
    liveUrl: "https://thrifting-haven.vercel.app",
    status: "Completed",
    category: "Full Stack"
  },
  {
    id: "dev-5",
    title: "Talent Path",
    description: "A career guidance website that provides resources and advice for students and professionals in the tech industry",
    image: "/images/development/talent-path.png",
    tags: ["React", "CSS", "TypeScript", "Vite"],
    type: "Web App",
    year: "2025",
    technologies: ["React", "CSS", "TypeScript", "Vite"],
    githubUrl: "https://github.com/fahrezi93/career-recomender",
    liveUrl: "https://talent-path.vercel.app",
    status: "Completed",
    category: "Web App"
  },
  {
    id: "dev-6",
    title: "Smart Attendance",
    description: "A smart attendance system that uses face recognition to mark attendance automatically",
    image: "/images/development/smartattedance.png",
    tags: ["Python", "OpenCV", "Flask", "React", "Tailwind CSS"],
    type: "Full Stack",
    year: "2025",
    technologies: ["Python", "OpenCV", "Flask", "React"],
    githubUrl: "https://github.com/fahrezi93/smart-attendance",
    liveUrl: "#",
    status: "In Progress",
    category: "Full Stack"
  },
  {
    id: "dev-7",
    title: "Hoax Detector",
    description: "A hoax detector that can detect fake news and misinformation using natural language processing with IndoBERT",
    image: "/images/development/hoaxdetector.png",
    tags: ["Python", "Flask", "IndoBERT", "Transformers", "React", "Tailwind CSS"],
    type: "Full Stack",
    year: "2025",
    technologies: ["Python", "Flask", "IndoBERT", "Transformers", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/fahrezi93/hoax-detector",
    liveUrl: "https://hoax-detection-v1.vercel.app/",
    status: "Completed",
    category: "Full Stack"
  },
  {
    id: "dev-8",
    title: "Simpan Cepat",
    description: "A note taking app that can help you save your notes and ideas with AI-powered features",
    image: "/images/development/simpancepat.png",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Firebase", "Genkit"],
    type: "Web App",
    year: "2025",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Firebase", "Genkit"],
    githubUrl: "https://github.com/fahrezi93/simpan-cepat",
    liveUrl: "#",
    status: "In Progress",
    category: "Web App"
  },
  {
    id: "dev-9",
    title: "Portfolio Website",
    description: "A personal portfolio to showcase my skills and projects, built with a focus on performance and aesthetics",
    image: "/images/development/portofolio.png",
    tags: ["React", "Tailwind CSS", "TypeScript", "Next.js"],
    type: "Web App",
    year: "2025",
    technologies: ["React", "Tailwind CSS", "TypeScript", "Next.js"],
    githubUrl: "https://github.com/fahrezi93/portfolio",
    liveUrl: "https://fahrezi-portofolio.vercel.app",
    status: "Completed",
    category: "Web App"
  }
];
