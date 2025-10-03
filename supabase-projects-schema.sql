-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('development', 'design', 'video')),
  type VARCHAR(100),
  year VARCHAR(4) NOT NULL,
  image_url TEXT NOT NULL,
  demo_url TEXT,
  github_url TEXT,
  technologies TEXT[], -- Array of technology strings
  status VARCHAR(50) DEFAULT 'In Progress' CHECK (status IN ('In Progress', 'Completed', 'Planned')),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for project images (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read projects (for public portfolio)
CREATE POLICY "Anyone can view projects" ON projects FOR SELECT USING (true);

-- Allow authenticated users to insert projects (for admin)
CREATE POLICY "Authenticated users can insert projects" ON projects FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update projects (for admin)
CREATE POLICY "Authenticated users can update projects" ON projects FOR UPDATE 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete projects (for admin)
CREATE POLICY "Authenticated users can delete projects" ON projects FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create storage policies for project-images bucket
CREATE POLICY "Anyone can view project images" ON storage.objects FOR SELECT 
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project images" ON storage.objects FOR UPDATE 
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project images" ON storage.objects FOR DELETE 
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);

-- Insert sample project (optional - remove if not needed)
INSERT INTO projects (
  title,
  description,
  category,
  type,
  year,
  image_url,
  demo_url,
  github_url,
  technologies,
  featured
) VALUES (
  'Sample Project',
  'This is a sample project to test the database schema.',
  'development',
  'Web App',
  '2025',
  '/images/placeholder.jpg',
  'https://example.com',
  'https://github.com/username/repo',
  ARRAY['React', 'TypeScript', 'Tailwind CSS'],
  false
) ON CONFLICT DO NOTHING;
