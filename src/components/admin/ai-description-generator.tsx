"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Loader2, 
  RefreshCw, 
  Check, 
  X, 
  Wand2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AIDescriptionGenerator, ProjectContext } from '@/lib/ai-description';

interface AIDescriptionGeneratorProps {
  context: ProjectContext;
  currentDescription: string;
  onDescriptionGenerated: (description: string) => void;
  className?: string;
}

export function AIDescriptionGeneratorComponent({
  context,
  currentDescription,
  onDescriptionGenerated,
  className = ""
}: AIDescriptionGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDescription, setGeneratedDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const isAIAvailable = AIDescriptionGenerator.isAvailable();
  const hasRequiredFields = context.title.trim().length > 0;
  const hasCurrentDescription = currentDescription.trim().length > 0;

  const generateDescription = async () => {
    if (!hasRequiredFields) {
      setError('Please enter a project title first');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedDescription(null);

    try {
      const result = await AIDescriptionGenerator.generateDescription(context);
      
      if (result.success && result.description) {
        setGeneratedDescription(result.description);
        setShowPreview(true);
      } else {
        setError(result.error || 'Failed to generate description');
        // Show fallback description if available
        if (result.description) {
          setGeneratedDescription(result.description);
          setShowPreview(true);
        }
      }
    } catch (error) {
      console.error('AI generation error:', error);
      setError('Failed to connect to AI service');
    } finally {
      setIsGenerating(false);
    }
  };

  const improveDescription = async () => {
    if (!hasCurrentDescription) {
      setError('Please enter a description first');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedDescription(null);

    try {
      const result = await AIDescriptionGenerator.improveDescription(currentDescription, context);
      
      if (result.success && result.description) {
        setGeneratedDescription(result.description);
        setShowPreview(true);
      } else {
        setError(result.error || 'Failed to improve description');
      }
    } catch (error) {
      console.error('AI improvement error:', error);
      setError('Failed to connect to AI service');
    } finally {
      setIsGenerating(false);
    }
  };

  const acceptDescription = () => {
    if (generatedDescription) {
      onDescriptionGenerated(generatedDescription);
      setShowPreview(false);
      setGeneratedDescription(null);
      setError(null);
    }
  };

  const rejectDescription = () => {
    setShowPreview(false);
    setGeneratedDescription(null);
    setError(null);
  };

  if (!isAIAvailable) {
    return (
      <div className={`p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg ${className}`}>
        <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">
            AI description generation unavailable. Please add <code>NEXT_PUBLIC_GEMINI_API_KEY</code> to your environment variables.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* AI Generation Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={generateDescription}
          disabled={isGenerating || !hasRequiredFields}
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {isGenerating ? 'Generating...' : 'Generate with AI'}
        </Button>

        {hasCurrentDescription && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={improveDescription}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4" />
            )}
            Improve Description
          </Button>
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
          >
            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Description Preview */}
      <AnimatePresence>
        {showPreview && generatedDescription && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          >
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  AI Generated Description
                </span>
              </div>

              {/* Generated Text */}
              <div className="p-3 bg-white dark:bg-gray-800 rounded-md border border-blue-100 dark:border-blue-700">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {generatedDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={acceptDescription}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Use This Description
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={rejectDescription}
                  className="flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={generateDescription}
                  disabled={isGenerating}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  Regenerate
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      {!showPreview && !error && (
        <div className="text-xs text-muted-foreground">
          💡 AI will generate a professional description based on your project title, category, and technologies.
          {!hasRequiredFields && (
            <span className="text-yellow-600 dark:text-yellow-400">
              {" "}Enter a project title to enable AI generation.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
