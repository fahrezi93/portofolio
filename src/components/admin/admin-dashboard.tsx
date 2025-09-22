"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Settings, 
  LogOut,
  User,
  BarChart3,
  Eye
} from 'lucide-react';
import { useAdmin } from '@/context/admin-context';
import { Button } from '@/components/ui/button';
import { ProjectsManager } from '@/components/admin/projects-manager';
import { CommentsManager } from '@/components/admin/comments-manager';
import { PortfolioSettings } from '@/components/admin/portfolio-settings';
import { supabase } from '@/lib/supabase';

type TabType = 'overview' | 'projects' | 'comments' | 'settings';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { logout } = useAdmin();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPanel onTabChange={setActiveTab} />;
      case 'projects':
        return <ProjectsManager />;
      case 'comments':
        return <CommentsManager />;
      case 'settings':
        return <PortfolioSettings />;
      default:
        return <OverviewPanel onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950/20">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Portfolio Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('/', '_blank')}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Site
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Overview Panel Component
function OverviewPanel({ onTabChange }: { onTabChange: (tab: TabType) => void }) {
  const [totalComments, setTotalComments] = useState<number>(0);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  // Fetch comments count from Supabase
  useEffect(() => {
    const fetchCommentsCount = async () => {
      try {
        setIsLoadingComments(true);
        
        // Check if Supabase is configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.log('Supabase not configured, using fallback data');
          setTotalComments(0);
          return;
        }

        const { count, error } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error('Error fetching comments count:', error);
          setTotalComments(0);
        } else {
          setTotalComments(count || 0);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setTotalComments(0);
      } finally {
        setIsLoadingComments(false);
      }
    };

    fetchCommentsCount();
  }, []);

  // Real data calculations
  const totalProjects = 9 + 24 + 6; // Development (9) + Design (24) + Video (6) = 39
  const pageViews = 'N/A'; // Would need analytics integration
  const engagement = 'N/A'; // Would need analytics integration
  
  const stats = [
    { label: 'Total Projects', value: totalProjects.toString(), icon: FolderOpen, color: 'text-blue-600' },
    { 
      label: 'Comments', 
      value: isLoadingComments ? '...' : totalComments.toString(), 
      icon: MessageSquare, 
      color: 'text-green-600' 
    },
    { label: 'Page Views', value: pageViews, icon: Eye, color: 'text-purple-600' },
    { label: 'Engagement', value: engagement, icon: BarChart3, color: 'text-orange-600' },
  ];

  // Quick Actions handlers
  const handleAddProject = () => {
    onTabChange('projects');
  };

  const handleModerateComments = () => {
    onTabChange('comments');
  };

  const handleUpdateSettings = () => {
    onTabChange('settings');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-sm border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            onClick={handleAddProject}
            className="flex items-center gap-2 h-12 hover:scale-105 transition-transform"
          >
            <FolderOpen className="w-5 h-5" />
            Add New Project
          </Button>
          <Button 
            variant="outline" 
            onClick={handleModerateComments}
            className="flex items-center gap-2 h-12 hover:scale-105 transition-transform"
          >
            <MessageSquare className="w-5 h-5" />
            Moderate Comments
          </Button>
          <Button 
            variant="outline" 
            onClick={handleUpdateSettings}
            className="flex items-center gap-2 h-12 hover:scale-105 transition-transform"
          >
            <Settings className="w-5 h-5" />
            Update Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
