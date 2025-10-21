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
   * Get optimized image URL with transformations
   */
  static getOptimizedUrl(url: string, options: {
    width?: number;
    height?: number;
    quality?: number;
  } = {}): string {
    if (!url.includes(this.BUCKET_NAME)) {
      return url; // Return original URL if not from our storage
    }
    
    const { width = 800, height, quality = 80 } = options;
    const params = new URLSearchParams();
    
    params.append('width', width.toString());
    if (height) params.append('height', height.toString());
    params.append('quality', quality.toString());
    params.append('format', 'webp');
    
    return `${url}?${params.toString()}`;
  }
}

// Auto-initialize bucket on import (in development and client-side only)
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  StorageManager.initializeBucket().catch(console.error);
}
