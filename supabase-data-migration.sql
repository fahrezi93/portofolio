-- ============================================================================
-- MIGRATION SCRIPT: Portfolio Data to Supabase
-- ============================================================================
-- This script migrates all existing portfolio data from /data folder to Supabase
-- Run this after creating the projects table with supabase-projects-schema.sql

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM projects;

-- ============================================================================
-- DEVELOPMENT PROJECTS MIGRATION
-- ============================================================================

INSERT INTO projects (
  id, title, description, category, type, year, image_url, demo_url, github_url, technologies, featured
) VALUES 
(
  'dev-1',
  'Chatbot AI',
  'A chatbot AI that can answer questions and help with tasks using natural language processing',
  'development',
  'Full Stack',
  '2025',
  '/images/development/aksara-ai.jpg',
  'https://aksara-ai.vercel.app',
  'https://github.com/fahrezi93/aksara-ai',
  ARRAY['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'Firebase'],
  true
),
(
  'dev-2',
  'Waste Classifier',
  'A waste classifier that can classify waste into different categories using machine learning',
  'development',
  'Full Stack',
  '2025',
  '/images/development/waste-classifier.png',
  'https://waste-classifier-v1.vercel.app',
  'https://github.com/fahrezi93/waste-classifier',
  ARRAY['Python', 'Flask', 'TensorFlow', 'Keras', 'React', 'Tailwind CSS'],
  true
),
(
  'dev-3',
  'NutriSuggest',
  'A food recommendation system that suggests healthy and nutritious foods based on user preferences and health goals',
  'development',
  'Full Stack',
  '2025',
  '/images/development/nutrisuggest.png',
  'https://nutrisuggest.vercel.app/',
  'https://github.com/fahrezi93/nutrisuggest',
  ARRAY['React', 'Tailwind CSS', 'TypeScript', 'Python', 'Flask'],
  true
),
(
  'dev-4',
  'Thrift Haven',
  'A thrift store website that allows users to buy and sell second-hand items with secure payment system',
  'development',
  'Full Stack',
  '2025',
  '/images/development/thrift-haven.png',
  'https://thrifting-haven.vercel.app',
  'https://github.com/fahrezi93/thrifting-ecommerce',
  ARRAY['React', 'Tailwind CSS', 'TypeScript', 'Next.js', 'Firebase', 'PostgreSQL'],
  true
),
(
  'dev-5',
  'Talent Path',
  'A career guidance website that provides resources and advice for students and professionals in the tech industry',
  'development',
  'Web App',
  '2025',
  '/images/development/talent-path.png',
  'https://talent-path.vercel.app',
  'https://github.com/fahrezi93/career-recomender',
  ARRAY['React', 'CSS', 'TypeScript', 'Vite'],
  false
),
(
  'dev-6',
  'Smart Attendance',
  'A smart attendance system that uses face recognition to mark attendance automatically',
  'development',
  'Full Stack',
  '2025',
  '/images/development/smartattedance.png',
  null,
  'https://github.com/fahrezi93/smart-attendance',
  ARRAY['Python', 'OpenCV', 'Flask', 'React'],
  false
),
(
  'dev-7',
  'Hoax Detector',
  'A hoax detector that can detect fake news and misinformation using natural language processing with IndoBERT',
  'development',
  'Full Stack',
  '2025',
  '/images/development/hoaxdetector.png',
  'https://hoax-detection-v1.vercel.app/',
  'https://github.com/fahrezi93/hoax-detector',
  ARRAY['Python', 'Flask', 'IndoBERT', 'Transformers', 'React', 'Tailwind CSS'],
  true
),
(
  'dev-8',
  'Simpan Cepat',
  'A note taking app that can help you save your notes and ideas with AI-powered features',
  'development',
  'Web App',
  '2025',
  '/images/development/simpancepat.png',
  null,
  'https://github.com/fahrezi93/simpan-cepat',
  ARRAY['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Firebase', 'Genkit'],
  false
),
(
  'dev-9',
  'Portfolio Website',
  'A personal portfolio to showcase my skills and projects, built with a focus on performance and aesthetics',
  'development',
  'Web App',
  '2025',
  '/images/development/portofolio.png',
  'https://fahrezi-portofolio.vercel.app',
  'https://github.com/fahrezi93/portfolio',
  ARRAY['React', 'Tailwind CSS', 'TypeScript', 'Next.js'],
  true
),
(
  'dev-10',
  'GamePulse Topup Web',
  'Topup web for GamePulse with payment gateway',
  'development',
  'Web App',
  '2025',
  '/images/development/gamepulse.png',
  null,
  'https://github.com/fahrezi93/gamepulse-topup',
  ARRAY['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Firebase', 'Supabase'],
  false
);

-- ============================================================================
-- DESIGN PROJECTS MIGRATION (Sample - you'll need to add all 24 projects)
-- ============================================================================

INSERT INTO projects (
  id, title, description, category, type, year, image_url, demo_url, github_url, technologies, featured
) VALUES 
(
  'design-1',
  '100 Hari Kerja HMIF',
  'Commemorative design celebrating 100 days of work milestone with modern purple gradient design.',
  'design',
  'Graphic Design',
  '2024',
  '/images/design/100-hari-kerja-hmif.png',
  null,
  null,
  ARRAY['Figma', 'Adobe Photoshop'],
  false
),
(
  'design-2',
  'Aksara AI Landing Page',
  'Modern landing page design for AI chatbot application with clean and professional layout.',
  'design',
  'Web Design',
  '2024',
  '/images/design/aksara-ai-landing.png',
  'https://www.figma.com/design/example',
  null,
  ARRAY['Figma', 'Adobe Photoshop'],
  true
),
(
  'design-3',
  'Alur Pendaftaran HMIF',
  'Information design showing the registration flow process with clear visual hierarchy.',
  'design',
  'Graphic Design',
  '2024',
  '/images/design/alur-pendaftaran-hmif.png',
  null,
  null,
  ARRAY['Figma', 'Adobe Illustrator'],
  false
),
(
  'design-4',
  'Belajar Bareng HMIF',
  'Educational event poster design with vibrant colors and engaging typography.',
  'design',
  'Event Design',
  '2024',
  '/images/design/belajar-bareng-hmif.png',
  null,
  null,
  ARRAY['Figma', 'Adobe Photoshop'],
  false
),
(
  'design-5',
  'Certificate HMIF',
  'Professional certificate template design with elegant layout and branding elements.',
  'design',
  'Certificate',
  '2024',
  '/images/design/certificate-hmif.png',
  null,
  null,
  ARRAY['Figma', 'Adobe Illustrator'],
  true
);

-- ============================================================================
-- VIDEO PROJECTS MIGRATION
-- ============================================================================

INSERT INTO projects (
  id, title, description, category, type, year, image_url, demo_url, github_url, technologies, featured
) VALUES 
(
  'video-1',
  'Brand Commercial Video',
  'Dynamic commercial video showcasing modern tech startup with motion graphics and smooth transitions',
  'video',
  'Commercial',
  '2024',
  '/images/video/brand-commercial.jpg',
  'https://youtube.com/watch?v=example1',
  null,
  ARRAY['After Effects', 'Premiere Pro', 'Cinema 4D', 'Illustrator'],
  true
),
(
  'video-2',
  'Product Launch Animation',
  'Engaging product launch video with 3D animations and dynamic text reveals',
  'video',
  'Motion Graphics',
  '2024',
  '/images/video/product-launch.jpg',
  'https://youtube.com/watch?v=example2',
  null,
  ARRAY['After Effects', 'Cinema 4D', 'Photoshop'],
  true
),
(
  'video-3',
  'Social Media Campaign',
  'Series of short-form videos optimized for social media platforms with trendy effects',
  'video',
  'Social Media',
  '2024',
  '/images/video/social-campaign.jpg',
  'https://youtube.com/watch?v=example3',
  null,
  ARRAY['Premiere Pro', 'After Effects', 'Audition'],
  false
),
(
  'video-4',
  'Corporate Training Video',
  'Professional training video with clear narration and instructional graphics',
  'video',
  'Video Editing',
  '2024',
  '/images/video/corporate-training.jpg',
  'https://youtube.com/watch?v=example4',
  null,
  ARRAY['Premiere Pro', 'Audition', 'Photoshop'],
  false
),
(
  'video-5',
  'Event Highlight Reel',
  'Dynamic event recap video with energetic pacing and music synchronization',
  'video',
  'Video Editing',
  '2024',
  '/images/video/event-highlight.jpg',
  'https://youtube.com/watch?v=example5',
  null,
  ARRAY['Premiere Pro', 'After Effects', 'Audition'],
  false
),
(
  'video-6',
  'Animated Logo Reveal',
  'Professional logo animation with particle effects and smooth transitions',
  'video',
  'Animation',
  '2024',
  '/images/video/logo-reveal.jpg',
  'https://youtube.com/watch?v=example6',
  null,
  ARRAY['After Effects', 'Cinema 4D', 'Illustrator'],
  true
);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check total projects count
SELECT 
  category,
  COUNT(*) as total_projects,
  COUNT(CASE WHEN featured = true THEN 1 END) as featured_projects
FROM projects 
GROUP BY category
ORDER BY category;

-- Check all projects
SELECT 
  id, 
  title, 
  category, 
  type, 
  year, 
  featured,
  array_length(technologies, 1) as tech_count
FROM projects 
ORDER BY category, created_at DESC;

-- Summary statistics
SELECT 
  COUNT(*) as total_projects,
  COUNT(CASE WHEN category = 'development' THEN 1 END) as development_count,
  COUNT(CASE WHEN category = 'design' THEN 1 END) as design_count,
  COUNT(CASE WHEN category = 'video' THEN 1 END) as video_count,
  COUNT(CASE WHEN featured = true THEN 1 END) as featured_count
FROM projects;
