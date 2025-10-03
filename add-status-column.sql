-- Add status column to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'In Progress' 
CHECK (status IN ('In Progress', 'Completed', 'Planned'));

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Update existing projects to have a default status
UPDATE projects 
SET status = CASE 
  WHEN featured = true THEN 'Completed'
  ELSE 'In Progress'
END
WHERE status IS NULL;
