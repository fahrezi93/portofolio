import { ProjectsService } from './projects-service';
import { developmentProjects } from '@/data/development-projects';
import { designProjects } from '@/data/design-projects';
import { videoProjects } from '@/data/video-projects';

export class DataMigration {
  /**
   * Migrate all portfolio data from /data folder to Supabase
   */
  static async migrateAllData(): Promise<{
    success: boolean;
    migrated: number;
    errors: string[];
    summary: {
      development: number;
      design: number;
      video: number;
      total: number;
    };
  }> {
    const errors: string[] = [];
    let totalMigrated = 0;
    const summary = {
      development: 0,
      design: 0,
      video: 0,
      total: 0
    };

    console.log('🚀 Starting data migration to Supabase...');

    try {
      // Migrate Development Projects
      console.log('📱 Migrating development projects...');
      const devResult = await this.migrateDevelopmentProjects();
      if (devResult.success) {
        summary.development = devResult.migrated;
        totalMigrated += devResult.migrated;
        console.log(`✅ Development: ${devResult.migrated} projects migrated`);
      } else {
        errors.push(...devResult.errors);
        console.error('❌ Development migration failed:', devResult.errors);
      }

      // Migrate Design Projects
      console.log('🎨 Migrating design projects...');
      const designResult = await this.migrateDesignProjects();
      if (designResult.success) {
        summary.design = designResult.migrated;
        totalMigrated += designResult.migrated;
        console.log(`✅ Design: ${designResult.migrated} projects migrated`);
      } else {
        errors.push(...designResult.errors);
        console.error('❌ Design migration failed:', designResult.errors);
      }

      // Migrate Video Projects
      console.log('🎬 Migrating video projects...');
      const videoResult = await this.migrateVideoProjects();
      if (videoResult.success) {
        summary.video = videoResult.migrated;
        totalMigrated += videoResult.migrated;
        console.log(`✅ Video: ${videoResult.migrated} projects migrated`);
      } else {
        errors.push(...videoResult.errors);
        console.error('❌ Video migration failed:', videoResult.errors);
      }

      summary.total = totalMigrated;

      console.log('🎉 Migration completed!');
      console.log(`📊 Summary: ${summary.total} total projects migrated`);
      console.log(`   - Development: ${summary.development}`);
      console.log(`   - Design: ${summary.design}`);
      console.log(`   - Video: ${summary.video}`);

      return {
        success: errors.length === 0,
        migrated: totalMigrated,
        errors,
        summary
      };

    } catch (error) {
      console.error('💥 Migration failed:', error);
      return {
        success: false,
        migrated: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error'],
        summary
      };
    }
  }

  /**
   * Migrate development projects
   */
  private static async migrateDevelopmentProjects(): Promise<{
    success: boolean;
    migrated: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let migrated = 0;

    for (const project of developmentProjects) {
      try {
        const projectData = {
          title: project.title,
          description: project.description,
          category: 'development' as const,
          type: project.type,
          year: project.year,
          image_url: project.image,
          demo_url: project.liveUrl || undefined,
          github_url: project.githubUrl || undefined,
          technologies: project.technologies,
          featured: project.status === 'Completed' && ['Full Stack', 'Web App'].includes(project.type)
        };

        const result = await ProjectsService.createProject(projectData);
        
        if (result.success) {
          migrated++;
          console.log(`  ✓ ${project.title}`);
        } else {
          errors.push(`${project.title}: ${result.error}`);
          console.error(`  ✗ ${project.title}: ${result.error}`);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`${project.title}: ${errorMsg}`);
        console.error(`  ✗ ${project.title}: ${errorMsg}`);
      }
    }

    return {
      success: errors.length === 0,
      migrated,
      errors
    };
  }

