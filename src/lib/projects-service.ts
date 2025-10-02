import { supabase } from './supabase';
import { StorageManager } from './storage';

export interface ProjectData {
  id?: string;
  title: string;
  description: string;
  category: 'development' | 'design' | 'video';
  type?: string;
  year: string;
  image_url: string;
  demo_url?: string;
  github_url?: string;
  technologies: string[];
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export class ProjectsService {
  /**
   * Get all projects from database
   */
  static async getAllProjects(): Promise<{
    success: boolean;
    data?: ProjectData[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { success: false, error: 'Failed to fetch projects' };
    }
  }

  /**
   * Get projects by category
   */
  static async getProjectsByCategory(category: string): Promise<{
    success: boolean;
    data?: ProjectData[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects by category:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return { success: false, error: 'Failed to fetch projects' };
    }
  }

  /**
   * Get featured projects
   */
  static async getFeaturedProjects(): Promise<{
    success: boolean;
    data?: ProjectData[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching featured projects:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return { success: false, error: 'Failed to fetch featured projects' };
    }
  }

  /**
   * Create a new project
   */
  static async createProject(projectData: Omit<ProjectData, 'id' | 'created_at' | 'updated_at'>): Promise<{
    success: boolean;
    data?: ProjectData;
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, error: 'Failed to create project' };
    }
  }

  /**
   * Update an existing project
   */
  static async updateProject(id: string, projectData: Partial<ProjectData>): Promise<{
    success: boolean;
    data?: ProjectData;
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error updating project:', error);
      return { success: false, error: 'Failed to update project' };
    }
  }

  /**
   * Delete a project
   */
  static async deleteProject(id: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      // First get the project to get the image URL for deletion
      const { data: project } = await supabase
        .from('projects')
        .select('image_url')
        .eq('id', id)
        .single();

      // Delete the project from database
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting project:', error);
        return { success: false, error: error.message };
      }

      // Delete the associated image from storage (if it's from our storage)
      if (project?.image_url && project.image_url.includes('supabase')) {
        try {
          await StorageManager.deleteFile(project.image_url);
        } catch (storageError) {
          console.warn('Could not delete associated image:', storageError);
          // Don't fail the whole operation if image deletion fails
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, error: 'Failed to delete project' };
    }
  }

  /**
   * Toggle featured status of a project
   */
  static async toggleFeatured(id: string): Promise<{
    success: boolean;
    data?: ProjectData;
    error?: string;
  }> {
    try {
      // First get current featured status
      const { data: currentProject } = await supabase
        .from('projects')
        .select('featured')
        .eq('id', id)
        .single();

      if (!currentProject) {
        return { success: false, error: 'Project not found' };
      }

      // Toggle the featured status
      const { data, error } = await supabase
        .from('projects')
        .update({ featured: !currentProject.featured })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error toggling featured status:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error toggling featured status:', error);
      return { success: false, error: 'Failed to toggle featured status' };
    }
  }

  /**
   * Search projects by title or description
   */
  static async searchProjects(query: string): Promise<{
    success: boolean;
    data?: ProjectData[];
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching projects:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error searching projects:', error);
      return { success: false, error: 'Failed to search projects' };
    }
  }

  /**
   * Get project statistics
   */
  static async getProjectStats(): Promise<{
    success: boolean;
    data?: {
      total: number;
      development: number;
      design: number;
      video: number;
      featured: number;
    };
    error?: string;
  }> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('category, featured');

      if (error) {
        console.error('Error fetching project stats:', error);
        return { success: false, error: error.message };
      }

      const stats = {
        total: data?.length || 0,
        development: data?.filter(p => p.category === 'development').length || 0,
        design: data?.filter(p => p.category === 'design').length || 0,
        video: data?.filter(p => p.category === 'video').length || 0,
        featured: data?.filter(p => p.featured).length || 0,
      };

      return { success: true, data: stats };
    } catch (error) {
      console.error('Error fetching project stats:', error);
      return { success: false, error: 'Failed to fetch project statistics' };
    }
  }
}
