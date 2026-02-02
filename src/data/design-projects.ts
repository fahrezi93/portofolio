export type DesignProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: "UI/UX" | "Branding" | "Web Design" | "Mobile Design" | "Graphic Design" | "Social Media" | "Certificate" | "Event Design";
  year: string;
  tools: string[];
  behanceUrl?: string;
  dribbbleUrl?: string;
  figmaUrl?: string;
  category: string;
  featured?: boolean;
};

export const designProjects: DesignProject[] = [
  {
    id: "design-1",
    title: "100 Hari Kerja HMIF",
    description: "Commemorative design celebrating 100 days of work milestone with modern purple gradient design.",
    image: "/images/design/100-hari-kerja-hmif.webp",
    tags: ["Milestone", "Corporate", "Graphic Design"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Figma", "Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Certificate Design",
    featured: true
  },
  {
    id: "design-3",
    title: "Design Sertifikat",
    description: "Professional certificate design with elegant layout and modern typography.",
    image: "/images/design/design-sertifikat.webp",
    tags: ["Certificate", "Professional", "Layout"],
    type: "Certificate",
    year: "2024",
    tools: ["Figma"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Certificate Design"
  },
  {
    id: "design-4",
    title: "Feed Coming Soon HMIF",
    description: "Social media feed design for upcoming event announcement with gradient background.",
    image: "/images/design/feed-comingsoon-hmif.webp",
    tags: ["Social Media", "Event", "Announcement"],
    type: "Social Media",
    year: "2024",
    tools: ["Figma", "Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Social Media Design",
    featured: true
  },
  {
    id: "design-5",
    title: "Feed Design Lead GDSC",
    description: "Leadership announcement design for design team lead position with professional layout.",
    image: "/images/design/feed-design-lead-gdsc.webp",
    tags: ["Leadership", "Team", "GDSC"],
    type: "Social Media",
    year: "2024",
    tools: ["Figma"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Organizational Design"
  },
  {
    id: "design-6",
    title: "Feed GDSC Infographic",
    description: "Informative infographic design for Google Developer Student Clubs with colorful icons.",
    image: "/images/design/feed-gdsc-infographic.webp",
    tags: ["Infographic", "GDSC", "Educational"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Figma"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Infographic Design"
  },
  {
    id: "design-7",
    title: "Feeds 100 Hari",
    description: "Social media feed celebrating 100 days milestone with creative purple design.",
    image: "/images/design/feeds-100-hari.webp",
    tags: ["Milestone", "Social Media", "Celebration"],
    type: "Social Media",
    year: "2024",
    tools: ["Figma", "Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Social Media Design"
  },
  {
    id: "design-8",
    title: "Feeds HMIF",
    description: "Official social media feed design for HMIF organization with brand consistency.",
    image: "/images/design/feeds-hmif.webp",
    tags: ["Organization", "Branding", "Social Media"],
    type: "Social Media",
    year: "2024",
    tools: ["Figma", "Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Social Media Design"
  },
  {
    id: "design-9",
    title: "Feeds Kepengurusan",
    description: "Leadership team introduction design with modern layout and professional styling.",
    image: "/images/design/feeds-kepengurusan.webp",
    tags: ["Leadership", "Team", "Introduction"],
    type: "Social Media",
    year: "2024",
    tools: ["Figma", "Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Organizational Design"
  },
  {
    id: "design-10",
    title: "Feeds Notable Mention",
    description: "Achievement recognition design highlighting notable mentions and accomplishments.",
    image: "/images/design/feeds-notable-mention.webp",
    tags: ["Achievement", "Recognition", "Award"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Figma", "Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Achievement Design"
  },
  {
    id: "design-11",
    title: "Feeds Road to PKM",
    description: "Program Kreativitas Mahasiswa journey design with motivational elements.",
    image: "/images/design/feeds-road-to-pkkmb.webp",
    tags: ["PKM", "Student Program", "Journey"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Figma", "Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Educational Design"
  },
  {
    id: "design-12",
    title: "GDSC Creative Design",
    description: "Creative design showcase for Google Developer Student Clubs community.",
    image: "/images/design/GDSC_CreativeDesign_MohammadFahrezi.webp",
    tags: ["GDSC", "Creative", "Showcase"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Portfolio Design"
  },
  {
    id: "design-13",
    title: "HMIF Code League",
    description: "Programming competition poster design with tech-inspired visual elements.",
    image: "/images/design/hmif-code-league.webp",
    tags: ["Competition", "Programming", "Event"],
    type: "Event Design",
    year: "2024",
    tools: ["Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Event Design"
  },
  {
    id: "design-14",
    title: "Open Recruitment Staff HMIF",
    description: "Staff recruitment announcement design with professional and inviting layout.",
    image: "/images/design/open-recruitment-staff-hmif.webp",
    tags: ["Recruitment", "Staff", "Organization"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Recruitment Design"
  },
  {
    id: "design-15",
    title: "Pamflet IFEST HMIF",
    description: "Academic festival pamphlet design with vibrant colors and engaging layout.",
    image: "/images/design/pamflet-iffest-hmif.webp",
    tags: ["Festival", "Academic", "Event"],
    type: "Event Design",
    year: "2024",
    tools: ["Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Event Design"
  },
  {
    id: "design-16",
    title: "Pamflet Kajian Rutin",
    description: "Regular study session pamphlet with Islamic calligraphy and modern design elements.",
    image: "/images/design/pamflet-kajian-ruitin.webp",
    tags: ["Islamic", "Study", "Event"],
    type: "Event Design",
    year: "2024",
    tools: ["Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Event Design"
  },
  {
    id: "design-17",
    title: "Pamflet Lomba IFEST",
    description: "Competition pamphlet for IFEST with dynamic layout and competitive spirit design.",
    image: "/images/design/pamflet-lomba-iffest.webp",
    tags: ["Competition", "Festival", "Event"],
    type: "Event Design",
    year: "2024",
    tools: ["Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Event Design"
  },
  {
    id: "design-18",
    title: "Pamflet Podcast HMIF",
    description: "Podcast series promotional design with modern audio-visual elements.",
    image: "/images/design/pamflet-podcast-hmif.webp",
    tags: ["Podcast", "Media", "Promotion"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Media Design"
  },
  {
    id: "design-19",
    title: "Pamflet PTQ",
    description: "Quran recitation competition pamphlet with elegant Islamic design elements.",
    image: "/images/design/pamflet-ptq.webp",
    tags: ["Islamic", "Competition", "Quran"],
    type: "Event Design",
    year: "2024",
    tools: ["Adobe Photoshop", "Canva"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Event Design"
  },
  {
    id: "design-20",
    title: "Pamflet Webinar Fasco Academy",
    description: "Educational webinar promotional design for Fasco Academy with professional layout.",
    image: "/images/design/pamflet-webinar-fasco-academy.webp",
    tags: ["Webinar", "Education", "Academy"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Adobe Photoshop", "Canva", "Figma"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Educational Design"
  },
  {
    id: "design-21",
    title: "Selamat Datang Mahasiswa Baru",
    description: "Welcome design for new students with warm and inviting visual elements.",
    image: "/images/design/selamat-datang-mahasiswa-baru.webp",
    tags: ["Welcome", "Students", "Orientation"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Figma", "Adobe Photoshop"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Welcome Design"
  },
  {
    id: "design-2",
    title: "Chapter HMIF",
    description: "Chapter design for HMIF (Himpunan Mahasiswa Informatika) with modern tech-inspired aesthetics.",
    image: "/images/design/chapter-hmif.webp",
    tags: ["Organization", "Tech", "Student"],
    type: "Graphic Design",
    year: "2024",
    tools: ["Figma"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Organizational Design"
  },
  {
    id: "design-22",
    title: "Sertifikat Computer Security GDSC",
    description: "Professional certificate design for Computer Security course completion from Google Developer Student Clubs.",
    image: "/images/design/sertifikat-computer-security-gdsc.webp",
    tags: ["Certificate", "Security", "GDSC", "Achievement"],
    type: "Certificate",
    year: "2024",
    tools: ["Figma"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Certificate Design"
  },
  {
    id: "design-23",
    title: "Sertifikat Mastering MERN GDSC",
    description: "Certificate design for MERN Stack mastery event completion from Google Developer Student Clubs.",
    image: "/images/design/sertifikat-mastering-MERN-gdsc.webp",
    tags: ["Certificate", "MERN", "GDSC", "Web Development"],
    type: "Certificate",
    year: "2024",
    tools: ["Figma"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Certificate Design"
  },
  {
    id: "design-24",
    title: "Pamflet Secure Your Startup GDSC",
    description: "Event pamphlet design for startup security workshop organized by Google Developer Student Clubs.",
    image: "/images/design/pamflet-secure-your-startup-gdsc.webp",
    tags: ["Workshop", "Security", "Startup", "GDSC"],
    type: "Event Design",
    year: "2024",
    tools: ["Figma"],
    figmaUrl: "#",
    behanceUrl: "#",
    category: "Event Design"
  }
];

