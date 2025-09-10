export type VideoProject = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  youtubeUrl?: string;
  tags: string[];
  type: "Motion Graphics" | "Video Editing" | "Animation" | "Commercial" | "Social Media";
  duration: string;
  year: string;
  software: string[];
  category: string;
};

export const videoProjects: VideoProject[] = [
  {
    id: "video-1",
    title: "Brand Commercial Video",
    description: "Dynamic commercial video showcasing modern tech startup with motion graphics and smooth transitions",
    thumbnail: "/images/video/brand-commercial.jpg",
    videoUrl: "#",
    youtubeUrl: "https://youtube.com/watch?v=example1",
    tags: ["Commercial", "Motion Graphics", "Branding", "Tech"],
    type: "Commercial",
    duration: "1:30",
    year: "2024",
    software: ["After Effects", "Premiere Pro", "Cinema 4D", "Illustrator"],
    category: "Commercial"
  },
  {
    id: "video-2",
    title: "Product Demo Animation",
    description: "Engaging product demonstration with 3D animations and kinetic typography for mobile app launch",
    thumbnail: "/images/video/product-demo.jpg",
    videoUrl: "#",
    tags: ["Animation", "Product Demo", "3D", "Mobile App"],
    type: "Animation",
    duration: "2:15",
    year: "2024",
    software: ["After Effects", "Blender", "Premiere Pro", "Cinema 4D"],
    category: "Animation"
  },
  {
    id: "video-3",
    title: "Social Media Content Series",
    description: "Series of short-form videos optimized for social media platforms with trendy effects and transitions",
    thumbnail: "/images/video/social-media.jpg",
    youtubeUrl: "https://youtube.com/watch?v=example3",
    tags: ["Social Media", "Short Form", "Instagram", "TikTok"],
    type: "Social Media",
    duration: "0:30",
    year: "2024",
    software: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    category: "Social Media"
  },
  {
    id: "video-4",
    title: "Motion Graphics Showreel",
    description: "Creative motion graphics showcase featuring various animation techniques and visual effects",
    thumbnail: "/images/video/motion-reel.jpg",
    videoUrl: "#",
    tags: ["Motion Graphics", "Showreel", "Creative", "Visual Effects"],
    type: "Motion Graphics",
    duration: "1:45",
    year: "2023",
    software: ["After Effects", "Cinema 4D", "Illustrator", "Photoshop"],
    category: "Motion Graphics"
  },
  {
    id: "video-5",
    title: "Corporate Presentation Video",
    description: "Professional corporate presentation video with data visualization and clean animations",
    thumbnail: "/images/video/corporate-presentation.jpg",
    videoUrl: "#",
    tags: ["Corporate", "Presentation", "Data Visualization", "Professional"],
    type: "Commercial",
    duration: "3:20",
    year: "2023",
    software: ["After Effects", "Premiere Pro", "Illustrator"],
    category: "Commercial"
  },
  {
    id: "video-6",
    title: "Music Video Edit",
    description: "Creative music video editing with color grading, effects, and synchronized cuts to the beat",
    thumbnail: "/images/video/music-video.jpg",
    youtubeUrl: "https://youtube.com/watch?v=example6",
    tags: ["Music Video", "Color Grading", "Creative Edit", "Sync"],
    type: "Video Editing",
    duration: "3:45",
    year: "2024",
    software: ["Premiere Pro", "DaVinci Resolve", "After Effects"],
    category: "Video Editing"
  }
];
