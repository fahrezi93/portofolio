"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  LogOut,
  User,
  BarChart3,
  Eye,
  Mail,
  Plus
} from 'lucide-react';
import { useAdmin } from '@/context/admin-context';
import { Button } from '@/components/ui/button';
import { ProjectsManager } from '@/components/admin/projects-manager';
import { CommentsManager } from '@/components/admin/comments-manager';
import { ContactsManager } from '@/components/admin/contacts-manager';
import { supabase } from '@/lib/supabase';

type TabType = 'overview' | 'projects' | 'comments' | 'messages';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const { logout } = useAdmin();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'comments', label: 'Comments', icon: MessageSquare },
    { id: 'messages', label: 'Messages', icon: Mail },
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewPanel onTabChange={setActiveTab} />;
      case 'projects':
        return <ProjectsManager />;
      case 'comments':
        return <CommentsManager />;
      case 'messages':
        return <ContactsManager />;
      default:
        return <OverviewPanel onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/20">
      {/* Sleek Glass Header */}
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <User className="w-4 h-4 text-white/70" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white/90">Fahrezi Workspace</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Admin</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="/" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-medium text-white/60 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Live Site
              </a>
              <div className="w-[1px] h-4 bg-white/10"></div>
              <button
                onClick={logout}
                className="text-xs font-medium text-red-400/80 hover:text-red-400 flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Minimalist Sidebar */}
          <div className="lg:w-56 flex-shrink-0">
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`relative flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-white/10'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'opacity-100' : 'opacity-60'}`} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  
  // Analytics State
  const [pageViews, setPageViews] = useState<string>('N/A');
  const [engagement, setEngagement] = useState<string>('N/A');
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingComments(true);
        setIsLoadingProjects(true);
        
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          setTotalComments(0);
          setTotalProjects(39);
          setIsLoadingComments(false);
          setIsLoadingProjects(false);
          return;
        }

        const { count: commentsCount } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true });

        setTotalComments(commentsCount || 0);

        const { count: projectsCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });

        setTotalProjects(projectsCount || 0);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingComments(false);
        setIsLoadingProjects(false);
      }
    };

    const fetchAnalytics = async () => {
      try {
        setIsLoadingAnalytics(true);
        const response = await fetch('/api/analytics');
        const result = await response.json();
        
        if (result.success && result.data) {
          setPageViews(result.data.pageViews);
          setEngagement(result.data.engagementRate);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setIsLoadingAnalytics(false);
      }
    };

    fetchData();
    fetchAnalytics();
  }, []);
  
  const stats = [
    { 
      label: 'Projects', 
      value: isLoadingProjects ? '...' : totalProjects.toString(), 
      icon: FolderOpen,
    },
    { 
      label: 'Comments', 
      value: isLoadingComments ? '...' : totalComments.toString(), 
      icon: MessageSquare,
    },
    { 
      label: 'Page Views', 
      value: isLoadingAnalytics ? '...' : pageViews, 
      icon: Eye,
    },
    { 
      label: 'Engagement', 
      value: isLoadingAnalytics ? '...' : engagement, 
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-light tracking-tight text-white">Overview</h2>
        <p className="text-sm text-white/40">Performance metrics and quick access.</p>
      </div>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-white/40 tracking-wide uppercase">{stat.label}</span>
                  <IconComponent className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
                <div>
                  <span className="text-4xl font-light text-white tracking-tight">{stat.value}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Actions (Minimalist style) */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-white/40 tracking-wide uppercase">Shortcuts</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => onTabChange('projects')}
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
          <button 
            onClick={() => onTabChange('comments')}
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <MessageSquare className="w-4 h-4 opacity-50" />
            Moderate Comments
          </button>
        </div>
      </div>
    </div>
  );
}
