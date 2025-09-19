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

  // Replace with your GitHub username
  const GITHUB_USERNAME = 'fahrezi93';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user stats
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setStats(userData);

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();
        setRepos(reposData);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              GitHub Activity
            </h2>
            <div className="flex justify-center items-center space-x-2">
              <Github className="w-6 h-6 animate-spin" />
              <span>Loading GitHub stats...</span>
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
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              GitHub Activity
            </h2>
            <p className="text-muted-foreground">Unable to load GitHub stats at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2 
              variants={itemVariants}
              className="font-headline text-3xl font-bold tracking-tight sm:text-4xl mb-4"
            >
              GitHub Activity
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              A glimpse into my coding journey and open source contributions
            </motion.p>
          </div>

          {/* Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Code2 className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <div className="text-2xl font-bold">{stats?.public_repos || 0}</div>
              <div className="text-sm text-muted-foreground">Public Repos</div>
            </div>
            
            <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-8 h-8 mx-auto mb-3 text-green-500" />
              <div className="text-2xl font-bold">{stats?.followers || 0}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            
            <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Star className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
              <div className="text-2xl font-bold">
                {repos.reduce((total, repo) => total + repo.stargazers_count, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Stars</div>
            </div>
            
            <div className="bg-card rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <div className="text-2xl font-bold">{getYearsActive()}+</div>
              <div className="text-sm text-muted-foreground">Years Active</div>
            </div>
          </motion.div>

          {/* Popular Repositories */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 text-center">Popular Repositories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.slice(0, 6).map((repo, index) => (
                <motion.a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <GitBranch className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-2 truncate">{repo.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>
                  
                  {repo.language && (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-muted-foreground">{repo.language}</span>
                    </div>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* GitHub Profile Link */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View Full Profile</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