  /**
   * Migrate design projects
   */
  private static async migrateDesignProjects(): Promise<{
    success: boolean;
    migrated: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let migrated = 0;

    for (const project of designProjects) {
      try {
        const projectData = {
          title: project.title,
          description: project.description,
          category: 'design' as const,
          type: project.type,
          year: project.year,
          image_url: project.image,
          demo_url: project.figmaUrl || project.behanceUrl || project.dribbbleUrl || undefined,
          github_url: undefined,
          technologies: project.tools,
          featured: ['UI/UX', 'Web Design', 'Branding'].includes(project.type)
        };

        const result = await ProjectsService.createProject(projectData);
        
        if (result.success) {
          migrated++;
          console.log(`  ✓ ${project.title}`);
        } else {
          errors.push(`${project.title}: ${result.error}`);
          console.error(`  ✗ ${project.title}: ${result.error}`);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`${project.title}: ${errorMsg}`);
        console.error(`  ✗ ${project.title}: ${errorMsg}`);
      }
    }

    return {
      success: errors.length === 0,
      migrated,
      errors
    };
  }

  /**
   * Migrate video projects
   */
  private static async migrateVideoProjects(): Promise<{
    success: boolean;
    migrated: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let migrated = 0;

    for (const project of videoProjects) {
      try {
        const projectData = {
          title: project.title,
          description: project.description,
          category: 'video' as const,
          type: project.type,
          year: project.year,
          image_url: project.thumbnail,
          demo_url: project.youtubeUrl || project.videoUrl || undefined,
          github_url: undefined,
          technologies: project.software,
          featured: ['Motion Graphics', 'Commercial'].includes(project.type)
        };

        const result = await ProjectsService.createProject(projectData);
        
        if (result.success) {
          migrated++;
          console.log(`  ✓ ${project.title}`);
        } else {
          errors.push(`${project.title}: ${result.error}`);
          console.error(`  ✗ ${project.title}: ${result.error}`);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`${project.title}: ${errorMsg}`);
        console.error(`  ✗ ${project.title}: ${errorMsg}`);
      }
    }

    return {
      success: errors.length === 0,
      migrated,
      errors
    };
  }

  /**
   * Clear all projects from database (use with caution!)
   */
  static async clearAllProjects(): Promise<{
    success: boolean;
    deleted: number;
    error?: string;
  }> {
    try {
      console.log('🗑️ Clearing all projects from database...');
      
      // Get all projects first
      const result = await ProjectsService.getAllProjects();
      
      if (!result.success || !result.data) {
        return {
          success: false,
          deleted: 0,
          error: result.error || 'Failed to fetch projects'
        };
      }

      let deleted = 0;
      
      // Delete each project
      for (const project of result.data) {
        if (project.id) {
          const deleteResult = await ProjectsService.deleteProject(project.id);
          if (deleteResult.success) {
            deleted++;
            console.log(`  ✓ Deleted: ${project.title}`);
          } else {
            console.error(`  ✗ Failed to delete: ${project.title}`);
          }
        }
      }

      console.log(`🗑️ Cleared ${deleted} projects from database`);
      
      return {
        success: true,
        deleted
      };

    } catch (error) {
      console.error('💥 Clear operation failed:', error);
      return {
        success: false,
        deleted: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get migration status and statistics
   */
  static async getMigrationStatus(): Promise<{
    success: boolean;
    stats?: {
      total: number;
      development: number;
      design: number;
      video: number;
      featured: number;
    };
    error?: string;
  }> {
    try {
      const result = await ProjectsService.getProjectStats();
      
      if (result.success && result.data) {
        return {
          success: true,
          stats: result.data
        };
      } else {
        return {
          success: false,
          error: result.error || 'Failed to get statistics'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Development helper functions (only available in development)
if (process.env.NODE_ENV === 'development') {
  // Add migration functions to window for easy access in browser console
  (window as any).DataMigration = DataMigration;
  
  console.log('🔧 DataMigration utility loaded in development mode');
  console.log('💡 Available commands:');
  console.log('   - DataMigration.migrateAllData() - Migrate all data to Supabase');
  console.log('   - DataMigration.clearAllProjects() - Clear all projects (use with caution!)');
  console.log('   - DataMigration.getMigrationStatus() - Get current statistics');
}
