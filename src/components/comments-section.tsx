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
    <section id="comments" className="w-full py-20 relative z-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-500/5 blur-[100px] -z-10 rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Minimalist Header */}
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-3">
              Thoughts & Feedback
            </h2>
            <p className="text-muted-foreground/80">
              {t.comments_subtitle}
            </p>
          </motion.div>

          {/* Minimalist Form */}
          <motion.div variants={itemVariants} className="mb-16">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Name Input */}
                <div className="relative group">
                  <input
                    type="text"
                    value={newComment.name}
                    onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                    placeholder=" "
                    className="peer w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder-transparent"
                    required
                  />
                  <label className="absolute left-4 top-3 text-muted-foreground text-base transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:bg-background peer-focus:px-2 peer-focus:text-blue-500 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-muted-foreground pointer-events-none">
                    Your Name
                  </label>
                </div>

                {/* Profile Photo - Simplified */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="profile-photo-minimal"
                  />
                  <label
                    htmlFor="profile-photo-minimal"
                    className="flex items-center gap-4 cursor-pointer group opacity-70 hover:opacity-100 transition-opacity mt-2"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${newComment.profilePhoto ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-white/50 group-hover:bg-white/10'
                      }`}>
                      {newComment.profilePhoto ? <User className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                    </div>
                    <div className="text-sm">
                      <span className={newComment.profilePhoto ? 'text-green-500 font-medium' : 'text-muted-foreground'}>
                        {newComment.profilePhoto ? newComment.profilePhoto.name : 'Upload photo (opt)'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Message Input */}
              <div className="relative group">
                <textarea
                  value={newComment.message}
                  onChange={(e) => setNewComment(prev => ({ ...prev, message: e.target.value }))}
                  placeholder=" "
                  rows={3}
                  className="peer w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-lg focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder-transparent resize-none min-h-[120px]"
                  required
                />
                <label className="absolute left-4 top-3 text-muted-foreground text-base transition-all peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-xs peer-focus:bg-background peer-focus:px-2 peer-focus:text-blue-500 peer-not-placeholder-shown:-top-2.5 peer-not-placeholder-shown:left-2 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:bg-background peer-not-placeholder-shown:px-2 peer-not-placeholder-shown:text-muted-foreground pointer-events-none">
                  Write a message to Fahrezi...
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || !newComment.name.trim() || !newComment.message.trim()}
                  className="bg-white/10 hover:bg-white/20 text-white rounded-full px-8 py-6 transition-all"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? 'Posting...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Loading & Error States */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/50">
              <div className="w-1 h-12 bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse mb-4"></div>
              <p className="text-sm tracking-widest uppercase">Loading Comments</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-400 bg-red-950/20 py-4 rounded-lg mb-8 border border-red-900/50">
              {error}
            </div>
          )}

          {/* Elegant Comments List */}
          {!isLoading && (
            <div className="space-y-8">
              {comments.length === 0 ? (
                <div className="text-center py-12 opacity-50">
                  <p>No comments yet. Be the first to share your thoughts.</p>
                </div>
              ) : (
                comments.map((comment, index) => {
                  if (!comment.name || !comment.message || comment.name.trim().length === 0 || comment.message.trim().length === 0) return null;

                  return (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group relative pl-8 border-l border-white/10 hover:border-blue-500/50 transition-colors pb-8 last:pb-0"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-blue-500 group-hover:bg-blue-500 transition-all" />

                      <div className="flex items-start gap-4 mb-2">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          {comment.profile_photo_url ? (
                            <img
                              src={comment.profile_photo_url}
                              alt={comment.name}
                              className="w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                              <span className="text-sm font-bold">{comment.name.charAt(0).toUpperCase()}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                            <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                              {comment.name}
                            </h4>
                            <span className="text-xs text-muted-foreground/50">
                              {formatTimeAgo(comment.created_at)}
                            </span>
                            {comment.pinned && (
                              <span className="text-[10px] uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">
                                Pinned
                              </span>
                            )}
                          </div>

                          <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
                            {comment.message}
                          </p>

                          <div className="mt-3 flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleLike(comment.id)}
                              disabled={likedComments.has(comment.id)}
                              className={`flex items-center gap-1.5 text-xs hover:text-red-400 transition-colors ${likedComments.has(comment.id) ? 'text-red-400' : 'text-gray-500'}`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${likedComments.has(comment.id) ? 'fill-current' : ''}`} />
                              <span>{comment.likes || 0}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
