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
   * Get the best available model
   * Tries multiple model names to find one that works
   */
  private static async getModel(genAI: GoogleGenerativeAI) {
    // IMPORTANT: The API key might be for a different API version or region
    // Try the simplest model names first without testing
    const modelNames = [
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-pro',
      'models/gemini-1.5-flash',
      'models/gemini-1.5-pro',
      'models/gemini-pro',
    ];

    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    };

    // Just return the first model without testing
    // The actual error will be caught in the generateDescription method
    console.log(`🤖 Using model: ${modelNames[0]}`);
    return genAI.getGenerativeModel({ 
      model: modelNames[0],
      generationConfig
    });
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

      // Get the model
      const model = await this.getModel(genAI);

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
      
      // Provide helpful error message and fallback
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const isApiKeyError = errorMessage.includes('404') || errorMessage.includes('not found');
      
      return {
        success: false,
        error: isApiKeyError 
          ? 'AI service unavailable. Your API key may not have access to Gemini models. Using fallback description instead.'
          : errorMessage,
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
   * Debug: Test API key connection
   */
  static async testConnection(): Promise<{
    success: boolean;
    message: string;
    details?: any;
  }> {
    console.log('🔍 Testing Gemini API Connection...');
    
    // Check 1: API Key exists
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        message: '❌ API Key not found in environment variables',
        details: {
          checked: 'process.env.NEXT_PUBLIC_GEMINI_API_KEY',
          value: 'undefined'
        }
      };
    }

    console.log('✅ API Key found:', apiKey.substring(0, 10) + '...');

    // Check 2: Initialize SDK
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      console.log('✅ GoogleGenerativeAI SDK initialized');

      // Check 3: Try to get model
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      console.log('✅ Model instance created');

      // Check 4: Try simple generation
      console.log('🔄 Testing actual API call...');
      const result = await model.generateContent('Say "Hello"');
      const response = await result.response;
      const text = response.text();
      
      console.log('✅ API call successful! Response:', text);

      return {
        success: true,
        message: '✅ Gemini API is working correctly!',
        details: {
          apiKeyPrefix: apiKey.substring(0, 10) + '...',
          model: 'gemini-1.5-flash',
          testResponse: text
        }
      };

    } catch (error: any) {
      console.error('❌ API test failed:', error);
      
      return {
        success: false,
        message: '❌ API connection failed',
        details: {
          error: error.message,
          apiKeyPrefix: apiKey.substring(0, 10) + '...',
          suggestion: error.message.includes('404') 
            ? 'Your API key may not have access to Gemini models. Try creating a new key at https://aistudio.google.com/app/apikey'
            : 'Check your API key and internet connection'
        }
      };
    }
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

      // Get the model
      const model = await this.getModel(genAI);

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
