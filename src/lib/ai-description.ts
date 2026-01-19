// AI Description Generator - Uses server-side API route for security
// API keys are never exposed to the browser

export interface ProjectContext {
  title: string;
  category: 'development' | 'design' | 'video';
  type?: string;
  technologies?: string[];
  year?: string;
}

export class AIDescriptionGenerator {
  /**
   * Generate project description using server-side AI API
   * This ensures API keys are never exposed to the browser
   */
  static async generateDescription(context: ProjectContext): Promise<{
    success: boolean;
    description?: string;
    error?: string;
  }> {
    try {
      // Call server-side API route instead of direct Gemini access
      const response = await fetch('/api/ai-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate description');
      }

      return {
        success: true,
        description: data.description,
      };

    } catch (error) {
      // Return fallback description on error
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        description: this.getFallbackDescription(context),
      };
    }
  }

  /**
   * Check if AI service is available (via server-side check)
   */
  static async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch('/api/ai-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          context: { 
            title: 'Test', 
            category: 'development' 
          } 
        }),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get fallback description when AI is unavailable
   */
  private static getFallbackDescription(context: ProjectContext): string {
    const { title, category, type, technologies = [], year } = context;
    const techList = technologies.length > 0 ? technologies.slice(0, 3).join(', ') : 'modern technologies';
    const projectYear = year || new Date().getFullYear().toString();

    switch (category) {
      case 'development':
        return `A ${type || 'web app'} project that demonstrates modern development practices using ${techList}. Built with focus on performance, user experience, and scalability.`;
      case 'design':
        return `A creative ${type || 'design'} project showcasing modern design principles and aesthetics. Created with attention to detail and user-centered design approach.`;
      case 'video':
        return `A ${type || 'video'} project demonstrating creative storytelling and visual excellence. Produced with professional editing techniques and cinematic quality.`;
      default:
        return `${title} - A project created in ${projectYear} using ${techList}.`;
    }
  }

  /**
   * Improve existing description using AI
   */
  static async improveDescription(
    currentDescription: string,
    context: ProjectContext
  ): Promise<{
    success: boolean;
    description?: string;
    error?: string;
  }> {
    try {
      const response = await fetch('/api/ai-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          context,
          currentDescription,
          action: 'improve'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to improve description');
      }

      return {
        success: true,
        description: data.description,
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export a simple function for easier usage
export async function generateAIDescription(context: ProjectContext) {
  return AIDescriptionGenerator.generateDescription(context);
}
