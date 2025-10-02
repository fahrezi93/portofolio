import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ProjectContext {
  title: string;
  category: 'development' | 'design' | 'video';
  type?: string;
  technologies?: string[];
  year?: string;
}

export class AIDescriptionGenerator {
  private static genAI: GoogleGenerativeAI | null = null;

  /**
   * Initialize Gemini AI with API key
   */
  private static initializeAI(): GoogleGenerativeAI | null {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('Gemini API key not found. AI description generation disabled.');
      return null;
    }

    if (!this.genAI) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }

    return this.genAI;
  }

  /**
   * Generate project description using Gemini AI
   */
  static async generateDescription(context: ProjectContext): Promise<{
    success: boolean;
    description?: string;
    error?: string;
  }> {
    try {
      const genAI = this.initializeAI();
      
      if (!genAI) {
        return {
          success: false,
          error: 'Gemini API key not configured'
        };
      }

      // Try different models in order of preference
      let model;
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      } catch (error) {
        // Fallback to older model if gemini-pro is not available
        try {
          model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
        } catch (fallbackError) {
          throw new Error('No compatible Gemini model available');
        }
      }

      const prompt = this.buildPrompt(context);
      
      console.log('🤖 Generating AI description for:', context.title);
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const description = response.text();

      if (!description || description.trim().length === 0) {
        throw new Error('Empty response from AI');
      }

      // Clean up the description
      const cleanDescription = this.cleanDescription(description);

      console.log('✅ AI description generated successfully');
      
      return {
        success: true,
        description: cleanDescription
      };

    } catch (error) {
      console.error('❌ AI description generation failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        description: this.getFallbackDescription(context)
      };
    }
  }

  /**
   * Build optimized prompt for Gemini AI
   */
  private static buildPrompt(context: ProjectContext): string {
    const { title, category, type, technologies = [], year } = context;
    
    const techList = technologies.length > 0 ? technologies.join(', ') : 'various technologies';
    const currentYear = new Date().getFullYear();
    const projectYear = year || currentYear.toString();

    let categoryContext = '';
    switch (category) {
      case 'development':
        categoryContext = 'software development project, web application, or mobile app';
        break;
      case 'design':
        categoryContext = 'design project, UI/UX design, graphic design, or branding work';
        break;
      case 'video':
        categoryContext = 'video project, motion graphics, video editing, or animation work';
        break;
    }

    const prompt = `
Generate a professional and engaging project description for a portfolio. Here are the project details:

**Project Title**: ${title}
**Category**: ${category} (${categoryContext})
**Type**: ${type || 'Not specified'}
**Technologies/Tools**: ${techList}
**Year**: ${projectYear}

Requirements:
1. Write 1-2 sentences (40-80 words)
2. Professional tone, suitable for portfolio
3. Highlight key features or benefits
4. Mention relevant technologies naturally
5. Focus on what the project does/achieves
6. Avoid generic phrases like "This project is..."
7. Make it engaging and specific
8. Use active voice
9. No bullet points or lists
10. Write in English

Examples of good descriptions:
- "A modern e-commerce platform built with React and Node.js that streamlines online shopping with real-time inventory management and secure payment processing."
- "An intuitive mobile banking app design featuring clean UI/UX principles and accessibility-first approach, created in Figma with comprehensive user research."
- "A dynamic brand commercial showcasing cutting-edge motion graphics and smooth transitions, crafted using After Effects and Cinema 4D for maximum visual impact."

Generate a description for the project "${title}":`;

    return prompt;
  }

  /**
   * Clean and format the AI-generated description
   */
  private static cleanDescription(description: string): string {
    return description
      .trim()
      .replace(/^["']|["']$/g, '') // Remove quotes at start/end
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/^\w/, (c) => c.toUpperCase()) // Capitalize first letter
      .replace(/([.!?])\s*$/, '$1'); // Ensure proper ending punctuation
  }

  /**
   * Generate fallback description when AI fails
   */
  private static getFallbackDescription(context: ProjectContext): string {
    const { title, category, type, technologies = [] } = context;
    
    let fallback = '';
    
    switch (category) {
      case 'development':
        fallback = `A ${type?.toLowerCase() || 'software'} project that demonstrates modern development practices`;
        if (technologies.length > 0) {
          fallback += ` using ${technologies.slice(0, 3).join(', ')}`;
        }
        fallback += '. Built with focus on performance, user experience, and scalability.';
        break;
        
      case 'design':
        fallback = `A ${type?.toLowerCase() || 'design'} project showcasing creative visual solutions`;
        if (technologies.length > 0) {
          fallback += ` created with ${technologies.slice(0, 2).join(' and ')}`;
        }
        fallback += '. Focused on user-centered design and modern aesthetics.';
        break;
        
      case 'video':
        fallback = `A ${type?.toLowerCase() || 'video'} project featuring dynamic visual storytelling`;
        if (technologies.length > 0) {
          fallback += ` produced using ${technologies.slice(0, 2).join(' and ')}`;
        }
        fallback += '. Combines creative direction with technical expertise.';
        break;
    }

    return fallback;
  }

  /**
   * Check if AI description generation is available
   */
  static isAvailable(): boolean {
    return !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  }

  /**
   * Get suggested improvements for existing description
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
      const genAI = this.initializeAI();
      
      if (!genAI) {
        return {
          success: false,
          error: 'Gemini API key not configured'
        };
      }

      // Try different models in order of preference
      let model;
      try {
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      } catch (error) {
        // Fallback to older model if gemini-pro is not available
        try {
          model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });
        } catch (fallbackError) {
          throw new Error('No compatible Gemini model available');
        }
      }

      const prompt = `
Improve this project description to make it more engaging and professional:

**Current Description**: "${currentDescription}"

**Project Context**:
- Title: ${context.title}
- Category: ${context.category}
- Type: ${context.type || 'Not specified'}
- Technologies: ${context.technologies?.join(', ') || 'Not specified'}

Requirements:
1. Keep it 1-2 sentences (40-80 words)
2. Make it more specific and engaging
3. Highlight unique features or benefits
4. Use professional portfolio language
5. Avoid generic phrases
6. Maintain the core meaning
7. Write in English

Provide only the improved description:`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const description = response.text();

      return {
        success: true,
        description: this.cleanDescription(description)
      };

    } catch (error) {
      console.error('❌ Description improvement failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}
