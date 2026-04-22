'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { 
  Github, 
  Star, 
  GitFork, 
  Users, 
  Code2, 
  Calendar,
  ExternalLink,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '@/context/language-context';

const GITHUB_USERNAME = 'fahrezi93';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export function GitHubStats() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`)
        ]);

        if (!statsRes.ok || !reposRes.ok) throw new Error('Failed to fetch GitHub data');

        const statsData = await statsRes.json();
        const reposData = await reposRes.json();

        setStats(statsData);
        setRepos(reposData.filter((repo: any) => !repo.fork).slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getYearsActive = () => {
    if (!stats) return 0;
    const createdDate = new Date(stats.created_at);
    const currentDate = new Date();
    return currentDate.getFullYear() - createdDate.getFullYear();
  };

  if (loading) {
    return (
      <section className="w-full py-20 relative bg-[#0B1121]">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-20 bg-[#0B1121]">
        <div className="container mx-auto px-4 text-center text-gray-500">
          {t.github_error || error}
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="w-full py-24 relative overflow-hidden bg-[#0B1121]">
      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Architectural Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-12 border-b border-white/5 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-[1px] bg-blue-500/50" />
                <span className="text-[10px] font-medium tracking-[0.3em] text-blue-400 uppercase">Open Source</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-none">
                GitHub <span className="italic font-serif">Activity</span>
              </h2>
            </div>

            {/* Typography-First Stats */}
            <div className="flex items-center gap-12 md:gap-16">
              <div className="space-y-1">
                <span className="text-3xl font-light text-white block leading-none">{stats?.public_repos || 0}</span>
                <span className="text-[9px] font-medium tracking-[0.2em] text-white/20 uppercase">Repositories</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-light text-white block leading-none">{repos.reduce((total, repo) => total + repo.stargazers_count, 0)}</span>
                <span className="text-[9px] font-medium tracking-[0.2em] text-white/20 uppercase">Total Stars</span>
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-light text-white block leading-none">{stats?.followers || 0}</span>
                <span className="text-[9px] font-medium tracking-[0.2em] text-white/20 uppercase">Followers</span>
              </div>
            </div>
          </div>

          {/* Deconstructed Grid Section */}
          <div className="py-16 space-y-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-white/60 tracking-wide">Contribution Timeline</span>
                  <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">{getYearsActive()}+ Years of Digital Craft</span>
                </div>
              </div>
              
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[10px] font-medium text-white/40 uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                View full profile
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            <div className="overflow-x-auto pb-6 scrollbar-hide">
              <div className="min-w-[800px] flex justify-start">
                <GitHubCalendar 
                  username={GITHUB_USERNAME} 
                  colorScheme="dark"
                  theme={{
                    dark: ['#161b22', '#1e293b', '#2563eb', '#3b82f6', '#60a5fa'],
                  }}
                  fontSize={12}
                  blockSize={11}
                  blockMargin={5}
                  blockRadius={1}
                />
              </div>
            </div>

            {/* Architectural Footer Info */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] text-white/20 uppercase tracking-widest">Activity Intensity</span>
                  <div className="flex gap-1.5">
                    {['#161b22', '#1e293b', '#2563eb', '#3b82f6', '#60a5fa'].map((color) => (
                      <div key={color} className="w-2.5 h-2.5 rounded-[1px]" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                </span>
                <span className="text-[9px] font-medium tracking-[0.2em] text-white/30 uppercase">Live Data Synchronization</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

  );
}
