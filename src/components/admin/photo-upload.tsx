"use client";

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2,
  AlertCircle,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StorageManager } from '@/lib/storage';

interface PhotoUploadProps {
  value?: string;
  onChange: (url: string | null) => void;
  onError?: (error: string) => void;
  className?: string;
  folder?: string;
  maxSize?: number; // in MB
  accept?: string;
}

export function PhotoUpload({
  value,
  onChange,
  onError,
  className = '',
  folder = 'projects',
  maxSize = 5,
  accept = 'image/jpeg,image/png,image/webp,image/gif'
}: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    onError?.(errorMessage);
    setTimeout(() => setError(null), 5000);
  }, [onError]);

  const validateFile = useCallback((file: File): boolean => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      handleError(`File size must be less than ${maxSize}MB`);
      return false;
    }

    // Check file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    if (!allowedTypes.includes(file.type)) {
      handleError('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
      return false;
    }

    return true;
  }, [maxSize, accept, handleError]);

  const uploadFile = useCallback(async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Create preview immediately
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Upload to Supabase
      const result = await StorageManager.uploadFile(file, folder);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success && result.url) {
        // Clean up preview URL
        URL.revokeObjectURL(previewUrl);
        
        // Set the actual uploaded URL
        setPreview(result.url);
        onChange(result.url);
        
        // Show success briefly
        setTimeout(() => {
          setUploadProgress(0);
        }, 1000);
      } else {
        // Revert preview on error
        URL.revokeObjectURL(previewUrl);
        setPreview(value || null);
        handleError(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      handleError('Failed to upload image');
      setPreview(value || null);
    } finally {
      setIsUploading(false);
    }
  }, [validateFile, folder, onChange, value, handleError]);

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    uploadFile(file);
  }, [uploadFile]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

  const handleRemove = useCallback(async () => {
    if (preview && preview !== value) {
      // If it's a blob URL, revoke it
      if (preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
      // If it's a Supabase URL, optionally delete it
      else if (preview.includes('supabase')) {
        try {
          await StorageManager.deleteFile(preview);
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      }
    }
    
    setPreview(null);
    onChange(null);
    setError(null);
    setUploadProgress(0);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [preview, value, onChange]);

  const openFileDialog = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-6 transition-all duration-200
          ${isDragging 
            ? 'border-primary bg-primary/5 scale-105' 
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
          }
          ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              
              {/* Remove Button */}
              <Button
                type="button"
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 w-8 h-8 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <X className="w-4 h-4" />
              </Button>

              {/* Upload Progress Overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <div className="text-sm font-medium">Uploading...</div>
                    <div className="w-32 h-2 bg-white/20 rounded-full mt-2">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className="text-xs mt-1">{uploadProgress}%</div>
                  </div>
                </div>
              )}

              {/* Success Indicator */}
              {uploadProgress === 100 && !isUploading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1"
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-8"
            >
              {isUploading ? (
                <div className="space-y-4">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
                  <div>
                    <div className="text-lg font-medium">Uploading...</div>
                    <div className="w-48 h-2 bg-muted rounded-full mt-2 mx-auto">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{uploadProgress}%</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`
                    w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors
                    ${isDragging ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}>
                    {isDragging ? (
                      <Upload className="w-8 h-8" />
                    ) : (
                      <ImageIcon className="w-8 h-8" />
                    )}
                  </div>
                  
                  <div>
                    <div className="text-lg font-medium">
                      {isDragging ? 'Drop image here' : 'Upload project image'}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Drag and drop or click to select
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Supports JPEG, PNG, WebP, GIF up to {maxSize}MB
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Instructions */}
      {!preview && !isUploading && (
        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            onClick={openFileDialog}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Image
          </Button>
        </div>
      )}
    </div>
  );
}
