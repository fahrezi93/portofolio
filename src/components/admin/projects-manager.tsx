"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink,
  Image,
  Calendar,
  Tag,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PhotoUpload } from './photo-upload';
import { TechnologiesInput } from './technologies-input';
import { AIDescriptionGeneratorComponent } from './ai-description-generator';
import { ProjectsService, ProjectData } from '@/lib/projects-service';
import { DataMigration } from '@/lib/data-migration';
import { developmentProjects } from '@/data/development-projects';
import { designProjects } from '@/data/design-projects';
import { videoProjects } from '@/data/video-projects';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'development' | 'design' | 'video';
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  status: string;
  featured: boolean;
  createdAt: string;
  type: string;
  year: string;
}

export function ProjectsManager(): JSX.Element {
  // State variables
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [useDatabase, setUseDatabase] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationResult, setMigrationResult] = useState<string | null>(null);

  // Form state for new/edit project
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'development' as 'development' | 'design' | 'video',
    type: '',
    year: new Date().getFullYear().toString(),
    image: '',
    demoUrl: '',
    githubUrl: '',
    technologies: [] as string[],
    status: 'In Progress' as 'In Progress' | 'Completed' | 'Planned',
    featured: false
  });

  // Combine all projects from different categories
  const allProjects: Project[] = [
    // Development Projects
    ...developmentProjects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      category: 'development' as const,
      image: project.image,
      demoUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      technologies: project.technologies,
      status: project.status,
      featured: false, // Default value since DevelopmentProject doesn't have featured
      createdAt: new Date().toISOString(),
      type: project.type,
      year: project.year
    })),
    // Design Projects
    ...designProjects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      category: 'design' as const,
      image: project.image,
      demoUrl: project.figmaUrl || project.behanceUrl || project.dribbbleUrl,
      githubUrl: undefined,
      technologies: project.tools,
      status: 'Completed',
      featured: false,
      createdAt: new Date().toISOString(),
      type: project.type,
      year: project.year
    })),
    // Video Projects
    ...videoProjects.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      category: 'video' as const,
      image: project.thumbnail,
      demoUrl: project.youtubeUrl || project.videoUrl,
      githubUrl: undefined,
      technologies: project.software,
      status: 'Completed',
      featured: false,
      createdAt: new Date().toISOString(),
      type: project.type,
      year: project.year
    }))
  ];

  // Load projects on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  // Load projects from database or fallback to static data
  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await ProjectsService.getAllProjects();
      
      if (result.success && result.data) {
        // Transform database projects to match Project interface
        const dbProjects: Project[] = result.data.map(dbProject => ({
          id: dbProject.id!,
          title: dbProject.title,
          description: dbProject.description,
          category: dbProject.category,
          image: dbProject.image_url,
          demoUrl: dbProject.demo_url,
          githubUrl: dbProject.github_url,
          technologies: dbProject.technologies,
          status: dbProject.status || 'Completed',
          featured: dbProject.featured,
          createdAt: dbProject.created_at || new Date().toISOString(),
          type: dbProject.type || dbProject.category,
          year: dbProject.year
        }));
        
        setProjects(dbProjects);
        setUseDatabase(true);
      } else {
        // Fallback to static data if database fails
        console.warn('Database not available, using static data:', result.error);
        setProjects(allProjects);
        setUseDatabase(false);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects(allProjects);
      setUseDatabase(false);
      setError('Failed to load projects from database, using local data');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.image) {
      alert('Please fill in all required fields including project image');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (useDatabase) {
        // Use database operations
        const projectData: Omit<ProjectData, 'id' | 'created_at' | 'updated_at'> = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          type: formData.type || formData.category,
          year: formData.year,
          image_url: formData.image,
          demo_url: formData.demoUrl || undefined,
          github_url: formData.githubUrl || undefined,
          technologies: formData.technologies,
          status: formData.status,
          featured: formData.featured
        };

        if (editingProject) {
          // Update existing project
          const result = await ProjectsService.updateProject(editingProject.id, projectData);
          if (result.success && result.data) {
            const updatedProject: Project = {
              id: result.data.id!,
              title: result.data.title,
              description: result.data.description,
              category: result.data.category,
              image: result.data.image_url,
              demoUrl: result.data.demo_url,
              githubUrl: result.data.github_url,
              technologies: result.data.technologies,
              status: result.data.status || 'Completed',
              featured: result.data.featured,
              createdAt: result.data.created_at!,
              type: result.data.type || result.data.category,
              year: result.data.year
            };
            setProjects(prev => prev.map(p => p.id === editingProject.id ? updatedProject : p));
          } else {
            throw new Error(result.error || 'Failed to update project');
          }
        } else {
          // Create new project
          const result = await ProjectsService.createProject(projectData);
          if (result.success && result.data) {
            const newProject: Project = {
              id: result.data.id!,
              title: result.data.title,
              description: result.data.description,
              category: result.data.category,
              image: result.data.image_url,
              demoUrl: result.data.demo_url,
              githubUrl: result.data.github_url,
              technologies: result.data.technologies,
              status: result.data.status || 'Completed',
              featured: result.data.featured,
              createdAt: result.data.created_at!,
              type: result.data.type || result.data.category,
              year: result.data.year
            };
            setProjects(prev => [newProject, ...prev]);
          } else {
            throw new Error(result.error || 'Failed to create project');
          }
        }
      } else {
        // Fallback to local state management
        const newProject: Project = {
          id: editingProject?.id || `${formData.category}-${Date.now()}`,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          type: formData.type || formData.category,
          year: formData.year,
          image: formData.image,
          demoUrl: formData.demoUrl,
          githubUrl: formData.githubUrl,
          technologies: formData.technologies,
          status: formData.status,
          featured: formData.featured,
          createdAt: new Date().toISOString()
        };

        if (editingProject) {
          setProjects(prev => prev.map(p => p.id === editingProject.id ? newProject : p));
        } else {
          setProjects(prev => [newProject, ...prev]);
        }
      }

      // Reset form and close modal
      resetForm();
      setShowAddModal(false);
      setEditingProject(null);
      
    } catch (error) {
      console.error('Error saving project:', error);
      setError(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle data migration
  const handleMigration = async () => {
    if (!confirm('This will migrate all data from /data folder to Supabase. Continue?')) {
      return;
    }

    setIsMigrating(true);
    setMigrationResult(null);
    setError(null);

    try {
      const result = await DataMigration.migrateAllData();
      
      if (result.success) {
        setMigrationResult(
          `✅ Migration successful! Migrated ${result.migrated} projects:\n` +
          `- Development: ${result.summary.development}\n` +
          `- Design: ${result.summary.design}\n` +
          `- Video: ${result.summary.video}`
        );
        
        // Reload projects after migration
        await loadProjects();
      } else {
        setError(`Migration failed: ${result.errors.join(', ')}`);
      }
    } catch (error) {
      console.error('Migration error:', error);
      setError(error instanceof Error ? error.message : 'Migration failed');
    } finally {
      setIsMigrating(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'development',
      type: '',
      year: new Date().getFullYear().toString(),
      image: '',
      demoUrl: '',
      githubUrl: '',
      technologies: [],
      status: 'In Progress',
      featured: false
    });
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      type: project.type,
      year: project.year,
      image: project.image,
      demoUrl: project.demoUrl || '',
      githubUrl: project.githubUrl || '',
      technologies: project.technologies,
      status: project.status as 'In Progress' | 'Completed' | 'Planned',
      featured: project.featured
    });
    setEditingProject(project);
    setShowAddModal(true);
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (useDatabase) {
        const result = await ProjectsService.deleteProject(projectId);
        if (result.success) {
          // Refresh data from database to ensure consistency
          await loadProjects();
          console.log('✅ Project deleted and data refreshed');
        } else {
          throw new Error(result.error || 'Failed to delete project');
        }
      } else {
        // Fallback to local state
        setProjects(prev => prev.filter(p => p.id !== projectId));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete project');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'video', label: 'Video Editing' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


  const toggleFeatured = async (id: string) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;

    const newFeaturedStatus = !project.featured;
    
    try {
      if (useDatabase) {
        // Update in database
        const result = await ProjectsService.updateProject(id, {
          title: project.title,
          description: project.description,
          category: project.category,
          type: project.type,
          year: project.year,
          image_url: project.image,
          demo_url: project.demoUrl,
          github_url: project.githubUrl,
          technologies: project.technologies,
          status: project.status,
          featured: newFeaturedStatus
        });
        
        if (result.success) {
          // Update local state only if database update succeeds
          setProjects(projects.map(p => 
            p.id === id ? { ...p, featured: newFeaturedStatus } : p
          ));
          console.log(`✅ Project ${newFeaturedStatus ? 'featured' : 'unfeatured'}: ${project.title}`);
        } else {
          throw new Error(result.error || 'Failed to update featured status');
        }
      } else {
        // Fallback to local state only
        setProjects(projects.map(p => 
          p.id === id ? { ...p, featured: newFeaturedStatus } : p
        ));
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      alert(`Failed to ${newFeaturedStatus ? 'feature' : 'unfeature'} project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects Manager</h2>
          <p className="text-muted-foreground">
            Manage your portfolio projects
            {useDatabase ? (
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                Database Connected
              </span>
            ) : (
              <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full">
                Local Mode
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {useDatabase && (
            <Button 
              onClick={handleMigration}
              variant="outline"
              className="flex items-center gap-2"
              disabled={isLoading || isMigrating}
            >
              {isMigrating ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  Migrating...
                </>
              ) : (
                <>
                  <div className="w-4 h-4">📦</div>
                  Migrate Data
                </>
              )}
            </Button>
          )}
          <Button 
            onClick={() => {
              setEditingProject(null);
              setShowAddModal(true);
            }}
            className="flex items-center gap-2"
            disabled={isLoading}
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 text-red-600 dark:text-red-400">⚠️</div>
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-700"
            >
              ✕
            </Button>
          </div>
        </div>
      )}

      {/* Migration Result */}
      {migrationResult && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5">✅</div>
            <div className="flex-1">
              <pre className="text-green-700 dark:text-green-400 text-sm whitespace-pre-wrap font-mono">
                {migrationResult}
              </pre>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setMigrationResult(null)}
              className="text-green-600 hover:text-green-700"
            >
              ✕
            </Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading && projects.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
          >
            {/* Project Image */}
            <div className="relative h-48 bg-muted">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {project.featured && (
                <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </div>
              )}
              <div className="absolute top-3 right-3 flex gap-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.category === 'development' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                  project.category === 'design' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                  project.category === 'video' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                }`}>
                  {project.category}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.technologies.slice(0, 3).map(tech => (
                  <span 
                    key={tech}
                    className="px-2 py-1 bg-muted text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-xs rounded-md">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Date */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                <Calendar className="w-3 h-3" />
                {new Date(project.createdAt).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(project)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleFeatured(project.id)}
                  className={project.featured ? 'bg-primary/10 text-primary' : ''}
                >
                  <Tag className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(project.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first project'
            }
          </p>
          {!searchTerm && selectedCategory === 'all' && (
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || editingProject) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter project title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 h-24 resize-none"
                  placeholder="Enter project description or use AI to generate one..."
                  required
                />
                
                {/* AI Description Generator */}
                <AIDescriptionGeneratorComponent
                  context={{
                    title: formData.title,
                    category: formData.category,
                    type: formData.type,
                    technologies: formData.technologies,
                    year: formData.year
                  }}
                  currentDescription={formData.description}
                  onDescriptionGenerated={(description) => 
                    setFormData(prev => ({ ...prev, description }))
                  }
                  className="mt-3"
                />
              </div>

              {/* Category and Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                  >
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="video">Video Editing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <input
                    type="text"
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g., Web App, UI/UX, Motion Graphics"
                  />
                </div>
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="2025"
                />
              </div>

              {/* Project Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Project Image *</label>
                <PhotoUpload
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url || '' }))}
                  folder="projects"
                  maxSize={5}
                />
              </div>

              {/* URLs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Demo/Live URL</label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="https://example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">GitHub/Source URL</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium mb-2">Technologies/Tools</label>
                <TechnologiesInput
                  value={formData.technologies}
                  onChange={(technologies) => setFormData(prev => ({ ...prev, technologies }))}
                  placeholder="Add technologies used in this project..."
                />
              </div>

              {/* Status and Featured */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Status</label>
                  <select
                    value={formData.status || 'In Progress'}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'In Progress' | 'Completed' | 'Planned' }))}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-primary bg-muted border-border rounded focus:ring-primary/50"
                  />
                  <label htmlFor="featured" className="text-sm font-medium">
                    Mark as featured project
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end pt-4">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProject(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {editingProject ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingProject ? 'Update Project' : 'Add Project'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
