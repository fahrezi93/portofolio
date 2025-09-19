"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Pin, 
  Eye, 
  EyeOff, 
  Trash2,
  MessageSquare,
  Heart,
  Calendar,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase, type Comment } from '@/lib/supabase';
import { CommentStatusManager } from '@/lib/comment-status';

// Remove this interface since Comment now includes pinned and hidden

export function CommentsManager() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pinned' | 'hidden'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch comments from Supabase
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.log('Supabase not configured, using empty data');
        setComments([]);
        return;
      }

      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      } else {
        // Normalize Supabase data with defaults and local status
        const normalizedComments: Comment[] = (data || []).map(comment => {
          const localStatus = CommentStatusManager.getStatus(comment.id);
          return {
            ...comment,
            likes: comment.likes || 0,
            pinned: comment.pinned || localStatus.pinned,
            hidden: comment.hidden || localStatus.hidden,
            profile_photo_url: comment.profile_photo_url || undefined
          };
        });
        setComments(normalizedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const formatTimeAgo = (created_at: string) => {
    const date = new Date(created_at);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    });
  };

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'pinned' && comment.pinned) ||
                         (filterStatus === 'hidden' && comment.hidden);
    return matchesSearch && matchesFilter;
  });

  const handleDeleteComment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    console.log('🗑️ Starting delete operation for comment ID:', id);

    try {
      // Check if Supabase is configured
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.log('🔗 Supabase configured, attempting database delete...');
        
        // First, let's verify the comment exists
        const { data: existingComment, error: fetchError } = await supabase
          .from('comments')
          .select('*')
          .eq('id', id)
          .single();

        if (fetchError) {
          console.error('❌ Error fetching comment before delete:', fetchError);
          alert(`Failed to verify comment exists: ${fetchError.message}`);
          return;
        }

        if (!existingComment) {
          console.warn('⚠️ Comment not found in database:', id);
          alert('Comment not found in database');
          return;
        }

        console.log('📋 Comment found in database:', existingComment);

        // Now delete the comment
        const { data: deleteData, error: deleteError } = await supabase
          .from('comments')
          .delete()
          .eq('id', id)
          .select(); // This will return the deleted rows

        if (deleteError) {
          console.error('❌ Error deleting comment from database:', deleteError);
          alert(`Failed to delete comment from database: ${deleteError.message}`);
          return;
        }

        console.log('✅ Comment deleted from database. Deleted rows:', deleteData);
        
        if (!deleteData || deleteData.length === 0) {
          console.warn('⚠️ No rows were deleted from database');
          console.warn('💡 This is likely due to missing DELETE policy in Supabase RLS');
          alert('No rows were deleted from database.\n\nThis is likely due to missing DELETE policy in Supabase.\nPlease run the fix-delete-policy.sql file in your Supabase SQL Editor.');
          return;
        }

        // Clean up local status
        CommentStatusManager.deleteStatus(id);

      } else {
        console.warn('⚠️ Supabase not configured, only removing from local state');
      }

      // Refresh data from database to ensure consistency
      await fetchComments();
      console.log('✅ Data refreshed from database');
      
      // Show success message
      alert('Comment deleted successfully!');
      
    } catch (error) {
      console.error('💥 Unexpected error deleting comment:', error);
      alert(`Failed to delete comment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const togglePin = async (id: string) => {
    const comment = comments.find(c => c.id === id);
    if (!comment) return;

    const newPinnedState = !comment.pinned;

    try {
      // Try to update in database first (if columns exist)
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        try {
          const { error } = await supabase
            .from('comments')
            .update({ pinned: newPinnedState })
            .eq('id', id);

          if (error && error.code === 'PGRST204') {
            console.warn('⚠️ Pinned column not found in database, using local storage fallback');
          } else if (error) {
            throw error;
          } else {
            console.log(`✅ Comment ${newPinnedState ? 'pinned' : 'unpinned'} in database`);
          }
        } catch (dbError) {
          console.warn('⚠️ Database update failed, using local storage fallback:', dbError);
        }
      }

      // Always update local status as fallback
      CommentStatusManager.setPinned(id, newPinnedState);

      // Refresh data to reflect changes
      await fetchComments();
      console.log('✅ Pin status updated and data refreshed');
    } catch (error) {
      console.error('Error toggling pin status:', error);
      alert('Failed to update pin status');
    }
  };

  const toggleHidden = async (id: string) => {
    const comment = comments.find(c => c.id === id);
    if (!comment) return;

    const newHiddenState = !comment.hidden;

    try {
      // Try to update in database first (if columns exist)
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        try {
          const { error } = await supabase
            .from('comments')
            .update({ hidden: newHiddenState })
            .eq('id', id);

          if (error && error.code === 'PGRST204') {
            console.warn('⚠️ Hidden column not found in database, using local storage fallback');
          } else if (error) {
            throw error;
          } else {
            console.log(`✅ Comment ${newHiddenState ? 'hidden' : 'shown'} in database`);
          }
        } catch (dbError) {
          console.warn('⚠️ Database update failed, using local storage fallback:', dbError);
        }
      }

      // Always update local status as fallback
      CommentStatusManager.setHidden(id, newHiddenState);

      // Refresh data to reflect changes
      await fetchComments();
      console.log('✅ Hidden status updated and data refreshed');
    } catch (error) {
      console.error('Error toggling hidden status:', error);
      alert('Failed to update hidden status');
    }
  };

  const getStatusBadge = (comment: Comment) => {
    if (comment.pinned) {
      return <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs rounded-full">Pinned</span>;
    }
    if (comment.hidden) {
      return <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 text-xs rounded-full">Hidden</span>;
    }
    return <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs rounded-full">Public</span>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Comments Manager</h2>
        <p className="text-muted-foreground">Moderate and manage portfolio comments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Comments', value: comments.length, color: 'text-blue-600' },
          { label: 'Pinned', value: comments.filter(c => c.pinned).length, color: 'text-green-600' },
          { label: 'Hidden', value: comments.filter(c => c.hidden).length, color: 'text-red-600' },
          { label: 'Total Likes', value: comments.reduce((sum, c) => sum + c.likes, 0), color: 'text-purple-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 shadow-sm border border-border"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Comments</option>
              <option value="pinned">Pinned Only</option>
              <option value="hidden">Hidden Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-card rounded-xl p-6 shadow-sm border border-border ${
              comment.hidden ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {comment.profile_photo_url ? (
                  <img 
                    src={comment.profile_photo_url} 
                    alt={comment.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-foreground">{comment.name}</h4>
                    {getStatusBadge(comment)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatTimeAgo(comment.created_at)}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {comment.message}
                </p>

                <div className="flex items-center justify-between">
                  {/* Likes */}
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>{comment.likes} likes</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => togglePin(comment.id)}
                      className={comment.pinned ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : ''}
                    >
                      <Pin className="w-3 h-3 mr-1" />
                      {comment.pinned ? 'Unpin' : 'Pin'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleHidden(comment.id)}
                      className={comment.hidden ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : ''}
                    >
                      {comment.hidden ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                      {comment.hidden ? 'Show' : 'Hide'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredComments.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No comments found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Comments will appear here as visitors leave feedback'
            }
          </p>
        </div>
      )}
    </div>
  );
}
