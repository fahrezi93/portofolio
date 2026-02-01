"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, GitBranch, Star, Users, Calendar, Code2 } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string;
  location: string;
  company: string;
}

interface Repository {
  name: string;
  stargazers_count: number;
  language: string;
  description: string;
  html_url: string;
}

export function GitHubStats() {
  const { t } = useLanguage();
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Replace with your GitHub username
  const GITHUB_USERNAME = 'fahrezi93';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkReducedMotion = () => {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);

        const response = await fetch('/api/github');
        if (!response.ok) throw new Error('Failed to fetch GitHub data');

        const data = await response.json();
        setStats(data.user);
        setRepos(data.repos);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const getYearsActive = () => {
    if (!stats) return 0;
    const createdYear = new Date(stats.created_at).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - createdYear;
  };

  // Mobile-friendly animations - tetap ada animasi tapi lebih ringan
  const containerVariants = {
    hidden: { opacity: reducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : (isMobile ? 0.1 : 0.2),
        delayChildren: reducedMotion ? 0 : (isMobile ? 0.05 : 0.1)
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0 : (isMobile ? 0.4 : 0.6),
        ease: "easeOut"
      }
    }
  };

  const statsCardVariants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0 : (isMobile ? 0.4 : 0.6),
        ease: "easeOut"
      }
    }
  };

  const repoCardVariants = {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : (isMobile ? 15 : 25),
      rotateX: reducedMotion ? 0 : (isMobile ? -8 : -15)
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: reducedMotion ? 0 : (isMobile ? 0.3 : 0.5),
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              {t.github_title}
            </h2>
            <div className="flex justify-center items-center space-x-2">
              <Github className="w-6 h-6 animate-spin" />
              <span>{t.github_loading}</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              {t.github_title}
            </h2>
            <p className="text-muted-foreground">{t.github_error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="w-full py-16 md:py-24 bg-slate-950/20 relative z-20 text-white">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              {t.github_title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.github_subtitle}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-border">
              <Code2 className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <div className="text-2xl font-bold text-foreground">
                {stats?.public_repos || 0}
              </div>
              <div className="text-sm text-muted-foreground">{t.github_repos}</div>
            </div>

            <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-border">
              <Users className="w-8 h-8 mx-auto mb-3 text-green-500" />
              <div className="text-2xl font-bold text-foreground">
                {stats?.followers || 0}
              </div>
              <div className="text-sm text-muted-foreground">{t.github_followers}</div>
            </div>

            <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-border">
              <Star className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
              <div className="text-2xl font-bold text-foreground">
                {repos.reduce((total, repo) => total + repo.stargazers_count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">{t.github_stars}</div>
            </div>

            <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border border-border">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <div className="text-2xl font-bold text-foreground">
                {getYearsActive()}+
              </div>
              <div className="text-sm text-muted-foreground">{t.github_years}</div>
            </div>
          </div>

          {/* Popular Repositories */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">{t.github_popular_repos}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {repos.slice(0, 6).map((repo, index) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border hover:border-primary/50 h-full flex flex-col group"
                  style={{ minHeight: '200px' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <GitBranch className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>

                  <h4 className="font-semibold text-lg mb-2 truncate text-foreground group-hover:text-primary transition-colors">{repo.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                    {repo.description || 'No description available'}
                  </p>

                  {repo.language && (
                    <div className="flex items-center space-x-2 mt-auto">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-muted-foreground">{repo.language}</span>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* GitHub Profile Link */}
          <div className="text-center mt-12">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg"
            >
              <Github className="w-5 h-5" />
              <span>{t.github_view_profile}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
