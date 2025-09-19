-- Fix for delete operation not working
-- This adds the missing DELETE policy to allow comment deletion

-- Add DELETE policy for comments table
CREATE POLICY "Anyone can delete comments" ON comments
  FOR DELETE USING (true);

-- Verify the policy was created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'comments' AND cmd = 'DELETE';
