"use client";

import { useState } from 'react';
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
  featured: boolean;
  createdAt: string;
  type: string;
  year: string;
}

export function ProjectsManager() {
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
      featured: project.status === 'Completed',
      createdAt: project.year,
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
      demoUrl: project.figmaUrl,
      githubUrl: project.behanceUrl,
      technologies: project.tools,
      featured: project.type === 'UI/UX' || project.type === 'Web Design',
      createdAt: project.year,
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
      demoUrl: project.youtubeUrl,
      githubUrl: project.videoUrl,
      technologies: project.software,
      featured: project.type === 'Commercial' || project.type === 'Motion Graphics',
      createdAt: project.year,
      type: project.type,
      year: project.year
    }))
  ];

  const [projects, setProjects] = useState<Project[]>(allProjects);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const newProject: Project = {
      id: editingProject?.id || `${formData.category}-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      type: formData.type || formData.category,
      year: formData.year,
      image: formData.image || '/images/placeholder.jpg',
      demoUrl: formData.demoUrl,
      githubUrl: formData.githubUrl,
      technologies: formData.technologies,
      featured: formData.featured,
      createdAt: formData.year
    };

    if (editingProject) {
      // Update existing project
      setProjects(prev => prev.map(p => p.id === editingProject.id ? newProject : p));
    } else {
      // Add new project
      setProjects(prev => [newProject, ...prev]);
    }

    // Reset form and close modal
    resetForm();
    setShowAddModal(false);
    setEditingProject(null);
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
      featured: project.featured
    });
    setEditingProject(project);
    setShowAddModal(true);
  };

  const handleDelete = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
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

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const toggleFeatured = (id: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Projects Manager</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button 
          onClick={() => {
            setEditingProject(null);
            setShowAddModal(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

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
                  onClick={() => {
                    setProjects(prev => prev.map(p => 
                      p.id === project.id ? { ...p, featured: !p.featured } : p
                    ));
                  }}
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
                  placeholder="Enter project description"
                  required
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

              {/* Year and Image */}
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="/images/project.jpg"
                  />
                </div>
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
                <input
                  type="text"
                  value={formData.technologies.join(', ')}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    technologies: e.target.value.split(',').map(t => t.trim()).filter(t => t) 
                  }))}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="React, TypeScript, Tailwind CSS (comma separated)"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
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
                <Button type="submit">
                  {editingProject ? 'Update Project' : 'Add Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
