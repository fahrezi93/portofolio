import { supabase } from './supabase';

export class StorageManager {
  private static readonly BUCKET_NAME = 'project-images';
  
  /**
   * Initialize storage bucket (call this once during setup)
   */
  static async initializeBucket() {
    try {
      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === this.BUCKET_NAME);
      
      if (!bucketExists) {
        // Create bucket if it doesn't exist
        const { error } = await supabase.storage.createBucket(this.BUCKET_NAME, {
          public: true,
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (error) {
          // Check if bucket already exists (common race condition)
          if (error.message.includes('already exists') || error.message.includes('duplicate')) {
            console.log('Storage bucket already exists');
            return true;
          }
          
          console.error('Error creating bucket:', error);
          // Don't fail completely, bucket might exist or be created manually
          console.warn('Continuing without bucket creation - please create bucket manually in Supabase dashboard');
          return true; // Return true to allow app to continue
        }
        
        console.log('Storage bucket created successfully');
      }
      
      return true;
    } catch (error) {
      console.error('Error initializing bucket:', error);
      return false;
    }
  }
  
  /**
   * Upload a file to Supabase storage
   */
  static async uploadFile(file: File, folder: string = 'projects'): Promise<{
    success: boolean;
    url?: string;
    error?: string;
  }> {
    try {
      // Validate file
      if (!file) {
        return { success: false, error: 'No file provided' };
      }
      
      // Check file size (5MB limit)
      if (file.size > 5242880) {
        return { success: false, error: 'File size must be less than 5MB' };
      }
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return { success: false, error: 'Only JPEG, PNG, WebP, and GIF files are allowed' };
      }
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      // Upload file
      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(fileName);
      
      return { success: true, url: publicUrl };
      
    } catch (error) {
      console.error('Upload error:', error);
      return { success: false, error: 'Failed to upload file' };
    }
  }
  
  /**
   * Delete a file from Supabase storage
   */
  static async deleteFile(url: string): Promise<boolean> {
    try {
      // Extract file path from URL
      const urlParts = url.split('/');
      const bucketIndex = urlParts.findIndex(part => part === this.BUCKET_NAME);
      
      if (bucketIndex === -1) {
        console.error('Invalid storage URL');
        return false;
      }
      
      const filePath = urlParts.slice(bucketIndex + 1).join('/');
      
      const { error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .remove([filePath]);
      
      if (error) {
        console.error('Delete error:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  }
  
  /**
   * Get optimized image URL with query params
   * Note: Supabase Image Transformations require Pro Plan
   * For free tier, we use Next.js built-in image optimization
   */
  static getOptimizedUrl(url: string, options: {
    width?: number;
    height?: number;
    quality?: number;
  } = {}): string {
    // For free tier Supabase, just return the original URL
    // Next.js will handle the optimization
    return url;
  }

  /**
   * Get multiple URLs for responsive images
   * Uses original URL since Next.js handles optimization
   */
  static getResponsiveUrls(url: string): {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
  } {
    return {
      thumbnail: url,
      small: url,
      medium: url,
      large: url,
    };
  }
}

// NOTE: Bucket initialization removed - bucket must be created manually in Supabase Dashboard
// Creating buckets requires service role key which should never be exposed to client-side
// Steps to create bucket manually:
// 1. Go to Supabase Dashboard > Storage
// 2. Click "New bucket"
// 3. Name: "project-images", Public: true
// 4. Add RLS policies for upload/delete if needed
