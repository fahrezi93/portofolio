"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Upload, User, Calendar, Heart, RefreshCw, Pin } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from './ui/button';
import { supabase, type Comment, type CommentInsert } from '@/lib/supabase';
import { testSupabaseConnection, testStorageConnection } from '@/lib/test-supabase';
import { CommentStatusManager } from '@/lib/comment-status';

export function CommentsSection() {
  const { t } = useLanguage();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    name: '',
    message: '',
    profilePhoto: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());


  // Fetch comments from Supabase
  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if environment variables exist
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn('⚠️ Supabase credentials not found in environment');
        setIsSupabaseConnected(false);
        setComments([]); // Start with empty array, comments will be added locally
        return;
      }
      
      // Test connection
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase error:', error);
        throw error;
      }
      
      
      // Ensure all comments have required fields with defaults and filter out hidden comments
      const normalizedComments = (data || [])
        .map(comment => {
          const localStatus = CommentStatusManager.getStatus(comment.id);
          return {
            ...comment,
            likes: comment.likes || 0, // Default to 0 if likes field doesn't exist
            profile_photo_url: comment.profile_photo_url || undefined,
            pinned: comment.pinned || localStatus.pinned,
            hidden: comment.hidden || localStatus.hidden
          };
        })
        .filter(comment => {
          return !comment.hidden;
        }) // Don't show hidden comments to public
        .sort((a, b) => {
          // Sort pinned comments first, then by creation date
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      
      
      setComments(normalizedComments);
      setIsSupabaseConnected(true);
      
    } catch (err) {
      console.error('❌ Error in fetchComments:', err);
      setError('Supabase connection failed - comments will be stored locally');
      setIsSupabaseConnected(false);
      setComments([]); // Start with empty array, comments will be added locally
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.message.trim()) return;

    setIsSubmitting(true);

    try {
      if (isSupabaseConnected) {
        // Try Supabase first
        let profilePhotoUrl = undefined;

        // Upload profile photo if provided
        if (newComment.profilePhoto) {
          const fileExt = newComment.profilePhoto.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('profile-photos')
            .upload(fileName, newComment.profilePhoto);

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('profile-photos')
            .getPublicUrl(fileName);
          
          profilePhotoUrl = publicUrl;
        }

        // Insert comment to database
        const commentData: CommentInsert = {
          name: newComment.name.trim(),
          message: newComment.message.trim(),
          profile_photo_url: profilePhotoUrl
        };

        const { data, error } = await supabase
          .from('comments')
          .insert([commentData])
          .select()
          .single();

        if (error) throw error;


        // Create the new comment object with EXPLICIT string values
        const newCommentData: Comment = {
          id: data.id,
          created_at: data.created_at,
          name: String(data.name || newComment.name.trim()), // Ensure it's a string
          message: String(data.message || newComment.message.trim()), // Ensure it's a string
          profile_photo_url: data.profile_photo_url || undefined,
          likes: data.likes || 0,
          pinned: data.pinned || false,
          hidden: data.hidden || false
        };
        

        // Force re-render by creating new array reference
        setComments(prevComments => {
          const newCommentsArray = [newCommentData, ...prevComments];
          
          // Return completely new array to force React re-render
          return [...newCommentsArray];
        });

        
        // Reset form immediately after successful submission
        setNewComment({ name: '', message: '', profilePhoto: null });
        setError(null);

      } else {
        // Fallback to local state only
        const newCommentData: Comment = {
          id: Date.now().toString(),
          name: String(newComment.name.trim()),
          message: String(newComment.message.trim()),
          created_at: new Date().toISOString(),
          likes: 0,
          profile_photo_url: undefined,
          pinned: false,
          hidden: false
        };


        setComments(prevComments => {
          const newCommentsArray = [newCommentData, ...prevComments];
          return [...newCommentsArray]; // Force new array reference
        });
        
        // Reset form
        setNewComment({ name: '', message: '', profilePhoto: null });
      }
      
    } catch (err) {
      console.error('❌ Error submitting comment:', err);
      
      // Fallback to local state if Supabase fails
      const newCommentData: Comment = {
        id: Date.now().toString(),
        name: String(newComment.name.trim()),
        message: String(newComment.message.trim()),
        created_at: new Date().toISOString(),
        likes: 0,
        profile_photo_url: undefined,
        pinned: false,
        hidden: false
      };


      setComments(prevComments => {
        const newCommentsArray = [newCommentData, ...prevComments];
        return [...newCommentsArray]; // Force new array reference
      });
      
      setError('Comment added locally - Supabase connection failed');
      setNewComment({ name: '', message: '', profilePhoto: null });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError(`File size too large. Please select an image smaller than 5MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }

    // Clear any previous errors
    setError(null);
    setNewComment(prev => ({ ...prev, profilePhoto: file }));
  };

  const formatTimeAgo = (created_at: string) => {
    const date = new Date(created_at);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  const handleLike = async (commentId: string) => {
    // Check if user already liked this comment
    if (likedComments.has(commentId)) {
      return; // User already liked this comment
    }

    try {
      const comment = comments.find(c => c.id === commentId);
      if (!comment) return;

      if (isSupabaseConnected) {
        // Try updating in Supabase
        const { error } = await supabase
          .from('comments')
          .update({ likes: comment.likes + 1 })
          .eq('id', commentId);

        if (error) throw error;
        console.log('✅ Like updated in Supabase');
      }

      // Update local state
      setComments(prev => prev.map(c => 
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      ));

      // Mark this comment as liked by user
      setLikedComments(prev => new Set([...prev, commentId]));
      
    } catch (err) {
      console.error('Error liking comment:', err);
      // Still update local state even if Supabase fails
      setComments(prev => prev.map(c => 
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      ));
      // Mark as liked even if Supabase fails
      setLikedComments(prev => new Set([...prev, commentId]));
    }
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

  return (
    <section className="w-full py-16 md:py-24 bg-slate-950/20">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                {t.comments_title} ({comments.length})
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.comments_subtitle}
            </p>
          </motion.div>

          {/* Comment Form */}
          <motion.div variants={itemVariants} className="bg-card rounded-xl p-6 shadow-lg mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.comments_form_name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newComment.name}
                  onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                  required
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.comments_form_message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newComment.message}
                  onChange={(e) => setNewComment(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Write your message here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                  required
                />
              </div>

              {/* Profile Photo Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.comments_form_photo} <span className="text-muted-foreground">{t.comments_form_photo_optional}</span>
                </label>
                
                {/* Preview Area */}
                {newComment.profilePhoto && (
                  <div className="mb-3 p-3 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <img 
                          src={URL.createObjectURL(newComment.profilePhoto)} 
                          alt="Preview"
                          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {newComment.profilePhoto.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(newComment.profilePhoto.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNewComment(prev => ({ ...prev, profilePhoto: null }))}
                        className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
                        title="Remove photo"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Upload Button */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profile-photo"
                  />
                  <label
                    htmlFor="profile-photo"
                    className={`flex items-center justify-center gap-2 w-full py-3 px-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      newComment.profilePhoto 
                        ? 'border-green-500/30 bg-green-50/10 hover:border-green-500/50' 
                        : 'border-primary/30 hover:border-primary/50'
                    }`}
                  >
                    <Upload className={`w-5 h-5 ${newComment.profilePhoto ? 'text-green-500' : 'text-primary'}`} />
                    <span className={newComment.profilePhoto ? 'text-green-500' : 'text-primary'}>
                      {newComment.profilePhoto ? 'Change Photo' : t.comments_form_photo_choose}
                    </span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">{t.comments_form_photo_limit}</p>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !newComment.name.trim() || !newComment.message.trim()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t.comments_form_posting}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {t.comments_form_submit}
                  </div>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <RefreshCw className="w-8 h-8 mx-auto text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading comments...</p>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div variants={itemVariants} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchComments}
                className="mt-2"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </motion.div>
          )}

          {/* Comments List */}
          {!isLoading && (
            <>
              {comments.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center py-12">
                  <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{t.comments_empty_title}</h3>
                  <p className="text-muted-foreground">
                    {t.comments_empty_subtitle}
                  </p>
                </motion.div>
              ) : (
                <motion.div variants={itemVariants} className="space-y-4">
                  {comments.map((comment, index) => {
                    // Safety check - skip if essential fields are missing OR empty
                    if (!comment.name || !comment.message || 
                        comment.name.trim().length === 0 || 
                        comment.message.trim().length === 0) {
                      return null;
                    }
                    
                    return (
                    <motion.div
                      key={comment.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.01 }}
                      className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
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
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-white">{comment.name}</h4>
                              {comment.pinned && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs rounded-full">
                                  <Pin className="w-3 h-3" />
                                  <span>Pinned</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{formatTimeAgo(comment.created_at)}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-3 leading-relaxed">
                            {comment.message}
                          </p>

                          {/* Actions */}
                          <div className="flex items-center gap-4">
                            <button 
                              onClick={() => handleLike(comment.id)}
                              disabled={likedComments.has(comment.id)}
                              className={`flex items-center gap-1 text-sm transition-colors ${
                                likedComments.has(comment.id)
                                  ? 'text-red-500 cursor-not-allowed'
                                  : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${likedComments.has(comment.id) ? 'fill-current' : ''}`} />
                              <span>{comment.likes || 0}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
